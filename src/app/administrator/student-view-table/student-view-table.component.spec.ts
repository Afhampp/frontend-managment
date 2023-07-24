import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentViewTableComponent } from './student-view-table.component';

describe('StudentViewTableComponent', () => {
  let component: StudentViewTableComponent;
  let fixture: ComponentFixture<StudentViewTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentViewTableComponent]
    });
    fixture = TestBed.createComponent(StudentViewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
