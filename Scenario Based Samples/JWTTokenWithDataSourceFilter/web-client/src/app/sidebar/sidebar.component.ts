import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private authService: AuthService, private router: Router) {}
  signout()
  {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  formattedTenant: string = '';
    formattedusername: string = '';
    ngOnInit() {
      const userDetails = this.getUserDetails();
      const userTenant = userDetails.tenantId;
      const username = userDetails.username;
  
      if (userTenant && username) {
        this.formattedTenant = userTenant
          .replace("-", " ")
          .split(" ")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(" ");
          this.formattedusername = username;
      } else {
        this.formattedTenant = "";
      }
    }
    private decodeToken(token: string): any {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload); // Decode Base64 string
      return JSON.parse(decodedPayload);
    }
    getUserDetails(): { tenantId: string | null, username: string | null } {
      const token = localStorage.getItem('custom-attribute-token');
      if (token) {
        const decodedToken: any = jwtDecode(token);
        return {
          tenantId: decodedToken?.tenantId || null, // Adjust the key to match your token's structure
          username: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || null // Adjust the key for username
        };
      }
      return { tenantId: null, username: null };
    }
}
