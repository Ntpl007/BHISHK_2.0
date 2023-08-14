import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-abdm-home',
  templateUrl: './abdm-home.component.html',
  styleUrls: ['./abdm-home.component.css']
})
export class AbdmHomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    localStorage.setItem('header','ABDM Home')
  }

}
