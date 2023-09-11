import { Component, ElementRef, HostListener, Inject,OnInit, ViewChild } from '@angular/core';
import { NoopAnimationPlayer } from '@angular/animations';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DateService } from 'src/app/Shared/date.service';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';

import Swal from 'sweetalert2';
import { Speciality } from 'src/app/Model/Speciality';
import { Subscriber } from 'rxjs';
import { Route, Router } from '@angular/router';
import { DialogcommunicationService } from 'src/app/Shared/dialogcommunication.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-transfer-appointment',
  templateUrl: './transfer-appointment.component.html',
  styleUrls: ['./transfer-appointment.component.css',"../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../css/dataTables.bootstrap4.min.css","../../../../css/bootstrap.min.css"
  ,"../../../../css/responsive.bootstrap4.min.css","../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../css/dataTables.bootstrap4.min.css","../../../../css/metisMenu.min.css"]
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
  btnisDesable=true
btnisDisable=true
  @ViewChild('StartTime')
  StartTime!: ElementRef;
  my:any=0
  showModal=false
  seleceddata:any=""
  timeintarval:any
  Ttime:any=""
  _AppointmentDate:any

  minDate: { year: number; month: number; day: number; };
  
  maxDate: { year: number; month: number; day: number; };
  constructor(private router:Router,
     public dialogRef: MatDialogRef<TransferAppointmentComponent>,
         @Inject(MAT_DIALOG_DATA) public Data: any,
         private formbuilder:FormBuilder,
    private service:HimsServiceService,
    private dateservice:DateService,
    private dialogCommunicationService: DialogcommunicationService
    ) {
      const current = new Date();
      this.minDate = {
        year: current.getFullYear(),
        month: current.getMonth()+1,
        day: current.getDate()
      };
      this.maxDate = {
        year: current.getFullYear(),
        month: current.getMonth()+4,
        day: current.getDate()
      };
      this.Transferform=this.formbuilder.group({




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


  public Transfer(obj:any)
{
 
  debugger
  let splity=(<HTMLInputElement>document.getElementById('ddlSpecialityId')).value
let did=(<HTMLInputElement>document.getElementById('ddlDoctor')).value
  if(splity=="Speciality*")
  {
    this.Transferform.get('SpecialityID').setErrors('required');
   this.validateallformfields(this.Transferform);
  }
  if(did=="Doctor*")
  {
    this.Transferform.get('DoctorId').setErrors('required');
   this.validateallformfields(this.Transferform);
  }
  let stTimeam=obj.StartTime.includes('AM')
  let stTimepm=obj.StartTime.includes('PM')
  
  if(stTimeam==true||stTimepm==true)
  {
    obj.StartTime= this.convertTo24HourFormat(obj.StartTime);
    obj.EndTime= this.convertTo24HourFormat(obj.StartTime);
  }


 obj.PatientAppointmentId=this.Data.appointmentId
// obj.StartTime= (<HTMLInputElement>document.getElementById('stime')).value
 //obj.EndTime= (<HTMLInputElement>document.getElementById('etime')).value
 //obj.doctorId=this.Data.doctorId
 //obj.specialityID=this.Data.specialityID
 let d= this.appModel
 obj.AppointmentDate=this.dateservice.GlobalStringDateFormat(d)
 //this.mydate= (<HTMLInputElement>document.getElementById('dob')).value(<HTMLInputElement>document.getElementById('AppointmentDate')).value;
 //List.AppointmentDate=this.dateservice.GlobalStringDateFormat(d);
 if(this.Transferform.invalid)
 {
  this.validateallformfields(this.Transferform)
 }else{

  this.service.TransferAppointment(obj) .subscribe((result)=>{
    if(result>0)
   {
      Swal.fire('Success','Successfully Transferred','success');
     
    this.dialogCommunicationService.notifyDialogClosed();
    this.dialogRef.close();
    
    }
   })
 }
}
 // data.PatientAppointmentId=Data.

onDateSelecttodate(event:any) {
  debugger
  let year = event.year;
  let month = event.month <= 9 ? '0' + event.month : event.month;;
  let day = event.day <= 9 ? '0' + event.day : event.day;;
   let actual = day + "-" + month + "-" + year;
 //  (<HTMLInputElement>document.getElementById('fdate')).value
 this.appModel=actual
 this._AppointmentDate=this.dateservice.GlobalStringDateFormat(this.appModel);
 this.GetTimeSlotsForTimePicker(this._AppointmentDate,15)
 const current = new Date();
 this.minDate = {
  year: current.getFullYear(),
  month: current.getMonth()+1,
  day: current.getDate()+1
};
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
performAction() {
  // Your action code here
//this.router.navigateByUrl('/FrontDesk/Search-Appointments')
  // Close the dialog
  this.dialogRef.close();
  this.dialogCommunicationService.notifyDialogClosed();

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

EndTimeKeyEvent(event: KeyboardEvent) {
  debugger
  if (
    
    // [46, 8, 9, 27, 13].indexOf(event.keyCode) !== -1 ||
     // Allow Ctrl+A
     (event.keyCode === 9)||
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

ChangeTimeSlot(index:any,items:any)
{
  debugger
  console.log(items.Id);
  this.starttime=items

  this.Transferform.get('StartTime').patchValue(items)
  debugger
  if( items=="10:45 PM")
  {
    this.endtime="11:00 AM"
     
  this.Transferform.get('EndTime').patchValue("11:00 PM")
  }else{
    this.endtime=this.timeintarval[index+1]
    
  this.Transferform.get('EndTime').patchValue(this.timeintarval[index+1])
  }

  let splity=(<HTMLInputElement>document.getElementById('ddlSpecialityId')).value;
  let did=(<HTMLInputElement>document.getElementById('ddlDoctor')).value;

  if(this.starttime!=this.Data.start_Time &&splity!="Speciality*"&&did!="Doctor*")
  {
    this.btnisDesable=false;
  } else  this.btnisDesable=true;
 
  this.showModal = false;
  // if(this.starttime!=this.Data.start_Time)
  // {
  //   this.btnisDesable=false
  // } else  this.btnisDesable=true

}
selectedDoctor()
{
  let splity=(<HTMLInputElement>document.getElementById('ddlSpecialityId')).value;
  let did=(<HTMLInputElement>document.getElementById('ddlDoctor')).value;

  
  if(this.starttime!=this.Data.start_Time &&splity!="Speciality*"&&did!="Doctor*")
  {
    this.btnisDesable=false;
  } else  this.btnisDesable=true;
 
}

GetTimeSlotsForTimePicker(date:any,TimeInterval:any)
{
  debugger
  this.service.GetTimeSlotsForTimePicker(date,TimeInterval).subscribe((result)=>{
    this.timeintarval=result;
    debugger
  
  })

}
 ngOnInit(): void {
  let today=new Date()
  this.starttime=this.Data.start_Time;
  this.endtime=this.Data.end_Time;
  this.GetTimeSlotsForTimePicker(formatDate(today,'yyyy-MM-dd','en-Us'),15);
 debugger
  this.Transferform=this.formbuilder.group({
    SpecialityID:['Speciality*',Validators.required],
    DoctorId:['Doctor*',Validators.required] ,
    StartTime:[ this.starttime,Validators.required],
  AppointmentDate:[Validators.required],
  EndTime:[ this.endtime,Validators.required]



  });

  this.service.getSpeciality().subscribe((result)=>{this.speciality=result})
 
  let dtString=formatDate(today,'dd-MM-yyyy','en-Us')
  this.Transferform.get('AppointmentDate').patchValue(dtString)
  this.getSpeciality()
  this.model=this.Data.appointment_Date
  this.appModel=dtString
 // (<HTMLInputElement>document.getElementById('Appdate')).value=dtString;
  this._AppointmentDate=this.dateservice.GlobalStringDateFormat(this.Data.appointment_Date)
  this.GetTimeSlotsForTimePicker(formatDate(today,'yyyy-MM-dd','en-Us'),15);

  //(<HTMLInputElement>document.getElementById('Appdate')).value=dtString;
  debugger
  const current = new Date();
if(this.dateservice.GlobalStringDateFormat(this.Data.appointment_Date)==formatDate(current,'yyyy-MM-dd','en-Us'))
{
  this.minDate = {
    year: current.getFullYear(),
    month: current.getMonth()+1,
    day: current.getDate()+1
  };
}
 
}

getInitialTime()
{
  debugger
  let date=new Date();
  let currentdate=formatDate(date,'yyyy-MM-dd','en-Us')
  this.service.GetTimeSlotsForTimePicker(date,15).subscribe((result)=>{
    this.timeintarval=result;
  this.starttime=this.timeintarval[0]
    debugger
  })
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


