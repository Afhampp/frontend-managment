import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { StudentServiceService } from 'src/app/service/student-service.service';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit {
  loginform!:FormGroup
  eyeicon:string="fa-eye-slash"
  type:string="password"
  text:boolean=false
  emailmesssage:boolean=false
  passwordmessage:boolean=false
  constructor(private builder:FormBuilder,private serive:StudentServiceService,private router:Router){

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
    if(this.loginform.valid){
      this.serive.studentlogin(this.loginform.value).subscribe((value)=>{
        this.emailmesssage=false
        this.passwordmessage=false
        if(value.status=='success'){
          
          const collection=JSON.stringify(value)
          sessionStorage.setItem('student',collection)
          this.router.navigate(['/home'])
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
