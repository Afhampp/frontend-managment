import { Component,ViewChild ,OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatDialog, } from '@angular/material/dialog';

import { AdministratorServiceService } from 'src/app/service/administrator-service.service';
import { NgConfirmService } from 'ng-confirm-box';

import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-shedule-class',
  templateUrl: './teacher-shedule-class.component.html',
  styleUrls: ['./teacher-shedule-class.component.css']
})
export class TeacherSheduleClassComponent implements OnInit{

  displayedColumns: string[] = ['name', 'teacher'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog:MatDialog,private adminservice:AdministratorServiceService,private ngconfirm:NgConfirmService,private router:Router){
  
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
    this.adminservice.getclass().subscribe({
      next:(value)=>{
      this.dataSource=new MatTableDataSource(value.getdata)
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

  addteacher(row: any) {
    this.router.navigate(['/teacher/home/shedule',row._id]);
  }
  



  
}

