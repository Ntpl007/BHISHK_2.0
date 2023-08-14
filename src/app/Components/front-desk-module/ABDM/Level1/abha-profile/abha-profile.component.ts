import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-abha-profile',
  templateUrl: './abha-profile.component.html',
  styleUrls: ['./abha-profile.component.css']
})
export class ABHAProfileComponent implements OnInit {

  obj:any=localStorage.getItem('info')
  hid:any
  hidnumber:any
  name:any
  
    constructor() { }
  
  
    ngOnInit(): void {
      debugger
     
      this.hid=localStorage.getItem('healthId')
      this.hidnumber=localStorage.getItem('healthIdNumber')
      this.name= localStorage.getItem('abhaname')
      localStorage.setItem('header','Health Account Details')
  
  
    }
  
  }
  