/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WebmarkListComponent } from './bookmark-list.component';

describe('NoteListComponent', () => {
  let component: WebmarkListComponent;
  let fixture: ComponentFixture<WebmarkListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebmarkListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebmarkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
