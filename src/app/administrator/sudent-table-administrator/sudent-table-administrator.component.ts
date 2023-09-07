import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AdministratorServiceService } from 'src/app/service/administrator-service.service';
import { NgConfirmService } from 'ng-confirm-box';
import { StudentAddComponent } from '../student-add/student-add.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sudent-table-administrator',
  templateUrl: './sudent-table-administrator.component.html',
  styleUrls: ['./sudent-table-administrator.component.css'],
})
export class SudentTableAdministratorComponent implements OnInit {
  private adminGetStudentSubscription: Subscription | undefined;
  private adminDelstudentSubscription: Subscription | undefined;
  displayedColumns: string[] = ['name', 'email', 'phone', 'action'];
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
    this.getstudent();
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
      .open(StudentAddComponent, {
        width: '37%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'save') {
          this.getstudent();
        }
      });
  }

  getstudent() {
    this.adminGetStudentSubscription = this.adminservice
      .getstudent()
      .subscribe({
        next: (value) => {
          this.dataSource = new MatTableDataSource(value.getdata);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (error) => {},
      });
  }

  editvalue<T>(row: T) {
    this.dialog
      .open(StudentAddComponent, {
        width: '38%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'updated') {
          this.getstudent();
        }
      });
  }

  deletevalue<T extends { _id: string }>(row: T) {
    this.ngconfirm.showConfirm(
      'Do you want to delete',
      () => {
        this.adminDelstudentSubscription = this.adminservice
          .deletestudent(row._id)
          .subscribe((value) => {
            if (value.status == 'failed') {
              alert('remove from class');
              this.getstudent();
            } else if (value.status == 'success') {
              this.getstudent();
            }
          });
      },
      () => {}
    );
  }
  ngOnDestroy() {
    this.adminDelstudentSubscription?.unsubscribe();
    this.adminGetStudentSubscription?.unsubscribe();
  }
}
