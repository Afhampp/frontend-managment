import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NgConfirmService } from 'ng-confirm-box';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherServiceService } from 'src/app/service/teacher-service.service';
import { TeacherUpdateattendaceComponent } from '../teacher-updateattendace/teacher-updateattendace.component';
import { Subscription } from 'rxjs';
import { RowData } from '../interface/interface_teacher';
@Component({
  selector: 'app-teacher-viewattendacedate',
  templateUrl: './teacher-viewattendacedate.component.html',
  styleUrls: ['./teacher-viewattendacedate.component.css'],
})
export class TeacherViewattendacedateComponent implements OnInit {
  private TeacherIdSubcription: Subscription | undefined;
  private TeacherAttendacetSubcription: Subscription | undefined;

  rowDataid: string | null = null;
  addteacher!: boolean;
  teacherid!: string;
  rowData: any;
  displayedColumns: string[] = ['date', 'attendace', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private activeroute: ActivatedRoute,
    private dialog: MatDialog,
    private teacherservice: TeacherServiceService,
    private ngconfirm: NgConfirmService,
    private route: Router
  ) {}

  ngOnInit(): void {
    const id = this.activeroute.snapshot.paramMap.get('id');
    this.rowDataid = id;
    const state = history.state;
    if (state && state.rowData) {
      this.rowData = state.rowData;
    }
    this.TeacherIdSubcription = this.teacherservice
      .getteacherid()
      .subscribe((value) => {
        this.teacherid = value.teacherid;
      });
    this.getattendancedata();
  }

  openDialog<T extends RowData>(row: T) {
    if (this.rowDataid !== null) {
      row.classid = this.rowDataid;
      row.studentId = this.rowData.student._id;
      this.dialog
        .open(TeacherUpdateattendaceComponent, {
          width: '37%',
          data: row,
        })
        .afterClosed()
        .subscribe((val) => {
          if (val == 'save') {
            this.getattendancedata();
          }
        });
    }
  }

  back() {
    this.route.navigate(['/teacher/home/attendacesubmittion']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getattendancedata() {
    if (this.rowDataid !== null) {
      this.TeacherAttendacetSubcription = this.teacherservice
        .getattendace(this.rowDataid, this.rowData.student._id)
        .subscribe({
          next: (value) => {
            this.dataSource = new MatTableDataSource(value);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          },
        });
    }
  }
  ngOnDestroy() {
    this.TeacherAttendacetSubcription?.unsubscribe();
    this.TeacherIdSubcription?.unsubscribe();
  }
}
