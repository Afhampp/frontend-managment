import { Component,ViewChild ,OnInit,ElementRef} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatDialog, } from '@angular/material/dialog';
import { NgConfirmService } from 'ng-confirm-box';
import { Router } from '@angular/router';
import { TeacherServiceService } from 'src/app/service/teacher-service.service';
import { saveAs } from 'file-saver';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { StudentServiceService } from 'src/app/service/student-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-student-note-module',
  templateUrl: './student-note-module.component.html',
  styleUrls: ['./student-note-module.component.css']
})
export class StudentNoteModuleComponent implements OnInit {
  displayedColumns: string[] = ['name', 'teacher','from',  'file'];
  dataSource!: MatTableDataSource<any>;
  studentid!:string

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog:MatDialog,private teacherservice:TeacherServiceService,private serivce:StudentServiceService,private ngconfirm:NgConfirmService,private route:Router,private http:HttpClient){
    // if(!sessionStorage.getItem('admin')){
    //   this.route.navigate(['/administrator'])
    // }
  }

  ngOnInit(): void {
    this.serivce.getstudentid().subscribe((value)=>{
      this.studentid=value.studentid
    })
    this.getteachervalue()
   
  }

 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  

  getteachervalue() {
    this.serivce.getnotes().subscribe({
      next: (value) => {
        console.log(value.getdata);
        console.log(this.studentid);
  
        // Map through the assignments to update the subfile based on student's submission
       
  
        this.dataSource = new MatTableDataSource(value.getdata);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
                sessionStorage.removeItem('student')
                this.route.navigate(['/'])
            }
          });
        }
    }
  });
  }

  
  downloadPDF(fileName: string) {
    this.teacherservice.getbaseurl(fileName, { responseType: 'blob' }).subscribe(
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


