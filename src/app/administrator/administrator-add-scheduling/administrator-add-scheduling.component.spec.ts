import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorAddSchedulingComponent } from './administrator-add-scheduling.component';

describe('AdministratorAddSchedulingComponent', () => {
  let component: AdministratorAddSchedulingComponent;
  let fixture: ComponentFixture<AdministratorAddSchedulingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministratorAddSchedulingComponent]
    });
    fixture = TestBed.createComponent(AdministratorAddSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
