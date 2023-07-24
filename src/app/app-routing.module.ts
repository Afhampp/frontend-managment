import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentLoginComponent } from './student/student-login/student-login.component';
import { TeacherLoginComponent } from './teacher/teacher-login/teacher-login.component';


const routes: Routes = [
  {path:'',component:StudentLoginComponent},
  {path:'teacher',loadChildren:()=>import('./teacher/teacher.module').then(m=>m.TeacherModule)},
  {path:'administrator',loadChildren:()=>import('./administrator/administrator.module').then(m=>m.AdministratorModule)},

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
