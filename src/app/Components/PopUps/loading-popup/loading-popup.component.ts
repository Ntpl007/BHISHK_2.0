import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-loading-popup',
  templateUrl: './loading-popup.component.html',
  styleUrls: ['./loading-popup.component.css']
})
export class LoadingPopupComponent implements OnInit {
d:any
  constructor( @Inject(MAT_DIALOG_DATA) public Data: any) { }

  ngOnInit(): void {
    debugger
    this.d=this.Data;
  }

}
