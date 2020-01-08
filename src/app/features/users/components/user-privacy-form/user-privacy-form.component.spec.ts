import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPrivacyFormComponent } from './user-privacy-form.component';

describe('UserPrivacyFormComponent', () => {
  let component: UserPrivacyFormComponent;
  let fixture: ComponentFixture<UserPrivacyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPrivacyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPrivacyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
