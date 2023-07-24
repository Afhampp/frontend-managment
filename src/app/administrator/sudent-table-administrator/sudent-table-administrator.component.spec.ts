import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SudentTableAdministratorComponent } from './sudent-table-administrator.component';

describe('SudentTableAdministratorComponent', () => {
  let component: SudentTableAdministratorComponent;
  let fixture: ComponentFixture<SudentTableAdministratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SudentTableAdministratorComponent]
    });
    fixture = TestBed.createComponent(SudentTableAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
