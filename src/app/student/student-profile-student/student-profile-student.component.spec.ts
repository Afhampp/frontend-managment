import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProfileStudentComponent } from './student-profile-student.component';

describe('StudentProfileStudentComponent', () => {
  let component: StudentProfileStudentComponent;
  let fixture: ComponentFixture<StudentProfileStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentProfileStudentComponent]
    });
    fixture = TestBed.createComponent(StudentProfileStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
