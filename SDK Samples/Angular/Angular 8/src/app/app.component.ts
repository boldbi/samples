import { Component, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { appService } from './app.service'
import { Item } from './app'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [appService]
})

@Injectable()

export class AppComponent {

  //ASP.NET Core application would be run on http://localhost:61377/, which needs to be set as `apiHost`
  public apiHost="http://localhost:61377/";

  //Your Bold BI application environment. (If Cloud, you should use `cloud`, if Enterprise, you should use `enterprise`)
  public environment = "enterprise";

  //Dashboard Server BI URL (ex: http://localhost:5000/bi, http://demo.boldbi.com/bi)
  public rootUrl = "http://localhost:64503/bi";

  //For Bold BI Enterprise edition, it should be like `site/site1`. For Bold BI Cloud, it should be empty string.
  public siteIdentifier = "site/site1";

  //Url of the GetDetails action in ValuesController of the ASP.NET Core application
  public authorizationUrl="/api/home/getdetails";

  //Url of the GetDashboards action in ValuesController of the ASP.NET Core application
  public getDashboardsUrl="/api/home/getdashboards";
    
  public dashboards: any;

  public baseUrl: any;

  public dashboardServerApiUrl: string;
  
  constructor(private _app: appService) {
  }

  ngOnInit() {
  }
}