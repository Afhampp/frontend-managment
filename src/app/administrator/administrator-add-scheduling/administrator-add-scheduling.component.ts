import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdministratorServiceService } from 'src/app/service/administrator-service.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-administrator-add-scheduling',
  templateUrl: './administrator-add-scheduling.component.html',
  styleUrls: ['./administrator-add-scheduling.component.css'],
})
export class AdministratorAddSchedulingComponent implements OnInit {
  private adminadscheduleSubscription: Subscription | undefined;
  private adminsubjectSubcription: Subscription | undefined;
  forms!: FormGroup;

  confirmwrong: boolean = false;
  heading!: string;

  teacherlist: { subject: string; _id: string }[] = [];

  constructor(
    private builder: FormBuilder,
    private serivce: AdministratorServiceService,
    private matdialogref: MatDialogRef<AdministratorAddSchedulingComponent>,
    @Inject(MAT_DIALOG_DATA) public editdata: any,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getsubjectdata();
    this.formbuild();

    this.heading = this.editdata.day;
    if (this.editdata) {
      const slotsArray = this.editdata.slots;

      const slot9to11 = slotsArray.find(
        (slot: any) => slot.time === '9:00-11:00'
      );
      this.forms.controls['9:00-11:00'].setValue(slot9to11?.file || '');

      const slot11to1 = slotsArray.find(
        (slot: any) => slot.time === '11:30-1:30'
      );
      this.forms.controls['11:30-1:30'].setValue(slot11to1?.file || '');

      const slot2to4 = slotsArray.find(
        (slot: any) => slot.time === '2:30-4:00'
      );
      this.forms.controls['2:30-4:00'].setValue(slot2to4?.file || '');

      const slot4to6 = slotsArray.find(
        (slot: any) => slot.time === '4:00-6:00'
      );
      this.forms.controls['4:00-6:00'].setValue(slot4to6?.file || '');
    }
  }

  formbuild(): void {
    this.forms = this.builder.group({
      '9:00-11:00': ['', [Validators.required]],
      '11:30-1:30': ['', [Validators.required]],
      '2:30-4:00': ['', [Validators.required]],
      '4:00-6:00': ['', [Validators.required]],
    });
  }

  getsubjectdata() {
    this.adminsubjectSubcription = this.serivce
      .getsubject()
      .subscribe((value) => {
        this.teacherlist = value.getdata;
      });
  }

  Onsubmit() {
    if (this.forms.valid) {
      let formdata = {
        day: this.editdata.day,
        ...this.forms.value,
      };
      this.adminadscheduleSubscription = this.serivce
        .updateshedule(formdata, this.editdata.rowdataid)
        .subscribe((value) => {
          if (value.status == 'success') {
            this.matdialogref.close('updated');
          }
        });
    }
  }

  ngOnDestroy() {
    this.adminadscheduleSubscription?.unsubscribe();
    this.adminsubjectSubcription?.unsubscribe();
  }
}
