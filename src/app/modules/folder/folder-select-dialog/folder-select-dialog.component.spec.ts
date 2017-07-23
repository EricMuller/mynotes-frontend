import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderSelectDialogComponent } from './folder-select-dialog.component';

describe('FolderSelectDialogComponent', () => {
  let component: FolderSelectDialogComponent;
  let fixture: ComponentFixture<FolderSelectDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderSelectDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderSelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
