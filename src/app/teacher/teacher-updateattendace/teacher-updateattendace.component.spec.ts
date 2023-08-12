import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherUpdateattendaceComponent } from './teacher-updateattendace.component';

describe('TeacherUpdateattendaceComponent', () => {
  let component: TeacherUpdateattendaceComponent;
  let fixture: ComponentFixture<TeacherUpdateattendaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherUpdateattendaceComponent]
    });
    fixture = TestBed.createComponent(TeacherUpdateattendaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
