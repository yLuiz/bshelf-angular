import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  public message = '';

  add(message: string) {
    this.message = message;
    setTimeout(() => this.clear(), 5000)
  }

  clear() {
    this.message = '';
  }

  constructor() { }
}
