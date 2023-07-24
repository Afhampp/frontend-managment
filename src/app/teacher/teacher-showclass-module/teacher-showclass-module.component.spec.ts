import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherShowclassModuleComponent } from './teacher-showclass-module.component';

describe('TeacherShowclassModuleComponent', () => {
  let component: TeacherShowclassModuleComponent;
  let fixture: ComponentFixture<TeacherShowclassModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherShowclassModuleComponent]
    });
    fixture = TestBed.createComponent(TeacherShowclassModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
