import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Switch } from '@syncfusion/ej2-buttons';
import { SwitchStateService } from '../switch-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{
  username = '';
  password = '';
  loginError='';
  switchObj!: Switch;
  switchState!: boolean;

  constructor(private authService: AuthService, private router: Router, private switchStateService: SwitchStateService) {
  }

  ngOnInit(): void {
    //let switchObj: Switch = new Switch({ onLabel: 'ON', offLabel: 'OFF', checked: true });
    //switchObj.appendTo('#element');

    // Get the stored value from the service
    this.switchStateService.switchState$.subscribe(state => {
      this.switchState = state;
      if (this.switchObj) {
        this.switchObj.checked = state; // Update the switch if it exists
      }
    });

    this.switchObj = new Switch({ 
      onLabel: 'ON', 
      offLabel: 'OFF', 
      checked: this.switchState, // Initialize from localStorage
      //checked: true, // Initial state
      change: (args: any) => { // Capture value on change
        this.switchStateService.setSwitchState(args.checked);
        console.log("Switch State Updated:", args.checked);
      }
    });
    this.switchObj.appendTo('#element');
    console.log("switch ",this.switchObj);
    // Check if the user's token is valid
    if (this.authService.isAuthenticated()) {
      // Token is valid, navigate to the home page
      this.router.navigate(['/dashboard']); // '/home' is the route to your home page
    }
  }

  onSubmit(): void {
    if (!this.username || !this.password) {
      this.loginError = 'Both UserName and Password are required.';
      return; // Don't submit the form if fields are empty
    }
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        // Assuming your backend returns a token upon successful login
        if (response.accessToken) {
          // Store the token securely (e.g., in local storage)
          localStorage.setItem('token', response.accessToken);
          localStorage.setItem('expirationTime', response.expires);
          console.log("response ",response.username);
          //this.router.navigate(["/dashboard"]);
          this.router.navigate(['/dashboard', this.username]);
          // Redirect to a protected route or perform necessary actions upon successful login
          // You can use Angular Router for navigation
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
}
