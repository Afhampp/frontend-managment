import { Component,ViewChild ,OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatDialog, } from '@angular/material/dialog';
import { NgConfirmService } from 'ng-confirm-box';
import { ActivatedRoute, Router } from '@angular/router';

import { StudentServiceService } from 'src/app/service/student-service.service';

@Component({
  selector: 'app-student-attendace',
  templateUrl: './student-attendace.component.html',
  styleUrls: ['./student-attendace.component.css']
})
export class StudentAttendaceComponent implements OnInit {

  studentid!:string
  displayedColumns: string[] = ['name', 'subject','present', 'absent'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog:MatDialog,private studentservice:StudentServiceService,private ngconfirm:NgConfirmService,private route:Router) {}

  ngOnInit(): void {
    
   
    this.getattendancedata()
  }


  // openDialog(row:any){
  // row.classid=this.rowDataid
  //   this.dialog.open(TeacherAttendanceFormComponent,{
  //     width:'80%',
  //     data:row
  //   }).afterClosed().subscribe((val)=>{
  //     if(val=="save"){
  //       this.getattendancedata()
  //     }
  //   })
  // }
  

  back(){
    this.route.navigate(['/teacher/home/attendacesubmittion'])
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getattendancedata(){
     this.studentservice.getattendacedata() .subscribe((value)=>{
     
      this.dataSource=new MatTableDataSource(value.teacherAttendanceArray)
      this.dataSource.paginator=this.paginator
      this.dataSource.sort=this.sort
    })
  }
 viewdata(row:any){
  this.route.navigate(['/teacher/home/attedancedate'],{state:{rowData:row}})
 }



 
}

