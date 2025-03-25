import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Switch } from '@syncfusion/ej2-buttons';
import { SwitchStateService } from '../switch-state.service';
import userData from '../../assets/anonymoususer.json';
import { HttpClient } from '@angular/common/http';
import { ComboBoxComponent, FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';
//import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
//import { rippleEffect } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent implements OnInit{
 //@ViewChild('sample', { static: false }) comboBox!: ElementRef;

  username = '';
  password = '';
  loginError='';

  dropdownDataTenant = '';
  dropdownDataUsername = '';
  dropdownDataUseremail = '';
  dropdownDataCustAttr = '';
  dropdownDataRole = '';
  dropdownDataFilterParameter = '';

  userData: any[] = []; // Store user emails
  filteredData: any[] = []; // Filtered data for dropdown
  dropdownData: any[] = [];
  selectedUser!: string;
  fields: Object = { groupBy:'tenant', text: 'displayText', value: 'email' };
  height: string = '180px';
  showPopup = false;
  showPopup1 = false;
  popupselectedOption: string = 'structure'; // Default selection

  @ViewChild('sample') comboBoxInstance!: ComboBoxComponent;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router, private switchStateService: SwitchStateService) {
  }

  ngAfterViewInit() {
   // console.log("username password init ", this.username, this.password);

    const container = document.getElementById("games"); // Parent container
    // this.clearComboBoxSelection();
    // this.username = "";
    // this.password = "";
    if (container) {
      const observer = new MutationObserver(() => {

  //  const interval = setInterval(() => {

  let infoIcon = document.getElementById("email-infoicon");
  let infoTooltip = document.getElementById("dropdown-infoTooltip");

//   console.log("infoIcon:", infoIcon);
// console.log("infoTooltip:", infoTooltip);

    if (infoIcon && infoTooltip) {
      infoIcon.addEventListener("mouseenter", () => {
        infoTooltip?.classList.add("show");
      });

      infoIcon.addEventListener("mouseleave", () => {
        infoTooltip?.classList.remove("show");
      });
    
      observer.disconnect(); // Stop observing once the icon is found

 // clearInterval(interval); // Stop checking once the icon is found
// }
// }, 500); // Check every 500ms
//   }

}
});

observer.observe(container, { childList: true, subtree: true });
} else {
console.error("Container not found!");
}
  }
  
  ngOnInit(): void {
   // console.log("username password ", this.username, this.password);
    //this.userData = userData;
    this.http.get<any[]>('assets/anonymoususer.json').subscribe(data => {
      this.userData = data;
      this.filteredData = data; // Initialize filtered data

      // Modify the data to include a new 'displayText' field
      this.filteredData = this.filteredData.map(user => ({
        ...user,
        displayText: `${user.email} (${user.access})`
      }));
    });

   // const selectedUserObj = this.userData.find(user => user.email === this.selectedUser);
    // this.username = "";
    // this.password = "";

    // Check if the user's token is valid
    if (this.authService.isAuthenticated()) {
      // Token is valid, navigate to the home page
      this.router.navigate(['/dashboard']); // '/home' is the route to your home page
    }
  }

  openPopup() {
    this.showPopup = true;
    this.popupselectedOption = "structure";
    // let buttons: NodeListOf<Element> = document.querySelectorAll('label.e-btn');
    // let button: HTMLElement;
    // for (let i: number = 0; i < buttons.length; i++) {
    //     button = buttons.item(i) as HTMLElement;
    //     rippleEffect(button, { selector: '.e-btn' });
    // }
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
   // console.log('Selected User:', event.value);
    this.selectedUser = event.value;
    this.username = event.value;
    let dropdownDiv = document.querySelector(".email-div");

    // if(event.itemData)
    // {
    //   const selectedUserObj = this.userData.find(user => user.email === this.selectedUser);
    //   if (selectedUserObj) {
    //     this.password = selectedUserObj.password;
    //   }
    //   else
    //   {
    //     this.password = "";
    //     this.clearComboBoxSelection();
    //   }
    // }
    // else
    // {
    //   this.password = "";
    // }
    

    if( event.item != null && event.itemData != null) {
    // Find the selected user's password and set it
    const selectedUserObj = this.userData.find(user => user.email === this.selectedUser);
    //this.dropdownData = selectedUserObj;
    this.dropdownDataTenant = selectedUserObj.tenant;
    this.dropdownDataUsername = selectedUserObj.username;
    this.dropdownDataUseremail = selectedUserObj.email;
    this.dropdownDataCustAttr = selectedUserObj.customattribute;
    this.dropdownDataRole = selectedUserObj.role;
    this.dropdownDataFilterParameter = selectedUserObj.filterparameter;

    //console.log("dfederf ",this.dropdownData);
    this.password = selectedUserObj ? selectedUserObj.password : '';

    //let dropdownDiv = document.querySelector(".email-div");
      
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
          infoIcon.style.paddingTop = "2.5%";// "10px";
          infoIcon.style.cursor = "pointer";
          infoIcon.style.display = "block";
          
          // Insert the new span **right after** the .e-clear-icon
          clearIcon.insertAdjacentElement('afterend', infoIcon);
        }
        else {
          let existingSpan = dropdownDiv?.querySelector('.dropdown-info-icon')  as HTMLSpanElement;
          if (existingSpan) {
            // Show the tooltip
          existingSpan.style.display = "block";
          }
        }
      }
    }
  }
  else {
    // this.username = "";
    // this.password = "";
    // this.clearComboBoxSelection();
    let existingSpan = dropdownDiv?.querySelector('.dropdown-info-icon')  as HTMLSpanElement;
    if (existingSpan) {
      // Show the tooltip
     existingSpan.style.display = "none";
    }
  }
  }

  clearComboBoxSelection(): void {
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
  //  console.log('Selected Email:', this.selectedUser);
//console.log('Password:', this.password);
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
        else{
          console.error('Login error:', error);
          this.loginError = error.statusText;
        }        
      }
    );
  }
}
