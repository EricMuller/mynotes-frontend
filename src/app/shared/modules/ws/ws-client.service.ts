import {Inject, Injectable} from '@angular/core';
import {Subject} from 'rxjs/Rx';
import {WebsocketService} from './websocket.service';
import {AuthgardService} from 'app/shared/modules/authentification/authgard.service'
import {NotifierService} from 'app/shared/modules/notifications/notifier.service'
import {DOCUMENT} from '@angular/platform-browser';

export interface SocketMessage {
  token: string,
  type: string,
  data: any,
}

@Injectable()
export class WsClientService {

  public messages: Subject<SocketMessage>;

  private forceReconnection: boolean = false;

  private url: string;

  constructor(@Inject(DOCUMENT) private document, private wsService: WebsocketService, private authgardService: AuthgardService, private notifierService: NotifierService) {

  }

  private wsConnectIfAuthentified(reconnection): boolean {

    if (this.authgardService.isAuthentified()) {
      return this.wsConnect(reconnection);
    } else {
      this.wsForceClose();
    }
    return false;
  }

  public wsForceClose() {

    if (this.messages) {
      this.messages.complete();
      this.messages.unsubscribe();
    }
    this.messages = null;
    this.forceReconnection = false;
  }

  private wsConnect(reconnection): boolean {

    let token = this.authgardService.getCurrentUser().username;
    let protocol = this.document.location.protocol = 'http' ? 'ws' : 'wss';
    this.url = protocol + '://' + this.document.location.hostname + ':' + this.document.location.port + '/ws/' + token;
    //let url = 'ws://192.168.0.100:4200/channels/' + token;

    //console.log(this.authgardService.getCurrentUser());
    try {
      if (!this.messages || reconnection) {
        console.log('Websocket is connecting to ' + this.url + '...');
        this.messages = <Subject<SocketMessage>>this.wsService
          .connect(this.url, reconnection)
          .map((response: MessageEvent): SocketMessage => {
              console.log(response);
              let msg = JSON.parse(response.data);
              return {
                token: msg.token,
                type: msg.type,
                data: msg.data,
              }
            }
          );
        this.forceReconnection = false;
        return true;
      }
    } catch (exc) {
      console.error(exc);
    }
    return false;
  }

  public checkWebSocketConnection() {


    let newConnection = this.wsConnectIfAuthentified(this.forceReconnection);

    if (newConnection) {
      console.log('WebSocket connexion is listening on server ' + this.url + '(' + new Date() + ')');
      this.messages.subscribe(msg => {
          console.log('WebSocket response from Server: ' + msg.data);
          this.notifierService.notifyInfo(msg.data);
        }, (exception => {
          this.forceReconnection = true;
        }), () => {
          this.forceReconnection = true;
          this.notifierService.notifyError('WebSocket Disconnection occured');
        }
      );
    }

  }

}
