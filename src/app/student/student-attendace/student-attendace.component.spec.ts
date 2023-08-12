import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAttendaceComponent } from './student-attendace.component';

describe('StudentAttendaceComponent', () => {
  let component: StudentAttendaceComponent;
  let fixture: ComponentFixture<StudentAttendaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentAttendaceComponent]
    });
    fixture = TestBed.createComponent(StudentAttendaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
