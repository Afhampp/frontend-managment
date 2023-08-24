import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentLoginComponent } from './student-login/student-login.component';
import { StudentHomeModuleComponent } from './student-home-module/student-home-module.component';
import { StudentDashboardModuleComponent } from './student-dashboard-module/student-dashboard-module.component';
import { StudetnchatModuleComponent } from './studetnchat-module/studetnchat-module.component';
import { StudentNoteModuleComponent } from './student-note-module/student-note-module.component';
import { StudentAttendaceComponent } from './student-attendace/student-attendace.component';
import { StudentSheduleModuleComponent } from './student-shedule-module/student-shedule-module.component';
import { StudentAssigmentclaassModuleComponent } from './student-assigmentclaass-module/student-assigmentclaass-module.component';
import { StudentProfileStudentComponent } from './student-profile-student/student-profile-student.component';
import { StudentForgetpasswordComponent } from './student-forgetpassword/student-forgetpassword.component';
import { studenttologin } from './router-gaurd/router-guard-fromlogin-student';
import { studentfromlogin } from './router-gaurd/router-gaurd-tologin-student';


const routes: Routes = [
  {path:'',canActivate:[studenttologin],component:StudentLoginComponent},
  {path:'forgetpassword/:id',component:StudentForgetpasswordComponent},
  {path:'home',canActivate:[studentfromlogin],component:StudentHomeModuleComponent,children:[
    {path:'',redirectTo:"dasboard",pathMatch:"full"},
    {path:'dasboard',component:StudentDashboardModuleComponent},
    {path:'assignemnt',component:StudentAssigmentclaassModuleComponent},
    {path:'chatstudent',component:StudetnchatModuleComponent},
    {path:'notes',component:StudentNoteModuleComponent},
    {path:'attendace',component:StudentAttendaceComponent},
    {path:'shedule',component:StudentSheduleModuleComponent},
    {path:'profile',component:StudentProfileStudentComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
