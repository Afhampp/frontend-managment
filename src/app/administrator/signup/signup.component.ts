import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdministratorServiceService } from 'src/app/service/administrator-service.service';
import { Subscription } from 'rxjs';
import { datasubject } from '../interface/logininterface';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  private adminGetSubjectSubscription: Subscription | undefined;
  private adminAddteacherSubscription: Subscription | undefined;
  private adminUpdateteacherSubscription: Subscription | undefined;

  forms!: FormGroup;
  eyeicon: string = 'fa-eye-slash';
  type: string = 'password';
  text: boolean = false;
  confirmwrong: boolean = false;
  updateactive: boolean = true;
  actionbut: string = 'save';
  toppingList!: string[];
  constructor(
    private builder: FormBuilder,
    private serivce: AdministratorServiceService,
    private matdialogref: MatDialogRef<SignupComponent>,
    @Inject(MAT_DIALOG_DATA) public editdata: any
  ) {}

  ngOnInit(): void {
    this.formbuild();
    this.adminGetSubjectSubscription = this.serivce
      .getsubject()
      .subscribe((value) => {
        this.toppingList = value.getdata.map(
          (subject: datasubject) => subject.subject
        );
      });
    this.updateactive = true;
    if (this.editdata) {
      this.updateactive = false;
      this.actionbut = 'update';
      this.forms.controls['name'].setValue(this.editdata.name);
      this.forms.controls['email'].setValue(this.editdata.email);
      this.forms.controls['phone'].setValue(this.editdata.phone);
      this.forms.controls['subject'].setValue(this.editdata.subject);
    }
  }

  formbuild(): void {
    this.forms = this.builder.group({
      name: ['', [Validators.required, trimValidator]],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
      subject: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm: ['', [Validators.required]],
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
        this.adminAddteacherSubscription = this.serivce
          .teacheraddd(this.forms.value)
          .subscribe((value) => {
            if (value.status == 'success') {
              this.confirmwrong = false;
              this.matdialogref.close('save');
            } else {
              this.confirmwrong = true;
            }
          });
      }
    } else {
      this.changedata();
    }
  }

  changedata() {
    this.adminUpdateteacherSubscription = this.serivce
      .updateteacher(this.forms.value, this.editdata._id)
      .subscribe(() => {
        this.forms.reset();
        this.matdialogref.close('updated');
      });
  }

  ngOnDestroy() {
    this.adminAddteacherSubscription?.unsubscribe();
    this.adminGetSubjectSubscription?.unsubscribe();
    this.adminUpdateteacherSubscription?.unsubscribe();
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
