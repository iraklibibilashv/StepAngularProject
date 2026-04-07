import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Api } from '../services/api';

@Component({
  selector: 'app-verify',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './verify.html',
  styleUrl: './verify.scss',
})
export class Verify {
  verify = {
    email: '',
    code: '',
  };

  loading = false;
  errorMsg = '';
  successMsg = '';

  constructor(
    private api: Api,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  onVerify() {
    if (!this.verify.email || !this.verify.code) {
      this.errorMsg = 'Please fill in all fields.';
      return;
    }

    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';
    this.router.navigate(['/login']);

    this.api.putVerify(this.verify.email, this.verify.code).subscribe({
      next: (data: any) => {
        this.successMsg = 'Email verified! Redirecting to login...';
        this.loading = false;
        this.cdr.detectChanges();
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.errorMsg = err?.error?.message || 'Invalid code. Please try again.';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }
}
