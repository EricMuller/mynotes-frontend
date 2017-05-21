import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthgardService } from 'app/shared/modules/authentification/authgard.service'
import { MdTabStore ,MdTab} from 'app/modules/tab-store/tab-store.service'
import { WebmarkDetailComponent } from 'app/modules/bookmark/bookmark-detail/bookmark-detail.component';

import { List } from 'immutable';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css'],
  providers: [WebmarkDetailComponent]
})
export class BookmarkComponent implements OnInit {

  constructor(public tabStore:MdTabStore, private authgardService: AuthgardService ) {
  }

  ngOnInit() {
  }

  add() {
    //this.routerStore.add({ id: 0, label:'New',icon: 'note_add', link: 'new/'+this.activeLinkIndex.toString()+'/0', close: true, active: true});
    this.tabStore.navigate('detail','/bookmark/new',null);
  }
  search() {
    //this.routerStore.add({ id: 0, label:'New',icon: 'note_add', link: 'new/'+this.activeLinkIndex.toString()+'/0', close: true, active: true});
    this.tabStore.navigate('list',null,null);
  }

  detail(id: number) {
    this.tabStore.navigate('detail','/bookmark/detail',id);
  }

/**
 * 
 */
  isAuthentified(): boolean {
    return this.authgardService.isAuthentified();
  }
/**
 * 
 */
  public logout() {
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




