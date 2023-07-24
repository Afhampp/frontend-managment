import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdministratorHomeComponent } from './administrator-home/administrator-home.component';
import { AdministratorTeacherComponent } from './administrator-teacher/administrator-teacher.component';
import { SudentTableAdministratorComponent } from './sudent-table-administrator/sudent-table-administrator.component';
import { AdministratorClassComponent } from './administrator-class/administrator-class.component';
import { TeacherViewTableComponent } from './teacher-view-table/teacher-view-table.component';
import { StudentViewTableComponent } from './student-view-table/student-view-table.component';
import { AdministratorSubjectComponent } from './administrator-subject/administrator-subject.component';

const routes: Routes = [
  { path: '', component: LoginComponent}, 
  { path: 'adminhome', component: AdministratorHomeComponent, children: [
    { path: '', redirectTo: 'adminteacher', pathMatch: 'full' }, // Redirect to dashboard by default
    // { path: 'dashboard', component: DashboardComponent },
    { path: 'adminteacher', component: AdministratorTeacherComponent },
    { path: 'adminstudent', component: SudentTableAdministratorComponent },
    { path: 'adminclass', component: AdministratorClassComponent },
    { path:'adminsubject',component:AdministratorSubjectComponent},
    { path: 'adminclassview/:id', component: TeacherViewTableComponent},
    { path: 'adminclassaddstudent/:id', component: StudentViewTableComponent},
  ]},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
