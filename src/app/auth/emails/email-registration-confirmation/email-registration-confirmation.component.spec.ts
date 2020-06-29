import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailRegistrationConfirmationComponent } from './email-registration-confirmation.component';

describe('EmailRegistrationConfirmationComponent', () => {
  let component: EmailRegistrationConfirmationComponent;
  let fixture: ComponentFixture<EmailRegistrationConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailRegistrationConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailRegistrationConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
