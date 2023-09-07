import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AdministratorServiceService } from 'src/app/service/administrator-service.service';
import { NgConfirmService } from 'ng-confirm-box';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentServiceService } from 'src/app/service/student-service.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-student-shedule-module',
  templateUrl: './student-shedule-module.component.html',
  styleUrls: ['./student-shedule-module.component.css'],
})
export class StudentSheduleModuleComponent implements OnInit {
  private studentgetclassSubcription: Subscription | undefined;

  private studentgetscheduleSubcription: Subscription | undefined;

  rowDataid: string | null = null;
  addteacher!: boolean;
  displayedColumns: string[] = [
    'day',
    '9-11',
    '11:30-1:30',
    '2:30-4:00',
    '4:00-6:00',
  ];
  dataSource!: MatTableDataSource<any>;

  constructor(
    private dialog: MatDialog,
    private adminservice: AdministratorServiceService,
    private studentservice: StudentServiceService,
    private ngconfirm: NgConfirmService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.studentgetclassSubcription = this.studentservice
      .getclass()
      .subscribe((value) => {
        this.rowDataid = value.classid;
        this.getschedule();
      });
  }

  getschedule() {
    if (this.rowDataid !== null) {
      this.studentgetscheduleSubcription = this.adminservice
        .getclassschedule(this.rowDataid)
        .subscribe({
          next: (value) => {

            const flattenedData: any[] = value.getdata.reduce(
              (acc: any[], curr: any[]) => {
                return acc.concat(curr);
              },
              []
            );

            this.dataSource = new MatTableDataSource(flattenedData);
          },
        });
    }
  }
  ngOnDestroy() {
    this.studentgetclassSubcription?.unsubscribe();
    this.studentgetscheduleSubcription?.unsubscribe();
  }
}
