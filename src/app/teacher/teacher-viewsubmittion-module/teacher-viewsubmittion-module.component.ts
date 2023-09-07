import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { saveAs } from 'file-saver';
import { NgConfirmService } from 'ng-confirm-box';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherServiceService } from 'src/app/service/teacher-service.service';
import { TeacherMarkAssigmentComponent } from '../teacher-mark-assigment/teacher-mark-assigment.component';
import { Subscription } from 'rxjs';
import { RowData } from '../interface/interface_teacher';

@Component({
  selector: 'app-teacher-viewsubmittion-module',
  templateUrl: './teacher-viewsubmittion-module.component.html',
  styleUrls: ['./teacher-viewsubmittion-module.component.css'],
})
export class TeacherViewsubmittionModuleComponent implements OnInit {
  private TeacherAssigmentSubcription: Subscription | undefined;

  rowDataid: string | null = null;
  addteacher!: boolean;
  displayedColumns: string[] = ['name', 'date', 'file', 'mark', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private activeroute: ActivatedRoute,
    private dialog: MatDialog,
    private serivce: TeacherServiceService,
    private ngconfirm: NgConfirmService,
    private route: Router
  ) {}

  ngOnInit(): void {
    const id = this.activeroute.snapshot.paramMap.get('id');
    this.rowDataid = id;
    this.getassigment();
  }

  opendialog<T extends RowData>(row: T) {
    if (this.rowDataid !== null) {
      row.classid = this.rowDataid;
      this.dialog
        .open(TeacherMarkAssigmentComponent, {
          width: '37%',
          data: row,
        })
        .afterClosed()
        .subscribe((val) => {
          if (val == 'save') {
            this.getassigment();
          }
        });
    }
  }

  back() {
    this.route.navigate(['/teacher/home/teachetassigment']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getassigment() {
    if (this.rowDataid !== null) {
      this.TeacherAssigmentSubcription = this.serivce
        .getassigmentsubmitted(this.rowDataid)
        .subscribe({
          next: (value) => {
            this.dataSource = new MatTableDataSource(value.submittionWithName);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          },
        });
    }
  }

  downloadPDF(fileName: string) {
    this.serivce.getbaseurl(fileName, { responseType: 'blob' }).subscribe(
      (response: Blob) => {
        saveAs(response, fileName);
      },
      (error) => {
        console.error('Error retrieving file:', error);
      }
    );
  }
  ngOnDestroy() {
    this.TeacherAssigmentSubcription?.unsubscribe();
  }
}
