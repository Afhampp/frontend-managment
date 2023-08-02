import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherViewsubmittionModuleComponent } from './teacher-viewsubmittion-module.component';

describe('TeacherViewsubmittionModuleComponent', () => {
  let component: TeacherViewsubmittionModuleComponent;
  let fixture: ComponentFixture<TeacherViewsubmittionModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherViewsubmittionModuleComponent]
    });
    fixture = TestBed.createComponent(TeacherViewsubmittionModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
