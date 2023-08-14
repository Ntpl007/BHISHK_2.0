import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';
//import { SchedulePopupComponent } from '../../schedule-popup/schedule-popup.component';


@Component({
  selector: 'app-schedule-type',
  templateUrl:'./schedule-type.component.html',
  styleUrls: ['./schedule-type.component.css', "../../../../css/dataTables.bootstrap4.min.css","../../../../css/style.css","../../../../css/bootstrap.min.css"
  ,"../../../../css/responsive.bootstrap4.min.css","../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../css/dataTables.bootstrap4.min.css","../../../../css/metisMenu.min.css"]
})
export class ScheduleTypeComponent implements OnInit {
stype:any
speciality:any
doctors:any
chargegroup:any
chargeitems:any
isspecialityhide:any=false
isIscheulehide:any=false
isdoctorhide:any=false
ischargegrouphide:any=false
ischargeItemhide:any=false
  constructor(private service:HimsServiceService,private d:MatDialog) { }

  // open()
  // {
  //   this.d.open(SchedulePopupComponent,{
  //     width:"60%",
  //     height:"400px"
  //   })
  // }
  getId(data:any)
  {
debugger
 let stypeid=data.target.value
 let speciality=data.target.value;
 if(stypeid=="1")
 {
  this.isspecialityhide=true
  this.isdoctorhide=true
  
  this.ischargegrouphide=false
  this.ischargeItemhide=false
 }
 else if(stypeid=="2")
 {
  this.isspecialityhide=true
  this.isdoctorhide=false
  
  this.ischargegrouphide=false
  this.ischargeItemhide=false
  
 }else 
  if(stypeid=="3"|| stypeid=="4" )
 {

  this.isspecialityhide=false
  this.isdoctorhide=false
  this.ischargegrouphide=true
  this.ischargeItemhide=true
  this.getChargeGroups(stypeid);
 }
 else{
  
  this.isspecialityhide=false
  this.isdoctorhide=false
  this.ischargegrouphide=false
  this.ischargeItemhide=false
  
 }
}
public getChargeGroups(Id:any)
{

debugger
  this.service.GetChargeGroups(Id).subscribe((result)=>{this.chargegroup=result})
}
  public getDoctors(Id:any)
  {
    debugger
    this.service.GetDoctorbyspeciality(Id.target.value).subscribe((result)=>{this.doctors=result})
  }


  public GetChargeItems(Id:any)
  {
    debugger
   let chargegroupid=Id.target.value
    this.service.GetChargeItems(chargegroupid).subscribe((result)=>{this.chargeitems=result})
  }
  ngOnInit(): void {
this.service.GetSchedulartypes().subscribe((result)=>{this.stype=result})
this.service.getSpeciality().subscribe((result)=>{this.speciality=result})



  }

}
