import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileRatingsComponent } from './profile-ratings.component';

describe('ProfileRatingsComponent', () => {
  let component: ProfileRatingsComponent;
  let fixture: ComponentFixture<ProfileRatingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileRatingsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
