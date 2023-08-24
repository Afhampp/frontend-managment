import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentForgetpasswordComponent } from './student-forgetpassword.component';

describe('StudentForgetpasswordComponent', () => {
  let component: StudentForgetpasswordComponent;
  let fixture: ComponentFixture<StudentForgetpasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentForgetpasswordComponent]
    });
    fixture = TestBed.createComponent(StudentForgetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
