import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginLinkedInComponent } from './login-linked-in.component';

describe('LoginLinkedInComponent', () => {
  let component: LoginLinkedInComponent;
  let fixture: ComponentFixture<LoginLinkedInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginLinkedInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginLinkedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
