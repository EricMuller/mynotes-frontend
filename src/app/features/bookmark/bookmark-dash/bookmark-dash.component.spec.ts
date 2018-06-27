
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkDashComponent } from './bookmark-dash.component';

describe('BookmarkDashComponent', () => {
  let component: BookmarkDashComponent;
  let fixture: ComponentFixture<BookmarkDashComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BookmarkDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmarkDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
