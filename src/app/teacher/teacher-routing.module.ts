import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherLoginComponent } from './teacher-login/teacher-login.component';
import { TeacherHomeModuleComponent } from './teacher-home-module/teacher-home-module.component';
import { TeacherDashboradModuleComponent } from './teacher-dashborad-module/teacher-dashborad-module.component';
import { TeacherShowclassModuleComponent } from './teacher-showclass-module/teacher-showclass-module.component';
import { TeacherAssignmnentUploadComponent } from './teacher-assignmnent-upload/teacher-assignmnent-upload.component';
import { TeacherViewsubmittionModuleComponent } from './teacher-viewsubmittion-module/teacher-viewsubmittion-module.component';
import { TeacherChatModuleComponent } from './teacher-chat-module/teacher-chat-module.component';
import { TeatchernoteModuleComponent } from './teatchernote-module/teatchernote-module.component';
import { TeacherAtteandanceClassComponent } from './teacher-atteandance-class/teacher-atteandance-class.component';
import { TeacherSubmitAtteandanceComponent } from './teacher-submit-atteandance/teacher-submit-atteandance.component';
import { TeacherViewattendacedateComponent } from './teacher-viewattendacedate/teacher-viewattendacedate.component';
import { TeacherAuthGuardService } from './router-gaurd/teachergaurdtologin';
import { TeacherLoginGuard } from './router-gaurd/teacherloginguard';
import { TeacherSheduleClassComponent } from './teacher-shedule-class/teacher-shedule-class.component';
import { TeacherSheduleModuleComponent } from './teacher-shedule-module/teacher-shedule-module.component';

const routes: Routes = [
  {path:'',canActivate: [TeacherLoginGuard],component:TeacherLoginComponent},
  {path:'home',canActivate: [ TeacherAuthGuardService],component:TeacherHomeModuleComponent,children:[
    {path:'',redirectTo:"dasboard",pathMatch:"full"},
    {path:'dasboard',component:TeacherDashboradModuleComponent},
    {path:'showclass/:id',component:TeacherShowclassModuleComponent},
    {path:'teachetassigment',component:TeacherAssignmnentUploadComponent},
    {path:'submittedassigment/:id',component:TeacherViewsubmittionModuleComponent},
    {path:'chatteacher',component:TeacherChatModuleComponent},
    {path:'notes',component:TeatchernoteModuleComponent},
    {path:'attendaceclass',component:TeacherAtteandanceClassComponent},
    {path:'attendacesubmittion/:id',component:TeacherSubmitAtteandanceComponent},
    {path:'attedancedate/:id',component:TeacherViewattendacedateComponent},
    {path:'sheduleclass',component:TeacherSheduleClassComponent},
    {path:'shedule/:id',component:TeacherSheduleModuleComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
