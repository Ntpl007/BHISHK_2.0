import { Component, OnInit,ElementRef,Renderer2, HostListener } from '@angular/core';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';
import { HttpClient } from '@angular/common/http';
import { DateService } from 'src/app/Shared/date.service';
import { DatePipe, formatDate } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateStruct, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { concatAll, map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CreateAppointmentComponent } from '../Appointments/create-appointment/create-appointment.component';
import { EditAppointmentsComponent } from '../Appointments/edit-appointments/edit-appointments.component';
import { DialogcommunicationService } from 'src/app/Shared/dialogcommunication.service';
import { RefreshCommunicationService } from 'src/app/Shared/refresh-communication.service'
import {RescheduleComponent } from '../../PopUps/reschedule/reschedule.component'
import {TransferAppointmentComponent} from '../../PopUps/transfer-appointment/transfer-appointment.component'
import { CalendarSchedule } from 'src/app/Model/CalendarSchedule';
import { Appointment } from 'src/app/Model/Appointment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calendarschedule',
  templateUrl: './calendar-schedule.component.html',
  styleUrls: ['./calendar-schedule.component.css']
})
export class CalendarscheduleComponent implements OnInit {
  stype:any
speciality:any
doctors:any
chargegroup:any
chargeitems:any
isspecialityhide:any=false
isIscheulehide:any=false
isdoctorhide:any=false
isdatehide:any=false
ischargegrouphide:any=false
ischargeItemhide:any=false
AppdateModel: any;
date: any;
selectedSlot: any;
providerId: number =0;
timings:any;
formattedtime: any;
timeSlots :any [] = [];
appointmentslots :any [] = [];
fmtapntSlots :any [] = [];
morningSlots:any [] = [];
afternoonSlots:any [] = [];
eveningSlots:any [] = [];
nightSlots:any [] = [];
specialityID: number =0;
row :any [] = [];
showCntxtMenu:any = false;
contextMenuPosition = { left: '0px', top: '0px' };
model?: NgbDateStruct;
model1?: NgbDateStruct;
limittimeslist : any[] = [];
starttime:any;
RescheduleDate:any;
TransferDate:any;
rescheduledates: any [] =[];
transferdates: any [] =[];
rescheduleappointmentsslots : Array<CalendarSchedule>=[];
rescheduleappointmetid:any;
Appointment:any;
transferProviderId:any;
ismouseoverclass:any = false;  
showPopup: boolean = false; // Variable to control popup visibility

