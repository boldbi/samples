import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import { Router } from '@angular/router';
import { BoldBI } from '@boldbi/boldbi-embedded-sdk';
import { ComboBoxComponent } from '@syncfusion/ej2-angular-dropdowns';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}api/account/login`; // Replace with your backend URL
  user='';
  constructor(private http: HttpClient, private router: Router) {}

  login(useremail: string, password: string): Observable<any> {
    const credentials = { useremail, password };
    return this.http.post(this.apiUrl, credentials);
  }

  logout(): void {

    localStorage.removeItem('custom-attribute-token');
    localStorage.removeItem('expirationTime');
    this.router.navigate(["/login"]);
  }

  getToken(): string | null {
    // Implement a method to retrieve the token from a secure location (e.g., local storage)
    return localStorage.getItem('custom-attribute-token');

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


