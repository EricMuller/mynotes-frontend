import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderCreateDialogComponent } from './folder-create-dialog.component';

describe('FolderCreateDialogComponent', () => {
  let component: FolderCreateDialogComponent;
  let fixture: ComponentFixture<FolderCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
