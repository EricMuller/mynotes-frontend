import { Component, Injectable } from '@angular/core';
import { NotifierService } from './notifier.service';
import { Notification } from './notifications.model';
import { MdSnackBar } from '@angular/material';

@Component({
    selector: 'app-notifications',
    template: `

    <style>
        .notification_closebtn {
            margin-left: 15px;
            color: white;
            font-weight: bold;
            float: right;
            font-size: 22px;
            line-height: 20px;
            cursor: pointer;
            transition: 0.3s;
            }
       
        .notification_container {
            z-index: 101;
            position: fixed;
            top: 60px;
            right: 20px;
            min-width: 200px;

        }
        .notification {
            z-index: 101;
            text-align: center;
            line-height: 2.5;
            overflow: hidden;
            width:100%; 
            padding: 5px; 
            margin-bottom: 8px;
            # -webkit-box-shadow: 0 0 5px black;
            # -moz-box-shadow:    0 0 5px black;
            # box-shadow:         0 0 5px black;
        }

    </style>
    
    
    <div class="notification_container">
        <div (click)="hide(notification)" class="{{ notification.type }} notification" 
                *ngFor="let notification of _notifications">
                        {{ notification.message }}
              <span class="notification_closebtn" (click)="hide(notification)">&times;</span> 
        </div>
    </div>
    `
})
export class NotificationsComponent {
    private _notifications: Notification[];

    constructor(private notifierService: NotifierService,private mdSnackBar: MdSnackBar) {
        
        this._notifications = new Array<Notification>();

        notifierService.observable.subscribe(notification => {
           /* this._notifications.push(notification);
            if (notification.timeout >  0 ){
                setTimeout(() => { this.hide.bind(this)(notification) }, notification.timeout);
            }*/ 
             if (notification.timeout >  0 ){
                this.mdSnackBar.open(notification.message , 'Ok',{ duration: notification.timeout });
             }else{
                this.mdSnackBar.open(notification.message , 'Ok');
             }
        });
    }

    private hide(notification) {
        let index = this._notifications.indexOf(notification);
        if (index >= 0) {
            this._notifications.splice(index, 1);
        }
    }
}