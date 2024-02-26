import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Import your authentication service

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // User is authenticated, allow access to the route
    } else {
      this.router.navigate(['/login']); // Redirect to the login page
      return false; // User is not authenticated, deny access to the route
    }
  }
}
