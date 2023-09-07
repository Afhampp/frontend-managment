import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NgConfirmService } from 'ng-confirm-box';
import { Router } from '@angular/router';
import { TeacherAddAssignmnentComponent } from '../teacher-add-assignmnent/teacher-add-assignmnent.component';
import { TeacherServiceService } from 'src/app/service/teacher-service.service';
import { Subscription } from 'rxjs';
import { saveAs } from 'file-saver';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-teacher-assignmnent-upload',
  templateUrl: './teacher-assignmnent-upload.component.html',
  styleUrls: ['./teacher-assignmnent-upload.component.css'],
})
export class TeacherAssignmnentUploadComponent implements OnInit {
  private TeachershowAssigmentSubcription: Subscription | undefined;
  private TeacherDelAssigmentSubcription: Subscription | undefined;
  displayedColumns: string[] = [
    'name',
    'from',
    'to',
    'file',
    'sutudents',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private serivce: TeacherServiceService,
    private ngconfirm: NgConfirmService,
    private route: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.showassigment();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
    this.dialog
      .open(TeacherAddAssignmnentComponent, {
        width: '38%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'save') {
          this.showassigment();
        }
      });
  }

  showassigment() {
    this.TeachershowAssigmentSubcription = this.serivce
      .showassigment()
      .subscribe({
        next: (value) => {
          this.dataSource = new MatTableDataSource(value.getdata);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
      });
  }

  editvalue<T>(row: T) {
    this.dialog
      .open(TeacherAddAssignmnentComponent, {
        width: '38%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'updated') {
          this.showassigment();
        }
      });
  }

  deletevalue<T extends { _id: string }>(row: T) {
    this.ngconfirm.showConfirm(
      'Do you want to delete',
      () => {
        this.TeacherDelAssigmentSubcription = this.serivce
          .deleteassigment(row._id)
          .subscribe(() => {
            this.showassigment();
          });
      },
      () => {}
    );
  }
  downloadPDF(fileName: string) {
    this.serivce
      .getbaseurl(fileName, { responseType: 'blob' })
      .subscribe((response: Blob) => {
        // Save the file using FileSaver.js
        saveAs(response, fileName);
      });
  }
  navigate<T extends { _id: string }>(row: T) {
    this.route.navigate(['teacher/home/submittedassigment', row._id]);
  }

  ngOnDestroy() {
    this.TeacherDelAssigmentSubcription?.unsubscribe();
    this.TeachershowAssigmentSubcription?.unsubscribe();
  }
}
