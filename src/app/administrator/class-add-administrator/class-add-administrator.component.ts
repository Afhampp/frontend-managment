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
  selector: 'app-class-add-administrator',
  templateUrl: './class-add-administrator.component.html',
  styleUrls: ['./class-add-administrator.component.css'],
})
export class ClassAddAdministratorComponent implements OnInit {
  private adminAddClassSubscription: Subscription | undefined;
  private adminUpdateclassSubscription: Subscription | undefined;

  forms!: FormGroup;
  eyeicon: string = 'fa-eye-slash';
  type: string = 'password';
  text: boolean = false;
  confirmwrong: boolean = false;
  updateactive: boolean = true;
  actionbut: string = 'save';

  constructor(
    private builder: FormBuilder,
    private serivce: AdministratorServiceService,
    private matdialogref: MatDialogRef<ClassAddAdministratorComponent>,
    @Inject(MAT_DIALOG_DATA) public editdata: any,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.formbuild();
    this.updateactive = true;
    if (this.editdata) {
      this.updateactive = false;
      this.actionbut = 'update';
      this.forms.controls['name'].setValue(this.editdata.name);
    }
  }

  formbuild(): void {
    this.forms = this.builder.group({
      name: ['', [Validators.required, trimValidator]],
    });
  }

  triggerye() {
    this.text = !this.text;
    this.text ? (this.eyeicon = 'fa-eye') : (this.eyeicon = 'fa-eye-slash');
    this.text ? (this.type = 'text') : (this.type = 'password');
  }

  Onsubmit() {
    if (!this.editdata) {
      if (this.forms.valid) {
        this.adminAddClassSubscription = this.serivce
          .addclass(this.forms.value)
          .subscribe({
            next: (value) => {
              if (value.status == 'success') {
                this.confirmwrong = false;
                this.matdialogref.close('save');
              } else {
                this.confirmwrong = true;
              }
            },
          });
      }
    } else {
      this.changedata();
    }
  }

  changedata() {
    this.adminUpdateclassSubscription = this.serivce
      .updateclass(this.forms.value, this.editdata._id)
      .subscribe({
        next: () => {
          this.forms.reset();
          this.matdialogref.close('updated');
        },
      });
  }
  ngOnDestroy() {
    this.adminAddClassSubscription?.unsubscribe();
    this.adminUpdateclassSubscription?.unsubscribe();
  }
}
function trimValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  if (control.value && control.value.trim() !== control.value) {
    return { trimError: true };
  }
  return null;
}
