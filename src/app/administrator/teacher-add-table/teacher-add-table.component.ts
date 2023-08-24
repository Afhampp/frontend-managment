import { Component, OnInit,Inject } from '@angular/core';
import {FormBuilder,FormGroup,Validators,AbstractControl} from '@angular/forms'
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdministratorServiceService } from 'src/app/service/administrator-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teacher-add-table',
  templateUrl: './teacher-add-table.component.html',
  styleUrls: ['./teacher-add-table.component.css']
})
export class TeacherAddTableComponent implements OnInit {

  forms!:FormGroup
  eyeicon:string="fa-eye-slash"
  type:string="password"
  text:boolean=false
  confirmwrong:boolean=false
  updateactive:boolean=true
  actionbut:string="save"
  teacherlist: { name: string, id: string }[] = [];
  constructor(private builder:FormBuilder,private serivce:AdministratorServiceService,private matdialogref:MatDialogRef<TeacherAddTableComponent>,@Inject(MAT_DIALOG_DATA) public id:any,private route:Router){}
 
 
  ngOnInit(): void {
    this.formbuild()
    this.serivce.getteacher().subscribe((value) => {
      this.teacherlist = value.getdata.map((teacher: any) => ({
        name: teacher.name,
        id: teacher._id
      }));
    });
    this.updateactive=true
  }

  formbuild():void{
    
    this.forms=this.builder.group({
      'teachers':['',[Validators.required]],
      
    })
  }

  triggerye(){
    this.text=!this.text
    this.text?this.eyeicon="fa-eye":this.eyeicon="fa-eye-slash"
    this.text?this.type="text":this.type="password"
  }


  Onsubmit(){
    if(this.forms.valid){
      this.serivce.addteacherinclass(this.forms.value,this.id).subscribe({
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

 

}
function trimValidator(control: AbstractControl): { [key: string]: any } | null {
  if (control.value && control.value.trim() !== control.value) {
    return { 'trimError': true };
  }
  return null;
}
