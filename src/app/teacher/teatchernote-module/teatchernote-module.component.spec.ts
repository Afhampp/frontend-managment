import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeatchernoteModuleComponent } from './teatchernote-module.component';

describe('TeatchernoteModuleComponent', () => {
  let component: TeatchernoteModuleComponent;
  let fixture: ComponentFixture<TeatchernoteModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeatchernoteModuleComponent]
    });
    fixture = TestBed.createComponent(TeatchernoteModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
