import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NgConfirmService } from 'ng-confirm-box';
import { ActivatedRoute, Router } from '@angular/router';

import { StudentServiceService } from 'src/app/service/student-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student-attendace',
  templateUrl: './student-attendace.component.html',
  styleUrls: ['./student-attendace.component.css'],
})
export class StudentAttendaceComponent implements OnInit {
  private studentAttendaceSubcription: Subscription | undefined;

  studentid!: string;
  displayedColumns: string[] = ['name', 'subject', 'present', 'absent'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private studentservice: StudentServiceService,
    private ngconfirm: NgConfirmService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getattendancedata();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getattendancedata() {
    this.studentAttendaceSubcription = this.studentservice
      .getattendacedata()
      .subscribe((value) => {
        this.dataSource = new MatTableDataSource(value.teacherAttendanceArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
  viewdata<T>(row: T) {
    this.route.navigate(['/teacher/home/attedancedate'], {
      state: { rowData: row },
    });
  }

  ngOnDestroy() {
    this.studentAttendaceSubcription?.unsubscribe();
  }
}
