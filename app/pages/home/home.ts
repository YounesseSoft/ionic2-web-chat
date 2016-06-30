import {Http} from "@angular/http";
import {Component, NgZone} from "@angular/core";
import * as io from 'socket.io-client';

@Component({
    templateUrl: 'build/pages/home/home.html',
})

export class HomePage {
    messages: any;
    socketHost: string;
    zone: NgZone;
    chatBox: string;
    socket: any;

    constructor(http: Http) {
        this.messages = [];
        this.socketHost = "http://localhost:3000";
        this.zone = new NgZone({enableLongStackTrace: false});
        http.get(this.socketHost + "/fetch").subscribe((success) => {
            var data = success.json();
            for(var i = 0; i < data.length; i++) {
                this.messages.push(data[i].message);
            }
        }, (error) => {
            console.log(JSON.stringify(error));
        });
        this.chatBox = "";
        this.socket = io(this.socketHost);
        this.socket.on("chat_message", (msg) => {
            this.zone.run(() => {
                this.messages.push(msg);
            });
        });
    }

    send(message) {
        if(message && message != "") {
            this.socket.emit("chat_message", message);
        }
        this.chatBox = "";
    }
}
