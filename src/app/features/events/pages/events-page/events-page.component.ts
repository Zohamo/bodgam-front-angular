import { Component, OnInit } from "@angular/core";
import { EventsWebService } from "../../services/events-web.service";
import { Event } from "../../models/event.model";

@Component({
  selector: "app-events-page",
  templateUrl: "./events-page.component.html",
  styleUrls: ["./events-page.component.scss"]
})
export class EventsPageComponent implements OnInit {
  public events: Event[];

  constructor(private eventsWebService: EventsWebService) {}

  ngOnInit() {
    this.getEvents();
  }

  getEvents(): void {
    /*
    this.eventsWebService.getEvents().subscribe(events => {
      if (events) {
        this.events = events;
        console.log("events", events);
      }
    }); */
    this.events = [
      {
        id: 31,
        title: "Euphoria",
        startDatetime: "2019-10-06T11:20:44.000Z",
        endDatetime: "2019-10-06T11:20:44.000Z",
        level: 2,
        minPlayers: 2,
        maxPlayers: 6,
        playersId: "2,||10,",
        description: null,
        userId: 6,
        locationId: 32
      },
      {
        id: 32,
        title: "Blood Rage",
        startDatetime: "2019-06-22T13:00:00.000Z",
        endDatetime: "2019-06-22T16:00:00.000Z",
        level: 3,
        minPlayers: 2,
        maxPlayers: 4,
        playersId: "2,8,||4,",
        description: "attention les grosses baffes...",
        userId: 6,
        locationId: 32
      },
      {
        id: 38,
        title: "Euphoria",
        startDatetime: "2019-10-06T11:21:29.000Z",
        endDatetime: "2019-10-06T11:21:29.000Z",
        level: 2,
        minPlayers: 2,
        maxPlayers: 6,
        playersId: "2,||10,",
        description: null,
        userId: 6,
        locationId: 32
      },
      {
        id: 34,
        title: "Endeavor",
        startDatetime: "2019-08-01T11:56:00.000Z",
        endDatetime: null,
        level: 0,
        minPlayers: 2,
        maxPlayers: 4,
        playersId: "4,||6,",
        description: null,
        userId: 8,
        locationId: 28
      },
      {
        id: 35,
        title: "Plein de nouveautés !",
        startDatetime: "2019-09-05T12:49:00.000Z",
        endDatetime: null,
        level: 0,
        minPlayers: 1,
        maxPlayers: 13,
        playersId: "||",
        description: null,
        userId: 8,
        locationId: 29
      }
    ];
  }

  public eventTrackBy(index, item): number | null {
    return item ? item.id : null;
  }

  getEvent(id: number): void {
    this.eventsWebService.getEvent(id).subscribe(event => {
      if (event) {
        return event;
      }
    });
  }
}
