import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordReset, User } from '@/models';
import { AuthService, AlertService } from '@/services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-password-reset-page',
  templateUrl: './password-reset-page.component.html',
  styleUrls: ['./password-reset-page.component.scss']
})
export class PasswordResetPageComponent implements OnInit {
  private token: string;
  public isLoading: boolean;

  /**
   * Creates an instance of PasswordResetPageComponent.
   *
   * @param {AlertService} alertService
   * @param {AuthService} authService
   * @param {ActivatedRoute} route
   * @param {Router} router
   * @memberof PasswordResetPageComponent
   */
  constructor(
    private alertService: AlertService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  /**
   * After Angular has initialized all data-bound properties
   *
   * @memberof PasswordResetPageComponent
   */
  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
  }

  /**
   * Call the Service to change the password
   *
   * @param {PasswordReset} data
   * @memberof PasswordResetPageComponent
   */
  public changePassword(data: PasswordReset): void {
    this.authService
      .changePassword(Object.assign(data, { token: this.token }))
      .pipe(first())
      .subscribe(
        (user: User) => {
          this.isLoading = false;
          this.alertService.open('success-change-password');
          this.router.navigate(['']);
        },
        (error) => {
          this.isLoading = false;
          this.alertService.open('error-change-password');
        }
      );
  }
}
