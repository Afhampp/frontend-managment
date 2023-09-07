import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdministratorServiceService } from 'src/app/service/administrator-service.service';
import { NgConfirmService } from 'ng-confirm-box';
import { SubjectaddEditAdministratorComponent } from '../subjectadd-edit-administrator/subjectadd-edit-administrator.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-administrator-subject',
  templateUrl: './administrator-subject.component.html',
  styleUrls: ['./administrator-subject.component.css'],
})
export class AdministratorSubjectComponent implements OnInit {
  private adminGetSubjectSubscription: Subscription | undefined;
  private adminDetScheduleSubscription: Subscription | undefined;
  displayedColumns: string[] = ['subject', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private adminservice: AdministratorServiceService,
    private ngconfirm: NgConfirmService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getsubjectdata();
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
      .open(SubjectaddEditAdministratorComponent, {
        width: '36%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'add') {
          this.getsubjectdata();
        }
      });
  }

  getsubjectdata() {
    this.adminGetSubjectSubscription = this.adminservice
      .getsubject()
      .subscribe({
        next: (value) => {
          console.log(value);
          this.dataSource = new MatTableDataSource(value.getdata);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (error) => {},
      });
  }

  editvalue<T>(row: T) {
    this.dialog
      .open(SubjectaddEditAdministratorComponent, {
        width: '37%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'updated') {
          this.getsubjectdata();
        }
      });
  }

  deletevalue<T extends { _id: string }>(row: T) {
    this.ngconfirm.showConfirm(
      'Do you want to delete',
      () => {
        this.adminDetScheduleSubscription = this.adminservice
          .deletesubject(row._id)
          .subscribe(() => {
            this.getsubjectdata();
          });
      },
      () => {}
    );
  }

  ngOnDestroy() {
    this.adminDetScheduleSubscription?.unsubscribe();
    this.adminGetSubjectSubscription?.unsubscribe();
  }
}
