import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
    logout() {
    localStorage.removeItem('token');
     localStorage.removeItem('role');
      localStorage.removeItem('refreshToken');
  }
  isAdmin(): boolean {
  return localStorage.getItem('role') === 'Admin';
}
}
