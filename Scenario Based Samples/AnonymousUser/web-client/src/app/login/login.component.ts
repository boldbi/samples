import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Switch } from '@syncfusion/ej2-buttons';
import { SwitchStateService } from '../switch-state.service';
import userData from '../../assets/anonymoususer.json';
import { HttpClient } from '@angular/common/http';
import { FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{
  username = '';
  password = '';
  loginError='';
  userData: any[] = []; // Store user emails
  filteredData: any[] = []; // Filtered data for dropdown
  selectedUser!: string;
  fields: Object = { text: 'email', value: 'email' };
  height: string = '250px';

  switchObj1!: Switch;
  switchObj2!: Switch;
  switchObj3!: Switch;
  
  switchState1!: boolean;
  switchState2!: boolean;
  switchState3!: boolean;

  isgroupNameColumnVisible!: boolean;
  isuserEmailColumnVisible!: boolean;
  isInvalidGroupNameColumn!: boolean;
  constructor(private http: HttpClient, private authService: AuthService, private router: Router, private switchStateService: SwitchStateService) {
  }

  ngOnInit(): void {
    //this.userData = userData;
    this.http.get<any[]>('assets/anonymoususer.json').subscribe(data => {
      this.userData = data;
      this.filteredData = data; // Initialize filtered data
    });
    
    // Subscribe to switch states
    this.switchStateService.switchState1$.subscribe(state => {
      this.switchState1 = state;
      this.isgroupNameColumnVisible = state;
      if (this.switchObj1) this.switchObj1.checked = state;
    });

    this.switchStateService.switchState2$.subscribe(state => {
      this.switchState2 = state;
      this.isuserEmailColumnVisible = state;
      if (this.switchObj2) this.switchObj2.checked = state;
    });

    this.switchStateService.switchState3$.subscribe(state => {
      this.switchState3 = state;
      this.isInvalidGroupNameColumn = state;
      if (this.switchObj3) this.switchObj3.checked = state;
    });

    // Create Syncfusion Switches
    this.switchObj1 = new Switch({ 
      checked: this.switchState1,
      change: (args: any) => this.switchStateService.setSwitchState(1, args.checked)
    });
    this.switchObj1.appendTo('#switch1');

    this.switchObj2 = new Switch({ 
      checked: this.switchState2,
      change: (args: any) => this.switchStateService.setSwitchState(2, args.checked)
    });
    this.switchObj2.appendTo('#switch2');

    this.switchObj3 = new Switch({ 
      checked: this.switchState3,
      change: (args: any) => this.switchStateService.setSwitchState(3, args.checked)
    });
    this.switchObj3.appendTo('#switch3');

    // Check if the user's token is valid
    if (this.authService.isAuthenticated()) {
      // Token is valid, navigate to the home page
      this.router.navigate(['/dashboard']); // '/home' is the route to your home page
    }
  }
  onUserChange(event: any) {
    console.log('Selected User:', event.value);
    this.selectedUser = event.value;
    this.username = event.value;
    
    // Find the selected user's password and set it
    const selectedUserObj = this.userData.find(user => user.email === this.selectedUser);
    this.password = selectedUserObj ? selectedUserObj.password : ''
  }

  onFiltering(event: FilteringEventArgs) {
    let query = event.text.toLowerCase();
    
    // Filter email addresses based on the typed input
    event.updateData(
      this.userData.filter(user => user.email.toLowerCase().includes(query))
    );
  }
  
  onSubmit(): void {
    console.log('Selected Email:', this.selectedUser);
    console.log('Password:', this.password);
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
