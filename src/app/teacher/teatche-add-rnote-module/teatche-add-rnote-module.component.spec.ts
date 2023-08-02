import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeatcheAddRnoteModuleComponent } from './teatche-add-rnote-module.component';

describe('TeatcheAddRnoteModuleComponent', () => {
  let component: TeatcheAddRnoteModuleComponent;
  let fixture: ComponentFixture<TeatcheAddRnoteModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeatcheAddRnoteModuleComponent]
    });
    fixture = TestBed.createComponent(TeatcheAddRnoteModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
