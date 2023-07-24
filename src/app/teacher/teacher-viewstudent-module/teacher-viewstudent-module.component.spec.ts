import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherViewstudentModuleComponent } from './teacher-viewstudent-module.component';

describe('TeacherViewstudentModuleComponent', () => {
  let component: TeacherViewstudentModuleComponent;
  let fixture: ComponentFixture<TeacherViewstudentModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherViewstudentModuleComponent]
    });
    fixture = TestBed.createComponent(TeacherViewstudentModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
