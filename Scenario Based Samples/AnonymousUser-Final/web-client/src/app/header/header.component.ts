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
  constructor(private http: HttpClient) {}
  
  ngOnInit(): void {
    const useremail = localStorage.getItem('AnonymousUsername');
    this.http.get<any[]>('assets/anonymoususer.json').subscribe(data => {
      const getUseremail = data.find(item => item.email === useremail);
      this.displayUser = getUseremail.username;
    });
  }
}
