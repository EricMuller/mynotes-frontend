import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthgardService } from 'app/shared/modules/authentification/authgard.service'

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

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

  public username1(){
 
    let currentUser = this.authgardService.getCurrentUser();
    
    if(currentUser != null){
      return currentUser.username.slice(0,1).toUpperCase();
    }
  }

  public username(){
 
    let currentUser = this.authgardService.getCurrentUser();
    
    if(currentUser != null){
      return currentUser.username;
    }
  }

}




