import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorRoutingModule } from './administrator-routing.module';

import { ReactiveFormsModule} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdministratorHomeComponent } from './administrator-home/administrator-home.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { AdministratorTeacherComponent } from './administrator-teacher/administrator-teacher.component';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { NgConfirmModule } from 'ng-confirm-box';
import { AdministratorClassComponent } from './administrator-class/administrator-class.component';
import { AdministratorSubjectComponent } from './administrator-subject/administrator-subject.component';
import { SubjectaddEditAdministratorComponent } from './subjectadd-edit-administrator/subjectadd-edit-administrator.component';
import {MatSelectModule} from '@angular/material/select';
import { StudentAddComponent } from './student-add/student-add.component';
import { SudentTableAdministratorComponent } from './sudent-table-administrator/sudent-table-administrator.component';
import { ClassAddAdministratorComponent } from './class-add-administrator/class-add-administrator.component';
import { TeacherAddTableComponent } from './teacher-add-table/teacher-add-table.component';
import { StudentAddTableComponent } from './student-add-table/student-add-table.component';
import { StudentViewTableComponent } from './student-view-table/student-view-table.component';
import { TeacherViewTableComponent } from './teacher-view-table/teacher-view-table.component';
import { RouterModule } from '@angular/router';
import { AdministratorSchedulingComponent } from './administrator-scheduling/administrator-scheduling.component';
import { AdministratorAddSchedulingComponent } from './administrator-add-scheduling/administrator-add-scheduling.component';
import { AdministartorDashboardComponent } from './administartor-dashboard/administartor-dashboard.component';





@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    AdministratorHomeComponent,
    AdministratorTeacherComponent,
    AdministratorClassComponent,
    AdministratorSubjectComponent,
    SubjectaddEditAdministratorComponent,
    StudentAddComponent,
    SudentTableAdministratorComponent,
    ClassAddAdministratorComponent,
    TeacherAddTableComponent,
    StudentAddTableComponent,
    StudentViewTableComponent,
    TeacherViewTableComponent,
    AdministratorSchedulingComponent,
    AdministratorAddSchedulingComponent,
    AdministartorDashboardComponent
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatInputModule,
    NgConfirmModule,
    MatSelectModule,
    RouterModule,
   
  ]
})
export class AdministratorModule { }
