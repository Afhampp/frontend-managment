import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAddTableComponent } from './student-add-table.component';

describe('StudentAddTableComponent', () => {
  let component: StudentAddTableComponent;
  let fixture: ComponentFixture<StudentAddTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentAddTableComponent]
    });
    fixture = TestBed.createComponent(StudentAddTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
