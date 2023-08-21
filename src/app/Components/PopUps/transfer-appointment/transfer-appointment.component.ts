import { Component, Inject,OnInit } from '@angular/core';
import { NoopAnimationPlayer } from '@angular/animations';
import { FormBuilder, Validators } from '@angular/forms';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DateService } from 'src/app/Shared/date.service';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';

import Swal from 'sweetalert2';
import { Speciality } from 'src/app/Model/Speciality';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-transfer-appointment',
  templateUrl: './transfer-appointment.component.html',
  styleUrls: ['./transfer-appointment.component.css']
})
export class TransferAppointmentComponent implements OnInit {
  Transferform:any
  model:any
  speciality:any
  doctors:any
  mydate:any
  List:any
  df?:NgbDateStruct
  starttime:any
  endtime:any
  stype:any
  doctorList:any
  _specialityid=0
  specialityList:any
  _doctorId=0
  special:Speciality[]=[];
  isspecialityhide:any=false
  isdoctorhide:any=false
  appModel:any=""




  constructor(public dialogRef: MatDialogRef<TransferAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public Data: any,private formbuilder:FormBuilder,
    private service:HimsServiceService,private dateservice:DateService) {
      this.Transferform=this.formbuilder.group({




      });


   }

   closeDialog(): void {
    // Any logic you want before closing the dialog
    this.dialogRef.close();
  }
  
  
   convertTo24HourFormat(time12Hour: string): string {
    //const [time, period]
    let timeperiodsplit = time12Hour.split(' ');
  
    let hoursminuts = timeperiodsplit[0].split(':');
     let hours = parseInt(hoursminuts[0], 10);
   let  minutes = parseInt(hoursminuts[1], 10);
  
    if (timeperiodsplit[1] === 'PM' && hours !== 12) {
      hours += 12;
    } else if (timeperiodsplit[1] === 'AM' && hours === 12) {
      hours = 0;
    }
  
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
 
  }
  public Transfer(obj:any)
{
 
  debugger

 obj.PatientAppointmentId=this.Data.appointmentId
 obj.StartTime= (<HTMLInputElement>document.getElementById('stime')).value
 obj.EndTime= (<HTMLInputElement>document.getElementById('etime')).value
 //obj.doctorId=this.Data.doctorId
 //obj.specialityID=this.Data.specialityID
 let d= this.appModel
 obj.AppointmentDate=this.dateservice.GlobalStringDateFormat(d)
 //this.mydate= (<HTMLInputElement>document.getElementById('dob')).value(<HTMLInputElement>document.getElementById('AppointmentDate')).value;
 //List.AppointmentDate=this.dateservice.GlobalStringDateFormat(d);
 this.service.TransferAppointment(obj) .subscribe((result)=>{
  if(result>0)
 {
    Swal.fire('Success','Successfully Transferred','success');
  }
 })}
 // data.PatientAppointmentId=Data.

 onDateSelecttodate(event:any) {
  debugger
  let year = event.year;
  let month = event.month <= 9 ? '0' + event.month : event.month;;
  let day = event.day <= 9 ? '0' + event.day : event.day;;
   let actual = day + "-" + month + "-" + year;
 //  (<HTMLInputElement>document.getElementById('fdate')).value
 this.appModel=actual
  
 }
 getId(data:any)
 {
debugger
let stypeid=data.target.value
let  speciality=data.target.value;
if(stypeid=="1")
{
 this.isspecialityhide=true
 this.isdoctorhide=true
}}
public getDoctors(Id:any)
{
  let spid=Id.target.value;
  debugger

  this.service.GetDoctorbyspeciality(spid).subscribe((result)=>{this.doctorList=result})
  debugger
}

public getSpeciality()
{
 
  this.service.getSpeciality().subscribe((result)=>{
    this.specialityList=result
  
  })
  
  
}


 ngOnInit(): void {
  debugger
  this.Transferform=this.formbuilder.group({
    SpecialityID:['Speciality*'],
    DoctorId:['Doctor*'] ,
    StartTime:[""],
  EndTime:[""]



  });
  this.service.getSpeciality().subscribe((result)=>{this.speciality=result})
  
  
  this.getSpeciality()
  this.model=this.Data.appointment_Date

}




  } 


