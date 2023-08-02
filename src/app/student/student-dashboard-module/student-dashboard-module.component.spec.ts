import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDashboardModuleComponent } from './student-dashboard-module.component';

describe('StudentDashboardModuleComponent', () => {
  let component: StudentDashboardModuleComponent;
  let fixture: ComponentFixture<StudentDashboardModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentDashboardModuleComponent]
    });
    fixture = TestBed.createComponent(StudentDashboardModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
