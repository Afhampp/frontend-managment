import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { AdministratorServiceService } from 'src/app/service/administrator-service.service';
import { NgConfirmService } from 'ng-confirm-box';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-administrator-teacher',
  templateUrl: './administrator-teacher.component.html',
  styleUrls: ['./administrator-teacher.component.css'],
})
export class AdministratorTeacherComponent implements OnInit {
  private adminGetTeacherSubscription: Subscription | undefined;
  private adminDelTeacherSubscription: Subscription | undefined;
  displayedColumns: string[] = ['name', 'email', 'phone', 'subjects', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private adminservice: AdministratorServiceService,
    private ngconfirm: NgConfirmService,
    private route: Router
  ) {
  
  }

  ngOnInit(): void {
    this.getteachervalue();
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
      .open(SignupComponent, {
        width: '37%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'save') {
          this.getteachervalue();
        }
      });
  }

  getteachervalue() {
    this.adminGetTeacherSubscription = this.adminservice
      .getteacher()
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
      .open(SignupComponent, {
        width: '37%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'updated') {
          this.getteachervalue();
        }
      });
  }

  deletevalue<T extends { _id: string }>(row: T) {
    this.ngconfirm.showConfirm(
      'Do you want to delete',
      () => {
        this.adminDelTeacherSubscription = this.adminservice
          .deleteteacher(row._id)
          .subscribe(() => {
            this.getteachervalue();
          });
      },
      () => {}
    );
  }

  ngOnDestroy() {
    this.adminDelTeacherSubscription?.unsubscribe();
    this.adminGetTeacherSubscription?.unsubscribe();
  }
}
