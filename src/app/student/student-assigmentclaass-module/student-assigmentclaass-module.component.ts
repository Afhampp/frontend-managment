import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NgConfirmService } from 'ng-confirm-box';
import { Router } from '@angular/router';
import { TeacherServiceService } from 'src/app/service/teacher-service.service';
import { saveAs } from 'file-saver';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StudentAddasignmentModuleComponent } from '../student-addasignment-module/student-addasignment-module.component';
import { StudentServiceService } from 'src/app/service/student-service.service';
import { Assignment } from '../StudentInterface/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student-assigmentclaass-module',
  templateUrl: './student-assigmentclaass-module.component.html',
  styleUrls: ['./student-assigmentclaass-module.component.css'],
})
export class StudentAssigmentclaassModuleComponent implements OnInit {
  private studentAssigmentSubcription: Subscription | undefined;
  private studentIdtSubcription: Subscription | undefined;

  displayedColumns: string[] = [
    'name',
    'teacher',
    'from',
    'to',
    'mark',
    'file',
    'subfile',
    'submittion',
  ];
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
    this.studentIdtSubcription = this.serivce
      .getstudentid()
      .subscribe((value) => {
        this.studentid = value.studentid;
      });
    this.getassigment();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog<T>(row: T) {
    this.dialog
      .open(StudentAddasignmentModuleComponent, {
        width: '36%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'save') {
          this.getassigment();
        }
      });
  }

  getassigment() {
    this.studentAssigmentSubcription = this.serivce.getassignemnt().subscribe({
      next: (value: { getdata: Assignment[] }) => {
        value.getdata.forEach((assignment) => {
          const submission = assignment.submittion.find(
            (sub) => sub.student === this.studentid
          );
          if (submission) {
            assignment.subfile = submission.file;
          }
        });

        this.dataSource = new MatTableDataSource(value.getdata);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
  }

  downloadPDF(fileName: string) {
    this.teacherservice
      .getbaseurl(fileName, { responseType: 'blob' })
      .subscribe(
        (response: Blob) => {
          saveAs(response, fileName);
        },
        (error) => {
          console.error('Error retrieving file:', error);
        }
      );
  }

  ngOnDestroy() {
    this.studentAssigmentSubcription?.unsubscribe();
    this.studentIdtSubcription?.unsubscribe();
  }
}
