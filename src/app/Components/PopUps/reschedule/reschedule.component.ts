import { NoopAnimationPlayer } from '@angular/animations';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DateService } from 'src/app/Shared/date.service';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';
import Swal from 'sweetalert2';
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
 starttime:any
 endtime:any
 rescheduleform:any
 mydate:any
 List:any
 df?:NgbDateStruct
 model:any
  constructor(
    public dialogRef: MatDialogRef<RescheduleComponent>,
    @Inject(MAT_DIALOG_DATA) public Data: any,private formbuilder:FormBuilder,
    private service:HimsServiceService,private dateservice:DateService
  ) {

    this.rescheduleform=this.formbuilder.group({
     
    });
    
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

public Reschedule(obj:any)
{
 
  debugger
 obj.PatientAppointmentId=this.Data.appointmentId
 obj.StartTime= (<HTMLInputElement>document.getElementById('StartTime')).value
 obj.EndTime= (<HTMLInputElement>document.getElementById('EndTime')).value
 let d= this.model
 obj.AppointmentDate=this.dateservice.GlobalStringDateFormat(d)
 //this.mydate= (<HTMLInputElement>document.getElementById('dob')).value(<HTMLInputElement>document.getElementById('AppointmentDate')).value;
 //List.AppointmentDate=this.dateservice.GlobalStringDateFormat(d);
this.service.RescheduleAppointment(obj) .subscribe((result)=>{
if(result>0)
 {
    Swal.fire('Success','Successfully Rescheduled','success');
  }
 })
 // data.PatientAppointmentId=Data.
}

   
onDateSelecttodate(event:any) {
  debugger
  let year = event.year;
  let month = event.month <= 9 ? '0' + event.month : event.month;;
  let day = event.day <= 9 ? '0' + event.day : event.day;;
   let actual = day + "-" + month + "-" + year;
 //  (<HTMLInputElement>document.getElementById('fdate')).value
 this.model=actual
  
 }

  ngOnInit(): void {
    debugger
    
    this.rescheduleform=this.formbuilder.group({
     
    });
    this.starttime = this.convertTo24HourFormat(this.Data.start_Time);
    this.endtime = this.convertTo24HourFormat(this.Data.end_Time);
    
  //this.myform.reset();
  this.model=this.Data.appointment_Date
 // this.starttime = this.convertTo24HourFormat(this.Data.start_Time);
  //this.endtime = this.convertTo24HourFormat(this.Data.end_Time);
    
  }

}