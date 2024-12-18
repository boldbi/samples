import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token'); // Check if the token exists
    if (token) {
      const tenant = this.getUserTenant(token); // Extract tenant from the token
      if (tenant) {
        // Redirect logged-in user to their tenant's dashboard
        this.router.navigate([`/${tenant}/dashboard`]);
        return false; // Prevent navigation to the guarded route
      }
    }
    return true; // Allow navigation if no user is logged in
  }

  private decodeToken(token: string): any {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
  }

  private getUserTenant(token: string): string | null {
    const decodedToken = this.decodeToken(token);
    return decodedToken?.tenantId || null;
  }
}
