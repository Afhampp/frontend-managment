import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachermockComponentComponent } from './teachermock-component.component';

describe('TeachermockComponentComponent', () => {
  let component: TeachermockComponentComponent;
  let fixture: ComponentFixture<TeachermockComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeachermockComponentComponent]
    });
    fixture = TestBed.createComponent(TeachermockComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
