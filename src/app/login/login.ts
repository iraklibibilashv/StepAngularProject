import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Api } from '../services/api';

@Component({
  selector: 'app-login',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  constructor(
    private api: Api,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}
  user = {
    email: 'iraklibibilashvili99@gmail.com',
    password: 'Ema@ema123',
  };
onLogin() {
  this.api.postLogin(this.user).subscribe({
    next: (data: any) => {
      localStorage.setItem('token', data.data.accessToken);
      localStorage.setItem('refreshToken', data.data.refreshToken);
      
      this.api.getMe().subscribe({
        next: (me: any) => {
          localStorage.setItem('role', me.data.role);
          this.router.navigate(['/home']);
        },
        error: () => this.router.navigate(['/home'])
      });
    },
    error: (err) => console.error(err),
  });
}
}
