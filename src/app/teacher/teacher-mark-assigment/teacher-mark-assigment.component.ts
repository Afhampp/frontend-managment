import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TeacherServiceService } from 'src/app/service/teacher-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-teacher-mark-assigment',
  templateUrl: './teacher-mark-assigment.component.html',
  styleUrls: ['./teacher-mark-assigment.component.css'],
})
export class TeacherMarkAssigmentComponent implements OnInit {
  private TeacherMarkSubcription: Subscription | undefined;

  forms!: FormGroup;

  confirmwrong: boolean = false;

  constructor(
    private builder: FormBuilder,
    private serivce: TeacherServiceService,
    private matdialogref: MatDialogRef<TeacherMarkAssigmentComponent>,
    @Inject(MAT_DIALOG_DATA) public editdata: any,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.formbuild();
    this.forms.controls['mark'].setValue(this.editdata.mark);
  }

  formbuild(): void {
    this.forms = this.builder.group({
      mark: ['', [Validators.required]],
    });
  }

  Onsubmit() {
    if (this.forms.valid) {
      let senddata = {
        mark: this.forms.value.mark,
        _id: this.editdata._id,
      };
      this.TeacherMarkSubcription = this.serivce
        .updatemark(senddata)
        .subscribe({
          next: (value) => {
            if (value.status == 'success') {
              this.matdialogref.close('save');
            }
          },
        });
    }
  }
  ngOnDestroy() {
    this.TeacherMarkSubcription?.unsubscribe();
  }
}
