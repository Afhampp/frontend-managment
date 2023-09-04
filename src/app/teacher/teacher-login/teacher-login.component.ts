import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { TeacherServiceService } from 'src/app/service/teacher-service.service';

@Component({
  selector: 'app-teacher-login',
  templateUrl: './teacher-login.component.html',
  styleUrls: ['./teacher-login.component.css']
})
export class TeacherLoginComponent implements OnInit {
  loginform!:FormGroup
  eyeicon:string="fa-eye-slash"
  type:string="password"
  text:boolean=false
  emailmesssage:boolean=false
  passwordmessage:boolean=false
  constructor(private builder:FormBuilder,private serive:TeacherServiceService,private router:Router){

  }
  ngOnInit(): void {
    this.validate()
  }

  validate(){
    this.loginform=this.builder.group({
      'email':['',[Validators.required]],
      'password':['',[Validators.required]]
    })
  }
  triggerye(){
    this.text=!this.text
    this.text?this.eyeicon="fa-eye":this.eyeicon="fa-eye-slash"
    this.text?this.type="text":this.type="password"
  }

  onsubmit(){
    console.log("hai")
    if(this.loginform.valid){
      this.serive.teacherlogin(this.loginform.value).subscribe((value)=>{
        this.emailmesssage=false
        this.passwordmessage=false
        if(value.status=='success'){
          
          const collection=JSON.stringify(value)
          sessionStorage.setItem('teacher',collection)
          this.router.navigate(['/teacher/home'])
          this.loginform.reset()
        }
        else{
          if(value.check=="email"){
            this.emailmesssage=true
          }
          else{
            this.emailmesssage=false
            this.passwordmessage=true
          }
        }
      })
    }
  }
}
