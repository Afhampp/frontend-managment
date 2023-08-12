import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherSubmitAtteandanceComponent } from './teacher-submit-atteandance.component';

describe('TeacherSubmitAtteandanceComponent', () => {
  let component: TeacherSubmitAtteandanceComponent;
  let fixture: ComponentFixture<TeacherSubmitAtteandanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherSubmitAtteandanceComponent]
    });
    fixture = TestBed.createComponent(TeacherSubmitAtteandanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
