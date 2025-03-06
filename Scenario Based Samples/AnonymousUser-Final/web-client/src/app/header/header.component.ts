import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  logout() {
   
  }
  displayUser: any = '';
  getCustomAttribute: any = '';
  getFilterParameter: any = '';
  getUserEmail: any = '';
  getAccessType: any = '';

  constructor(private http: HttpClient) {}
  
  ngOnInit(): void {
    const useremail = localStorage.getItem('AnonymousUsername');
    this.http.get<any[]>('assets/anonymoususer.json').subscribe(data => {
      const getDetails = data.find(item => item.email === useremail);
      this.displayUser = getDetails.username;
      
      const splitDatabaseName = getDetails.customattribute.replace(/'/g, ""); // Removes all single quotes
      const [key, value] = splitDatabaseName.split(":").map((str: string) => str.trim());
      this.getCustomAttribute = value;

      this.getFilterParameter = getDetails.filterparameter;
      this.getUserEmail = useremail;
      this.getAccessType = getDetails.access;
    });
  }
}
