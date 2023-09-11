import { NoopAnimationPlayer } from '@angular/animations';
import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DateService } from 'src/app/Shared/date.service';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';
import { NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DialogcommunicationService } from 'src/app/Shared/dialogcommunication.service';
import { DatePipe, formatDate } from '@angular/common';
import { LoadingPopupComponent } from '../loading-popup/loading-popup.component';
export interface UserData {
  id: number;
  name: string;
  email: string;
 
}
@Component({
  selector: 'app-reschedule',
  templateUrl: './reschedule.component.html',
  styleUrls: ['./reschedule.component.css',"../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../css/dataTables.bootstrap4.min.css","../../../../css/bootstrap.min.css"
  ,"../../../../css/responsive.bootstrap4.min.css","../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../css/dataTables.bootstrap4.min.css","../../../../css/metisMenu.min.css"],
  
})
export class RescheduleComponent implements OnInit {
 starttime:any
 endtime:any
 btnisDesable=true
 rescheduleform:any
 mydate:any
 List:any
 df?:NgbDateStruct
 _AppointmentDate:any
 model:any
 selectedTime: Date = new Date();
 minDate: { year: number; month: number; day: number; };
  constructor(private router:Router,
    public datepipe:DatePipe,
    public dialogRef: MatDialogRef<RescheduleComponent>,
    @Inject(MAT_DIALOG_DATA) public Data: any,private formbuilder:FormBuilder,
    private service:HimsServiceService,private dateservice:DateService,
    private dialogCommunicationService: DialogcommunicationService,
    private dialogService:DialogcommunicationService,
  ) {
    const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth()+1,
      day: current.getDate()
    };

