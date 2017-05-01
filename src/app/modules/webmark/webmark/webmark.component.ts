import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthgardService } from 'app/shared/modules/authentification/authgard.service'

@Component({
  selector: 'app-webmark',
  templateUrl: './webmark.component.html',
  styleUrls: ['./webmark.component.css']
})
export class WebmarkComponent implements OnInit {

  constructor(private router: Router, private authgardService: AuthgardService) {
  }

  ngOnInit() {
  }

  isAuthentified(): boolean {
    return this.authgardService.isAuthentified();
  }

  logout() {
    this.authgardService.logout();
  }

  public username1() {

    let currentUser = this.authgardService.getCurrentUser();

    if (currentUser != null) {
      return currentUser.username.slice(0, 1).toUpperCase();
    }
  }
  public token() {
    let currentUser = this.authgardService.getCurrentUser();

    if (currentUser != null) {
      return currentUser.token;
    }
  }
  public username() {

    let currentUser = this.authgardService.getCurrentUser();

    if (currentUser != null) {
      return currentUser.username;
    }
  }

}




