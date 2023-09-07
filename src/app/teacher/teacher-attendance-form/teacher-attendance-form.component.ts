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
  selector: 'app-teacher-attendance-form',
  templateUrl: './teacher-attendance-form.component.html',
  styleUrls: ['./teacher-attendance-form.component.css'],
})
export class TeacherAttendanceFormComponent implements OnInit {
  private TeacherIdSubcription: Subscription | undefined;
  private TeacheAddrAssigmentSubcription: Subscription | undefined;

  forms!: FormGroup;
  teacherid!: string;

  confirmwrong: boolean = false;

  constructor(
    private builder: FormBuilder,
    private teacherserivce: TeacherServiceService,
    private matdialogref: MatDialogRef<TeacherAttendanceFormComponent>,
    @Inject(MAT_DIALOG_DATA) public id: any,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.formbuild();
    this.TeacherIdSubcription = this.teacherserivce
      .getteacherid()
      .subscribe((value) => {
        this.teacherid = value.teacherid;
      });
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
      studentid: this.id.student._id,
      status: this.forms.value.status,
    };
    if (this.forms.valid) {
      this.TeacheAddrAssigmentSubcription = this.teacherserivce
        .addattendace(value)
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
    this.TeacheAddrAssigmentSubcription?.unsubscribe();
    this.TeacherIdSubcription?.unsubscribe();
  }
}
