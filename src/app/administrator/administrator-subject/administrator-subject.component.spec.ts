import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorSubjectComponent } from './administrator-subject.component';

describe('AdministratorSubjectComponent', () => {
  let component: AdministratorSubjectComponent;
  let fixture: ComponentFixture<AdministratorSubjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministratorSubjectComponent]
    });
    fixture = TestBed.createComponent(AdministratorSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
