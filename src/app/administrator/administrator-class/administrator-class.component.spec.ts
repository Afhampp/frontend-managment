import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorClassComponent } from './administrator-class.component';

describe('AdministratorClassComponent', () => {
  let component: AdministratorClassComponent;
  let fixture: ComponentFixture<AdministratorClassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministratorClassComponent]
    });
    fixture = TestBed.createComponent(AdministratorClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
