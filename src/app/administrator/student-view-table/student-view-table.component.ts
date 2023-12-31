import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AdministratorServiceService } from 'src/app/service/administrator-service.service';
import { NgConfirmService } from 'ng-confirm-box';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentAddTableComponent } from '../student-add-table/student-add-table.component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-student-view-table',
  templateUrl: './student-view-table.component.html',
  styleUrls: ['./student-view-table.component.css'],
})
export class StudentViewTableComponent implements OnInit {
  private adminClassidSubscription: Subscription | undefined;
  private adminRemoveSyuSubscription: Subscription | undefined;
  rowDataid: string | null = null;
  addteacher!: boolean;
  displayedColumns: string[] = ['name', 'email', 'phone', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private activeroute: ActivatedRoute,
    private dialog: MatDialog,
    private adminservice: AdministratorServiceService,
    private ngconfirm: NgConfirmService,
    private route: Router
  ) {}

  ngOnInit(): void {
    const id = this.activeroute.snapshot.paramMap.get('id');
    this.rowDataid = id;
    this.getteachervalue();
  }

  openDialog() {
    this.dialog
      .open(StudentAddTableComponent, {
        width: '36%',
        data: this.rowDataid,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'save') {
          this.getteachervalue();
        }
      });
  }

  back() {
    this.route.navigate(['/administrator/adminhome/adminclass']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getteachervalue() {
    this.adminClassidSubscription = this.adminservice
      .getclassstudentid(this.rowDataid)
      .subscribe({
        next: (value) => {
          this.dataSource = new MatTableDataSource(value.studentData);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
      });
  }

  deletevalue(row: any) {
    this.ngconfirm.showConfirm(
      'Do you want to delete',
      () => {
        this.adminRemoveSyuSubscription = this.adminservice
          .removestudent(row, this.rowDataid)
          .subscribe(() => {
            this.getteachervalue();
          });
      },
      () => {}
    );
  }
  ngOnDestroy() {
    this.adminClassidSubscription?.unsubscribe();
    this.adminRemoveSyuSubscription?.unsubscribe();
  }
}
