/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LogoScullyComponent } from './logo-scully.component';

describe('LogoScullyComponent', () => {
  let component: LogoScullyComponent;
  let fixture: ComponentFixture<LogoScullyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoScullyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoScullyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
