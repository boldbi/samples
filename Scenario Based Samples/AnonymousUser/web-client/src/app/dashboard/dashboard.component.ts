import { Component, OnInit } from '@angular/core';
import { BoldBI } from '@boldbi/boldbi-embedded-sdk';
import { environment } from 'src/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { SwitchStateService } from '../switch-state.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private readonly authorizationApi = `${environment.apiUrl}api/dashboard/authorize`;
  private readonly boldbisettingsApi = `${environment.apiUrl}api/dashboard/getboldbisettings`;
  mail: string = '';
  groupName: string = '';
  dashboardId: string = '';
  //groupNameSwitch = true;
  mode = BoldBI.Mode.View;
  groupNameSwitch!: boolean;

  constructor(private http: HttpClient, private authService: AuthService, private route: ActivatedRoute, private switchStateService: SwitchStateService) { }
  private dashboard: BoldBI | null = null;
  private boldbisettings: BoldBISettings | null = null;
  ngOnInit(): void {
    // this.switchStateService.switchState$.subscribe(state => {
    //   this.groupNameSwitch = state;
    //   console.log("Received Switch State:", state);
    // });
    this.groupNameSwitch = this.switchStateService.getSwitchState(); // Get initial value
    this.switchStateService.switchState$.subscribe(state => {
      this.groupNameSwitch = state;
    });
    this.mail = this.route.snapshot.paramMap.get('usermail') || '';
    console.log("maill ", this.mail);
    if(this.mail == "emily@alphaelectronics.com") {
      this.groupName = "Alpha";
      //this.dashboardId = "c980a71f-8b2b-4982-a806-cb37b05d4438";
      this.dashboardId = "2ee1f202-6f3b-4d92-b31a-a37e969a6569";
    }
    else if(this.mail == "john@betaelectronics.com") {
      this.groupName = "Beta";
      this.mode = BoldBI.Mode.Design,
      this.dashboardId = "2ee1f202-6f3b-4d92-b31a-a37e969a6569";
    }
    else if(this.mail == "sarah@gammaelectronics.com") {
      this.groupName = "Gamma";
      this.dashboardId = "cf71e712-8223-4618-841b-96395b0e002c";
    }
    else if(this.mail == "michel@deltaelectronics.com") {
      this.groupName = "Delta";
      this.dashboardId = "b75a6134-ee28-49e1-9707-043e7f7e483a";
    }
    if(this.groupNameSwitch) {
      this.groupName = "Alph";
      //this.dashboardId = "2ee1f202-6f3b-4d92-b31a-a37e969a6569";
    }

    const expirationTime: string | null = localStorage.getItem('expirationTime');
    let embedURLExpiryTime: boolean;
    if (expirationTime !== null) {
      const expirationTimeLocal: Date = new Date(expirationTime);
      const currentTime = new Date();    
      embedURLExpiryTime = expirationTimeLocal > currentTime;  
      if (!embedURLExpiryTime ) {
        this.authService.logout();
      } else {
        this.fetchBoldBISettings();
      }
    }
    else{
      this.authService.logout();
    }
}
  fetchBoldBISettings() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    this.http.get<BoldBISettings>(this.boldbisettingsApi,{headers}).subscribe(
      (result) => {
        this.boldbisettings=result;
        this.ongetBoldBISettingsSuccess();
      },
      (error) => {
        console.error('Error fetching data:', error);
        // Check if the error is an HTTP error
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401 || error.status === 403) {
            this.authService.logout();
          } 
        }
      }
    );
  }

  ongetBoldBISettingsSuccess() {
    this.dashboard= BoldBI.create({
      serverUrl: `${this.boldbisettings?.ServerUrl ?? ''}/${this.boldbisettings?.SiteIdentifier ?? ''}`,
      //dashboardId: this.boldbisettings?.DashboardId,
      dashboardId: this.dashboardId,
      //dashboardId: "cf71e712-8223-4618-841b-96395b0e002c",
      //datasourceId: "0e9fe1f9-c8db-466d-80be-3ea72e974435", // <-- Update this line            
      embedContainerId: "dashboard",
      embedType: BoldBI.EmbedType.Component,
      environment: this.boldbisettings?.Environment,
      mode: this.mode,
      //mode: BoldBI.Mode.View,
      //mode: BoldBI.Mode.Design,
      //mode: BoldBI.Mode.DataSource,
      width: "100%",
      height: "100%",
      authorizationServer: {
          url:this.authorizationApi,
          headers: {
            "Authorization": "Bearer " + localStorage.getItem('token'),
            //"customattribute": "edfd"
       }
      },
      dashboardSettings: {
        showHeader: false,
      },
      anonymousToken: {
        isEnabled: true,
        groupName: this.groupName,
        userEmail: this.mail,

        //groupName: "",
        //userEmail: ""
      }        
    });
    if(this.mode == BoldBI.Mode.View) {
     this.dashboard?.loadDashboard();
    }
    else {
      this.dashboard?.loadDesigner();
    }
  }
 

}
interface BoldBISettings {
 
  ServerUrl: string;
  SiteIdentifier: string;
  Environment: string;
  DashboardId: string;
  ExpirationTime: string;

}
