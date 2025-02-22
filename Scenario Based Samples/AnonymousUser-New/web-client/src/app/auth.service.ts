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
  private emaildata: string = '';
  private groupdata: string = '';
  private dashboarddata: string = '';
  private accessdata: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    const credentials = { username, password };
    return this.http.post(this.apiUrl, credentials);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
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

  setData(emaildata: string, group: string, dashboard: string, access: string) {
    this.emaildata = emaildata;
    this.groupdata = group;
    this.dashboarddata = dashboard;
    this.accessdata = access;

    // Store values in sessionStorage
    sessionStorage.setItem('storedAnonymousEmail', emaildata);
    sessionStorage.setItem('storedGroupName', group);
    sessionStorage.setItem('storedDashboardId', dashboard);
    sessionStorage.setItem('storedAccessInfo', access);
  }

  getemailData(): string {
    //return this.emaildata;
    return sessionStorage.getItem('storedAnonymousEmail') || this.emaildata;
  }

  getGroupData(): string {
    //return this.groupdata;
    return sessionStorage.getItem('storedGroupName') || this.groupdata;
  }

  getDashboardData(): string {
    //return this.dashboarddata;
    return sessionStorage.getItem('storedDashboardId') || this.dashboarddata;
  }

  getAccessData(): string {
    //return this.accessdata;
    return sessionStorage.getItem('storedAccessInfo') || this.accessdata;
  }

   // Remove all stored data on logout
   clearData() {
    sessionStorage.removeItem('storedAnonymousEmail');
    sessionStorage.removeItem('storedGroupName');
    sessionStorage.removeItem('storedDashboardId');
    sessionStorage.removeItem('storedAccessInfo');

    this.emaildata = '';
    this.groupdata = '';
    this.dashboarddata = '';
    this.accessdata = '';
  }

}
