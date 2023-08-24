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
import { AdministratorSchedulingComponent } from './administrator-scheduling/administrator-scheduling.component';
import { AdministartorDashboardComponent } from './administartor-dashboard/administartor-dashboard.component';
import { administratortologin } from './router-gaurd/administrator-router-tologin';
import { administratorfromlogin } from './router-gaurd/administrator-router-fromlogin';

const routes: Routes = [
  { path: '',canActivate:[administratortologin] ,component: LoginComponent}, 
  { path: 'adminhome',canActivate:[administratorfromlogin] ,component: AdministratorHomeComponent, children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
    { path: 'dashboard', component: AdministartorDashboardComponent },
    { path: 'adminteacher', component: AdministratorTeacherComponent },
    { path: 'adminstudent', component: SudentTableAdministratorComponent },
    { path: 'adminclass', component: AdministratorClassComponent },
    { path:'adminsubject',component:AdministratorSubjectComponent},
    { path: 'adminclassview/:id', component: TeacherViewTableComponent},
    { path: 'adminclassaddstudent/:id', component: StudentViewTableComponent},
    { path:'adminclassaddschedule/:id',component: AdministratorSchedulingComponent}
  ]},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
