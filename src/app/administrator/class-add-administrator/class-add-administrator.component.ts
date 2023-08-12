import { Component, OnInit,Inject } from '@angular/core';
import {FormBuilder,FormGroup,Validators,AbstractControl} from '@angular/forms'
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdministratorServiceService } from 'src/app/service/administrator-service.service';

@Component({
  selector: 'app-class-add-administrator',
  templateUrl: './class-add-administrator.component.html',
  styleUrls: ['./class-add-administrator.component.css']
})
export class ClassAddAdministratorComponent implements OnInit {

  forms!:FormGroup
  eyeicon:string="fa-eye-slash"
  type:string="password"
  text:boolean=false
  confirmwrong:boolean=false
  updateactive:boolean=true
  actionbut:string="save"


  constructor(private builder:FormBuilder,private serivce:AdministratorServiceService,private matdialogref:MatDialogRef<ClassAddAdministratorComponent>,@Inject(MAT_DIALOG_DATA) public editdata:any){}
 
 
  ngOnInit(): void {
    this.formbuild()
    this.updateactive=true
    if(this.editdata){
      this.updateactive=false
      this.actionbut="update"
      this.forms.controls['name'].setValue(this.editdata.name)
      // this.forms.controls['teacher'].setValue([this.editdata.teacher]);
      // this.forms.controls['student'].setValue([this.editdata.student]);

    }
  }

  formbuild():void{
    
    this.forms=this.builder.group({
      'name':['',[Validators.required,trimValidator]],


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
      this.serivce.addclass(this.forms.value).subscribe((value)=>{
        if(value.status=="success"){
          console.log("hai")
          this.confirmwrong=false
          this.matdialogref.close('save')
        }
        else{
          this.confirmwrong=true
        }
        
      })
    }
  }
  else{
    this.changedata()
  }
}

  changedata(){
    this.serivce.updateclass(this.forms.value,this.editdata._id).subscribe(()=>{
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

