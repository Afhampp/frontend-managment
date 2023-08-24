import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms'
import { Router,ActivatedRoute } from '@angular/router';
import { StudentServiceService } from 'src/app/service/student-service.service';

@Component({
  selector: 'app-student-forgetpassword',
  templateUrl: './student-forgetpassword.component.html',
  styleUrls: ['./student-forgetpassword.component.css']
})
export class StudentForgetpasswordComponent implements OnInit {
  loginform!:FormGroup
  eyeicon:string="fa-eye-slash"
  type:string="password"
  text:boolean=false
  emailmesssage:boolean=false
  passwordmessage:boolean=false
  id!:string
  constructor(private builder:FormBuilder,private serive:StudentServiceService,private router:Router,private activatedroute:ActivatedRoute){
   this.id= this.activatedroute.snapshot.paramMap.get('id') || ''
  }
  ngOnInit(): void {
    this.validate()
  }

  validate(){
    this.loginform=this.builder.group({
      'confirm':['',[Validators.required]],
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
      this.loginform.value.id=this.id
      this.serive.studentforgetpass(this.loginform.value).subscribe((value)=>{
        this.emailmesssage=false
        this.passwordmessage=false
        if(value.status=='true'){
          this.emailmesssage=false
          this.router.navigate(['/'])
        }
        else{
          if(value.status=="false"){
            this.emailmesssage=true
        
          }
        }
      })
    }
  }
}
