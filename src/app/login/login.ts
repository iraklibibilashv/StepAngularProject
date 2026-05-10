import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Api } from '../services/api';
import { ToastService } from '../services/toast';

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
    private toast: ToastService,
  ) {}
  user = {
    email: '',
    password: '',
  };
  onLogin() {
    this.api.postLogin(this.user).subscribe({
      next: (data: any) => {
        console.log(data);

        localStorage.setItem('token', data.data.accessToken);
        localStorage.setItem('refreshToken', data.data.refreshToken);
        localStorage.setItem('email', this.user.email);
        this.toast.show('Login Succesfull', 'success');
        this.api.getMe().subscribe({
          next: (me: any) => {
            localStorage.setItem('role', me.data.role);
            localStorage.setItem('userName', me.data.firstName);
            localStorage.setItem('firstName', me.data.lastName);
            localStorage.setItem('name', me.data.firstName + ' ' + me.data.lastName);
            (window as any).initN8nChat?.();
            this.router.navigate(['/home']);
          },
          error: () => {
            (window as any).initN8nChat();
            this.router.navigate(['/home']);
          },
        });
      },
      error: (err) => console.error(err),
    });
  }
}
