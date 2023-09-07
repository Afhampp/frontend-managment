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
  selector: 'app-teatche-add-rnote-module',
  templateUrl: './teatche-add-rnote-module.component.html',
  styleUrls: ['./teatche-add-rnote-module.component.css'],
})
export class TeatcheAddRnoteModuleComponent implements OnInit {
  private TeacherClassSubcription: Subscription | undefined;
  private TeacherAddNoteubcription: Subscription | undefined;
  private TeacherUpNoteSubcription: Subscription | undefined;

  forms!: FormGroup;
  confirmwrong: boolean = false;
  updateactive: boolean = true;
  actionbut: string = 'save';
  toppingList!: { name: string; id: string }[];
  notpdf: boolean = false;
  today = new Date();
  minDate: Date = this.today;
  constructor(
    private builder: FormBuilder,
    private serivce: TeacherServiceService,
    private matdialogref: MatDialogRef<TeatcheAddRnoteModuleComponent>,
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

      this.forms.controls['from'].setValue(this.editdata.from);
      this.forms.controls['class'].setValue(this.editdata.class);
    }
  }

  formbuild(): void {
    this.forms = this.builder.group({
      name: ['', [Validators.required, trimValidator]],
      class: ['', [Validators.required]],
      file: ['', [Validators.required]],
      from: ['', [Validators.required]],
    });
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

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
          this.TeacherAddNoteubcription = this.serivce
            .notessubmittion(formDataToSend)
            .subscribe((value) => {
              if (value.status === 'success') {
                this.confirmwrong = false;
                this.matdialogref.close('save');
              } else {
                this.confirmwrong = true;
              }
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
        console.log(
          this.forms.value.name,
          this.forms.value.class,
          fileValue,
          this.forms.value.from
        );
        formDataToSend.append('name', this.forms.value.name);
        formDataToSend.append('class', this.forms.value.class);
        formDataToSend.append('file', fileValue);
        formDataToSend.append('from', this.forms.value.from);
        this.TeacherUpNoteSubcription = this.serivce
          .upadatenotes(formDataToSend, this.editdata._id)
          .subscribe({
            next: () => {
              this.forms.reset();
              this.matdialogref.close('updated');
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
    this.TeacherAddNoteubcription?.unsubscribe();
    this.TeacherClassSubcription?.unsubscribe();
    this.TeacherUpNoteSubcription?.unsubscribe();
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