    this.rescheduleform=this.formbuilder.group({
     
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

public Reschedule(obj:any)
{
 
  debugger
  this.openDialog()
  // let stTimeam=obj.StartTime.includes('AM')
  // let stTimepm=obj.StartTime.includes('PM')
  
  // if(stTimeam==true||stTimepm==true)
  // {

  //   obj.StartTime= this.convertTo24HourFormat(obj.StartTime);
  //   obj.EndTime= this.convertTo24HourFormat(obj.StartTime);
  // }
  
    
  obj.StartTime= this.convertTo24HourFormat(obj.StartTime);
  obj.EndTime= this.convertTo24HourFormat(obj.EndTime);

 obj.PatientAppointmentId=this.Data.appointmentId
 let d= this.model
 obj.AppointmentDate=this.dateservice.GlobalStringDateFormat(d)

 if(this.rescheduleform.invalid)
 {
  this.validateallformfields(this.rescheduleform)
 }
 else{
  
this.service.RescheduleAppointment(obj) .subscribe((result)=>{
  if(result>0)
   {
      Swal.fire('Successfully Rescheduled','','success');
      
    this.dialogCommunicationService.notifyDialogClosed();
    this.dialogRef.close();
    }
   })

 }
 this.closeAllDialogs()
 // data.PatientAppointmentId=Data.
}

   
onDateSelecttodate(event:any) {
  debugger
  let year = event.year;
  let month = event.month <= 9 ? '0' + event.month : event.month;;
  let day = event.day <= 9 ? '0' + event.day : event.day;;
   let actual = day + "-" + month + "-" + year;
 //  (<HTMLInputElement>document.getElementById('fdate')).value
 this.model=actual;
 (<HTMLInputElement>document.getElementById('fdate')).value=this.model
 this._AppointmentDate=this.dateservice.GlobalStringDateFormat(this.model);
 this.GetTimeSlotsForTimePicker(this._AppointmentDate,15)
 let datenow=new Date();
  let convertedDatenow=formatDate(datenow,'yyyy-MM-dd','en-Us')
 let initialAppDate=this.dateservice.GlobalStringDateFormat(this.Data.appointment_Date)
 if(this.starttime==this.Data.start_Time && initialAppDate<=convertedDatenow)
 {
   this.btnisDesable=true;
 } 
 else this.btnisDesable=false;

 const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth()+1,
      day: current.getDate()
    };

 }

 
validateallformfields(formgroup:FormGroup)
{
  debugger
 Object.keys(formgroup.controls).forEach(fields=>{
const control=formgroup.get(fields)
if(control instanceof FormControl)
{
  control.markAsTouched({onlySelf:true})
}else if(control instanceof FormGroup)
{
  this.validateallformfields(control)
}
})
}


//-----------------Time

my:any=0
showModal=false
seleceddata:any=""
timeintarval:any
Ttime:any=""

time_15min=  ["12:00 AM",
  "12:15 AM",
  "12:30 AM",
  "12:45 AM",
  "01:00 AM",
  "01:15 AM",
  "01:30 AM",
  "01:45 AM",
  "02:00 AM",
  "02:15 AM",
  "02:30 AM",
  "02:45 AM",
  "03:00 AM",
  "03:15 AM",
  "03:30 AM",
  "03:45 AM",
  "04:00 AM",
  "04:15 AM",
  "04:30 AM",
  "04:45 AM",
  "05:00 AM",
  "05:15 AM",
  "05:30 AM",
  "05:45 AM",
  "06:00 AM",
  "06:15 AM",
  "06:30 AM",
  "06:45 AM",
  "07:00 AM",
  "07:15 AM",
  "07:30 AM",
  "07:45 AM",
  "08:00 AM",
  "08:15 AM",
  "08:30 AM",
  "08:45 AM",
  "09:00 AM",
  "09:15 AM",
  "09:30 AM",
  "09:45 AM",
  "10:00 AM",
  "10:15 AM",
  "10:30 AM",
  "10:45 AM",
  "11:00 AM",
  "11:15 AM",
  "11:30 AM",
  "11:45 AM",
  "12:00 PM",
"12:15 PM",
"12:30 PM",
"12:45 PM",
"01:00 PM",
"01:15 PM",
"01:30 PM",
"01:45 PM",
"02:00 PM",
"02:15 PM",
"02:30 PM",
"02:45 PM",
"03:00 PM",
"03:15 PM",
"03:30 PM",
"03:45 PM",
"04:00 PM",
"04:15 PM",
"04:30 PM",
"04:45 PM",
"05:00 PM",
"05:15 PM",
"05:30 PM",
"05:45 PM",
"06:00 PM",
"06:15 PM",
"06:30 PM",
"06:45 PM",
"07:00 PM",
"07:15 PM",
"07:30 PM",
"07:45 PM",
"08:00 PM",
"08:15 PM",
"08:30 PM",
"08:45 PM",
"09:00 PM",
"09:15 PM",
"09:30 PM",
"09:45 PM",
"10:00 PM",
"10:15 PM",
"10:30 PM",
"10:45 PM",
"11:00 PM",
"11:15 PM",
"11:30 PM",
"11:45 PM"
]

time_30min=  ["12:00 AM",
 
  "12:30 AM",

  "01:00 AM",
 
  "01:30 AM",
 
  "02:00 AM",
 
  "02:30 AM",
 
  "03:00 AM",
  
  "03:30 AM",

  "04:00 AM",
 
  "04:30 AM",

  "05:00 AM",
 
  "05:30 AM",

  "06:00 AM",
 
  "06:30 AM",
 
  "07:00 AM",

  "07:30 AM",
 
  "08:00 AM",
 
  "08:30 AM",
 
  "09:00 AM",
  
  "09:30 AM",
  
  "10:00 AM",
  
  "10:30 AM",
 
  "11:00 AM",
 
  "11:30 AM",
 
  "12:00 PM",

"12:30 PM",

"01:00 PM",

"01:30 PM",

"02:00 PM",

"02:30 PM",

"03:00 PM",

"03:30 PM",

"04:00 PM",

"04:30 PM",

"05:00 PM",

"05:30 PM",

"06:00 PM",

"06:30 PM",

"07:00 PM",

"07:30 PM",

"08:00 PM",

"08:30 PM",

"09:00 PM",

"09:30 PM",

"10:00 PM",

"10:30 PM",

"11:00 PM",

"11:30 PM",

]
data=[{Id:1},{Id:2},{Id:3},{Id:4},{Id:5},{Id:6}]
@ViewChild('StartTime')
StartTime!: ElementRef;

ChangeTimeSlot(index:any,items:any)
{
  debugger
  console.log(items.Id);
  this.starttime=items
let initialAppDate=this.dateservice.GlobalStringDateFormat(this.Data.appointment_Date)
  this.rescheduleform.get('StartTime').patchValue(items)
  let datenow=new Date();
  let convertedDatenow=formatDate(datenow,'yyyy-MM-dd','en-Us')
  let appDate=this.dateservice.GlobalStringDateFormat(this.model)
  let convertedDate=formatDate(appDate,'yyyy-MM-dd','en-Us')
  debugger
  if( items=="10:45 PM")
  {
    this.endtime="11:00 PM"
     
  this.rescheduleform.get('EndTime').patchValue("11:00 PM")
  }else{
    this.endtime=this.timeintarval[index+1]
    
  this.rescheduleform.get('EndTime').patchValue(this.timeintarval[index+1])
  }

  
  if(appDate<convertedDatenow)
  {
    this.btnisDesable=true;
  } 
  else
  if(this.starttime==this.Data.start_Time && appDate==convertedDatenow)
  {
    this.btnisDesable=true;
  } 
  else
  if(this.starttime!=this.Data.start_Time)
  {
    this.btnisDesable=false;
  } 
  else  this.btnisDesable=true;
 
  this.showModal = false;

}



openDialog(): void {
  this.dialogService.open(LoadingPopupComponent, {
   // width: '250px', // Adjust the width as needed
   data:"Saving....."
  });
}

closeAllDialogs(): void {
  this.dialogService.closeAll();
}

setInterval(event:any)
{

debugger
if(event.target.value=="1")
{
  this.timeintarval=this.time_15min
}else
if(event.target.value=="2")
{
  this.timeintarval=this.time_30min
} else this.timeintarval=this.time_15min


this.seleceddata=""
}
myarr:string[]=[]


GetTimeSlotsForTimePicker(date:any,TimeInterval:any)
{
  debugger
  this.service.GetTimeSlotsForTimePicker(date,TimeInterval).subscribe((result)=>{
    this.timeintarval=result;
    debugger
  })

}
EndTimeKeyEvent(event: KeyboardEvent) {
  if (
    (event.keyCode === 9)||
   // [46, 8, 9, 27, 13].indexOf(event.keyCode) !== -1 ||
    // Allow Ctrl+A
    (event.keyCode === 65 && event.ctrlKey === true) ||
    // Allow Ctrl+C
   // (event.keyCode === 67 && event.ctrlKey === true) ||
    // Allow Ctrl+V
 //   (event.keyCode === 86 && event.ctrlKey === true) ||
    // Allow Ctrl+X
    (event.keyCode === 88 && event.ctrlKey === true) ||
    // Allow home, end, left, right arrow keys
    (event.keyCode >= 35 && event.keyCode <= 39)
  ) {
    return;
  }
  event.preventDefault();
}

//-----------------------
  ngOnInit(): void {
    debugger
  //  this.timeintarval=this.time_15min
  //this.rescheduleform.get('AppointmentDate').patchValue(this.Data.appointment_Date)
  this.starttime=this.Data.start_Time;
  this.endtime=this.Data.end_Time;
    this.rescheduleform=this.formbuilder.group({
      StartTime:[this.starttime,Validators.required], //[this.convertTo24HourFormat(this.Data.start_Time),Validators.required],
      EndTime:[this.endtime,Validators.required],
    

    });
    this._AppointmentDate=this.dateservice.GlobalStringDateFormat(this.Data.appointment_Date)
    const current = new Date();
if(this.dateservice.GlobalStringDateFormat(this.Data.appointment_Date)==formatDate(current,'yyyy-MM-dd','en-Us'))
{
  this.minDate = {
    year: current.getFullYear(),
    month: current.getMonth()+1,
    day: current.getDate()+1
  };
}
    
  
    this.GetTimeSlotsForTimePicker(this._AppointmentDate,15)
   // this.starttime = this.convertTo24HourFormat(this.Data.start_Time);
    //this.endtime = this.convertTo24HourFormat(this.Data.end_Time);
    
  //this.myform.reset();
 // this.starttime = this.convertTo24HourFormat(this.Data.start_Time);
  //this.endtime = this.convertTo24HourFormat(this.Data.end_Time);
  debugger
 
 // this.rescheduleform.get('AppointmentDate').setValue(this.Data.appointment_Date);
  this.model=this.Data.appointment_Date
  }
  
performAction() {
  // Your action code here
//this.router.navigateByUrl('/FrontDesk/Search-Appointments')
  // Close the dialog
  this.dialogRef.close();
  this.dialogCommunicationService.notifyDialogClosed();

}


@HostListener('document:click',['$event'])
clickout(event: { target: any; }){
 
 

  if(this.StartTime.nativeElement.contains(event.target)){
    this.GetTimeSlotsForTimePicker(this._AppointmentDate,15)
    
    this.showModal = true;
  }
  else{
    this.showModal = false;
  }
  
  }

}