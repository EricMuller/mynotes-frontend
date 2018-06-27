
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkAppComponent } from './bookmark-app.component';

describe('BookmarkAppComponent', () => {
  let component: BookmarkAppComponent;
  let fixture: ComponentFixture<BookmarkAppComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BookmarkAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmarkAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
