import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KeyboardEventsService {

  constructor() { }
  
  AcceptCharactersOnly(event:KeyboardEvent)
  {
    if (!/^[a-zA-Z]$/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete') {
      event.preventDefault();
    }
  }
}
