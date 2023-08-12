import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherSheduleModuleComponent } from './teacher-shedule-module.component';

describe('TeacherSheduleModuleComponent', () => {
  let component: TeacherSheduleModuleComponent;
  let fixture: ComponentFixture<TeacherSheduleModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherSheduleModuleComponent]
    });
    fixture = TestBed.createComponent(TeacherSheduleModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
