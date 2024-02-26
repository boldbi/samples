import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}api/account/login`; // Replace with your backend URL
  user='';
  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    const credentials = { username, password };
    return this.http.post(this.apiUrl, credentials);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(["/login"]);
  }

  getToken(): string | null {
    // Implement a method to retrieve the token from a secure location (e.g., local storage)
    return localStorage.getItem('token');

  }

  isAuthenticated(): boolean {
    // Check if the user is authenticated by verifying the token
    const token = this.getToken();
    if (token !== 'undefined' && token !== null) {
  // Implement token verification logic (e.g., using JWT library)
      return true; // Token is defined and not null
    } else {
      return false; // Token is undefined or null
    }
  }
}
