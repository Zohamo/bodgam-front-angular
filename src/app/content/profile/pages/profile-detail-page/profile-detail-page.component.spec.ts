import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDetailPageComponent } from './profile-detail-page.component';

describe('ProfileDetailPageComponent', () => {
  let component: ProfileDetailPageComponent;
  let fixture: ComponentFixture<ProfileDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileDetailPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
