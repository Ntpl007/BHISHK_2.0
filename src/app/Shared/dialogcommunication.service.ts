import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DialogcommunicationService {
  private successSubject = new Subject<void>();
  private dialogClosedSource = new Subject<void>();
  dialogClosed$ = this.dialogClosedSource.asObservable();
  private openDialogs: MatDialogRef<any>[] = [];

  constructor(private dialog: MatDialog) {}
  notifyDialogClosed() {
    this.dialogClosedSource.next();
  }


  open(dialogComponent: any, config?: any): MatDialogRef<any> {
    const dialogRef = this.dialog.open(dialogComponent, config);
    this.openDialogs.push(dialogRef);
    return dialogRef;
  }

  closeAll(){
    this.openDialogs.forEach(dialogRef => {
      dialogRef.close();
    });
  }
  sendSuccessSignal() {
    this.successSubject.next();
  }

  getSuccessSignal() {
    return this.successSubject.asObservable();
  }
}