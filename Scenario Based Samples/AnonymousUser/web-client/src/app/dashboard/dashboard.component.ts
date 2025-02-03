import { Component, OnInit } from '@angular/core';
import { BoldBI } from '@boldbi/boldbi-embedded-sdk';
import { environment } from 'src/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private http: HttpClient, private authService: AuthService, private route: ActivatedRoute) { }
  private dashboard: BoldBI | null = null;
  private boldbisettings: BoldBISettings | null = null;
  ngOnInit(): void {
    
    this.mail = this.route.snapshot.paramMap.get('usermail') || '';
    console.log("maill ", this.mail);
    if(this.mail == "emily@alphaelectronics.com") {
      this.groupName = "Alpha";
      this.dashboardId = "c980a71f-8b2b-4982-a806-cb37b05d4438";
    }
    else if(this.mail == "john@betaelectronics.com") {
      this.groupName = "Beta";
      this.dashboardId = "2ee1f202-6f3b-4d92-b31a-a37e969a6569";
    }
    else if(this.mail == "sarah@gammaelectronics.com") {
      this.groupName = "Gamma";
      this.dashboardId = "ab057099-643c-4c27-bde2-60ca615af7e6";
    }
    else if(this.mail == "michel@deltaelectronics.com") {
      this.groupName = "Delta";
      this.dashboardId = "bd4107e2-78a4-451e-89f8-730317cbfefb";
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
      embedContainerId: "dashboard",
      embedType: BoldBI.EmbedType.Component,
      environment: this.boldbisettings?.Environment,
      mode: BoldBI.Mode.View,
      //mode: BoldBI.Mode.Design,
      width: "100%",
      height: "100%",
      authorizationServer: {
          url:this.authorizationApi,
          headers: {
            "Authorization": "Bearer " + localStorage.getItem('token')
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
      this.dashboard?.loadDashboard();
      //this.dashboard?.loadDesigner();
    // You can perform additional actions here
  }
 

}
interface BoldBISettings {
 
  ServerUrl: string;
  SiteIdentifier: string;
  Environment: string;
  DashboardId: string;
  ExpirationTime: string;

}
