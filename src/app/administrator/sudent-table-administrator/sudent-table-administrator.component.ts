import { Component,ViewChild ,OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatDialog, } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { AdministratorServiceService } from 'src/app/service/administrator-service.service';
import { NgConfirmService } from 'ng-confirm-box';
import { StudentAddComponent } from '../student-add/student-add.component';

@Component({
  selector: 'app-sudent-table-administrator',
  templateUrl: './sudent-table-administrator.component.html',
  styleUrls: ['./sudent-table-administrator.component.css']
})
export class SudentTableAdministratorComponent implements  OnInit {
  displayedColumns: string[] = ['name', 'email', 'phone','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog:MatDialog,private adminservice:AdministratorServiceService,private ngconfirm:NgConfirmService){}

  ngOnInit(): void {
    this.getstudent()
  }

 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  openDialog(){
    this.dialog.open(StudentAddComponent,{
      width:'80%'
    }).afterClosed().subscribe((val)=>{
      if(val=="save"){
        this.getstudent()
      }
    })
  }

  getstudent(){
    this.adminservice.getstudent().subscribe((value)=>{
      console.log(value.getdata)
      
      this.dataSource=new MatTableDataSource(value.getdata)
      this.dataSource.paginator=this.paginator
      this.dataSource.sort=this.sort
    })
  }

  editvalue(row:any){
    console.log(row)
    this.dialog.open(StudentAddComponent,{
      width:'80%',
      data:row
    }).afterClosed().subscribe((val)=>{
      if(val=="updated"){
        this.getstudent()
      }
    })
  }

  deletevalue(row:any){
    this.ngconfirm.showConfirm('Do you want to delete',
      ()=>{
        this.adminservice.deleteteacher(row._id).subscribe(()=>{

          this.getstudent()
        })
      },
      ()=>{

      }
    )
    
  }
}
