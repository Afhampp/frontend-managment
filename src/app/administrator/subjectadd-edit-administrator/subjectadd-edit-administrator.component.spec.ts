import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectaddEditAdministratorComponent } from './subjectadd-edit-administrator.component';

describe('SubjectaddEditAdministratorComponent', () => {
  let component: SubjectaddEditAdministratorComponent;
  let fixture: ComponentFixture<SubjectaddEditAdministratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubjectaddEditAdministratorComponent]
    });
    fixture = TestBed.createComponent(SubjectaddEditAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
