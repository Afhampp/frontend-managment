import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentServiceService } from 'src/app/service/student-service.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-student-profile-student',
  templateUrl: './student-profile-student.component.html',
  styleUrls: ['./student-profile-student.component.css'],
})
export class StudentProfileStudentComponent implements OnInit {
  private studentprofileubcription: Subscription | undefined;

  private studentupprofileSubcription: Subscription | undefined;

  data!: any;
  constructor(
    private stuentservice: StudentServiceService,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.getprofile();
  }
  getprofile() {
    this.studentprofileubcription = this.stuentservice.getprofile().subscribe({
      next: (value) => {
        console.log(value);
        this.data = value.data;
      },
      error: (error) => {},
    });
  }

  photchange(event: any) {
    const file = event.target.files[0];
    const formdata = new FormData();
    formdata.append('file', file);
    this.studentupprofileSubcription = this.stuentservice
      .profilechange(formdata)
      .subscribe({
        next: (value) => {
          if (value.success == true) {
            this.getprofile();
          }
        },
      });
  }
  ngOnDestroy() {
    this.studentprofileubcription?.unsubscribe();
    this.studentupprofileSubcription?.unsubscribe();
  }
}
