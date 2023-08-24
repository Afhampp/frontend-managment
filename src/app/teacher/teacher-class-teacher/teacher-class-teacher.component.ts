import { Component,ViewChild ,OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatDialog, } from '@angular/material/dialog';
import { NgConfirmService } from 'ng-confirm-box';
import { Router } from '@angular/router';
import { TeacherServiceService } from 'src/app/service/teacher-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teacher-class-teacher',
  templateUrl: './teacher-class-teacher.component.html',
  styleUrls: ['./teacher-class-teacher.component.css']
})
export class TeacherClassTeacherComponent implements OnInit{

  displayedColumns: string[] = ['name', 'students'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog:MatDialog,private teacherservice:TeacherServiceService,private ngconfirm:NgConfirmService,private router:Router){
    if(!sessionStorage.getItem('teacher')){
      this.router.navigate(['/teacher'])
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


  getclass(){
    this.teacherservice.getclasses().subscribe({
      next:(value)=>{
      this.dataSource=new MatTableDataSource(value.clasvalue)
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
              sessionStorage.removeItem('teacher')
              this.router.navigate(['/teacher'])
          }
        });
      }
  }
})
  }

  viewstudent(row: any) {
    this.router.navigate(['/teacher/home/showclass',row._id]);
  }


}

