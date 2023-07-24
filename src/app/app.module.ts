import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { StudentLoginComponent } from './student/student-login/student-login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { AdministratorModule } from './administrator/administrator.module';
import { TeacherModule } from './teacher/teacher.module';





@NgModule({
  declarations: [
    AppComponent,
    StudentLoginComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
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
   
    AdministratorModule,
    TeacherModule,
    RouterModule,

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
