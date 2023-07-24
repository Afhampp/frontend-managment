import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAddTableComponent } from './teacher-add-table.component';

describe('TeacherAddTableComponent', () => {
  let component: TeacherAddTableComponent;
  let fixture: ComponentFixture<TeacherAddTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherAddTableComponent]
    });
    fixture = TestBed.createComponent(TeacherAddTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
