import { Component,ViewChild ,OnInit,ElementRef} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatDialog, } from '@angular/material/dialog';
import { AdministratorServiceService } from 'src/app/service/administrator-service.service';
import { NgConfirmService } from 'ng-confirm-box';
import { Router } from '@angular/router';
import { TeacherAddAssignmnentComponent } from '../teacher-add-assignmnent/teacher-add-assignmnent.component';
import { TeacherServiceService } from 'src/app/service/teacher-service.service';

import { saveAs } from 'file-saver';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { TeatcheAddRnoteModuleComponent } from '../teatche-add-rnote-module/teatche-add-rnote-module.component';

@Component({
  selector: 'app-teatchernote-module',
  templateUrl: './teatchernote-module.component.html',
  styleUrls: ['./teatchernote-module.component.css']
})
export class TeatchernoteModuleComponent implements OnInit {
  displayedColumns: string[] = ['name', 'from', 'file','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog:MatDialog,private serivce:TeacherServiceService,private ngconfirm:NgConfirmService,private route:Router,private http:HttpClient){
    // if(!sessionStorage.getItem('admin')){
    //   this.route.navigate(['/administrator'])
    // }
  }

  ngOnInit(): void {
    this.getteachervalue()
  }

 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  openDialog(){
    this.dialog.open(TeatcheAddRnoteModuleComponent,{
      width:'50%'
    }).afterClosed().subscribe((val)=>{
      if(val=="save"){
        this.getteachervalue()
      }
    })
  }

  getteachervalue(){
    this.serivce.shownotes().subscribe({
      next:(value)=>{
      console.log(value.getdata)
      
      this.dataSource=new MatTableDataSource(value.getdata)
      this.dataSource.paginator=this.paginator
      this.dataSource.sort=this.sort
    },
    error:(value)=>{
      if(value.message=='session has expired'){
        // sessionStorage.removeItem('admin')
        // this.route.navigate(['/administrator'])
      }

    }})
  }

  editvalue(row:any){
    this.dialog.open(TeatcheAddRnoteModuleComponent,{
      width:'50%',
      data:row
    }).afterClosed().subscribe((val)=>{
      if(val=="updated"){
        this.getteachervalue()
      }
    })
  }

  deletevalue(row:any){
    this.ngconfirm.showConfirm('Do you want to delete',
      ()=>{
        this.serivce.deletenotes(row._id).subscribe(()=>{

          this.getteachervalue()
        })
      },
      ()=>{

      }
    )
    
  }
  downloadPDF(fileName: string) {
    this.serivce.getbaseurl(fileName, { responseType: 'blob' }).subscribe(
      (response: Blob) => {
        // Save the file using FileSaver.js
        saveAs(response, fileName);
      },
      (error) => {
        console.error('Error retrieving file:', error);
      }
    );
  }
  
  

}
