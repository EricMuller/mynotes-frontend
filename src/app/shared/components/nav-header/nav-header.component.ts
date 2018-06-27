import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {AuthgardService} from '../../../features/authentification/authgard.service';


@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent implements OnInit, AfterViewInit {

  @Input('title')
  title: string;

  constructor(private authgard: AuthgardService, private changeDetectionRef: ChangeDetectorRef) {
  }

  private rlaSafe: boolean = false;

  ngOnInit() {
  }

  logout() {
    this.authgard.logout();
  }

  isAuthentified(): boolean {
    return this.authgard.isAuthentified();
  }

  ngAfterViewInit() {
    this.rlaSafe = true;
    this.changeDetectionRef.detectChanges();
  }

}
