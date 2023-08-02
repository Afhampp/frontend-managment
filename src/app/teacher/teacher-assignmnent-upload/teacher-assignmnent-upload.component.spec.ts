import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAssignmnentUploadComponent } from './teacher-assignmnent-upload.component';

describe('TeacherAssignmnentUploadComponent', () => {
  let component: TeacherAssignmnentUploadComponent;
  let fixture: ComponentFixture<TeacherAssignmnentUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherAssignmnentUploadComponent]
    });
    fixture = TestBed.createComponent(TeacherAssignmnentUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
