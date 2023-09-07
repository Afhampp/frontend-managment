import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NgConfirmService } from 'ng-confirm-box';
import { Router } from '@angular/router';
import { TeacherServiceService } from 'src/app/service/teacher-service.service';
import { saveAs } from 'file-saver';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StudentServiceService } from 'src/app/service/student-service.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-student-note-module',
  templateUrl: './student-note-module.component.html',
  styleUrls: ['./student-note-module.component.css'],
})
export class StudentNoteModuleComponent implements OnInit {
  private studentGetNoteSubcription: Subscription | undefined;
  private studentIdSubcription: Subscription | undefined;

  displayedColumns: string[] = ['name', 'teacher', 'from', 'file'];
  dataSource!: MatTableDataSource<any>;
  studentid!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private teacherservice: TeacherServiceService,
    private serivce: StudentServiceService,
    private ngconfirm: NgConfirmService,
    private route: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.studentIdSubcription = this.serivce
      .getstudentid()
      .subscribe((value) => {
        this.studentid = value.studentid;
      });
    this.getnotes();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getnotes() {
    this.studentGetNoteSubcription = this.serivce.getnotes().subscribe({
      next: (value) => {
        this.dataSource = new MatTableDataSource(value.getdata);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
  }

  downloadPDF(fileName: string) {
    this.teacherservice
      .getbaseurl(fileName, { responseType: 'blob' })
      .subscribe((response: Blob) => {
        saveAs(response, fileName);
      });
  }

  ngOnDestroy() {
    this.studentGetNoteSubcription?.unsubscribe();
    this.studentIdSubcription?.unsubscribe();
  }
}
