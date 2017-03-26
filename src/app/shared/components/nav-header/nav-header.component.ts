import { Component, Input, OnInit,AfterViewInit ,ChangeDetectorRef} from '@angular/core';
import { AuthentificationService } from 'app/shared/modules/authentification/authentification.service'
import { AuthgardService } from 'app/shared/modules/authentification/authgard.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent implements OnInit ,AfterViewInit{

  @Input('title')
  title : string ;

  constructor(private authgard: AuthgardService,private changeDetectionRef: ChangeDetectorRef) { }
 
  private rlaSafe: boolean = false;
  ngOnInit() {
  }

  logout() {
    this.authgard.logout();
  }

  isAuthentified():boolean {
    return this.authgard.isAuthentified();
  }

   ngAfterViewInit() {
    this.rlaSafe = true;
    this.changeDetectionRef.detectChanges();
  }

}
