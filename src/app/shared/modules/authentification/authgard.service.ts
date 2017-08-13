import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthentificationService} from 'app/shared/modules/authentification/authentification.service'
import {User} from 'app/shared/modules/authentification/model/user.model';

@Injectable()
export class AuthgardService implements CanActivate {

  constructor(private router: Router, private authentificationService: AuthentificationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.getCurrentUser()) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }

  public logout() {
    this.authentificationService.logout();
    this.router.navigate(['/login']);
    this.reloadPage();

  }

  private reloadPage() {
    window.location.reload();
  }

  public getCurrentUser(): User {
    const currentUser = localStorage.getItem('webmarks_user')
    return currentUser ? JSON.parse(currentUser) : null;
  }

  public isAuthentified(): boolean {
    return this.getCurrentUser() != null;
  }
}
