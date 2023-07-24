import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherHomeModuleComponent } from './teacher-home-module.component';

describe('TeacherHomeModuleComponent', () => {
  let component: TeacherHomeModuleComponent;
  let fixture: ComponentFixture<TeacherHomeModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherHomeModuleComponent]
    });
    fixture = TestBed.createComponent(TeacherHomeModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
