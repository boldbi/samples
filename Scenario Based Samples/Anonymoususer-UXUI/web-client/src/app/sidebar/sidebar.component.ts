import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  getUserimage: any = '';

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}
  
  ngOnInit(): void {
    this.http.get<any[]>('assets/anonymoususer.json').subscribe((data: any[]) => {
      const useremail = localStorage.getItem('AnonymousUsername');
      const getDetails = data.find(item => item.email === useremail);
      this.getUserimage = getDetails.username;
    });
  }

  signout()
  {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}