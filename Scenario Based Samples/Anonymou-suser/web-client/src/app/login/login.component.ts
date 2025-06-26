import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { SwitchStateService } from '../switch-state.service';
import { HttpClient } from '@angular/common/http';
import { ComboBoxComponent, FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-login1',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  loginError = '';

  dropdownDataTenant = '';
  dropdownDataUsername = '';
  dropdownDataUseremail = '';
  dropdownDataCustAttr = '';
  dropdownDataRole = '';
  dropdownDataFilterParameter = '';
  dropdownDataAccess = '';

  userData: any[] = []; // Store user emails
  filteredData: any[] = []; // Filtered data for dropdown
  dropdownData: any[] = [];
  selectedUser!: string;
  //selectedUser: string | null = null;
  fields: Object = { groupBy: 'tenant', text: 'displayText', value: 'email' };
  height: string = '180px';
  showPopup = false;
  showPopup1 = false;
  popupselectedOption: string = 'structure'; // Default selection

  @ViewChild('sample') comboBoxInstance!: ComboBoxComponent;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router, private switchStateService: SwitchStateService) {
  }

  ngAfterViewInit() {
    const container = document.getElementById("games"); // Parent container
    if (container) {
      const observer = new MutationObserver(() => {
        let infoIcon = document.getElementById("email-infoicon");
        let infoTooltip = document.getElementById("dropdown-infoTooltip");
        if (infoIcon && infoTooltip) {
          infoIcon.addEventListener("mouseenter", () => {
            infoTooltip?.classList.add("show");
          });

          infoIcon.addEventListener("mouseleave", () => {
            infoTooltip?.classList.remove("show");
          });

          observer.disconnect(); // Stop observing once the icon is found
        }
      });

      observer.observe(container, { childList: true, subtree: true });
    } else {
      console.error("Container not found!");
    }
  }

  ngOnInit(): void {
    this.http.get<any[]>('assets/anonymoususer.json').subscribe(data => {
      this.userData = data;
      this.filteredData = data; // Initialize filtered data

      // Modify the data to include a new 'displayText' field
      this.filteredData = this.filteredData.map(user => ({
        ...user,
        displayText: `${user.email} (${user.access})`
      }));
    });

    // Check if the user's token is valid
    if (this.authService.isAuthenticated()) {
      // Token is valid, navigate to the home page
      this.router.navigate(['/dashboard']); // '/home' is the route to your home page
    }
  }

  openPopup() {
    this.showPopup = true;
    this.popupselectedOption = "structure";
  }

  closePopup() {
    this.showPopup = false;
  }

  openPopup1() {
    this.showPopup1 = true;
  }

  closePopup1() {
    this.showPopup1 = false;
  }

  userdetailpopup() {
    this.showPopup = true;
    this.popupselectedOption = "userdetails";
  }

  onUserChange(event: any) {
    this.selectedUser = event.value;
    this.username = event.value;
    let dropdownDiv = document.querySelector(".email-div");

    if (event.itemData != null) {
      // Find the selected user's password and set it
      const selectedUserObj = this.userData.find(user => user.email === this.selectedUser);

      //this.password = selectedUserObj ? selectedUserObj.password : '';
      if (selectedUserObj) {
        this.password = selectedUserObj.password;

        this.dropdownDataTenant = selectedUserObj.tenant;
        this.dropdownDataUsername = selectedUserObj.username;
        this.dropdownDataUseremail = selectedUserObj.email;
        this.dropdownDataCustAttr = selectedUserObj.customattribute;
        this.dropdownDataRole = selectedUserObj.role;
        this.dropdownDataFilterParameter = selectedUserObj.filterparameter;
        this.dropdownDataAccess = selectedUserObj.access;
      

      if (dropdownDiv) {
        // Select the .e-clear-icon span
        let clearIcon = dropdownDiv.querySelector('.e-clear-icon');

        if (clearIcon) {
          // Check if the span is already added
          let existingSpan = dropdownDiv.querySelector('.dropdown-info-icon');
          if (!existingSpan) {
            // Create the span element
            let infoIcon = document.createElement('span');
            infoIcon.className = 'dropdown-info-icon ion-information-circled';
            infoIcon.id = 'email-infoicon';

            infoIcon.style.paddingLeft = "6px";
            infoIcon.style.paddingTop = "2.3%";
            infoIcon.style.cursor = "pointer";
            infoIcon.style.display = "block";

            // Insert the new span **right after** the .e-clear-icon
            clearIcon.insertAdjacentElement('afterend', infoIcon);
          }
          else {
            let existingSpan = dropdownDiv?.querySelector('.dropdown-info-icon') as HTMLSpanElement;
            if (existingSpan) {
              // Show the tooltip
              existingSpan.style.display = "block";
            }
          }
        }
      }

    }
    else
    {
      this.password = '';
      this.clearComboBoxSelection();
    }
    }
    else {
      // this.username = "";
      this.password = "";
      // this.clearComboBoxSelection();
      let existingSpan = dropdownDiv?.querySelector('.dropdown-info-icon') as HTMLSpanElement;
      if (existingSpan) {
        // Show the tooltip
        existingSpan.style.display = "none";
      }
    }
  }

  clearComboBoxSelection() {
    if (this.comboBoxInstance) {
      this.comboBoxInstance.clear();
    }
  }

  onFiltering(event: FilteringEventArgs) {
    let query = event.text.toLowerCase();

    // Filter email addresses based on the typed input
    event.updateData(
      this.filteredData.filter(user => user.email.toLowerCase().includes(query))
    );
  }
  shouldShowRowspan(data: any[], index: number): boolean {
    return index % 4 === 0; // Show only on every 4th row (first of each group)
  }

  onSubmit(): void {
    if (!this.username || !this.password) {
      this.loginError = 'Both Useremail and Password are required.';
      return; // Don't submit the form if fields are empty
    }
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        // Assuming your backend returns a token upon successful login
        if (response.accessToken) {
          // Store the token securely (e.g., in local storage)
          localStorage.setItem('token', response.accessToken);
          localStorage.setItem('expirationTime', response.expires);
          //   console.log("response ",response.username);
          localStorage.setItem('AnonymousUsername', this.username);
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
        else {
          console.error('Login error:', error);
          this.loginError = error.statusText;
        }
      }
    );
  }
}