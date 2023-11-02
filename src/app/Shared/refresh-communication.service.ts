import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RefreshCommunicationService {
  private refreshSubject = new Subject<void>();

  sendRefreshSignal() {
    this.refreshSubject.next();
  }

  getRefreshSignal() {
    return this.refreshSubject.asObservable();
  }
}
