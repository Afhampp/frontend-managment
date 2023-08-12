import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministartorDashboardComponent } from './administartor-dashboard.component';

describe('AdministartorDashboardComponent', () => {
  let component: AdministartorDashboardComponent;
  let fixture: ComponentFixture<AdministartorDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministartorDashboardComponent]
    });
    fixture = TestBed.createComponent(AdministartorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
