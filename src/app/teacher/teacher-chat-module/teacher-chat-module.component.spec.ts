import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherChatModuleComponent } from './teacher-chat-module.component';

describe('TeacherChatModuleComponent', () => {
  let component: TeacherChatModuleComponent;
  let fixture: ComponentFixture<TeacherChatModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherChatModuleComponent]
    });
    fixture = TestBed.createComponent(TeacherChatModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
