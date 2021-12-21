/* eslint-disable @typescript-eslint/no-unused-vars */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LogoGithubComponent } from './logo-github.component';

describe('LogoGithubComponent', () => {
  let component: LogoGithubComponent;
  let fixture: ComponentFixture<LogoGithubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoGithubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoGithubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
