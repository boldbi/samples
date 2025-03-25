import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Util } from '../services/util.service';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { RadioButtonService } from '../radiobutton.service';
import { ComboBoxComponent } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{

  @ViewChild('sample') comboBoxInstance!: ComboBoxComponent;

  constructor(private authService: AuthService, private router: Router, private userService: UserService, private util: Util, private radioButtonService: RadioButtonService) {}

  public userData : any[] = [];
  public useremail = '';
  public loginError='';
  public userID = 'region';
  // maps the appropriate column to fields property
  fields: object = { groupBy: 'usertenant', text: 'useremail', value: 'password' };
  public selectedUser: string | null = null;
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
      else
      {
        this.password = "";
        this.clearComboBoxSelection();
      }
    }
    else
    {
      this.password = "";
    }
  }

  isUserInData(username: string): boolean {
    var isUserPresent = this.userData.some(user => user.username === username)
    return isUserPresent;
  }
  clearComboBoxSelection(): void {
    if (this.comboBoxInstance) {
      this.comboBoxInstance.clear();
    }
  }

  onRadioChange(event: any): void {
    this.userID = event.value;
    const filterParams = document.querySelectorAll(".filter-param");
    const filterValues = {
      email: [
        'user_email = "john@alphaelectronics.com"',
        'user_email = "sarah@alphaelectronics.com"',
        'user_email = "michel@alphaelectronics.com"',
        'user_email = "lisa@betaenterprises.com"',
        'user_email = "chris@betaenterprises.com"',
        'user_email = "sophia@betaenterprises.com"',
        'user_email = "matthew@gammaindustries.com"',
        'user_email = "amanda@gammaindustries.com"',
        'user_email = "kevin@gammaindustries.com"',
        'user_email = "james.wilson@deltaindustries.com"',
        'user_email = "olivia.martin@deltaindustries.com"',
        'user_email = "robert.jones@deltaindustries.com"'
      ],
      guid: [
        'user_guid = "5a216f53-416c-46ba-805c-2724dd8c738c"',
        'user_guid = "24265a26-320f-426a-9d30-f9db439e1363"',
        'user_guid = "864f0a43-2235-4418-984e-7c1b0fea0a1a"',
        'user_guid = "526384c4-2b16-4fef-9a7a-e7203481c513"',
        'user_guid = "98accd79-8f09-4456-a2b8-ba981c4a99d4"',
        'user_guid = "b946e1ad-c611-40f0-bc66-13ca4689d7e2"',
        'user_guid = "aa116681-5c8c-4f8e-a87e-fb938ce9d743"',
        'user_guid = "e39ab2a3-eccf-4141-a7ed-e175ede04440"',
        'user_guid = "dd2de469-ad77-4f52-8d2a-41881152369c"',
        'user_guid = "6a9ec9a3-7fee-411b-85a9-f2e9e8d2e055"',
        'user_guid = "7ea9d145-cda4-43a5-8c6f-6f68fc53aeb8"',
        'user_guid = "1c43d130-077e-46c2-b50f-78c80bc747fa"'
      ],
      region: [
        'region = "North,East"',
        'region = "South,West"',
        'region = "East"',
        'region = "South,West"',
        'region = "Central,East"',
        'region = "North"',
        'region = "South"',
        'region = "Central,East"',
        'region = "North,West"',
        'region = "Central,East"',
        'region = "North"',
        'region = "South,West"'
      ]
    };

    filterParams.forEach((cell, index) => {
      cell.textContent = filterValues[event.value as keyof typeof filterValues][index] || "nill";
    });
    event.value
  }
  ngOnInit(): void {
    
    this.onRadioChange({ value: this.userID });
    this.util.disableCssFiles();
    const imagePaths = [
      'assets/Amanda-min.png',
      'assets/Chris-min.png',
      'assets/custom-attribute-workflow.jpg',
      'assets/David-min.png',
      'assets/Emily-min.png',
      'assets/James Wilson-min.png',
      'assets/Jessica-min.png',
      'assets/John-min.png',
      'assets/Kevin-min.png',
      'assets/Lisa-min.png',
      'assets/Matthew-min.png',
      'assets/Maximize.svg',
      'assets/Michel-min.png',
      'assets/Minimize.svg',
      'assets/Olivia Martin-min.png',
      'assets/Rachel Adams-min.png',
      'assets/Robert Jones-min.png',
      'assets/Sarah-min.png',
      'assets/Sophia-min.png'
    ];
    imagePaths.forEach((path) => {
      const img = new Image();
      img.src = path;
    });
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

  // ngAfterViewInit() {
  //   this.comboBoxInstance.value = null;
  // }
  onSubmit(): void {
    if (!this.useremail || !this.password) {
      this.loginError = 'Both UserName and Password are required.';
      return; // Don't submit the form if fields are empty
    }
    this.radioButtonService.setRadioValue(this.userID);
    this.authService.login(this.useremail, this.password).subscribe(
      (response) => {
        if (response.accessToken) {
          // Store the token securely (e.g., in local storage)
          localStorage.setItem('custom-attribute-token', response.accessToken);
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
    const token = localStorage.getItem('custom-attribute-token'); // Retrieve the JWT token
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken?.tenantId || null; // Adjust the key to match your token's structure
    }
    return null;
  }

  showPopup = false;

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }
  
  public formatTenantName(usertenant: string): string {
    return usertenant
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  isModalOpen = false;
  tableHTML: string = ''; // Store the table's HTML content

  // Function to toggle the table view in modal
  toggleTableView() {
    const tableContainer = document.getElementById('tableContainer') as HTMLElement;
    if (tableContainer) {
      this.tableHTML = tableContainer.outerHTML;

      // Open the modal
      this.isModalOpen = true;
    }
  }

  // Function to close the modal
  closeTableView() {
    this.isModalOpen = false;
  }
}

interface User {
  id: number;
  username: string;
  useremail: string;
  role: string;
  userguid: string;
  usertenant: string;
  password: string;
  customattribute: string; // Assuming it's a JSON string
}