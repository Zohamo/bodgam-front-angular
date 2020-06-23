import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
  public code: string;
  public message: string;

  /**
   * Creates an instance of ErrorPageComponent.
   *
   * @param {ActivatedRoute} route
   * @memberof ErrorPageComponent
   */
  constructor(private route: ActivatedRoute) {}

  /**
   * After Angular has initialized all data-bound properties
   *
   * @memberof ErrorPageComponent
   */
  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('code');
    this.message = this.route.snapshot.paramMap.get('message');
  }
}
