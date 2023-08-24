import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentServiceService } from 'src/app/service/student-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-profile-student',
  templateUrl: './student-profile-student.component.html',
  styleUrls: ['./student-profile-student.component.css']
})
export class StudentProfileStudentComponent implements OnInit {

  data!:any
    constructor(private stuentservice:StudentServiceService,private route:Router){}
    ngOnInit(): void {
      this.getprofile()
    }
    getprofile(){
      this.stuentservice.getprofile().subscribe({
        next:(value)=>{
          console.log(value)
        this.data=value.data
      },
      error:(error)=>{
   
        if (error.error.message === 'session has expired') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Your session has expired. You will be redirected to the login page.',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          }).then((result) => {
          
            if (result.isConfirmed) {
                sessionStorage.removeItem('student')
                this.route.navigate(['/'])
            }
          });
        }
    }}
      )
    }

    photchange(event:any){
      const file = event.target.files[0];
      const formdata=new FormData()
      formdata.append('file',file)
      this.stuentservice.profilechange(formdata).subscribe({
        next:(value)=>{
        if(value.success==true){
          this.getprofile()
        }
      },
      error:(error)=>{
   
        if (error.error.message === 'session has expired') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Your session has expired. You will be redirected to the login page.',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          }).then((result) => {
          
            if (result.isConfirmed) {
                sessionStorage.removeItem('student')
                this.route.navigate(['/'])
            }
          });
        }
    }}
      )
    }
}
