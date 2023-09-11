import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';


const routes: Routes = [
  {path:'',loadChildren:()=>import('./student/student.module').then(m=>m.StudentModule)},
  {path:'teacher',loadChildren:()=>import('./teacher/teacher.module').then(m=>m.TeacherModule)},
  {path:'administrator',loadChildren:()=>import('./administrator/administrator.module').then(m=>m.AdministratorModule)},
  {path:'**',component:NotfoundComponent}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
