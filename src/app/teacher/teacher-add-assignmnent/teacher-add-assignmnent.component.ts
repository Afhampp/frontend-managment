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
  selector: 'app-teacher-add-assignmnent',
  templateUrl: './teacher-add-assignmnent.component.html',
  styleUrls: ['./teacher-add-assignmnent.component.css'],
})
export class TeacherAddAssignmnentComponent implements OnInit {
  private TeacherAssigmentSubcription: Subscription | undefined;
  private TeacherClassSubcription: Subscription | undefined;
  private TeacherUpassigmentSubcription: Subscription | undefined;

  forms!: FormGroup;
  eyeicon: string = 'fa-eye-slash';
  type: string = 'password';
  text: boolean = false;
  confirmwrong: boolean = false;
  updateactive: boolean = true;
  actionbut: string = 'save';
  toppingList!: { name: string; id: string }[];
  notpdf: boolean = false;
  today = new Date();
  minDate: Date = this.today;
  frommindate!: Date;

  constructor(
    private builder: FormBuilder,
    private serivce: TeacherServiceService,
    private matdialogref: MatDialogRef<TeacherAddAssignmnentComponent>,
    @Inject(MAT_DIALOG_DATA) public editdata: any,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.formbuild();
    this.TeacherClassSubcription = this.serivce
      .getclasses()
      .subscribe((value) => {
        this.toppingList = value.clasvalue.map((teacher: any) => ({
          name: teacher.name,
          id: teacher._id,
        }));
      });
    this.updateactive = true;
    if (this.editdata) {
      this.updateactive = false;
      this.actionbut = 'update';
      this.forms.controls['name'].setValue(this.editdata.name);
      this.forms.controls['file'].setValue([this.editdata.file]);
      this.forms.controls['from'].setValue(this.editdata.from);
      this.forms.controls['to'].setValue(this.editdata.to);
      this.forms.controls['class'].setValue(this.editdata.class);
    }
  }

  formbuild(): void {
    this.forms = this.builder.group({
      name: ['', [Validators.required, trimValidator]],
      class: ['', [Validators.required]],
      file: ['', [Validators.required]],
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
    });
  }

  triggerye() {
    this.text = !this.text;
    this.text ? (this.eyeicon = 'fa-eye') : (this.eyeicon = 'fa-eye-slash');
    this.text ? (this.type = 'text') : (this.type = 'password');
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      if (file.type !== 'application/pdf') {
        this.notpdf = true;
      } else {
        this.notpdf = false;
        this.forms.get('file')?.setValue(file);
      }
    }
  }

  Onsubmit() {
    if (!this.editdata) {
      const fileControl = this.forms.get('file');
      if (this.forms.valid) {
        const fileValue = fileControl?.value;
        if (fileValue instanceof File) {
          const formDataToSend = new FormData();
          formDataToSend.append('name', this.forms.value.name);
          formDataToSend.append('class', this.forms.value.class);
          formDataToSend.append('file', fileValue);
          formDataToSend.append('from', this.forms.value.from);
          formDataToSend.append('to', this.forms.value.to);
          this.TeacherAssigmentSubcription = this.serivce
            .assigmentquestion(formDataToSend)
            .subscribe({
              next: (value) => {
                if (value.status === 'success') {
                  this.confirmwrong = false;
                  this.matdialogref.close('save');
                } else {
                  this.confirmwrong = true;
                }
              },
            });
        }
      }
    } else {
      this.changedata();
    }
  }

  changedata() {
    const fileControl = this.forms.get('file');
    if (this.forms.valid) {
      const fileValue = fileControl?.value;
      if (fileValue instanceof File) {
        const formDataToSend = new FormData();
        formDataToSend.append('name', this.forms.value.name);
        formDataToSend.append('class', this.forms.value.class);
        formDataToSend.append('file', fileValue);
        formDataToSend.append('from', this.forms.value.from);
        formDataToSend.append('to', this.forms.value.to);
        this.TeacherUpassigmentSubcription = this.serivce
          .updateassigment(formDataToSend, this.editdata._id)
          .subscribe(() => {
            this.forms.reset();
            this.matdialogref.close('updated');
          });
      }
    }
  }

  isPDF(fileName: string): boolean {
    const extension = fileName.split('.').pop()?.toLowerCase();
    return extension === 'pdf';
  }
  ngOnDestroy() {
    this.TeacherAssigmentSubcription?.unsubscribe();
    this.TeacherClassSubcription?.unsubscribe();
    this.TeacherUpassigmentSubcription?.unsubscribe();
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
