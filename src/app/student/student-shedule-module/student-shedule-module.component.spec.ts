import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSheduleModuleComponent } from './student-shedule-module.component';

describe('StudentSheduleModuleComponent', () => {
  let component: StudentSheduleModuleComponent;
  let fixture: ComponentFixture<StudentSheduleModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentSheduleModuleComponent]
    });
    fixture = TestBed.createComponent(StudentSheduleModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
