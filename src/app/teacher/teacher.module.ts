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
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { RouterModule } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; 
import { FormsModule } from '@angular/forms'; 
import {MatGridListModule} from '@angular/material/grid-list';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherLoginComponent } from './teacher-login/teacher-login.component';
import { TeacherSignupComponent } from './teacher-signup/teacher-signup.component';
import { TeacherHomeModuleComponent } from './teacher-home-module/teacher-home-module.component';
import { TeacherDashboradModuleComponent } from './teacher-dashborad-module/teacher-dashborad-module.component';
import { TeacherShowclassModuleComponent } from './teacher-showclass-module/teacher-showclass-module.component';
import { TeacherViewstudentModuleComponent } from './teacher-viewstudent-module/teacher-viewstudent-module.component';
import { TeacherAssignmnentUploadComponent } from './teacher-assignmnent-upload/teacher-assignmnent-upload.component';
import { TeacherAddAssignmnentComponent } from './teacher-add-assignmnent/teacher-add-assignmnent.component';
import { TeacherViewsubmittionModuleComponent } from './teacher-viewsubmittion-module/teacher-viewsubmittion-module.component';
import { TeacherChatModuleComponent } from './teacher-chat-module/teacher-chat-module.component';
import { TeatchernoteModuleComponent } from './teatchernote-module/teatchernote-module.component';
import { TeatcheAddRnoteModuleComponent } from './teatche-add-rnote-module/teatche-add-rnote-module.component';
import { TeacherAtteandanceClassComponent } from './teacher-atteandance-class/teacher-atteandance-class.component';
import { TeacherSubmitAtteandanceComponent } from './teacher-submit-atteandance/teacher-submit-atteandance.component';
import { TeacherAttendanceFormComponent } from './teacher-attendance-form/teacher-attendance-form.component';
import { TeacherViewattendacedateComponent } from './teacher-viewattendacedate/teacher-viewattendacedate.component';
import { TeacherUpdateattendaceComponent } from './teacher-updateattendace/teacher-updateattendace.component';
import { TeacherAuthGuardService } from './router-gaurd/teachergaurdtologin';
import { TeacherLoginGuard } from './router-gaurd/teacherloginguard';
import { TeacherSheduleClassComponent } from './teacher-shedule-class/teacher-shedule-class.component';
import { TeacherSheduleModuleComponent } from './teacher-shedule-module/teacher-shedule-module.component';
import { TeacherMarkAssigmentComponent } from './teacher-mark-assigment/teacher-mark-assigment.component';
import { TeacherClassTeacherComponent } from './teacher-class-teacher/teacher-class-teacher.component';
import { TeachermockComponentComponent } from './teachermock-component/teachermock-component.component';


@NgModule({
  declarations: [
    TeacherLoginComponent,
    TeacherSignupComponent,
    TeacherHomeModuleComponent,
    TeacherDashboradModuleComponent,
    TeacherShowclassModuleComponent,
    TeacherViewstudentModuleComponent,
    TeacherAssignmnentUploadComponent,
    TeacherAddAssignmnentComponent,
    TeacherViewsubmittionModuleComponent,
    TeacherChatModuleComponent,
    TeatchernoteModuleComponent,
    TeatcheAddRnoteModuleComponent,
    TeacherAtteandanceClassComponent,
    TeacherSubmitAtteandanceComponent,
    TeacherAttendanceFormComponent,
    TeacherViewattendacedateComponent,
    TeacherUpdateattendaceComponent,
    TeacherSheduleClassComponent,
    TeacherSheduleModuleComponent,
    TeacherMarkAssigmentComponent,
    TeacherClassTeacherComponent,
    TeachermockComponentComponent,
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
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
    FormsModule,
    MatGridListModule,
    RouterModule,
  ],
  providers:[
    TeacherAuthGuardService,
    TeacherLoginGuard
  ]
})
export class TeacherModule { }
