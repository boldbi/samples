import { Component } from '@angular/core';
import Popper from 'popper.js';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  logout() {
   
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
