import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAddAssignmnentComponent } from './teacher-add-assignmnent.component';

describe('TeacherAddAssignmnentComponent', () => {
  let component: TeacherAddAssignmnentComponent;
  let fixture: ComponentFixture<TeacherAddAssignmnentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherAddAssignmnentComponent]
    });
    fixture = TestBed.createComponent(TeacherAddAssignmnentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
