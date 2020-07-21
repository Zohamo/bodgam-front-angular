import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { faExclamationTriangle, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { AlertService, AuthService } from '@/services';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, first } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-verification-page',
  templateUrl: './email-verification-page.component.html',
  styleUrls: ['./email-verification-page.component.scss']
})
export class EmailVerificationPageComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public isLoading = true;
  public isEmailVerified: boolean;
  public resendEmailForm: FormGroup;
  public isSubmitted: boolean;

  // UI
  faExclamationTriangle = faExclamationTriangle;
  faPaperPlane = faPaperPlane;

  /**
   * Creates an instance of EmailVerificationPageComponent.
   *
   * @param {AlertService} alertService
   * @param {AuthService} authService
   * @param {ActivatedRoute} route
   * @param {Router} router
   * @memberof EmailVerificationPageComponent
   */
  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.createForm();
  }

  /**
   * Called after Angular has initialized all data-bound properties
   *
   * @memberof EmailVerificationPageComponent
   */
  ngOnInit(): void {
    this.route.paramMap
      .pipe(switchMap((params: ParamMap) => this.authService.isUserEmailVerified(+params.get('id'))))
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (response) => {
          this.isLoading = false;
          this.isEmailVerified = response;
          if (response) {
            this.alertService.open('success-email-verified');
            this.router.navigate(['/events']);
          } else {
            this.alertService.open('email-not-verified');
          }
        },
        (error) => {
          this.isLoading = false;
          this.alertService.open('error-email-verified');
        }
      );
  }

  /**
   * Unsubscribe before component is destroyed
   *
   * @memberof EmailVerificationPageComponent
   */
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /**
   * Create form
   *
   * @private
   * @memberof EmailVerificationPageComponent
   */
  private createForm(): void {
    this.resendEmailForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  /**
   * Submit form
   *
   * @memberof EmailVerificationPageComponent
   */
  public onSubmit(): void {
    if (this.resendEmailForm.invalid) {
      return;
    }

    this.isSubmitted = true;
    this.authService
      .resendVerificationEmail(this.resendEmailForm.value)
      .pipe(first())
      .subscribe(
        (response) => {
          if (!response) {
            this.alertService.open('error-email-verification-resent');
            this.isSubmitted = false;
          } else {
            this.alertService.open('success-email-verification-resent');
            this.router.navigate(['']);
          }
        },
        (error) => {
          this.isSubmitted = false;
          switch (error) {
            case 'Not Found':
              this.alertService.open('error-email-not-found');
              break;
            case 'Unprocessable Entity':
              this.alertService.open('error-email-already-verified');
              this.router.navigate(['']);
              break;
            default:
              this.alertService.open('error');
          }
        }
      );
  }
}
