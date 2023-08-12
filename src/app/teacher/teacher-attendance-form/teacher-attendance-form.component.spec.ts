import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAttendanceFormComponent } from './teacher-attendance-form.component';

describe('TeacherAttendanceFormComponent', () => {
  let component: TeacherAttendanceFormComponent;
  let fixture: ComponentFixture<TeacherAttendanceFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherAttendanceFormComponent]
    });
    fixture = TestBed.createComponent(TeacherAttendanceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
