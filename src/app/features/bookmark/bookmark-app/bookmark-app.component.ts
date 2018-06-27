import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../../authentification/model/user.model';
import {AuthgardService} from '../../authentification/authgard.service';

@Component({
  selector: 'bookmark-app',
  templateUrl: './bookmark-app.component.html',
  styleUrls: ['./bookmark-app.component.css']
})
export class BookmarkAppComponent implements OnInit {

  public user: User;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private authgardService: AuthgardService) {
  }

  ngOnInit() {
    this.user = this.authgardService.getCurrentUser();
  }

  public username() {
    const currentUser: User = this.authgardService.getCurrentUser();
    if (currentUser != null) {
      return currentUser.first_name;
    }
  }

  public isAuthentified(): boolean {
    return this.authgardService.isAuthentified();
  }

  public logout() {
    this.authgardService.logout();
  }


  public username1() {
    const currentUser = this.authgardService.getCurrentUser();
    let shortName: string;
    if (currentUser != null && currentUser.first_name != null) {
      shortName = currentUser.first_name.slice(0, 1).toUpperCase();
    }
    return shortName;
  }

}
