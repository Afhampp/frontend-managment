import { Component,OnInit,Inject} from '@angular/core';

import {MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdministratorServiceService } from 'src/app/service/administrator-service.service';
import { NgConfirmService } from 'ng-confirm-box';
import { FormBuilder,FormGroup,AbstractControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-subjectadd-edit-administrator',
  templateUrl: './subjectadd-edit-administrator.component.html',
  styleUrls: ['./subjectadd-edit-administrator.component.css']
})
export class SubjectaddEditAdministratorComponent implements OnInit{

  forms!:FormGroup
  alreadyexist:boolean=false
  updatevalue:boolean=false
  buttonaction:string="add"
  alreadyexistsubject:boolean=false

  constructor(private adminservice:AdministratorServiceService,private ngconfirm:NgConfirmService,private formbuilder:FormBuilder,private matdialogref:MatDialogRef<SubjectaddEditAdministratorComponent>,@Inject (MAT_DIALOG_DATA) public editdata:any){}

  ngOnInit(): void {
    this.formbuild()
    if(this.editdata){
      this.forms.controls['subject'].setValue(this.editdata.subject)
      this.updatevalue=true
      this.buttonaction="update"
    }
    
  }

  formbuild(){
    this.forms=this.formbuilder.group({
      'subject':['',[Validators.required,trimValidator]],
    })
  }

  Onsubmit(){
    if(!this.editdata){
      if(this.forms.valid){
      
        this.adminservice.subjectadd(this.forms.value).subscribe((value)=>{
          if(value.status=="error"){
            this.alreadyexist=true
          }
          else{
            this.alreadyexist=false
            this.matdialogref.close('add')
          }
        })
        
      }
    }
    else{
      this.editvalue()
    }
    
  }
  editvalue(){
    this.adminservice.updatesubejct(this.forms.value,this.editdata._id).subscribe((value)=>{
      if(value.status=="error"){
        this.alreadyexistsubject=true
      }
      else{
        this.updatevalue=false
        this.alreadyexistsubject=false
        this.matdialogref.close('updated')
        
      }
    })
  }

}
function trimValidator(control: AbstractControl): { [key: string]: any } | null {
  if (control.value && control.value.trim() !== control.value) {
    return { 'trimError': true };
  }
  return null;
}
