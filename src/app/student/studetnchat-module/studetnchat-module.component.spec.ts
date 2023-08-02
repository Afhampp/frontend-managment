import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudetnchatModuleComponent } from './studetnchat-module.component';

describe('StudetnchatModuleComponent', () => {
  let component: StudetnchatModuleComponent;
  let fixture: ComponentFixture<StudetnchatModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudetnchatModuleComponent]
    });
    fixture = TestBed.createComponent(StudetnchatModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
