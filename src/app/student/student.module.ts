import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';


import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { NgConfirmModule } from 'ng-confirm-box';
import {MatSelectModule} from '@angular/material/select';
import { RouterModule } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; 
import { FormsModule } from '@angular/forms';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { StudentRoutingModule } from './student-routing.module';
import { StudentLoginComponent } from './student-login/student-login.component';
import { StudentHomeModuleComponent } from './student-home-module/student-home-module.component';
import { StudentDashboardModuleComponent } from './student-dashboard-module/student-dashboard-module.component';
import { StudentAddasignmentModuleComponent } from './student-addasignment-module/student-addasignment-module.component';
import { StudetnchatModuleComponent } from './studetnchat-module/studetnchat-module.component';
import { StudentNoteModuleComponent } from './student-note-module/student-note-module.component';
import { StudentAttendaceComponent } from './student-attendace/student-attendace.component';
import { StudentSheduleModuleComponent } from './student-shedule-module/student-shedule-module.component';
import { StudentAssigmentclaassModuleComponent } from './student-assigmentclaass-module/student-assigmentclaass-module.component';
import { StudentProfileStudentComponent } from './student-profile-student/student-profile-student.component';
import { StudentForgetpasswordComponent } from './student-forgetpassword/student-forgetpassword.component';
import { studenttologin } from './router-gaurd/router-guard-fromlogin-student';
import { studentfromlogin } from './router-gaurd/router-gaurd-tologin-student';


@NgModule({
  declarations: [
    StudentLoginComponent,
    StudentHomeModuleComponent,
    StudentDashboardModuleComponent,
    StudentAddasignmentModuleComponent,
    StudetnchatModuleComponent,
    StudentNoteModuleComponent,
    StudentAttendaceComponent,
    StudentSheduleModuleComponent,
    StudentAssigmentclaassModuleComponent,
    StudentProfileStudentComponent,
    StudentForgetpasswordComponent,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    FormsModule,
    RouterModule,
  ]
})
export class StudentModule { }
