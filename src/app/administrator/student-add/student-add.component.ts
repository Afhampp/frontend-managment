import { Component, OnInit,Inject } from '@angular/core';
import {FormBuilder,FormGroup,Validators,AbstractControl} from '@angular/forms'
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdministratorServiceService } from 'src/app/service/administrator-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {

  forms!:FormGroup
  eyeicon:string="fa-eye-slash"
  type:string="password"
  text:boolean=false
  confirmwrong:boolean=false
  updateactive:boolean=true
  actionbut:string="save"
  constructor(private builder:FormBuilder,private serivce:AdministratorServiceService,private matdialogref:MatDialogRef<StudentAddComponent>,@Inject(MAT_DIALOG_DATA) public editdata:any,private route:Router){}
 
 
  ngOnInit(): void {
    this.formbuild()
    this.updateactive=true
    if(this.editdata){
      
      this.updateactive=false
      this.actionbut="update"
      this.forms.controls['name'].setValue(this.editdata.name)
      this.forms.controls['email'].setValue(this.editdata.email)
      this.forms.controls['phone'].setValue(this.editdata.phone)

    }
  }

  formbuild():void{
    
    this.forms=this.builder.group({
      'name':['',[Validators.required,trimValidator]],
      'email':['',[Validators.required,Validators.email]],
      'phone':['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^[0-9]+$')]],
      'password':['',[Validators.required]],
      'confirm':['',[Validators.required]]
    })
  }

  triggerye(){
    this.text=!this.text
    this.text?this.eyeicon="fa-eye":this.eyeicon="fa-eye-slash"
    this.text?this.type="text":this.type="password"
  }


  Onsubmit(){
    if(!this.editdata){
    if(this.forms.valid){
    
      this.serivce.addstudent(this.forms.value).subscribe({
        next:(value)=>{
        if(value.status=="success"){
          this.confirmwrong=false
          this.matdialogref.close('save')
        }
        else{
          this.confirmwrong=true
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
                sessionStorage.removeItem('admin')
                this.route.navigate(['/admin'])
            }
          });
        }
    }
  })
    }
  }
  else{
    this.changedata()
  }
}

  changedata(){
    this.serivce.updatestudent(this.forms.value,this.editdata._id).subscribe(()=>{
      this.forms.reset()
      this.matdialogref.close("updated")
    })
  }

}
function trimValidator(control: AbstractControl): { [key: string]: any } | null {
  if (control.value && control.value.trim() !== control.value) {
    return { 'trimError': true };
  }
  return null;
}