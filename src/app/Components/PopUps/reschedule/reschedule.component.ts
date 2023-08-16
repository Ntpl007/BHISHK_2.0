import { Component, OnInit } from '@angular/core';

export interface UserData {
  id: number;
  name: string;
  email: string;
}
@Component({
  selector: 'app-reschedule',
  templateUrl: './reschedule.component.html',
  styleUrls: ['./reschedule.component.css'],
  
})
export class RescheduleComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

 displayedColumns: string[] = ['id', 'name', 'email','Date'];
  dataSource: UserData[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    // Add more data here
  ];
 
}