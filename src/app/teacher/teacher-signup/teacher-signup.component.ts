import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators,AbstractControl} from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-teacher-signup',
  templateUrl: './teacher-signup.component.html',
  styleUrls: ['./teacher-signup.component.css']
})
export class TeacherSignupComponent implements OnInit {

  forms!:FormGroup
  eyeicon:string="fa-eye-slash"
  type:string="password"
  text:boolean=false
  constructor(private builder:FormBuilder){}

  
  ngOnInit(): void {
    this.formbuild()
  }

  formbuild():void{
    this.forms=this.builder.group({
      'name':['',[Validators.required,trimValidator]],
      'email':['',[Validators.required,Validators.email]],
      'phone':['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^[0-9]+$'),trimValidator]],
      'subject':['',[Validators.required,trimValidator]],
      'password':['',[Validators.required]],
      'confirm':['',[Validators.required]]
    })
  }

  triggerye(){
    this.text=!this.text
    this.text?this.eyeicon="fa-eye":this.eyeicon="fa-eye-slash"
    this.text?this.type="text":this.type="password"
  }


  // addvalue(){
  //   if(this.forms.valid){
  //     console.log(this.forms.value)
  //     this.matdialogref.close('saved')
  //   }
    
  // }
}
function trimValidator(control: AbstractControl): { [key: string]: any } | null {
  if (control.value && control.value.trim() !== control.value) {
    return { 'trimError': true };
  }
  return null;
}
