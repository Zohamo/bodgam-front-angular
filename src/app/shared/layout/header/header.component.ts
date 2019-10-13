import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  public user: { id: number; name: string; isAuth: boolean };

  constructor() {}

  ngOnInit() {
    this.user = {
      id: 28,
      name: "Zohamo",
      isAuth: true
    };
  }
}
