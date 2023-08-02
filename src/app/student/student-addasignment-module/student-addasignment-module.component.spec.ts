import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAddasignmentModuleComponent } from './student-addasignment-module.component';

describe('StudentAddasignmentModuleComponent', () => {
  let component: StudentAddasignmentModuleComponent;
  let fixture: ComponentFixture<StudentAddasignmentModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentAddasignmentModuleComponent]
    });
    fixture = TestBed.createComponent(StudentAddasignmentModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
