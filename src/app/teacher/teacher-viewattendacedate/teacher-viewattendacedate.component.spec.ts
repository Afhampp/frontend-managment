import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherViewattendacedateComponent } from './teacher-viewattendacedate.component';

describe('TeacherViewattendacedateComponent', () => {
  let component: TeacherViewattendacedateComponent;
  let fixture: ComponentFixture<TeacherViewattendacedateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherViewattendacedateComponent]
    });
    fixture = TestBed.createComponent(TeacherViewattendacedateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
