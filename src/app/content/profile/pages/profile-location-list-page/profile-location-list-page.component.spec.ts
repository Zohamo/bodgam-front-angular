import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLocationListPageComponent } from './profile-location-list-page.component';

describe('ProfileLocationListPageComponent', () => {
  let component: ProfileLocationListPageComponent;
  let fixture: ComponentFixture<ProfileLocationListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileLocationListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileLocationListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
