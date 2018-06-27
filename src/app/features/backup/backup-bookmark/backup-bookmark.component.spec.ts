import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupBookmarkComponent } from './backup-bookmark.component';

describe('BackupBookmarkComponent', () => {
  let component: BackupBookmarkComponent;
  let fixture: ComponentFixture<BackupBookmarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackupBookmarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupBookmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
