import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/account`; // Replace with your backend URL
  user='';
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const credentials = { username, password };
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  logout(): void {
    localStorage.removeItem('token');
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
