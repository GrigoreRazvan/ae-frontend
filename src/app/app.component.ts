import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from './_service/api-service.service';
import { NotificationServiceService } from './_service/notification-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proiect-frontend';
  user: any;

  constructor(
    public router: Router,
    public apiService: ApiServiceService,
    public notificationService: NotificationServiceService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user != null) {
      this.apiService.getUser(this.user.id).subscribe(resp => {
        if (resp != null) {
          this.user = resp[0];
        }
      })
    } else {
      this.router.navigate(['']);
    }
  }
}

