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
    email: '',
    password: '',
  };
  onLogin() {
    this.api.postLogin(this.user).subscribe({
      next: (data: any) => {
        this.router.navigate(['/home']);
      },
      error: (err) => console.error(err),
    });
  }
}
