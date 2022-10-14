import { Component, Input, OnInit } from '@angular/core';
import { MessagesService } from './messages.service';

@Component({
  selector: 'app-message',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessageComponent implements OnInit {
  constructor(
    public messagesService: MessagesService
  ) { }
  ngOnInit(): void {}

}
