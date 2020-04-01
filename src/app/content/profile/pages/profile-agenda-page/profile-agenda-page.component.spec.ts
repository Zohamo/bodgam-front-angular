import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAgendaPageComponent } from './profile-agenda-page.component';

describe('ProfileAgendaPageComponent', () => {
  let component: ProfileAgendaPageComponent;
  let fixture: ComponentFixture<ProfileAgendaPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileAgendaPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAgendaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
