import { ChangeDetectorRef, Component } from '@angular/core';
import { Api } from '../services/api';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgotpassword',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './forgotpassword.html',
  styleUrl: './forgotpassword.scss',
})
export class Forgotpassword {
  email = '';
  loading = false;
  errorMsg = '';
  successMsg = '';

  constructor(
    private api: Api,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  onSubmit() {
    if (!this.email) {
      this.errorMsg = 'Please enter your email address.';
      return;
    }

    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';

    this.api.postForgotPassword(this.email).subscribe({
      next: (data: any) => {
        this.successMsg = 'Reset code sent! Check your email.';
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMsg = err?.error?.message || 'Something went wrong. Try again.';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }
}
