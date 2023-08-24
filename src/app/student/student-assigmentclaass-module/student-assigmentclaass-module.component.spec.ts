import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAssigmentclaassModuleComponent } from './student-assigmentclaass-module.component';

describe('StudentAssigmentclaassModuleComponent', () => {
  let component: StudentAssigmentclaassModuleComponent;
  let fixture: ComponentFixture<StudentAssigmentclaassModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentAssigmentclaassModuleComponent]
    });
    fixture = TestBed.createComponent(StudentAssigmentclaassModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
