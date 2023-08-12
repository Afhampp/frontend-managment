import { Component, OnInit,Inject } from '@angular/core';
import {FormBuilder,FormGroup,Validators,AbstractControl} from '@angular/forms'
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeacherServiceService } from 'src/app/service/teacher-service.service';

@Component({
  selector: 'app-teacher-mark-assigment',
  templateUrl: './teacher-mark-assigment.component.html',
  styleUrls: ['./teacher-mark-assigment.component.css']
})
export class TeacherMarkAssigmentComponent implements OnInit {

  forms!:FormGroup

  confirmwrong:boolean=false
 
  
  constructor(private builder:FormBuilder,private serivce:TeacherServiceService,private matdialogref:MatDialogRef<TeacherMarkAssigmentComponent>,@Inject(MAT_DIALOG_DATA) public editdata:any){}
 
 
  ngOnInit(): void {
    this.formbuild()
      this.forms.controls['mark'].setValue(this.editdata.mark)
  }

  formbuild():void{
    
    this.forms=this.builder.group({
      'mark':['',[Validators.required]],
    })
  }

 




  Onsubmit() {
    if(this.forms.valid){
      let senddata={
        mark:this.forms.value.mark,
        _id:this.editdata._id,
      }
      this.serivce.updatemark(senddata).subscribe((value)=>{
        if(value.status=="success"){
          this.matdialogref.close('save')
        }
      })
    }
    
  }
}



