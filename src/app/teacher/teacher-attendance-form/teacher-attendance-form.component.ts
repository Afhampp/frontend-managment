import { Component, OnInit,Inject } from '@angular/core';
import {FormBuilder,FormGroup,Validators,AbstractControl} from '@angular/forms'
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdministratorServiceService } from 'src/app/service/administrator-service.service';
import { TeacherServiceService } from 'src/app/service/teacher-service.service';

@Component({
  selector: 'app-teacher-attendance-form',
  templateUrl: './teacher-attendance-form.component.html',
  styleUrls: ['./teacher-attendance-form.component.css']
})
export class TeacherAttendanceFormComponent implements OnInit {

  forms!:FormGroup
  teacherid!:string
 
  confirmwrong:boolean=false


  constructor(private builder:FormBuilder,private teacherserivce:TeacherServiceService,private matdialogref:MatDialogRef<TeacherAttendanceFormComponent>,@Inject(MAT_DIALOG_DATA) public id:any){}
 
 
  ngOnInit(): void {
    console.log(this.id)
    this.formbuild()
    this.teacherserivce.getteacherid().subscribe((value)=>{
      this.teacherid=value.teacherid
    })
   

  }

  formbuild():void{
    
    this.forms=this.builder.group({
      'status':['',[Validators.required]],
      
    })
  }

  


  Onsubmit(){

    let value={
      classid:this.id.classid,
      teacherid:this.teacherid,
      studentid:this.id.student._id,
      status:this.forms.value.status
    }
    console.log(value)
    if(this.forms.valid){
      this.teacherserivce.addattendace(value).subscribe({
        next:(value)=>{
        if(value.status=="success"){
          this.confirmwrong=false
          this.matdialogref.close('save')
        }
         
        
      },
      error:(error)=>{
        if(error.status="error"){
          this.confirmwrong=true
        }
      }
    })
    }

}

 

}

