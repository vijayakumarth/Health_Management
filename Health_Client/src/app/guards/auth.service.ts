import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private BASE_URL = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  signup(data: any) {
    return this.http.post(`${this.BASE_URL}/signup`, data);
  }

  login(data: any) {
    return this.http.post<{ token: string }>(`${this.BASE_URL}/login`, data);
  }

  logout() {
    localStorage.removeItem('token');
    // Optionally: this.router.navigate(['/login']); to redirect on logout
  }
}
