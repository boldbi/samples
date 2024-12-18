import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Util } from '../services/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{

  constructor(private authService: AuthService, private router: Router, private userService: UserService, private util: Util) {}

  public userData : any[] = [];
  public useremail = '';
  public loginError='';
  // maps the appropriate column to fields property
  fields: object = { text: 'useremail', value: 'password' };
  selectedUser: any;
  password: string = '';
  height: string = '250px';
  // set the height of the popup element
  onUserChange(event: any): void {
    if(event.itemData)
    {
      this.useremail = event.itemData.useremail;
      const user = this.userData.find(u => u.useremail === event.itemData.useremail);
      if (user) {
        this.password = user.password;
      }
    }
    else
    {
      this.password = "";
    }
  }


  ngOnInit(): void {
    this.util.disableCssFiles();
    // Check if the user's token is valid
    if (this.authService.isAuthenticated()) {
      const userTenant = this.getUserTenant();
      this.util.enableCssFiles();
      if (userTenant) {
        this.router.navigate([`/${userTenant}/dashboard`]);
      } else {
        this.router.navigate(['/dashboard']);
      }
    }
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.userData = data.sort((a, b) => a.id - b.id);
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
  onSubmit(): void {
    if (!this.useremail || !this.password) {
      this.loginError = 'Both UserName and Password are required.';
      return; // Don't submit the form if fields are empty
    }
    this.authService.login(this.useremail, this.password).subscribe(
      (response) => {
        if (response.accessToken) {
          // Store the token securely (e.g., in local storage)
          localStorage.setItem('token', response.accessToken);
          localStorage.setItem('expirationTime', response.expires);
          this.util.enableCssFiles();
          // const tenantDashboardUrl = `/${response.usertenant}/dashboard`;
          // localStorage.setItem('redirectUrl', tenantDashboardUrl);
          // this.router.navigate([tenantDashboardUrl]);
          this.router.navigate([`/${response.usertenant}/dashboard`]);
          
        } //else {
          //alert('Login failed. Please try again.');
       // }
      },
      (error) => {
        if (error.status === 401) {
          this.loginError = "Please provide valid username and password"
        }
        else{
          console.error('Login error:', error);
          this.loginError = error.statusText;
        }        
      }
    );
  }
  private decodeToken(token: string): any {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload); // Decode Base64 string
    return JSON.parse(decodedPayload);
  }
  getUserTenant(): string | null {
    const token = localStorage.getItem('token'); // Retrieve the JWT token
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken?.tenantId || null; // Adjust the key to match your token's structure
    }
    return null;
  }
}
