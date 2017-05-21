/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TagCountComponent } from './tag-count.component';

describe('TagCloudComponent', () => {
  let component: TagCountComponent;
  let fixture: ComponentFixture<TagCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
