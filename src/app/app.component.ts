import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

import { WebsocketService } from './shared/modules/ws/websocket.service';
import { WsClientService } from './shared/modules/ws/ws-client.service';

import { Subscription } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { AuthgardService } from './shared/modules/authentification/authgard.service'
import { NotifierService } from 'app/shared/modules/notifications/notifier.service'



@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})


export class AppComponent {
  title: string = 'app works!';
  user: string = 'eric';

  private tick: string;
  private timer: Subscription;
  
  private message = {
    token: 'tutorialedge',
    type: 'info',
    data: 'this is a test message',

  }

  constructor(private wsClientService: WsClientService, private authgard: AuthgardService) {

  }

  ngOnInit() {
    /*this.wsClientService.wsForceClose();
    let timer = TimerObservable.create(2000, 5000);
    this.timer = timer.subscribe(timer => {
      this.wsClientService.checkWebSocketConnection();
    });
    */
  }

  ngOnDestroy() {
   // this.timer.unsubscribe();
  }

  exception(exception){
       console.log("exception from Server: " + exception);
  }

  onScroll(event) {
    console.log('scroll event', event);
  }

  sendMsg() {
    console.log('new message from client to ws server: ', this.message);
    this.wsClientService.messages.next(this.message);
    this.message.data = '';
  }
 

}
