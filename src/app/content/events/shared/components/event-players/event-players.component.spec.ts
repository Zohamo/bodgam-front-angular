import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPlayersComponent } from './event-players.component';

describe('EventPlayersComponent', () => {
  let component: EventPlayersComponent;
  let fixture: ComponentFixture<EventPlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventPlayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
