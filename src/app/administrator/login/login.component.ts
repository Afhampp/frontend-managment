import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdministratorServiceService } from 'src/app/service/administrator-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  private adminLoginSubscription: Subscription | undefined;
  loginform!:FormGroup
  eyeicon:string="fa-eye-slash"
  type:string="password"
  text:boolean=false
  emailmesssage:boolean=false
  passwordmessage:boolean=false
 
  constructor(private builder:FormBuilder,private serive:AdministratorServiceService,private route:Router){
    if(sessionStorage.getItem('admin')){
      this.route.navigate(['/administrator/adminhome'])
    }
  }
  ngOnInit(): void {
    this.validate()
  }

  validate(){
    this.loginform=this.builder.group({
      'name':['',[Validators.required]],
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
     this.adminLoginSubscription= this.serive.adminlogin(this.loginform.value).subscribe((value)=>{
        this.emailmesssage=false
        this.passwordmessage=false
        if(value.status=='success'){
          
          const collection=JSON.stringify(value)
          sessionStorage.setItem('admin',collection)
          this.route.navigate(['/administrator/adminhome'])
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
  ngOnDestroy() {
    if (this.adminLoginSubscription) {
      this.adminLoginSubscription.unsubscribe();
    }
  }
}
