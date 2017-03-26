import { Component } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css' ]
})


export class AppComponent {
  title:string = 'app works!';
  user:string = 'eric';

  onScroll(event) {
    console.log('scroll event', event);
  }
}
