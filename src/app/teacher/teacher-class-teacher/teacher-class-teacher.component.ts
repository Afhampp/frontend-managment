import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NgConfirmService } from 'ng-confirm-box';
import { Router } from '@angular/router';
import { TeacherServiceService } from 'src/app/service/teacher-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-teacher-class-teacher',
  templateUrl: './teacher-class-teacher.component.html',
  styleUrls: ['./teacher-class-teacher.component.css'],
})
export class TeacherClassTeacherComponent implements OnInit {
  private TeacherClassSubcription: Subscription | undefined;

  displayedColumns: string[] = ['name', 'students'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private teacherservice: TeacherServiceService,
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

  getclass() {
    this.TeacherClassSubcription = this.teacherservice.getclasses().subscribe({
      next: (value) => {
        this.dataSource = new MatTableDataSource(value.clasvalue);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
  }

  viewstudent<T extends { _id: string }>(row: T) {
    this.router.navigate(['/teacher/home/showclass', row._id]);
  }
  ngOnDestroy() {
    this.TeacherClassSubcription?.unsubscribe();
  }
}
