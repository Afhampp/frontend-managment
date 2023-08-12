import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorSchedulingComponent } from './administrator-scheduling.component';

describe('AdministratorSchedulingComponent', () => {
  let component: AdministratorSchedulingComponent;
  let fixture: ComponentFixture<AdministratorSchedulingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministratorSchedulingComponent]
    });
    fixture = TestBed.createComponent(AdministratorSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
