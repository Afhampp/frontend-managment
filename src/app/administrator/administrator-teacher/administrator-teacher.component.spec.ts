import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorTeacherComponent } from './administrator-teacher.component';

describe('AdministratorTeacherComponent', () => {
  let component: AdministratorTeacherComponent;
  let fixture: ComponentFixture<AdministratorTeacherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministratorTeacherComponent]
    });
    fixture = TestBed.createComponent(AdministratorTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
