import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { io, Socket } from 'socket.io-client';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  private socket!: Socket;

  user!: any
  chat: FormControl = new FormControl("", Validators.required);

  ngOnInit(): void {
    this.socket = io('http://0.0.0.0:8000'); // Update with your server's URL

    // Emit a 'newUser' event with user information
    this.user = { id: Math.random(), name: "Luis" };
    this.socket.emit('newUser', this.user);

    // Listen for 'privateMessage' events
    this.socket.on('privateMessage', (data: any) => {
      console.log('Private message received:', data);
      // Handle the received private message
    });
  }

  sendPrivateMessage(recipientId: string, message: string): void {
    this.socket.emit('privateMessage', { recipientId, message });
  }
}
