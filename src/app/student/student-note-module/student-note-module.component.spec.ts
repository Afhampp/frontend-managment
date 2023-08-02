import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentNoteModuleComponent } from './student-note-module.component';

describe('StudentNoteModuleComponent', () => {
  let component: StudentNoteModuleComponent;
  let fixture: ComponentFixture<StudentNoteModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentNoteModuleComponent]
    });
    fixture = TestBed.createComponent(StudentNoteModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
