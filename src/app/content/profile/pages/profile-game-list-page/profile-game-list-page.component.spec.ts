import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileGameListPageComponent } from './profile-game-list-page.component';

describe('ProfileGameListPageComponent', () => {
  let component: ProfileGameListPageComponent;
  let fixture: ComponentFixture<ProfileGameListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileGameListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileGameListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
