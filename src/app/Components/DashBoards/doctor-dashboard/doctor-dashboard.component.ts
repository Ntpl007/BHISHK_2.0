import { Component, OnInit } from '@angular/core';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {
data:any;
  constructor(private service:HimsServiceService) { }

  ngOnInit(): void {
   this.service.GetDoctorDashboardData().subscribe((result)=>{
    debugger
    this.data=result;
   });
    localStorage.setItem('header','DashBoard')
  }

}
