import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherSheduleClassComponent } from './teacher-shedule-class.component';

describe('TeacherSheduleClassComponent', () => {
  let component: TeacherSheduleClassComponent;
  let fixture: ComponentFixture<TeacherSheduleClassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherSheduleClassComponent]
    });
    fixture = TestBed.createComponent(TeacherSheduleClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
