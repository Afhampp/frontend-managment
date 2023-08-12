import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherMarkAssigmentComponent } from './teacher-mark-assigment.component';

describe('TeacherMarkAssigmentComponent', () => {
  let component: TeacherMarkAssigmentComponent;
  let fixture: ComponentFixture<TeacherMarkAssigmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherMarkAssigmentComponent]
    });
    fixture = TestBed.createComponent(TeacherMarkAssigmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
