import {Component, OnInit} from '@angular/core';
import {WebmarkDetailComponent} from '../bookmark-detail/bookmark-detail.component';
import {MatTabStore} from '../../shared/tab-store/tab-store.service';
import {AuthgardService} from '../../authentification/authgard.service';
import {User} from '../../authentification/model/user.model';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css'],
  providers: [WebmarkDetailComponent]
})
export class BookmarkComponent implements OnInit {

  public user: User;

  constructor(public tabStore: MatTabStore, private authgardService: AuthgardService) {
  }

  ngOnInit() {
    this.user = this.authgardService.getCurrentUser();
  }

  public add() {
    /* this.routerStore.add({ id: 0, label:'New',icon: 'note_add', link: 'new/'
    +this.activeLinkIndex.toString()+'/0', close: true, active: true}); */
    this.tabStore.navigate('detail', '/bookmark/new', null);
  }

  public search() {
    /* this.routerStore.add({ id: 0, label:'New',icon: 'note_add', link: 'new/'+
    this.activeLinkIndex.toString()+'/0', close: true, active: true});
     */
    this.tabStore.navigate('list', null, null);
  }

  public detail(id: number) {
    this.tabStore.navigate('detail', '/bookmark/detail', id);
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

  /* public token() {
     let currentUser = this.authgardService.getCurrentUser();

     if (currentUser != null) {
       return currentUser.token;
     }
   }*/

  public username() {
    const currentUser: User = this.authgardService.getCurrentUser();
    if (currentUser != null) {
      return currentUser.first_name;
    }
  }

}




