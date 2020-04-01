import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPlayersAdministrationComponent } from './event-players-administration.component';

describe('EventPlayersAdministrationComponent', () => {
  let component: EventPlayersAdministrationComponent;
  let fixture: ComponentFixture<EventPlayersAdministrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventPlayersAdministrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPlayersAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
