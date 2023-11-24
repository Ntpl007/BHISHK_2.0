import { Component, OnInit } from '@angular/core';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';

@Component({
  selector: 'app-frontdesk-dashboard',
  templateUrl: './frontdesk-dashboard.component.html',
  styleUrls: ['./frontdesk-dashboard.component.css']
})
export class FrontdeskDashboardComponent implements OnInit {
  data:any;
  TotalCount=0;
  TodayCount=0;
  RevisitCount=0;
  constructor(private service:HimsServiceService) {
    // setInterval(() => {
    //   this.getDashboardData();
 
    // }, 1);
   }
public getDashboardData()
{
  this.service.GetFrontdeskDashboardData().subscribe((result)=>{
    debugger
    this.data=result[0];
    if(result.length>0)
    {

      this.TotalCount=this.data.totalPCount;
      this.TodayCount=this.data.todayPCount;
      this.RevisitCount=this.data.revisitPCount;
  
    }
   });
   
  }

  ngOnInit(): void {
localStorage.setItem('header','DashBoard')
    this.getDashboardData()
   
  }

}
