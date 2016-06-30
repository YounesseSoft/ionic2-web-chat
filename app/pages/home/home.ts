import {Http} from "@angular/http";
import {Component, NgZone, ViewChild} from "@angular/core";
import * as io from 'socket.io-client';
import {SocketService} from '../../providers/socket-service/socket-service';
import {ChatMessage} from '../../models/chat-message';

@Component({
    templateUrl: 'build/pages/home/home.html',
})

export class HomePage {
    @ViewChild('chat') chat: any;

    messages: any;
    socketHost: string;
    zone: NgZone;
    chatBox: string;

    constructor(http: Http, public socket: SocketService) {
        this.messages = [];
        this.socketHost = "http://localhost:3000";
        this.zone = new NgZone({enableLongStackTrace: false});
       
        this.chatBox = "";
        this.socket.socketService.subscribe(event => {
        console.log('message received from server... ', event);
        if (event.category === 'message'){
          this.zone.run(() => {
            this.messages.push(event.message);
            this.chat.scrollTo(0, 99999, 0);
          });
        }
      }); //end of subscribe

    }

  formatMessage(msg: string) {
    if (msg) {
      let chatMessage: ChatMessage = {
        to: 'recipient',
        from: 'sender',
        message: msg,
      };
      return chatMessage;
    }
    return null;
  }


    send(message) {
        let newMsg = this.formatMessage(message);
        if (newMsg) {
          // let newMsg = this.formatMessage(msg);
          this.socket.sendMessage(newMsg);
          this.messages.push(newMsg);
          console.log('emitting: ', newMsg);
        }
        this.chatBox = '';
    }
}
