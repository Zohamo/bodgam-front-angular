import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailRegisterConfirmComponent } from './email-register-confirm.component';

describe('EmailRegisterConfirmComponent', () => {
  let component: EmailRegisterConfirmComponent;
  let fixture: ComponentFixture<EmailRegisterConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailRegisterConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailRegisterConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
