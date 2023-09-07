import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AdministratorServiceService } from 'src/app/service/administrator-service.service';
import { NgConfirmService } from 'ng-confirm-box';
import { ClassAddAdministratorComponent } from '../class-add-administrator/class-add-administrator.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-administrator-class',
  templateUrl: './administrator-class.component.html',
  styleUrls: ['./administrator-class.component.css'],
})
export class AdministratorClassComponent implements OnInit {
  private admingetclassSubscription: Subscription | undefined;
  private admindeleteclassSubscription: Subscription | undefined;
  displayedColumns: string[] = [
    'name',
    'teacher',
    'students',
    'schedule',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private adminservice: AdministratorServiceService,
    private ngconfirm: NgConfirmService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getclass();
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
      .open(ClassAddAdministratorComponent, {
        width: '36%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'save') {
          this.getclass();
        }
      });
  }

  getclass() {
    this.admingetclassSubscription = this.adminservice.getclass().subscribe({
      next: (value) => {
        this.dataSource = new MatTableDataSource(value.getdata);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
  }
  addteacher<T extends { _id: string }>(row: T) {
    this.router.navigate(['/administrator/adminhome/adminclassview', row._id]);
  }

  addstudent<T extends { _id: string }>(row: T) {
    this.router.navigate([
      '/administrator/adminhome/adminclassaddstudent',
      row._id,
    ]);
  }

  addschedule<T extends { _id: string }>(row: T) {
    this.router.navigate([
      '/administrator/adminhome/adminclassaddschedule',
      row._id,
    ]);
  }

  editvalue<T>(row: T) {
    this.dialog
      .open(ClassAddAdministratorComponent, {
        width: '37%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'updated') {
          this.getclass();
        }
      });
  }

  deletevalue<T extends { _id: string }>(row: T) {
    this.ngconfirm.showConfirm(
      'Do you want to delete',
      () => {
        this.admindeleteclassSubscription = this.adminservice
          .deleteclass(row._id)
          .subscribe(() => {
            this.getclass();
          });
      },
      () => {}
    );
  }
  ngOnDestroy() {
    this.admingetclassSubscription?.unsubscribe();
    this.admindeleteclassSubscription?.unsubscribe();
  }
}
