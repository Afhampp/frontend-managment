import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAtteandanceClassComponent } from './teacher-atteandance-class.component';

describe('TeacherAtteandanceClassComponent', () => {
  let component: TeacherAtteandanceClassComponent;
  let fixture: ComponentFixture<TeacherAtteandanceClassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherAtteandanceClassComponent]
    });
    fixture = TestBed.createComponent(TeacherAtteandanceClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
