import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StudentServiceService } from 'src/app/service/student-service.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-student-addasignment-module',
  templateUrl: './student-addasignment-module.component.html',
  styleUrls: ['./student-addasignment-module.component.css'],
})
export class StudentAddasignmentModuleComponent implements OnInit {
  private studentAssigmentSubcription: Subscription | undefined;

  forms!: FormGroup;
  eyeicon: string = 'fa-eye-slash';
  type: string = 'password';
  text: boolean = false;
  confirm: boolean = false;
  updateactive: boolean = true;
  actionbut: string = 'save';
  toppingList!: { name: string; id: string }[];
  notpdf: boolean = false;
  constructor(
    private builder: FormBuilder,
    private serivce: StudentServiceService,
    private matdialogref: MatDialogRef<StudentAddasignmentModuleComponent>,
    @Inject(MAT_DIALOG_DATA) public editdata: any,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.formbuild();
    this.serivce.getstudentid();
  }

  formbuild(): void {
    this.forms = this.builder.group({
      file: ['', [Validators.required]],
    });
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
    const fileControl = this.forms.get('file');
    if (this.forms.valid) {
      const fileValue = fileControl?.value;
      if (fileValue instanceof File) {
        const formDataToSend = new FormData();
        formDataToSend.append('file', fileValue);

        this.studentAssigmentSubcription = this.serivce
          .assigemntsubmittion(formDataToSend, this.editdata._id)
          .subscribe({
            next: (value) => {
              if (value.status === 'success') {
                this.confirm = true;
                this.matdialogref.close('save');
              } else {
              }
            },
          });
      }
    }
  }

  isPDF(fileName: string): boolean {
    const extension = fileName.split('.').pop()?.toLowerCase();
    return extension === 'pdf';
  }

  ngOnDestroy() {
    this.studentAssigmentSubcription?.unsubscribe();
  }
}
