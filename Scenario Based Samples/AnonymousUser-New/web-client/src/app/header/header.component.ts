import { Component } from '@angular/core';
import Popper from 'popper.js';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  logout() {
   
  }
  mail: string = '';
  groupName: string = '';
  dashboardId: string = '';
  customattributevalue: any = '';
  displaygroup: any = '';
  displayuser: any = '';
  dashboardfilteredData: any[] = [];
  selectedDashboardName: string = '';

  constructor(private http: HttpClient, private authService: AuthService) {}
  
    ngOnInit(): void {
      this.mail = this.authService.getemailData();
      this.groupName = this.authService.getGroupData();
      this.dashboardId = this.authService.getDashboardData();
      this.customattributevalue = this.authService.getAccessData();

      this.http.get<any[]>('assets/anonymoususer.json').subscribe(data => {

        // const selectedDashboardItem = this.dashboardfilteredData.find(
        //   item => item.dashboardId == this.dashboardId
        // );
        
        // console.log("vcbvb ", selectedDashboardItem);
        // this.selectedDashboardName = selectedDashboardItem ? selectedDashboardItem.dashboardName : null;

        // this.dashboardfilteredData = data.find(
        //   item => item.dashboardId === this.dashboardId
        // );
        
        // console.log("Dashboard Name:", this.dashboardfilteredData?.dashboardName);
        // this.selectedDashboardName = this.dashboardfilteredData[0].dashboardName;
        //console.log("selectedDashboardName ", this.selectedDashboardName);


        const matchedDashboard = data.find(item => item.dashboardId === this.dashboardId);
        this.selectedDashboardName = matchedDashboard.dashboardName;
        console.log("matchedDashboard ", matchedDashboard.dashboardId);

      });

      if (this.mail) {
        this.displayuser = this.mail.split('@')[0]
        .replace(/[^a-zA-Z0-9]/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        console.log("this.displayuser ",this.displayuser);
      } else {
        this.displayuser = "";
      }

      if (this.groupName) {
        this.displaygroup = this.groupName;
        console.log("this.displaygroup ",this.displaygroup);
      } else {
        this.displaygroup = "";
      }
    }
}