  rowData: any;
  facility: any;
  formatteddate: Date | undefined;
  Startdate: Date | undefined;
  EndDate: Date | undefined;
  chkdate: Date | undefined;

//AppdateModel: NgbDateStruct | null = this.getCurrentDate(); // Initialize with the current date
myform:any
minDate: { year: number; month: number; day: number; };
maxDate: { year: number; month: number; day: number; };
maxDateForAppointment: { year: number; month: number; day: number; };
isDateSelected: boolean = false;
getCurrentDate(): NgbDateStruct {
  const today = new Date();
  return { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
}

  constructor(private service: HimsServiceService,private dateservice:DateService,private http: HttpClient,private router:Router,
    private formbulder:FormBuilder,private datePipe: DatePipe,private dialog: MatDialog,
    private dialogCommunicationService:DialogcommunicationService,private refreshCommunicationService: RefreshCommunicationService,private el:ElementRef, private config: NgbDatepickerConfig) { 
    this.http.get('src/assets/My.json').subscribe(config => {
      
    });
    const current = new Date();
    const convertTime12to24 = (time12h:any) => {
      const [time, modifier] = time12h.split(' ');
    
      let [hours, minutes] = time.split(':');
    
      if (hours === '12') {
        hours = '00';
      }
    
      if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
      }
    
      return `${hours}:${minutes}:${minutes}`;
    }
   this.minDate = {
     year: current.getFullYear(),
     month: current.getMonth(),
     day: current.getDate()
   };    
   this.maxDate = {
     year: current.getFullYear(),
     month: current.getMonth()+4,
     day: current.getDate()
   };
   this.maxDateForAppointment= {
    year: current.getFullYear(),
    month: current.getMonth()+4,
    day: current.getDate()
  };
  this.myform=formbulder.group({
   // customControl: new FormControl('', [])
  })
  //const current = new Date();
  config.minDate = { year: current.getFullYear(), month: 
  current.getMonth() + 1, day: current.getDate() };
    //config.maxDate = { year: 2099, month: 12, day: 31 };
  config.outsideDays = 'hidden'; 
  
  }
  ngOnInit(): void {
    localStorage.setItem('header','Calendar Appointments')
    this.FillTimes();
    this.dialogCommunicationService.getSuccessSignal().subscribe(() => {
      debugger;
      this.dialog.closeAll();
    });
    this.refreshCommunicationService.getRefreshSignal().subscribe(() => {
      debugger;
      this.GetTimeSlots(this.date);

     
    });
    this.facility=localStorage.getItem('facilityId')
    this.service.GetSchedulartypes().subscribe((result)=>{
      this.stype=result;
      this.stype = this.stype.filter((item: { scheduleTypeId: number; }) => item.scheduleTypeId === 1);
        const existingIndex = this.row.findIndex((row) => {
          const keyValue = row.split('='); // Split the row by '=' to get key and value
          return keyValue[0] === 'ScheduleId';
        });
        if (existingIndex !== -1) {
          // If an entry with the same ScheduleId exists, update it
          const existingKeyValue = this.row[existingIndex].split('=');
          const updatedValue = this.stype[0].scheduleTypeId; // Replace with the updated value
          this.row[existingIndex] = `${existingKeyValue[0]}=${updatedValue}`;
        } else {
          // If no entry with the same ScheduleId exists, add a new one
          this.row.push("ScheduleId="+this.stype[0].scheduleTypeId);
        }
      this.isspecialityhide=true
      this.isdoctorhide=false
      
      this.ischargegrouphide=false
      this.ischargeItemhide=false
    
    })
    this.myform=this.formbulder.group({
      SpecialityID:['Speciality*',Validators.required],
      DoctorId:['Doctor*',Validators.required],
      AppointmentDate:['',Validators.required]
    
    })
    
this.service.getSpeciality().subscribe((result)=>{this.speciality=result})
  }
  getId(data:any)
  {
  this.isspecialityhide=true
  this.isdoctorhide=true
  
  this.ischargegrouphide=false
  this.ischargeItemhide=false
//  }
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
public FillTimes()
  {
    
    //var quarterHours: any = {};
    var quarterHours:string[] = ["00", "15", "30", "45"];
    //var Templimittimeslist : any[] = [];

    for (var i = 0; i < 24; i++) {
      for (var j = 0; j < 4; j++) {
          var time = i + ":" + quarterHours[j];
          if (i < 10) {
              time = "0" + time;
          }
          this.limittimeslist.push(time);
      }
    }
    //console.log(this.limittimeslist);
  }
  public getDoctors(Id:any)
  {
    this.isdoctorhide=true
   
    const existingIndex = this.row.findIndex((row) => {
      const keyValue = row.split('='); // Split the row by '=' to get key and value
      return keyValue[0] === 'Speciality';
    });
    if (existingIndex !== -1) {
      // If an entry with the same ScheduleId exists, update it
      const existingKeyValue = this.row[existingIndex].split('=');
      const updatedValue = Id.target.value; // Replace with the updated value
      this.row[existingIndex] = `${existingKeyValue[0]}=${updatedValue}`;
    } else {
      // If no entry with the same ScheduleId exists, add a new one
      this.row.push("Speciality="+ Id.target.value);
    }
    this.service.GetDoctorbyspeciality(Id.target.value).subscribe((result)=>{this.doctors=result})
  }
  public getdate(Id: any)
  {
    this.providerId = Id.target.value;
    
    const existingIndex = this.row.findIndex((row) => {
      const keyValue = row.split('='); // Split the row by '=' to get key and value
      return keyValue[0] === 'ProviderId';
    });
    if (existingIndex !== -1) {
      // If an entry with the same ScheduleId exists, update it
      const existingKeyValue = this.row[existingIndex].split('=');
      const updatedValue = Id.target.value; // Replace with the updated value
      this.row[existingIndex] = `${existingKeyValue[0]}=${updatedValue}`;
    } else {
      // If no entry with the same ScheduleId exists, add a new one
      this.row.push("ProviderId="+ Id.target.value);
    }
    this.isdatehide = true;
  }
  public GetChargeItems(Id:any)
  {
   let chargegroupid=Id.target.value
    this.service.GetChargeItems(chargegroupid).subscribe((result)=>{this.chargeitems=result})
  }
  onDateSelectAppdate(event:any) {
    debugger;
    let year = event.year;
    let month = event.month <= 9 ? '0' + event.month : event.month;;
    let day = event.day <= 9 ? '0' + event.day : event.day;;
     let actual = day + "-" + month + "-" + year;
    (<HTMLInputElement>document.getElementById('AppointmentDate')).value=actual
    this.AppdateModel=actual;
    const existingIndex = this.row.findIndex((row) => {
      const keyValue = row.split('='); 
      const numericValue = Number(actual);// Split the row by '=' to get key and value
      return keyValue[0] === 'Appointment Date';
    });
    if (existingIndex !== -1) {
      // If an entry with the same ScheduleId exists, update it
      const existingKeyValue = this.row[existingIndex].split('=');
      const updatedValue = actual; // Replace with the updated value
      this.row[existingIndex] = `${existingKeyValue[0]}=${updatedValue}`;
    } else {
      // If no entry with the same ScheduleId exists, add a new one
      this.row.push("Appointment Date="+ actual);
    }
    
    this.date = year + "-" + month + "-" + day;
    this.GetTimeSlots(this.date);
   }
   GetTimeSlots(date: any){
    debugger;
    this.appointmentslots = [];
    this.fmtapntSlots = [];
    this.timeSlots = [];
    this.morningSlots=[];
    this.afternoonSlots=[];
    this.eveningSlots =[];
    this.nightSlots = [];
    this.rescheduleappointmentsslots = [];
    this.service.GetScheduledTime(date, this.providerId, this.facility)
    .subscribe(
      (result)=>{
        this.service.GetBookedAppointments(date, this.providerId,this.facility)
        .subscribe(
          (data)=>{
            debugger
            for(let k=0; k< data.length; k++)
            {
              const start = new Date(data[k].startDate); 
              const formattedTimeSlot = start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
              this.appointmentslots.push(formattedTimeSlot);
              this.rescheduleappointmentsslots.push(data[k]);
            }
            //console.log(this.rescheduleappointmentsslots);
            let appointmentperiod = 'AM';
            for (var slot of this.appointmentslots) {
              var [hour, minutes] = slot.split(':');
              if (hour >= 0 && hour < 12) {
                slot = `${hour}:${minutes}`;
                this.fmtapntSlots.push(slot+" "+appointmentperiod);
              } else if (hour >= 12 && hour < 17) {
                hour -= 12;
                slot = `${hour}:${minutes}`;
                appointmentperiod = 'PM';
                this.fmtapntSlots.push(slot+" "+appointmentperiod);
              } else if(hour >=17 && hour < 21){
                hour -= 12;
                slot = `${hour}:${minutes}`;
                appointmentperiod = 'PM';
                this.fmtapntSlots.push(slot+" "+appointmentperiod);
              }
              else if(hour >=21 && hour < 24){
               hour -= 12;
               slot = `${hour}:${minutes}`;
               appointmentperiod = 'PM';
               this.fmtapntSlots.push(slot+" "+appointmentperiod);
             }
            }
            for(let i=0; i < result.length; i++){
              const start = new Date(result[i].startDate); 
              const End = new Date(result[i].endDate); 
                const interval = result[i].scheduleInterval;
                const existingIndex = this.row.findIndex((row) => {
                  const keyValue = row.split('='); 
                  return keyValue[0] === 'ScheduledInterval';
                });
                if (existingIndex !== -1) {
                  const existingKeyValue = this.row[existingIndex].split('=');
                  const updatedValue = interval; 
                  this.row[existingIndex] = `${existingKeyValue[0]}=${updatedValue}`;
                } else {
                  this.row.push("ScheduledInterval="+interval)
                }
                
        
        let currentTime = start;
        while (currentTime < End) {
          const formattedTimeSlot = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
           this.timeSlots.push(formattedTimeSlot);
          // Increment currentTime by 15 minutes
          currentTime = new Date(currentTime.getTime() + interval * 60000);
        }
              }
   let Period = 'AM';
   for (var slot of this.timeSlots) {
     var [hour, minutes] = slot.split(':');
     if (hour >= 0 && hour < 12) {
      if(hour == 0)
      {
       hour = 12;
      }
       Period = 'AM';
       slot = `${hour}:${minutes}`;
       this.morningSlots.push(slot+" "+Period);
     } else if (hour >= 12 && hour < 17) {
       hour -= 12;
       if(hour == 0)
       {
        hour = 12;
       }
       slot = `${hour}:${minutes}`;
       Period = 'PM';
       this.afternoonSlots.push(slot+" "+Period);
     } else if(hour >=17 && hour < 21){
       hour -= 12;
       slot = `${hour}:${minutes}`;
       Period = 'PM';
       this.eveningSlots.push(slot+" "+Period);
     }
     else if(hour >=21 && hour < 24){
      hour -= 12;
      slot = `${hour}:${minutes}`;
      Period = 'PM';
      this.nightSlots.push(slot+" "+Period);
    }
   }
       })
         this.isDateSelected = true;
          })
   }
   slotExistsInAppointments(item: string): boolean {
      const exists = this.fmtapntSlots.includes(item);
      return exists;
  }
  isSlotPast(slot: string): boolean {
    
    const currentTime = new Date();
    const [time, period] = slot.split(' '); 
    const [hour, minutes] = time.split(':');
    let parsedHour = Number(hour);
    const parsedMinutes = Number(minutes);
    if (period.toLowerCase() === 'pm' && parsedHour !== 12) {
      parsedHour += 12; 
    } else if (period.toLowerCase() === 'am' && parsedHour === 12) {
      parsedHour = 0; 
    }
    if (isNaN(parsedHour) || isNaN(parsedMinutes) || parsedHour < 0 || parsedHour > 23 || parsedMinutes < 0 || parsedMinutes > 59) {
     return false;
    }
    const selecteddate = new Date(this.AppdateModel.split('-', 3)[2]+"-"+this.AppdateModel.split('-', 3)[1]+"-"+this.AppdateModel.split('-', 3)[0]);
    if(currentTime < selecteddate)
    {
      return false;
    }
    const slotTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), parsedHour, parsedMinutes);
    return slotTime < currentTime;
  }
  ShowDetails(item: any,event: MouseEvent){
    debugger;
    const isAvailable = !this.slotExistsInAppointments(item);
  const isPast = this.isSlotPast(item);

  if (isAvailable) {
    const dialogRef=this.dialog.open(CreateAppointmentComponent,{
      width:"65%",
      height:"600px",
      data:this.row
     
  })
}
// else if(!isPast && !isAvailable){
//   // const modalPopup = this.el.nativeElement.querySelector('#modalPopup');
//   // modalPopup.classList.add('show');
//   this.selectedSlot =  item;
//     // Check if it's a right-click event (contextmenu)
//     if (event && event.type === 'contextmenu') {
//       this.showContextMenuForSlot(event, item);
//     } else {
//       // Otherwise, do something else (e.g., display a message)
//       console.log("Slot not available, but not a right-click event.");
//     }
// }
    
  }
  showContextMenuForSlot(event: MouseEvent, slot: any) {
    debugger;
    event.preventDefault();
    this.selectedSlot = slot;
    this.contextMenuPosition = {
      left: `${event.clientX}px`,
      top: `${event.clientY}px`
    };
    this.showCntxtMenu = true;
    //console.log(this.showCntxtMenu);
    //console.log(this.contextMenuPosition);
  }
  public lgg(item:any)
  {
    
    //console.log(item);
    //this.ismouseoverclass= true;
    var ftd= (<HTMLInputElement>document.getElementById(item));
    //console.log(ftd.className);
    if(ftd.className != 'highlighted-row')
    {
      ftd.className = 'Mouse-Over';
    }
    
  }
  public lggout(item:any)
  {
    
    //console.log(item);
    //this.ismouseoverclass= true;
    var ftd= (<HTMLInputElement>document.getElementById(item));
    //console.log(ftd.className);
    if(ftd.className != 'highlighted-row')
    {
      ftd.className = '';
    }
  }
  showContextMenu(item: any, event: MouseEvent) {
    debugger;
    event.preventDefault(); // Prevent the browser's default context menu
  
    const isPast = this.isSlotPast(item);
    const isAvailable = !this.slotExistsInAppointments(item);
  
    if (!isPast && !isAvailable) {
      this.selectedSlot = item;
      this.showContextMenuForSlot(event, item);
    }
  }

  editSlot() {
    debugger;
    this.showCntxtMenu = false;
    const timeParts = this.selectedSlot.split(/:| /);

    // Parse the hours and minutes
    var hours = parseInt(timeParts[0]);
    var minutes = parseInt(timeParts[1]);
  
    // Convert AM/PM to 24-hour format if necessary
    if (timeParts[2].toUpperCase() === 'PM' && hours < 12) {
      hours += 12;
    } else if (timeParts[2].toUpperCase() === 'AM' && hours === 12) {
      hours = 0;
    }
    var endTIme = new Date();
    endTIme.setHours(hours);
    endTIme.setMinutes(minutes + 15);
  
    const endtime = this.formatTime(endTIme);
    const keyToUpdate = ['StartTime', 'EndTime']; 
  
  let updated = false;
  
  for (let i = 0; i < this.row.length; i++) {
    const keyValue = this.row[i].split('=');
    const key = keyValue[0];
    const value = keyValue[1];
  
    if (keyToUpdate.includes(key)) {
      this.row[i] = `${key}=${key === 'StartTime' ? this.selectedSlot : endtime}`;
      updated = true;
    }
  }
  if (!updated) {
    this.row.push(`StartTime=${this.selectedSlot}`, `EndTime=${endtime}`);
  }
  const [time, period] = this.selectedSlot.split(' ');
    const [formattedhour, formattedminutes] = time.split(':');
    
    // Convert the hours to a number
    let hours24 = parseInt(formattedhour, 10);
    const minutes24 = parseInt(formattedminutes, 10);
    // Handle 12 AM and 12 PM
    if (period.toLowerCase() === 'pm' && hours24 !== 12) {
      hours24 += 12;
    } else if (period.toLowerCase() === 'am' && hours24 === 12) {
      hours24 = 0;
    }
    
    // Format the hours and minutes as strings
    const hours24Str = hours24.toString().padStart(2, '0');
    const minutes24Str = minutes24.toString().padStart(2, '0');
    
    
    this.formattedtime =  `${hours24Str}:${minutes24Str}`;
    //console.log(this.formattedtime);
    const isAvailable = !this.slotExistsInAppointments(this.selectedSlot);
    const isPast = this.isSlotPast(this.selectedSlot);
    if(!isPast && !isAvailable){
      debugger;
      this.service.GetSelectedAppointmentdetails(this.date, this.formattedtime, this.providerId, this.facility)
      .subscribe(
        (data)=>{
          debugger;
      const dialogRef=this.dialog.open(EditAppointmentsComponent,{
        width:"65%",
        height:"450px",
        data:data[0].appointmentId
    })
    })
  }  
  }
  public onDateSelectTransferdate(event:any)
  {
    let year = event.year;
    let month = event.month <= 9 ? '0' + event.month : event.month;
    let day = event.day <= 9 ? '0' + event.day : event.day;
    // this._fromdate = year + "-" + month + "-" + day;
    this.TransferDate = year + "-" + month + "-" + day;
    var fTransferDate= (<HTMLInputElement>document.getElementById('fTransferDate')).value;
     var trandferproviderId = (<HTMLInputElement>document.getElementById('ddlTransferDoctor'));
    this.service.GetResechduleslotsData(this.TransferDate, trandferproviderId.value,this.facility).subscribe((
      (result)=>{
      this.transferdates = result;
      //console.log(this.rescheduledates);
      this.limittimeslist = [];
      this.FillTimes();
      
      for(var i = 0; i < this.rescheduledates.length; i++)
      {
        var retime = this.rescheduledates[i].providerscheduletime.split(":",3);
        this.limittimeslist.splice(this.limittimeslist.findIndex(item => item === retime[0] + ":" + retime[1]),1);
        //this.limittimeslist.push(retime[0] + ":" + retime[1]);
        // this.limittimeslist.forEach( (item, index) => {
        //   if(item === retime[0] + ":" + retime[1]) this.limittimeslist.splice(index,1);
        // });
      }
    }))
  }
  
  public onDateSelectfromdate(event:any) {    
    let year = event.year;
    let month = event.month <= 9 ? '0' + event.month : event.month;
    let day = event.day <= 9 ? '0' + event.day : event.day;
    // this._fromdate = year + "-" + month + "-" + day;
    this.RescheduleDate = year + "-" + month + "-" + day;
    var fRescheduleDate= (<HTMLInputElement>document.getElementById('fRescheduleDate')).value;

  //   this.service.GetResechduleslotsData(RescheduleDate, this.providerId,this.facility)
  //   .subscribe(
  //     (data)=>{
        
  //  })
  this.service.GetResechduleslotsData(this.RescheduleDate, this.providerId,this.facility).subscribe((
    (result)=>{
      debugger;
    this.rescheduledates = result;
    console.log(this.rescheduledates);
    this.limittimeslist = [];
    this.FillTimes();
    
    for(var i = 0; i < this.rescheduledates.length; i++)
    {
      var retime = this.rescheduledates[i].providerscheduletime.split(":",3);
      this.limittimeslist.splice(this.limittimeslist.findIndex(item => item === retime[0] + ":" + retime[1]),1);
      //this.limittimeslist.push(retime[0] + ":" + retime[1]);
      // this.limittimeslist.forEach( (item, index) => {
      //   if(item === retime[0] + ":" + retime[1]) this.limittimeslist.splice(index,1);
      // });
    }
  }))
    
  
   }
   public onTransferStarttimeChanged()
   {
    var transferstarttime = (<HTMLInputElement>document.getElementById('txtTranferStartTime'));
    var transferendtime = (<HTMLInputElement>document.getElementById('txtTransferendtime'));
    var minutevalue = transferstarttime.value.split(':', 2)[1];
    
    transferendtime.value = transferstarttime.value;
    if(minutevalue =="00")
    {
      transferendtime.value =  transferstarttime.value.split(':', 2)[0] + ":" + "15";
    }
    else if(minutevalue =="15")
    {
      transferendtime.value =  transferstarttime.value.split(':', 2)[0] + ":" + "30";
    }
    else if(minutevalue =="30")
    {
      transferendtime.value =  transferstarttime.value.split(':', 2)[0] + ":" + "45";
    }
    else
    {
      var hourtime = Number(transferstarttime.value.split(':', 2)[0]) + 1;
      transferendtime.value =  hourtime + ":" + "00";
    }

   }
   public onStarttimeChanged()
   {
    var reschedulestarttime = (<HTMLInputElement>document.getElementById('txtStartTime'));
    var rescheduleendtime = (<HTMLInputElement>document.getElementById('txtendtime'));
    var minutevalue = reschedulestarttime.value.split(':', 2)[1];
    
    rescheduleendtime.value = reschedulestarttime.value;
    if(minutevalue =="00")
    {
      rescheduleendtime.value =  reschedulestarttime.value.split(':', 2)[0] + ":" + "15";
    }
    else if(minutevalue =="15")
    {
      rescheduleendtime.value =  reschedulestarttime.value.split(':', 2)[0] + ":" + "30";
    }
    else if(minutevalue =="30")
    {
      rescheduleendtime.value =  reschedulestarttime.value.split(':', 2)[0] + ":" + "45";
    }
    else
    {
      var hourtime = Number(reschedulestarttime.value.split(':', 2)[0]) + 1;
      rescheduleendtime.value =  hourtime + ":" + "00";
    }
      
   }
   transferPatient()
   {
    debugger;
    for(var i=0; i < this.rescheduleappointmentsslots.length; i++)
    {    
     var chksplitdatetime =  this.rescheduleappointmentsslots[i].startDate?.toString().split('T', 2)[1];
      var chktime = chksplitdatetime?.split(':',3);
      //console.log(chksplitdatetime);
      //console.log(chksplitdatetime?.split(':',3)[0] + ":" + chksplitdatetime?.split(':',3)[1]);
      if( chksplitdatetime?.split(':',3)[0] + ":" + chksplitdatetime?.split(':',3)[1] == this.getTwentyFourHourTime(this.selectedSlot))
      {
        this.rescheduleappointmetid = this.rescheduleappointmentsslots[i].providerId;
      }
    }
    let appointment = new Appointment();
    appointment.PatientAppointmentId = this.rescheduleappointmetid;
    var reschedulestarttime = (<HTMLSelectElement>document.getElementById('txtTranferStartTime')).value;
    var rescheduleendtime = (<HTMLSelectElement>document.getElementById('txtTransferendtime')).value;
    var rescheduledatevalue =  (<HTMLSelectElement>document.getElementById('fTransferDate')).value;
    appointment.StartTime = rescheduledatevalue + " " + reschedulestarttime;
    appointment.EndTime = rescheduledatevalue + " " + rescheduleendtime;
    //appointment.AppointmentDate = rescheduledatevalue
    
    this.service.TransferAppointment(appointment).subscribe((result)=>{
      if(result>0)
      {
        Swal.fire('','appointment transfered!'); 
      //  this.dialogCommunicationService.sendSuccessSignal();
      //  this.refreshCommunicationService.sendRefreshSignal();
      //  Swal.fire('Success', 'Updated Successfully', 'success').then(() => {
      //     this.clear();
      //     setTimeout(() => {
      //      this.dialogRef.close(); 
       
      //      // Navigate to 'Search-Appointments' after the dialog is closed
      //      this.router.navigateByUrl('/FrontDesk/Search-Appointments');
      //    }, 200);
      //  });
     
      
      }else{
        
      // Swal.fire('Failed',"Something wen't wrong ,Re try",'error')
      }
      }
      )  

   }
   reschedulePatient()
   {
    debugger;
    for(var i=0; i < this.rescheduleappointmentsslots.length; i++)
    {    
     var chksplitdatetime =  this.rescheduleappointmentsslots[i].startDate?.toString().split('T', 2)[1];
      var chktime = chksplitdatetime?.split(':',3);
      //console.log(chksplitdatetime);
      //console.log(chksplitdatetime?.split(':',3)[0] + ":" + chksplitdatetime?.split(':',3)[1]);
      if( chksplitdatetime?.split(':',3)[0] + ":" + chksplitdatetime?.split(':',3)[1] == this.getTwentyFourHourTime(this.selectedSlot))
      {
        this.rescheduleappointmetid = this.rescheduleappointmentsslots[i].providerId;
      }
    }
    let appointment = new Appointment();
    appointment.PatientAppointmentId = this.rescheduleappointmetid;
    var reschedulestarttime = (<HTMLSelectElement>document.getElementById('txtStartTime')).value;
    var rescheduleendtime = (<HTMLSelectElement>document.getElementById('txtendtime')).value;
    var rescheduledatevalue =  (<HTMLSelectElement>document.getElementById('fRescheduleDate')).value;
    appointment.StartTime = rescheduledatevalue + " " + reschedulestarttime;
    appointment.EndTime = rescheduledatevalue + " " + rescheduleendtime;
    //appointment.AppointmentDate = rescheduledatevalue
    
    this.service.RescheduleAppointment(appointment).subscribe((result)=>{
      if(result>0)
      {
        Swal.fire('','appointment rescheduled!'); 
        this.GetTimeSlots(this.date);
      //  this.dialogCommunicationService.sendSuccessSignal();
      //  this.refreshCommunicationService.sendRefreshSignal();
      //  Swal.fire('Success', 'Updated Successfully', 'success').then(() => {
      //     this.clear();
      //     setTimeout(() => {
      //      this.dialogRef.close(); 
       
      //      // Navigate to 'Search-Appointments' after the dialog is closed
      //      this.router.navigateByUrl('/FrontDesk/Search-Appointments');
      //    }, 200);
      //  });
     
      
      }else{
        
      // Swal.fire('Failed',"Something wen't wrong ,Re try",'error')
      }
      }
      )  

   }
   
  getTwentyFourHourTime(amPmString:any) {
    debugger; 
    const [time, period] = amPmString.split(' '); 
    const [hour, minute] = time.split(':'); 
    let formattedHour = parseInt(hour); 
  
    if (period === 'PM') { 
        formattedHour += 12; 
    } 
    if (period === 'AM') { 
      formattedHour = hour; 
  } 
  
    return `${formattedHour}:${minute}`;  
}
Resetmodel()
{
  this.rescheduleappointmetid = "";
   (<HTMLSelectElement>document.getElementById('txtStartTime')).value = "";
   (<HTMLSelectElement>document.getElementById('txtendtime')).value = "";
   (<HTMLSelectElement>document.getElementById('fRescheduleDate')).value ="";
   this.GetTimeSlots(this.date);

}
  rescheduleSlot() {
   debugger;
   this.clearReschduledetails();
    var backOfferButton =  (<HTMLSelectElement>document.getElementById('lnkreschedule'));
    backOfferButton.setAttribute('data-toggle', 'modal');
    backOfferButton.setAttribute('data-target', '#RescheduleModal');
    var apointmentdate = (<HTMLSelectElement>document.getElementById('txtAppointmentDate'));
    apointmentdate.value = this.AppdateModel + " " + this.selectedSlot;
    var ddldoctorname = (<HTMLSelectElement>document.getElementById('ddlDoctor'));
    var doctorname = (<HTMLSelectElement>document.getElementById('txtDoctorName'));
    for(var i=0; i < this.rescheduleappointmentsslots.length; i++)
    {    
     var chksplitdatetime =  this.rescheduleappointmentsslots[i].startDate?.toString().split('T', 2)[1];
      var chktime = chksplitdatetime?.split(':',3);
      //console.log(chksplitdatetime);
      //console.log(chksplitdatetime?.split(':',3)[0] + ":" + chksplitdatetime?.split(':',3)[1]);
      if( chksplitdatetime?.split(':',3)[0] + ":" + chksplitdatetime?.split(':',3)[1] == this.getTwentyFourHourTime(this.selectedSlot))
      {
        this.rescheduleappointmetid = this.rescheduleappointmentsslots[i].providerId;
      }
    }
    //doctorname.value = ddldoctorname.value;
    for(var i =0; i<this.doctors.length; i++)
    {
      if(this.doctors[i].providerId == ddldoctorname.value)
      {
        doctorname.value = this.doctors[i].firstName;
      }
    }
    debugger;
    var SelectedSoltDateTime = this.AppdateModel + " " + this.selectedSlot;
    var splitval = this.AppdateModel.split("-",3);
    // console.log(this.getTwentyFourHourTime(this.selectedSlot));
    var  vall = splitval[1] + "-" + splitval[0] + "-" + splitval[2]+" " + this.selectedSlot
    // + " " + this.selectedSlot
    
    
    var PatientName = (<HTMLSelectElement>document.getElementById('txtPatientName'));
    this.service.GetPatientName(this.rescheduleappointmetid, this.providerId).subscribe((result)=>{
      PatientName.value = result;
    })
  }

  transferSlot() {
    this.clearTransferDetails();
    var backOfferButton =  (<HTMLSelectElement>document.getElementById('lnkTransfer'));
    backOfferButton.setAttribute('data-toggle', 'modal');
    backOfferButton.setAttribute('data-target', '#TransferModal');
    var apointmentdate = (<HTMLSelectElement>document.getElementById('txtAppointmentDate'));
    apointmentdate.value = this.AppdateModel;
    var ddldoctorname = (<HTMLSelectElement>document.getElementById('ddlDoctor'));
    var doctorname = (<HTMLSelectElement>document.getElementById('txtTransferDoctorName'));
    //doctorname.value = ddldoctorname.value;
    for(var i =0; i<this.doctors.length; i++)
    {
      if(this.doctors[i].providerId == ddldoctorname.value)
      {
        doctorname.value = this.doctors[i].firstName;
      }
    }
    debugger;
    var SelectedSoltDateTime = this.AppdateModel + " " + this.selectedSlot;
    var splitval = this.AppdateModel.split("-",3);
    // console.log(this.getTwentyFourHourTime(this.selectedSlot));
    var  vall = splitval[1] + "-" + splitval[0] + "-" + splitval[2]+" " + this.selectedSlot
    // + " " + this.selectedSlot
    for(var i=0; i < this.rescheduleappointmentsslots.length; i++)
    {    
     var chksplitdatetime =  this.rescheduleappointmentsslots[i].startDate?.toString().split('T', 2)[1];
      var chktime = chksplitdatetime?.split(':',3);
      //console.log(chksplitdatetime);
      //console.log(chksplitdatetime?.split(':',3)[0] + ":" + chksplitdatetime?.split(':',3)[1]);
      if( chksplitdatetime?.split(':',3)[0] + ":" + chksplitdatetime?.split(':',3)[1] == this.getTwentyFourHourTime(this.selectedSlot))
      {
        this.rescheduleappointmetid = this.rescheduleappointmentsslots[i].providerId;
      }
    }
    
    
    var PatientName = (<HTMLSelectElement>document.getElementById('txtTransferPatientName'));
    this.service.GetPatientName(this.rescheduleappointmetid, this.providerId).subscribe((result)=>{
      PatientName.value = result;
    })
   
  }
  
  closeModal() {
    const modalPopup = this.el.nativeElement.querySelector('#modalPopup');
    modalPopup.classList.remove('show');
  }
  clearReschduledetails()
  {
    this.rescheduleappointmetid = "";
    (<HTMLSelectElement>document.getElementById('txtStartTime')).value = "";
    (<HTMLSelectElement>document.getElementById('fRescheduleDate')).value = "";
    (<HTMLSelectElement>document.getElementById('txtendtime')).value = "";
  }
  clearTransferDetails()
  {
    this.rescheduleappointmetid = "";
    (<HTMLSelectElement>document.getElementById('txtTranferStartTime')).value = "";
    (<HTMLSelectElement>document.getElementById('txtTransferendtime')).value = "";
    (<HTMLSelectElement>document.getElementById('fTransferDate')).value = "";
    (<HTMLSelectElement>document.getElementById('ddlTransferDoctor')).value = "";
    (<HTMLSelectElement>document.getElementById('ddltransferSpecialityId')).value = "";
  }
   goToDetails(item: any) {
    debugger;
    const timeParts = item.split(/:| /);

  // Parse the hours and minutes
  var hours = parseInt(timeParts[0]);
  var minutes = parseInt(timeParts[1]);

  // Convert AM/PM to 24-hour format if necessary
  if (timeParts[2].toUpperCase() === 'PM' && hours < 12) {
    hours += 12;
  } else if (timeParts[2].toUpperCase() === 'AM' && hours === 12) {
    hours = 0;
  }
  var endTIme = new Date();
  endTIme.setHours(hours);
  endTIme.setMinutes(minutes + 15);

  const endtime = this.formatTime(endTIme);
  const keyToUpdate = ['StartTime', 'EndTime']; 

let updated = false;

for (let i = 0; i < this.row.length; i++) {
  const keyValue = this.row[i].split('=');
  const key = keyValue[0];
  const value = keyValue[1];

  if (keyToUpdate.includes(key)) {
    this.row[i] = `${key}=${key === 'StartTime' ? item : endtime}`;
    updated = true;
  }
}
if (!updated) {
  this.row.push(`StartTime=${item}`, `EndTime=${endtime}`);
}
const [time, period] = item.split(' ');
  const [formattedhour, formattedminutes] = time.split(':');
  
  // Convert the hours to a number
  let hours24 = parseInt(formattedhour, 10);
  const minutes24 = parseInt(formattedminutes, 10);
  // Handle 12 AM and 12 PM
  if (period.toLowerCase() === 'pm' && hours24 !== 12) {
    hours24 += 12;
  } else if (period.toLowerCase() === 'am' && hours24 === 12) {
    hours24 = 0;
  }
  
  // Format the hours and minutes as strings
  const hours24Str = hours24.toString().padStart(2, '0');
  const minutes24Str = minutes24.toString().padStart(2, '0');
  
  
  this.formattedtime =  `${hours24Str}:${minutes24Str}`;
  //console.log(this.formattedtime);
  const isAvailable = !this.slotExistsInAppointments(item);
  const isPast = this.isSlotPast(item);

  if (isAvailable) {
    const dialogRef=this.dialog.open(CreateAppointmentComponent,{
      width:"65%",
      height:"450px",
      data:this.row
     
  })
}

  }
  formatTime(date: any) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }
  @HostListener('document:click')
  clickout() {
    debugger;
    if (this.showCntxtMenu) {
      this.showCntxtMenu = false;
    }
    
  }
}
