import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {WsClientService} from './core/ws/ws-client.service';
import {Subscription} from 'rxjs/Subscription';
import {AuthgardService} from './features/authentification/authgard.service';


@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})

export class AppComponent implements OnInit, OnDestroy {
  title = 'app works!';
  user = 'eric';

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

  exception(exception) {
    console.log('exception from Server: ' + exception);
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
