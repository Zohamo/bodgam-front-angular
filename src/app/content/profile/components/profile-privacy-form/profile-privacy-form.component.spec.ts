import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePrivacyFormComponent } from './profile-privacy-form.component';

describe('ProfilePrivacyFormComponent', () => {
  let component: ProfilePrivacyFormComponent;
  let fixture: ComponentFixture<ProfilePrivacyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilePrivacyFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePrivacyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
