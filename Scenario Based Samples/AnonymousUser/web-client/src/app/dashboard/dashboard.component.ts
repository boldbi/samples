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
  groupId: string = '';
  dashboardId: string = '';
  constructor(private http: HttpClient, private authService: AuthService, private route: ActivatedRoute) { }
  private dashboard: BoldBI | null = null;
  private boldbisettings: BoldBISettings | null = null;
  ngOnInit(): void {
    this.mail = this.route.snapshot.paramMap.get('usermail') || '';
    console.log("maill ", this.mail);
    if(this.mail == "emily@alphaelectronics.com") {
      this.groupId = "3";
      this.dashboardId = "76d28df5-c3c3-4abe-b415-28b89d5dd94d";
    }
    else if(this.mail == "john@betaelectronics.com") {
      this.groupId = "4";
      this.dashboardId = "d0486b92-d279-492a-94bc-a2c4b643c1cd";
    }
    else if(this.mail == "john@betaindustry.com") {
      this.groupId = "4";
      this.dashboardId = "28d7cecb-fdc4-4665-9336-8dbfc0866101";
    }
    else if(this.mail == "sarah@gammaelectronics.com") {
      this.groupId = "5";
      this.dashboardId = "28d7cecb-fdc4-4665-9336-8dbfc0866101";
    }
    else if(this.mail == "michel@deltaelectronics.com") {
      this.groupId = "6";
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
      embedContainerId: "dashboard",
      embedType: BoldBI.EmbedType.Component,
      environment: this.boldbisettings?.Environment,
      mode: BoldBI.Mode.View,
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
        //groupId: "2",
        groupId: this.groupId,
        //groupName: "test",
        //userEmail: "testuser@gmail.com",
        userEmail: this.mail
        }        
    });
      this.dashboard?.loadDashboard();
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
