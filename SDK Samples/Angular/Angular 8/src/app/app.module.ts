import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { DashboardListing } from './dashboard-listing/dashboard-listing.component';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: DashboardListing },
    ]
    ),
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    DashboardListing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
