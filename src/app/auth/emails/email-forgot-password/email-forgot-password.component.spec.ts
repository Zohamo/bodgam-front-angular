import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailForgotPasswordComponent } from './email-forgot-password.component';

describe('EmailForgotPasswordComponent', () => {
  let component: EmailForgotPasswordComponent;
  let fixture: ComponentFixture<EmailForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailForgotPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
