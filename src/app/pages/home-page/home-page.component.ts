import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { faFlask, faHeart } from '@fortawesome/free-solid-svg-icons';
import { UserRegisterDialogComponent } from '@/auth/components';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  faFlask = faFlask;
  faHeart = faHeart;

  url =
    'https://docs.google.com/forms/d/e/1FAIpQLSfgHYc3rQqpYwsXbIAG40oG-i2iw7Rkdr-WSjwHOJJn--tsiw/viewform?usp=pp_url';
  urlSafe: SafeResourceUrl;

  constructor(private dialog: MatDialog, public sanitizer: DomSanitizer) {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  /**
   * Event to register new user
   *
   * @memberof HomePageComponent
   */
  public onRegister(): void {
    this.dialog.open(UserRegisterDialogComponent);
  }
}
