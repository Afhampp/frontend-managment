import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherDashboradModuleComponent } from './teacher-dashborad-module.component';

describe('TeacherDashboradModuleComponent', () => {
  let component: TeacherDashboradModuleComponent;
  let fixture: ComponentFixture<TeacherDashboradModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherDashboradModuleComponent]
    });
    fixture = TestBed.createComponent(TeacherDashboradModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
