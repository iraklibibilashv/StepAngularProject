import { ChangeDetectorRef, Component } from '@angular/core';
import { Api } from '../services/api';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resetpassword',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './resetpassword.html',
  styleUrl: './resetpassword.scss',
})
export class Resetpassword {
  data = {
    token: '',
    password: '',
    confirmPassword: '',
  };

  loading = false;
  errorMsg = '';
  successMsg = '';

  constructor(
    private api: Api,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  onReset() {
    if (!this.data.token || !this.data.password) {
      this.errorMsg = 'Please fill in all fields.';
      return;
    }
    if (this.data.password !== this.data.confirmPassword) {
      this.errorMsg = 'Passwords do not match.';
      return;
    }

    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';

    this.api.putResetPassword(this.data.token, this.data.password).subscribe({
      next: (res: any) => {
        this.successMsg = 'Password reset! Redirecting to login...';
        this.loading = false;
        this.cdr.detectChanges();
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.errorMsg = err?.error?.message || 'Invalid or expired token.';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }
}
