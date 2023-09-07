import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NgConfirmService } from 'ng-confirm-box';
import { Router } from '@angular/router';
import { TeacherServiceService } from 'src/app/service/teacher-service.service';

import { saveAs } from 'file-saver';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TeatcheAddRnoteModuleComponent } from '../teatche-add-rnote-module/teatche-add-rnote-module.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-teatchernote-module',
  templateUrl: './teatchernote-module.component.html',
  styleUrls: ['./teatchernote-module.component.css'],
})
export class TeatchernoteModuleComponent implements OnInit {
  private TeacherNotesSubcription: Subscription | undefined;
  private TeacherelnotesSubcription: Subscription | undefined;
  displayedColumns: string[] = ['name', 'from', 'file', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private serivce: TeacherServiceService,
    private ngconfirm: NgConfirmService,
    private route: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.shownotes();
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
      .open(TeatcheAddRnoteModuleComponent, {
        width: '37%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'save') {
          this.shownotes();
        }
      });
  }

  shownotes() {
    this.TeacherNotesSubcription = this.serivce.shownotes().subscribe({
      next: (value) => {
        this.dataSource = new MatTableDataSource(value.getdata);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
  }

  editvalue<T>(row: T) {
    this.dialog
      .open(TeatcheAddRnoteModuleComponent, {
        width: '38%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'updated') {
          this.shownotes();
        }
      });
  }

  deletevalue<T extends { _id: string }>(row: T) {
    this.ngconfirm.showConfirm(
      'Do you want to delete',
      () => {
        this.TeacherelnotesSubcription = this.serivce
          .deletenotes(row._id)
          .subscribe(() => {
            this.shownotes();
          });
      },
      () => {}
    );
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
    this.TeacherNotesSubcription?.unsubscribe();
    this.TeacherelnotesSubcription?.unsubscribe();
  }
}
