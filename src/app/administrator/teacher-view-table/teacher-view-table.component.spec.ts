import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherViewTableComponent } from './teacher-view-table.component';

describe('TeacherViewTableComponent', () => {
  let component: TeacherViewTableComponent;
  let fixture: ComponentFixture<TeacherViewTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherViewTableComponent]
    });
    fixture = TestBed.createComponent(TeacherViewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
