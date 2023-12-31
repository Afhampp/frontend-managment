import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TeacherServiceService } from 'src/app/service/teacher-service.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-teacher-updateattendace',
  templateUrl: './teacher-updateattendace.component.html',
  styleUrls: ['./teacher-updateattendace.component.css'],
})
export class TeacherUpdateattendaceComponent implements OnInit {
  private TeacherUpdateAssigmentSubcription: Subscription | undefined;

  forms!: FormGroup;
  teacherid!: string;

  confirmwrong: boolean = false;

  constructor(
    private builder: FormBuilder,
    private teacherserivce: TeacherServiceService,
    private matdialogref: MatDialogRef<TeacherUpdateattendaceComponent>,
    @Inject(MAT_DIALOG_DATA) public id: any,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.formbuild();
    this.teacherserivce.getteacherid().subscribe((value) => {
      this.teacherid = value.teacherid;
    });
    this.forms.controls['status'].setValue(this.id.status);
  }

  formbuild(): void {
    this.forms = this.builder.group({
      status: ['', [Validators.required]],
    });
  }

  Onsubmit() {
    let value = {
      classid: this.id.classid,
      teacherid: this.teacherid,
      studentid: this.id.studentId,
      date: this.id.date,
      status: this.forms.value.status,
    };
    if (this.forms.valid) {
      this.TeacherUpdateAssigmentSubcription = this.teacherserivce
        .updateattendace(value)
        .subscribe({
          next: (value) => {
            if (value.status == 'success') {
              this.confirmwrong = false;
              this.matdialogref.close('save');
            }
          },
        });
    }
  }
  ngOnDestroy() {
    this.TeacherUpdateAssigmentSubcription?.unsubscribe();
  }
}
