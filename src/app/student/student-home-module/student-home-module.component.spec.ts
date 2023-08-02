import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentHomeModuleComponent } from './student-home-module.component';

describe('StudentHomeModuleComponent', () => {
  let component: StudentHomeModuleComponent;
  let fixture: ComponentFixture<StudentHomeModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentHomeModuleComponent]
    });
    fixture = TestBed.createComponent(StudentHomeModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
