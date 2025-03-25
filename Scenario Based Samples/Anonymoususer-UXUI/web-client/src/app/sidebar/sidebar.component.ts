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

  //filteredData: any[] = []; // Filtered data for dropdown
  getUserimage: any = '';

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}
  
  ngOnInit(): void {
    //this.userData = userData;
    this.http.get<any[]>('assets/anonymoususer.json').subscribe((data: any[]) => {
      //this.userData = data;
      // this.filteredData = data; // Initialize filtered data

      // // Modify the data to include a new 'displayText' field
      // this.filteredData = this.filteredData.map(user => ({
      //   ...user,
      //   displayText: `${user.email} (${user.access})`
      // }));

      const useremail = localStorage.getItem('AnonymousUsername');

      const getDetails = data.find(item => item.email === useremail);
      this.getUserimage = getDetails.username;
     // console.log("fsdffd ",getDetails , this.getUserimage);
    });
  }

  signout()
  {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
