import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentLoginComponent } from './student-login/student-login.component';
import { StudentHomeModuleComponent } from './student-home-module/student-home-module.component';
import { StudentDashboardModuleComponent } from './student-dashboard-module/student-dashboard-module.component';
import { StudetnchatModuleComponent } from './studetnchat-module/studetnchat-module.component';
import { StudentNoteModuleComponent } from './student-note-module/student-note-module.component';


const routes: Routes = [
  {path:'',component:StudentLoginComponent},
  {path:'home',component:StudentHomeModuleComponent,children:[
    {path:'',redirectTo:"dasboard",pathMatch:"full"},
    {path:'dasboard',component:StudentDashboardModuleComponent},
    {path:'chatstudent',component:StudetnchatModuleComponent},
    {path:'notes',component:StudentNoteModuleComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
