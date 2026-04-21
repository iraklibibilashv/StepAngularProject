import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Api } from '../services/api';

@Component({
  selector: 'app-register',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  constructor(
    private api: Api,
    private router: Router,
  ) {}
  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  onRegister() {
    this.api.postRegister(this.user).subscribe({
      next: (data: any) => {
        this.router.navigate(['/verify']);
      },
      error: (err) => console.error(err),
    });
  }
}
