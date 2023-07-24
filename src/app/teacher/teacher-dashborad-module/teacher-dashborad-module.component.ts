import { Component,ViewChild ,OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatDialog, } from '@angular/material/dialog';
import { NgConfirmService } from 'ng-confirm-box';
import { Router } from '@angular/router';
import { TeacherServiceService } from 'src/app/service/teacher-service.service';
import { TeacherViewstudentModuleComponent } from '../teacher-viewstudent-module/teacher-viewstudent-module.component';
@Component({
  selector: 'app-teacher-dashborad-module',
  templateUrl: './teacher-dashborad-module.component.html',
  styleUrls: ['./teacher-dashborad-module.component.css']
})
export class TeacherDashboradModuleComponent implements OnInit{

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
    error:(value)=>{
      if(value.message=='session has expired'){
        sessionStorage.removeItem('teacher')
        this.router.navigate(['/teacher'])
      }

    }})
  }

  viewstudent(row: any) {
    this.router.navigate(['/teacher/home/showclass',row._id]);
  }


}
