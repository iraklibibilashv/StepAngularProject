import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Api } from '../services/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-adminlogin',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './adminlogin.html',
  styleUrl: './adminlogin.scss',
})
export class Adminlogin {
  constructor(
    private api: Api,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}
  user = {
    login: 'iraklibibilashvili99@gmail.com',
    password: 'Ema@ema123',
  };
  onLogin() {
    this.api.postAdminLogin(this.user).subscribe({
      next: (data: any) => {
        localStorage.setItem('token', data.data.accessToken);
        localStorage.setItem('refreshToken', data.data.refreshToken);
        this.router.navigate(['/home']);
      },
      error: (err) => console.error(err),
    });
  }
}
