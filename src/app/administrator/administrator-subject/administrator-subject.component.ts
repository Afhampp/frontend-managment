import { Component,ViewChild ,OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatDialog,MatDialogRef } from '@angular/material/dialog';
import { AdministratorServiceService } from 'src/app/service/administrator-service.service';
import { NgConfirmService } from 'ng-confirm-box';
import { SubjectaddEditAdministratorComponent } from '../subjectadd-edit-administrator/subjectadd-edit-administrator.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrator-subject',
  templateUrl: './administrator-subject.component.html',
  styleUrls: ['./administrator-subject.component.css']
})
export class AdministratorSubjectComponent implements OnInit {
  displayedColumns: string[] = [ 'subject','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog:MatDialog,private adminservice:AdministratorServiceService,private ngconfirm:NgConfirmService,private route:Router){
    if(!sessionStorage.getItem('admin')){
      this.route.navigate(['/administrator'])
    }
  }

  ngOnInit(): void {
    this.getsubjectdata()
    
  }
 

 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  openDialog(){
  
    this.dialog.open(SubjectaddEditAdministratorComponent,{
      width:'30%'
    }).afterClosed().subscribe((val)=>{
      if(val=="add"){
        this.getsubjectdata()
      }
        
    })
  }

  getsubjectdata(){
    this.adminservice.getsubject().subscribe({
      next:(value)=>{
      console.log(value)
      this.dataSource=new MatTableDataSource(value.getdata)
      this.dataSource.paginator=this.paginator
      this.dataSource.sort=this.sort
    },
    error:(error)=>{
   
      if (error.error.message === 'session has expired') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Your session has expired. You will be redirected to the login page.',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        }).then((result) => {
        
          if (result.isConfirmed) {
              sessionStorage.removeItem('admin')
              this.route.navigate(['/admin'])
          }
        });
      }
  }
})
  }

  editvalue(row:any){
    this.dialog.open(SubjectaddEditAdministratorComponent,{
      width:'80%',
      data:row
    }).afterClosed().subscribe((val)=>{
      if(val=="updated"){
        this.getsubjectdata()
      }
    })
  }

  deletevalue(row:any){
    this.ngconfirm.showConfirm('Do you want to delete',
      ()=>{
        this.adminservice.deletesubject(row._id).subscribe(()=>{

          this.getsubjectdata()
        })
      },
      ()=>{

      }
    )
    
  }

 
}

