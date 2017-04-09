import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthentificationService } from 'app/shared/modules/authentification/authentification.service'

@Injectable()
export class AuthgardService implements CanActivate {

    constructor(private router: Router,private authentificationService: AuthentificationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.getCurrentUser()) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }

    logout(){
      this.authentificationService.logout();
      this.router.navigate(['/login']);
    }


    public getCurrentUser(): any {
        let currentUser = localStorage.getItem('currentUser')
        return currentUser ? JSON.parse(currentUser) : null;
    }

    public  isAuthentified(): boolean {
            return this.getCurrentUser() != null ;
    }
}