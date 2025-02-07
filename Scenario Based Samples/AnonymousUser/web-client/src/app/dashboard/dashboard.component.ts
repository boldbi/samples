import { Component, OnInit } from '@angular/core';
import { BoldBI } from '@boldbi/boldbi-embedded-sdk';
import { environment } from 'src/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { SwitchStateService } from '../switch-state.service';
import userDatas from '../../assets/anonymoususer.json';

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
  groupNameSwitch1!: boolean;
  groupNameSwitch2!: boolean;
  groupNameSwitch3!: boolean;
  userData: any[] = []; // Store user emails

  constructor(private http: HttpClient, private authService: AuthService, private route: ActivatedRoute, private switchStateService: SwitchStateService) { }
  
  private dashboard: BoldBI | null = null;
  private boldbisettings: BoldBISettings | null = null;
  ngOnInit(): void {
    this.groupNameSwitch1 = this.switchStateService.getSwitchState(1);
    this.switchStateService.switchState1$.subscribe(state => {
      this.groupNameSwitch1 = state;
    });

    this.groupNameSwitch2 = this.switchStateService.getSwitchState(2);
    this.switchStateService.switchState2$.subscribe(state => {
      this.groupNameSwitch2 = state;
    });

    this.groupNameSwitch3 = this.switchStateService.getSwitchState(3);
    this.switchStateService.switchState3$.subscribe(state => {
      this.groupNameSwitch3 = state;
    });

    this.mail = this.route.snapshot.paramMap.get('usermail') || '';
    console.log("usredfd ",userDatas);
    for (let i = 0; i < userDatas.length; i++) {
      if(userDatas[i].email == this.mail) {
        this.groupName = userDatas[i].groupName;
        this.dashboardId = userDatas[i].dashboardId;
        if(userDatas[i].customattribute) {
          this.customattributevalue = userDatas[i].customattribute
        }
      }
      if(this.mail == "john@betaelectronics.com") {
        this.mode = BoldBI.Mode.Design;
      }
    }
      console.log("maill ", this.mail);
    
    //   //if(this.mail == "anuabarna.b@syncfusion.com") {
    // if(this.mail == "demo@boldbi.com") {
    //   this.groupName = "Alpha";
    //   //this.dashboardId = "c980a71f-8b2b-4982-a806-cb37b05d4438"; //local
    //   this.dashboardId = "f30920ce-b5e0-4f20-b1d4-2d3894604f55"
    // }
    // else if(this.mail == "emily@alphaelectronics.com") {
    //   this.groupName = "Alpha";
    //   //this.dashboardId = "2ee1f202-6f3b-4d92-b31a-a37e969a6569"; //local
    //   this.dashboardId = "147aa772-1d61-43ee-80e9-d807f0056722"
    // }
    // else if(this.mail == "john@betaelectronics.com") {
    //   this.groupName = "Beta";
    //   this.mode = BoldBI.Mode.Design,
    //   //this.dashboardId = "2ee1f202-6f3b-4d92-b31a-a37e969a6569"; //local
    //   this.dashboardId = "147aa772-1d61-43ee-80e9-d807f0056722"

    // }
    // else if(this.mail == "sarah@gammaelectronics.com") {
    //   this.groupName = "Gamma";
    //   //this.dashboardId = "cf71e712-8223-4618-841b-96395b0e002c"; //local
    //   this.dashboardId = "b35586cb-320c-4dd4-8865-9466464a8451"
    // }
    // else if(this.mail == "michel@deltaelectronics.com") {
    //   this.groupName = "Delta";
    //   this.dashboardId = "2ee1f202-6f3b-4d92-b31a-a37e969a6569"; //local
    // }
   
    // if(this.groupNameSwitch1 && this.groupNameSwitch2) {
    //   this.groupName = "";
    //   this.mail = "";
    // }

    // else if(this.groupNameSwitch1) {
    //   this.groupName = "";
    // }

    // else if(this.groupNameSwitch2) {
    //   this.mail = "";
    // }

    // else if(this.groupNameSwitch3) {
    //   this.groupName = "Alph";
    // }

    if (this.groupNameSwitch1 || this.groupNameSwitch2) {
      this.groupName = this.groupNameSwitch1 ? "" : this.groupName;
      this.mail = this.groupNameSwitch2 ? "" : this.mail;
    } else if (this.groupNameSwitch3) {
      this.groupName = "Alph";
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
      mode: this.mode,
      width: "100%",
      height: "100%",
      authorizationServer: {
          url:this.authorizationApi,
          headers: {
            "Authorization": "Bearer " + localStorage.getItem('token'),
            //"test": "\"sales_analysis_db\":\"beta_enterprises_sales_analysis\""
            //"test": "\"sales_analysis_db\":\"delta_industries_sales_analysis\"",
            "customAttribute": this.customattributevalue
          }
      },
      dashboardSettings: {
        //showHeader: false,
        // enableFullScreen: true,
        // filterOverviewSettings: {
        //   showSaveIcon: true,// To enable save option in filter overview
        //   showSaveAsIcon: true
        // }
        //dashboardName: "name",
        //enableFilterOverview: false,
        showDashboardParameter: false,
        //showExport: false,
        //showMetrics: false
        showRefresh: false,
        //showMoreOption: false,
        viewDataSettings :{
          enableColumnSelection: false,//Select column button will be hidden in the dashboard designer.
          showAllColumns: true,//Column options are all checked in the dashboard viewer.

        }
      },
      //enableAiAssistant: true, //The AI Assistant option will be show in the dashboard viewer.   
      //filterParameters: "Product_Name=Aniseed Syrup",
      //filterParameters: "Parameter1=Teatime Chocolate Biscuits",
      //restrictMobileView: true,  
      // autoRefreshSettings:{
      //   enabled: true,
      //   hourlySchedule: {
      //        seconds: 5,
      //   }
      // },
      anonymousToken: {
        isEnabled: true,
        groupName: this.groupName,
        userEmail: this.mail
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