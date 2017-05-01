/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WebmarkComponent } from './webmark.component';

describe('NoteComponent', () => {
  let component: WebmarkComponent;
  let fixture: ComponentFixture<WebmarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebmarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
