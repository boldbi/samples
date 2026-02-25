import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SidebarComponent,
    HeaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'boldbi.web.client';
  constructor(public authService: AuthService) { }

  ngOnInit(): void { }

  logout() {
    this.authService.logout();
  }
}