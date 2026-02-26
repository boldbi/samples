import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/login/login.component';
import { DashboardComponent } from './app/dashboard/dashboard.component';
import { SidebarComponent } from './app/sidebar/sidebar.component';
import { HeaderComponent } from './app/header/header.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', redirectTo: 'login', pathMatch: 'full' }, // default redirect
      { path: 'login', component: LoginComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'sidebar', component: SidebarComponent },
      { path: 'header', component: HeaderComponent },
    ]),
    importProvidersFrom(HttpClientModule, FormsModule)
  ]
}).catch(err => console.error(err));
