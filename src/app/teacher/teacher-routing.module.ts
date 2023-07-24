import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherLoginComponent } from './teacher-login/teacher-login.component';
import { TeacherHomeModuleComponent } from './teacher-home-module/teacher-home-module.component';
import { TeacherDashboradModuleComponent } from './teacher-dashborad-module/teacher-dashborad-module.component';
import { TeacherShowclassModuleComponent } from './teacher-showclass-module/teacher-showclass-module.component';

const routes: Routes = [
  {path:'',component:TeacherLoginComponent},
  {path:'home',component:TeacherHomeModuleComponent,children:[
    {path:'',redirectTo:"dasboard",pathMatch:"full"},
    {path:'dasboard',component:TeacherDashboradModuleComponent},
    {path:'showclass/:id',component:TeacherShowclassModuleComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
