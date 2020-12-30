/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LogoAngularComponent } from './logo-angular.component';

describe('LogoAngularComponent', () => {
  let component: LogoAngularComponent;
  let fixture: ComponentFixture<LogoAngularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoAngularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
