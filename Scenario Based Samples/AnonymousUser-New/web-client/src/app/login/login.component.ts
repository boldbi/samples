import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { SwitchStateService } from '../switch-state.service';
import { HttpClient } from '@angular/common/http';
import { FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  username = '';
  password = '';
  loginError='';
  userData: any[] = []; // Store user emails
  filteredData: any[] = []; // Filtered data for dropdown
  groupfilteredData: any[] = [];
  dashboardfilteredData: any[] = [];
  parameterfilteredData: any[] = [];
  
  fields: Object = { text: 'email', value: 'email' };
  groupfield: Object = { text: 'groupName', value: 'groupName' };
  dashboardfield: Object = { text: 'dashboardName', value: 'dashboardName' };
  parameterfield: Object = { text: 'access', value: 'customattribute'}
  
  height: string = '250px';
  
  selectedUser!: string;
  selectedGroup: string = '';
  selectedDashboard: string = '';
  selectedDashboardID: string = '';
  selectedAccess: string = '';

  isDashboardEnabled: boolean = false; // Initially disabled
  isAccessEnabled: boolean = false; // Initially disabled

  isgroupNameColumnVisible!: boolean;
  isuserEmailColumnVisible!: boolean;
  isInvalidGroupNameColumn!: boolean;
  
  constructor(private http: HttpClient, private authService: AuthService, private router: Router, private switchStateService: SwitchStateService) {
  }

  ngOnInit(): void {
    this.http.get<any[]>('assets/anonymoususer.json').subscribe(data => {
      this.userData = data;
      this.filteredData = data; // Initialize filtered data
      
      // Remove duplicate group names using Map
      this.groupfilteredData = this.userData.filter((item, index, self) =>
        index === self.findIndex(t => t.groupName === item.groupName)
      );

      // Ensure dashboard filtering removes duplicates correctly
      this.dashboardfilteredData = this.userData
      .filter(item => item.dashboardName) // Remove undefined dashboards
      .filter((item, index, self) => index === self.findIndex(t => t.dashboardName === item.dashboardName));

      // Ensure parameter filtering only includes items that have `customattribute`
      this.parameterfilteredData = this.userData
      .filter(item => item.customattribute) // Ensure only items with customattribute are included
      .filter((item, index, self) => index === self.findIndex(t => t.customattribute === item.customattribute));

    });

    // Check if the user's token is valid
    if (this.authService.isAuthenticated()) {
      // Token is valid, navigate to the home page
      this.router.navigate(['/dashboard']); // '/home' is the route to your home page
    }
  }
  onUserChange(event: any) {
    console.log('Selected User:', event.target.value);
    this.selectedUser = event.target.value;
    this.username = event.target.value;
    
    // Find the selected user's password and set it
    // const selectedUserObj = this.userData.find(user => user.email === this.selectedUser);
    // this.password = selectedUserObj ? selectedUserObj.password : ''

    this.password = 'test@123';
  }

  onFiltering(event: FilteringEventArgs) {
    let query = event.text.toLowerCase();
    
    // Filter email addresses based on the typed input
    event.updateData(
      this.userData.filter(user => user.email.toLowerCase().includes(query))
    );
  }

  onDashboardFiltering(event: FilteringEventArgs) {
    let query = event.text.toLowerCase();
    
    // Filter dashboard name based on the typed input
    event.updateData(
      this.dashboardfilteredData.filter(user => user.dashboardName.toLowerCase().includes(query))
    );
  }

  onGroupChange(event: any): void {
    this.selectedGroup = event.value;
    this.isDashboardEnabled = !!this.selectedGroup; // Enable dashboard dropdown

    this.dashboardfilteredData = this.userData
    .filter(item => item.groupName === this.selectedGroup)
    .filter((item, index, self) => index === self.findIndex(t => t.dashboardName === item.dashboardName));

    // Reset dependent dropdowns
    this.selectedDashboard = '';
    this.selectedAccess = '';
    this.isAccessEnabled = false; // Disable access dropdown initially
  }

   // Enable access dropdown when dashboard is selected
   onDashboardChange(event: any): void {
    this.selectedDashboard = event.value;
    this.isAccessEnabled = !!this.selectedDashboard; // Enable access dropdown

    this.parameterfilteredData = this.userData
    .filter(item => item.dashboardName === this.selectedDashboard)
    .filter(item => item.customattribute); // Ensure only valid customattribute items are included

    const selectedDashboardItem = this.dashboardfilteredData.find(
      item => item.dashboardName === this.selectedDashboard
    );
    
    this.selectedDashboardID = selectedDashboardItem ? selectedDashboardItem.dashboardId : null;

    // Reset access selection
    this.selectedAccess = '';
  }

  onSubmit(): void {
    console.log('Selected Email:', this.selectedUser);
    console.log('Selected items:',this.selectedGroup, this.selectedDashboard, this.selectedAccess);
    this.authService.setData(this.selectedUser, this.selectedGroup, this.selectedDashboardID, this.selectedAccess);

    if (!this.selectedUser || !this.selectedGroup || !this.selectedDashboard) {
      this.loginError = 'Please provide all the details.';
      return; // Don't submit the form if fields are empty
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(this.selectedUser)){
      this.loginError = 'Please provide valid user email.';
      return; // Don't submit the form if fields are empty
    }
   
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        // Assuming your backend returns a token upon successful login
        if (response.accessToken) {
          localStorage.setItem('token', response.accessToken);
          localStorage.setItem('expirationTime', response.expires);
          console.log("response ",response.username);
          //this.router.navigate(["/dashboard"]);
          this.router.navigate(['/dashboard', this.username]);
        }
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