import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherClassTeacherComponent } from './teacher-class-teacher.component';

describe('TeacherClassTeacherComponent', () => {
  let component: TeacherClassTeacherComponent;
  let fixture: ComponentFixture<TeacherClassTeacherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherClassTeacherComponent]
    });
    fixture = TestBed.createComponent(TeacherClassTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
