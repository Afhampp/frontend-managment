import { Component, OnInit,Inject } from '@angular/core';
import {FormBuilder,FormGroup,Validators,AbstractControl} from '@angular/forms'
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdministratorServiceService } from 'src/app/service/administrator-service.service';

@Component({
  selector: 'app-student-add-table',
  templateUrl: './student-add-table.component.html',
  styleUrls: ['./student-add-table.component.css']
})
export class StudentAddTableComponent implements OnInit {

  forms!:FormGroup
  eyeicon:string="fa-eye-slash"
  type:string="password"
  text:boolean=false
  confirmwrong:boolean=false
  updateactive:boolean=true
  actionbut:string="save"
  teacherlist: { name: string, id: string }[] = [];
  constructor(private builder:FormBuilder,private serivce:AdministratorServiceService,private matdialogref:MatDialogRef<StudentAddTableComponent>,@Inject(MAT_DIALOG_DATA) public id:any){}
 
 
  ngOnInit(): void {
    this.formbuild()
    this.serivce.getstudent().subscribe((value) => {
      this.teacherlist = value.getdata.map((teacher: any) => ({
        name: teacher.name,
        id: teacher._id
      }));
    });
    this.updateactive=true
  }

  formbuild():void{
    
    this.forms=this.builder.group({
      'students':['',[Validators.required]],
      
    })
  }

  triggerye(){
    this.text=!this.text
    this.text?this.eyeicon="fa-eye":this.eyeicon="fa-eye-slash"
    this.text?this.type="text":this.type="password"
  }


  Onsubmit(){
    if(this.forms.valid){
      this.serivce.addstudentinclass(this.forms.value,this.id).subscribe((value)=>{
        if(value.status=="success"){
          this.confirmwrong=false
          this.matdialogref.close('save')
        }
        else{
          this.confirmwrong=true
        }
        
      })
    }

}

 

}

