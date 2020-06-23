import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { faExclamationTriangle, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { AlertService, AuthService } from '@/services';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, first } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public isLoading = true;
  public isEmailVerified: boolean;
  public resendEmailForm: FormGroup;
  public isSubmitted: boolean;

  // Font Awesome
  faExclamationTriangle = faExclamationTriangle;
  faPaperPlane = faPaperPlane;

  /**
   * Creates an instance of EmailVerificationComponent.
   *
   * @param {AlertService} alertService
   * @param {AuthService} authService
   * @param {ActivatedRoute} route
   * @param {Router} router
   * @memberof EmailVerificationComponent
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
   * A lifecycle hook that is called after Angular has initialized all data-bound properties
   *
   * @memberof EmailVerificationComponent
   */
  ngOnInit(): void {
    this.route.paramMap
      .pipe(switchMap((params: ParamMap) => this.authService.isUserEmailVerified(+params.get('id'))))
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        console.log('isUserEmailVerified response', response);
        this.isLoading = false;
        this.isEmailVerified = response;
        if (response) {
          this.alertService.open('email-verified');
          this.router.navigate(['/events']);
        }
      });
  }

  /**
   * Unsubscribe before component is destroyed
   *
   * @memberof EmailVerificationComponent
   */
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /**
   * Create form
   *
   * @private
   * @memberof EmailVerificationComponent
   */
  private createForm(): void {
    this.resendEmailForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  /**
   * Submit form
   *
   * @memberof EmailVerificationComponent
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
