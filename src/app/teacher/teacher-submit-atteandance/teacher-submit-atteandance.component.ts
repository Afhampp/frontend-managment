import { Component,ViewChild ,OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatDialog, } from '@angular/material/dialog';
import { NgConfirmService } from 'ng-confirm-box';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherAttendanceFormComponent } from '../teacher-attendance-form/teacher-attendance-form.component';
import { TeacherServiceService } from 'src/app/service/teacher-service.service';


@Component({
  selector: 'app-teacher-submit-atteandance',
  templateUrl: './teacher-submit-atteandance.component.html',
  styleUrls: ['./teacher-submit-atteandance.component.css']
})
export class TeacherSubmitAtteandanceComponent implements OnInit {

  rowDataid: string | null = null;
  addteacher!:boolean
  teacherid!:string
  displayedColumns: string[] = ['name', 'present', 'absent', 'view','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private activeroute: ActivatedRoute,private dialog:MatDialog,private teacherservice:TeacherServiceService,private ngconfirm:NgConfirmService,private route:Router) {}

  ngOnInit(): void {
    const id = this.activeroute.snapshot.paramMap.get('id');
    this.rowDataid = id;
    this.teacherservice.getteacherid().subscribe((value)=>{
      this.teacherid=value.teacherid
    })
    this.getattendancedata()
  }


  openDialog(row:any){
  row.classid=this.rowDataid
    this.dialog.open(TeacherAttendanceFormComponent,{
      width:'80%',
      data:row
    }).afterClosed().subscribe((val)=>{
      if(val=="save"){
        this.getattendancedata()
      }
    })
  }
  

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
     this.teacherservice.getattendacedata(this.rowDataid) .subscribe((value)=>{
      console.log(value.studentsWithStatusCount)
      this.dataSource=new MatTableDataSource(value.studentsWithStatusCount)
      this.dataSource.paginator=this.paginator
      this.dataSource.sort=this.sort
    })
  }
 viewdata(row:any){
  this.route.navigate(['/teacher/home/attedancedate',this.rowDataid],{state:{rowData:row}})
 }



 
}

