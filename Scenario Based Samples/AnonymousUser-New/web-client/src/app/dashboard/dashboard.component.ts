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
  customattributevalue: any = '';
  mode = BoldBI.Mode.View;  
  userData: any[] = []; // Store user emails

  constructor(private http: HttpClient, private authService: AuthService, private route: ActivatedRoute, private switchStateService: SwitchStateService) { }
  
  private dashboard: BoldBI | null = null;
  private boldbisettings: BoldBISettings | null = null;
  ngOnInit(): void {
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
    console.log("group received first ", this.groupName);
    this.mail = this.authService.getemailData();
    this.groupName = this.authService.getGroupData();
    this.dashboardId = this.authService.getDashboardData();
    this.customattributevalue = this.authService.getAccessData();
    console.log("dasjbaord id received second ", this.mail, this.groupName, this.dashboardId, this.customattributevalue);
    this.dashboard= BoldBI.create({
      serverUrl: `${this.boldbisettings?.ServerUrl ?? ''}/${this.boldbisettings?.SiteIdentifier ?? ''}`,
      dashboardId: this.dashboardId,          
      embedContainerId: "dashboard",
      embedType: BoldBI.EmbedType.Component,
      environment: this.boldbisettings?.Environment,
      mode: this.mode,
      width: "100%",
      height: "100%",
      authorizationServer: {
          url:this.authorizationApi,
          headers: {
            "Authorization": "Bearer " + localStorage.getItem('token'),
            "AnonymousGroupName": this.groupName,
            "AnonymousUserEmail": this.mail,
            "Attribute": this.customattributevalue
          }
      },
      dashboardSettings: {
        showHeader: false,
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