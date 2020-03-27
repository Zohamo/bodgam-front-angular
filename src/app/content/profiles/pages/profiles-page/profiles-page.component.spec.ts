import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesPageComponent } from './profiles-page.component';

describe('ProfilesPageComponent', () => {
  let component: ProfilesPageComponent;
  let fixture: ComponentFixture<ProfilesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilesPageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
