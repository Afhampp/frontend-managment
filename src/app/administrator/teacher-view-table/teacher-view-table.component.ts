import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AdministratorServiceService } from 'src/app/service/administrator-service.service';
import { NgConfirmService } from 'ng-confirm-box';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherAddTableComponent } from '../teacher-add-table/teacher-add-table.component';
import { teacheraddclass } from '../interface/logininterface';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-teacher-view-table',
  templateUrl: './teacher-view-table.component.html',
  styleUrls: ['./teacher-view-table.component.css'],
})
export class TeacherViewTableComponent implements OnInit {
  private adminGetClassIdSubscription: Subscription | undefined;
  private adminDelTeacherSubscription: Subscription | undefined;
  rowDataid: string | null = null;
  addteacher!: boolean;
  displayedColumns: string[] = ['name', 'email', 'phone', 'subjects', 'action'];
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
      .open(TeacherAddTableComponent, {
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
    if (this.rowDataid !== null) {
      this.adminGetClassIdSubscription = this.adminservice
        .getclassid(this.rowDataid)
        .subscribe((value) => {
          this.dataSource = new MatTableDataSource(value.teacherData);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
    }
  }

  deletevalue(row: teacheraddclass) {
    this.ngconfirm.showConfirm(
      'Do you want to delete',
      () => {
        if (this.rowDataid !== null) {
          this.adminDelTeacherSubscription = this.adminservice
            .deleteteacherfromclass(row, this.rowDataid)
            .subscribe({
              next: () => {
                this.getteachervalue();
              },
            });
        }
      },
      () => {}
    );
  }
  ngOnDestroy() {
    this.adminDelTeacherSubscription?.unsubscribe();
    this.adminGetClassIdSubscription?.unsubscribe();
  }
}
