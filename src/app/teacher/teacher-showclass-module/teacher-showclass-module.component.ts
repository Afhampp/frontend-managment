import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NgConfirmService } from 'ng-confirm-box';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherServiceService } from 'src/app/service/teacher-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-teacher-showclass-module',
  templateUrl: './teacher-showclass-module.component.html',
  styleUrls: ['./teacher-showclass-module.component.css'],
})
export class TeacherShowclassModuleComponent implements OnInit {
  private TeacherGetStudentSubcription: Subscription | undefined;
  rowDataid: string | null = null;
  addteacher!: boolean;
  displayedColumns: string[] = ['slNo', 'name', 'email', 'phone'];
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
    this.getstudent();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getstudent() {
    if (this.rowDataid !== null) {
      this.TeacherGetStudentSubcription = this.teacherservice
        .getstudentfromclass(this.rowDataid)
        .subscribe({
          next: (value) => {
            this.dataSource = new MatTableDataSource(value.studentData);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          },
        });
    }
  }
  ngOnDestroy() {
    this.TeacherGetStudentSubcription?.unsubscribe();
  }
}
