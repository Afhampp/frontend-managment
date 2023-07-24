import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassAddAdministratorComponent } from './class-add-administrator.component';

describe('ClassAddAdministratorComponent', () => {
  let component: ClassAddAdministratorComponent;
  let fixture: ComponentFixture<ClassAddAdministratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassAddAdministratorComponent]
    });
    fixture = TestBed.createComponent(ClassAddAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
