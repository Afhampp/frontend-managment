import { Component,ViewChild ,OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatDialog, } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { AdministratorServiceService } from 'src/app/service/administrator-service.service';
import { NgConfirmService } from 'ng-confirm-box';
import { ClassAddAdministratorComponent } from '../class-add-administrator/class-add-administrator.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrator-class',
  templateUrl: './administrator-class.component.html',
  styleUrls: ['./administrator-class.component.css']
})
export class AdministratorClassComponent implements OnInit{

  displayedColumns: string[] = ['name', 'teacher', 'students','schedule','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog:MatDialog,private adminservice:AdministratorServiceService,private ngconfirm:NgConfirmService,private router:Router){
    if(!sessionStorage.getItem('admin')){
      this.router.navigate(['/administrator'])
    }
  }

  ngOnInit(): void {
    this.getclass()
  }

 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  openDialog(){
    this.dialog.open(ClassAddAdministratorComponent,{
      width:'36%'
    }).afterClosed().subscribe((val)=>{
      if(val=="save"){
        this.getclass()
      }
    })
  }

  getclass(){
    this.adminservice.getclass().subscribe({
      next:(value)=>{
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
              this.router.navigate(['/admin'])
          }
        });
      }
  }
})
  }

  addteacher(row: any) {
    this.router.navigate(['/administrator/adminhome/adminclassview',row._id]);
  }
  addstudent(row: any) {
    this.router.navigate(['/administrator/adminhome/adminclassaddstudent',row._id]);
  }
  addschedule(row:any){
    this.router.navigate(['/administrator/adminhome/adminclassaddschedule',row._id])
  }

  editvalue(row:any){
    this.dialog.open(ClassAddAdministratorComponent,{
      width:'80%',
      data:row
    }).afterClosed().subscribe((val)=>{
      if(val=="updated"){
        this.getclass()
      }
    })
  }

  deletevalue(row:any){
    this.ngconfirm.showConfirm('Do you want to delete',
      ()=>{
        this.adminservice.deleteclass(row._id).subscribe(()=>{

          this.getclass()
        })
      },
      ()=>{

      }
    )
    
  }
}


