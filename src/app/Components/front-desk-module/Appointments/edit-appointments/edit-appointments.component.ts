import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Nationality } from 'src/app/Model/Nationality';
import { Religion } from 'src/app/Model/Religion';
import { Speciality } from 'src/app/Model/Speciality';
import { NgbDate, NgbDateParserFormatter, NgbDateStruct, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';
import { ViewEncapsulation, Inject,  ViewChild } from '@angular/core';
import { NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe, formatDate } from '@angular/common';
import Swal from 'sweetalert2';
//import * as moment from 'moment';
import { UserService } from 'src/app/Shared/user.service';
import { DateService } from 'src/app/Shared/date.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-edit-appointments',
  templateUrl: './edit-appointments.component.html',
  styleUrls: ['./edit-appointments.component.css',"../../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../../css/dataTables.bootstrap4.min.css","../../../../../css/style.css","../../../../../css/bootstrap.min.css"
  ,"../../../../../css/responsive.bootstrap4.min.css","../../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../../css/dataTables.bootstrap4.min.css","../../../../../css/metisMenu.min.css"]
})
export class EditAppointmentsComponent implements OnInit {
  minDate: { year: number; month: number; day: number; };
  maxDate:{ year: number; month: number; day: number; };
  dobminDate:{ year: number; month: number; day: number; };
  constructor(private user:UserService, config: NgbDatepickerConfig,ngbdate:NgbDateParserFormatter,
     private service:HimsServiceService,private http:HttpClient,private router:Router,
     private formbuilder:FormBuilder,private datePipe: DatePipe,
     private dateservice: DateService,
     private cdr: ChangeDetectorRef) {
    const current = new Date();
   this.dobminDate={
    year:1901,
    month:1,
    day:1
   }
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth()+1,
      day: current.getDate()
    };
    this.maxDate = {
      year: current.getFullYear(),
      month: current.getMonth()+1,
      day: current.getDate()
    };
    
    //ngbdate.parse('dd-MM-yyyy')
    
    this.myform=formbuilder.group({
      
    })
  
  }

  AppointmentIdBynavigate:any


  nationality:any
  _patientid:any
  PatientData:any
  @ViewChild('Mobilenumsearch')
  Mobilenumsrch!: ElementRef;

  district:any=[]
  showModal: boolean = false;

  isexistedpatientHide=true
  isaadhaarvalid:boolean=false
_doctorId=0
_specialityid=0
  isaadhaarvalidsymbol?:boolean
  isconsultdoctorhide:boolean=true
  isnewchecked:boolean=false
  _aadhaar:any
  _districts:number=0
  
  _states:number=0
  igion?:number=0
  opform:any
 myform:any;
  response:any
  states:any
  districts:any
  stype:any
 startDate:any
 date:Date=new Date()
 dt:any
 time:number=0;
 loginuser:any;
 nat:Nationality[]=[];
 Relig:Religion[]=[];
 dob:any ="";
 special:Speciality[]=[];
speciality:any
doctors:any
isspecialityhide:any=false
isIscheulehide:any=false
isdoctorhide:any=false
Mobile:any
  Listdata:any
  mobilenumber=""
  listOfDisplayData:any
  religion:any
  fname:any
  Sex:any
  prefix:any
  oc:any
  doctorList:any
  model:any
  dobdate:any
  incomingdate:any
  modelaptdate:any
  model2:any
endtime:any
starttime:any
timeintarval:any
showModal2=false
DobModel:any
@ViewChild('StartTime')
StartTime!: ElementRef;
AppdateModel:any
istartdatetouched=false
//   getId(data:any)
//   {
// debugger
//  let stypeid=data.target.value
//  let speciality=data.target.value;
//  if(stypeid=="1")
//  {
//   this.isspecialityhide=true
//   this.isdoctorhide=true
//  }
//  else if(stypeid=="2")
//  {
//   this.isspecialityhide=true
//   this.isdoctorhide=false
  
//  }else 
//   if(stypeid=="3"|| stypeid=="4" )
//  {

//   this.isspecialityhide=false
//   this.isdoctorhide=false
//  }
//  else{
  
//   this.isspecialityhide=false
//   this.isdoctorhide=false
 
 
  
//  }
// }


GoBack()
{
  this.router.navigateByUrl('/FrontDesk/Search-Appointments');
}
updateFields() {
  // Update your fields here
  this.cdr.detectChanges();
}
ChangeTimeSlot(index:any,items:any)
{
  debugger
 
this.myform.get('StartTime').markAsDirty;
  console.log(items.Id);
  this.starttime=items

  this.myform.get('StartTime').patchValue(items)
  debugger
  if( items=="10:45 PM")
  {
    this.endtime="11:00 PM"
     
  this.myform.get('EndTime').patchValue("11:00 PM")
  }else{
    this.endtime=this.timeintarval[index+1]
    
  this.myform.get('EndTime').patchValue(this.timeintarval[index+1])
  }
  this.showModal2 = false;
  // if(this.starttime!=this.Data.start_Time)
  // {
  //   this.btnisDesable=false
  // } else  this.btnisDesable=true

}

toModel(date: NgbDateStruct): string // from internal model -> your mode
{
 
  let k= date?date.year+"/"+('0'+date.month).slice(-2) +"/"+('0'+date.day).slice(-2):""
  return k;
}

DateSelected(date:any)
{

  var today = new Date();
  debugger
 // var dt=(<HTMLInputElement>document.getElementById('dob')).value
  var birthDate = new Date(date);
  
  // Calculate the time difference in milliseconds between today and the birth date
  var timeDiff = today.getTime() - birthDate.getTime();
  var age=0
  // Convert milliseconds to days (1 day = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
  var days = Math.floor(timeDiff / (24 * 60 * 60 * 1000));
  if(days>=365)
  {
    age=Math.floor(days/365);
    (<HTMLInputElement>document.getElementById('txtAge')).value=age.toString();
    (<HTMLInputElement>document.getElementById('AgeModId')).value="3"
  }else
  if(days<365 && days>=30)
  {
    age=Math.floor(days/30);
    (<HTMLInputElement>document.getElementById('txtAge')).value=age.toString();
    (<HTMLInputElement>document.getElementById('AgeModId')).value="2"
  }
  else
  if(days<30)
  {
   // age=Math.floor(days/30);
    (<HTMLInputElement>document.getElementById('txtAge')).value=days.toString();
    (<HTMLInputElement>document.getElementById('AgeModId')).value="1"
  }
  return days;
  debugger
}
UpdateAppointment(Appointment:any)
{
  debugger
  Appointment.ModifiedBy=this.user?.getUserName();
  Appointment.OrganizationId=this.user?.getOrganizationId();
  Appointment.FacilityId=this.user?.getFacilityId();
  Appointment.DateOfBirth=this.dateservice.GlobalStringDateFormat(this.DobModel)//(<HTMLInputElement>document.getElementById('dob')).value//this.toModel(Appointment.DateOfBirth);
  this.myform.get('DateOfBirth').setErrors(null)
  Appointment.Age=(<HTMLInputElement>document.getElementById('txtAge')).value
  Appointment.AgeModId=(<HTMLInputElement>document.getElementById('AgeModId')).value
Appointment.AppointmentDate=this.dateservice.GlobalStringDateFormat(this.AppdateModel);// (<HTMLInputElement>document.getElementById('AppointmentDate')).value
if(Appointment.appointmentDate!=null)
{
  this.myform.get('AppointmentDate').setErrors(null)
  this.myform.get('AppointmentDate').markAsTouched()
} 
Appointment.AppointmentId=localStorage.getItem('editappointmentId');
 Appointment.Gender=(<HTMLInputElement>document.getElementById('ddlSex')).value;
  let doctor=(<HTMLInputElement>document.getElementById('ddlDoctor')).value;
  debugger
  
    let facilityid=localStorage.getItem('facilityId')
    let organizationid=localStorage.getItem('organizationId')
 if(Appointment.Village==undefined)
    {
      Appointment.Village="";
    }
 debugger
 this.myform.get('AppointmentDate').setErrors(null);
 if(doctor==""|| doctor=="Doctor*"|| doctor=="0")
  {
    this.myform.get('DoctorId').setErrors({ customError: true });
    
    this.myform.get('DoctorId').markAsTouched();
    
   
//this.myform.get('DoctorId').markAsDirty();
   
  }else{
    if(this.myform.invalid)
    {
     this.validateallformfields(this.myform)
    }else{
   
     this.service.UpdateAppointment(Appointment).subscribe((result)=>{
       if(result>0)
       {
       Swal.fire('Success','Updated Successfully','success')
       this.router.navigateByUrl('/FrontDesk/Search-Appointments')
       }else{
         
       Swal.fire('Failed',"Something wen't wrong ,Re try",'error')
       }
       }
       )
    }
  }
 
}

formatSelectedDate(selectedDate:any): string {
  return""// moment(selectedDate).format('DD-MM-YYYY');
}
public getDistricts(Id:any)
{
  
  

  this.service.GetDistricts(Id).subscribe((result)=>{this.district=result})
  
}

  public getDoctors(Id:any)
  {
   
    debugger

    this.service.GetDoctorbyspeciality(Id).subscribe((result)=>{
      debugger
      this.doctorList=result
    
    })
    
  }

public GetAppointment()
{

  let appointmentId=localStorage.getItem('editappointmentId');
  this.service.GetEditAppointmentdetails(appointmentId).subscribe((result)=>{
    debugger
    this.Listdata=result[0]
this.getDoctors(this.Listdata.specialityID)
this.getDistricts(this.Listdata.stateId)
   
debugger
    
let _etime=formatDate(this.Listdata.endTime, 'hh:mm a', 'en-US')
let _stime=formatDate(this.Listdata.startTime, 'hh:mm a', 'en-US');
this.incomingdate=this.transformDate2(this.Listdata.dateOfBirth)//this.formatSelectedDate(this.Listdata.dateOfBirth) //formatDate(this.Listdata.dateOfBirth,'dd-MM-yyyy','en-US') // this.fromModel(this.Listdata.dateOfBirth)
//{{ this.Listdata.dateOfBirth | date :'short'}}
const current =new Date(this.Listdata.dateOfBirth)
    this.dobdate = {
      year: current.getFullYear(),
      month: current.getMonth() +1,
      day: current.getDate()
    };
    this.model=this.dobdate
  
let apntDate=new Date(this.Listdata.appointmentDate);
this.AppdateModel=formatDate(apntDate,'dd-MM-yyyy','en-Us')
//this.AppdateModel=this.dateservice.LocalStringDateFormat(this.Listdata.appointmentDate)
this.modelaptdate={
  year: apntDate.getFullYear(),
  month: apntDate.getMonth()+1,
  day: apntDate.getDate()
}

//this.model2=this.modelaptdate
debugger
const currentDay = new Date();
if(this.dateservice.GlobalStringDateFormat(this.AppdateModel)==formatDate(currentDay,'yyyy-MM-dd','en-Us'))
{
  this.minDate = {
    year: currentDay.getFullYear(),
    month: currentDay.getMonth()+1,
    day: currentDay.getDate()+1
  };
}
//let _dob=formatDate(this.Listdata.dateOfBirth, 'dd-MM-yyyy', 'en-US');

//let _dob=formatDate(this.Listdata.dateOfBirth, 'dd-MM-yyyy', 'en-US')

//(<HTMLInputElement>document.getElementById('dob')).innerText=this.model

this.myform.get('FirstName').patchValue(result[0].firstName)
this.myform.get('LastName').patchValue(result[0].lastName)

this.myform.get('Gender').patchValue(result[0].gender)

this.myform.get('AadhaarNumber').patchValue(result[0].aadhaarNumber)

this.myform.get('MobileNumber').patchValue(result[0].mobileNumber)

this.myform.get('RelegionId').patchValue(result[0].relegionId)

this.myform.get('Age').patchValue(result[0].age)

this.myform.get('AgeModId').patchValue(result[0].ageModId)

this.myform.get('NationalityId').patchValue(result[0].nationalityId)

this.myform.get('HouseNo').patchValue(result[0].houseNo)

this.myform.get('StateId').patchValue(result[0].stateId)

this.myform.get('DistrictId').patchValue(result[0].districtId)

this.myform.get('StartTime').patchValue(formatDate(result[0].startTime,'hh:mm aa','en-Us'))

this.myform.get('EndTime').patchValue(formatDate(result[0].endTime,'hh:mm aa','en-Us'))

this.myform.get('SpecialityID').patchValue(result[0].specialityID)

this.myform.get('ScheduleTypeId').patchValue(result[0].scheduleTypeId)

this.myform.get('DoctorId').patchValue(result[0].doctorId)


if(result[0].city!=null || result[0].city!="")
{
  this.myform.get('City').patchValue(result[0].city)
}


if(result[0].Village!=null || result[0].Village!="")
{
  this.myform.get('Village').patchValue(result[0].Village)
}


this.myform.get('PinCode').patchValue(result[0].pinCode)

this.myform.get('Prefix').patchValue(result[0].prefix)

// this.myform=this.formbuilder.group({
 
//   FirstName:[result[0].firstName],
//   LastName :[result[0].lastName],
//  DateOfBirth:[this.model],
//   Gender:result[0].gender,
//   AadhaarNumber:[result[0].aadhaarNumber],
//   MobileNumber:[result[0].mobileNumber],
//   RelegionId:result[0].relegionId,
//   NationalityId:result[0].nationalityId   ,
//   HouseNo:[result[0].houseNo],
//   StateId:[result[0].stateId],
//   DistrictId:result[0].districtId,
//   City:[result[0].city],
//   Village:[result[0].village],
//   PinCode:[result[0].pinCode],
//   StartTime:[_stime],
//   EndTime:[_etime],
//   Age:[result[0].age],
//   AgeModId:result[0].ageModId,
//   Prefix:[result[0].prefix],
//   AppointmentDate:[this.modelaptdate],
//   ScheduleTypeId:1,
//   SpecialityID:result[0].specialityID,
//   DoctorId:result[0].doctorId,
  

// })

this.myform.get('DateOfBirth').markAsDirty();
this.myform.get('DateOfBirth').setErrors(null);
this.myform.get('DateOfBirth').markAsTouched();

this.myform.get('AppointmentDate').markAsDirty();
this.myform.get('AppointmentDate').setErrors(null);
this.myform.get('AppointmentDate').markAsTouched();

//this.myform.get('DateOfBirth').marksasValid();
this.myform.get('FirstName').markAsDirty();
this.myform.get('LastName').markAsDirty();


this.myform.get('AadhaarNumber').markAsDirty();

this.myform.get('MobileNumber').markAsDirty();

this.myform.get('RelegionId').markAsDirty();


this.myform.get('NationalityId').markAsDirty();

this.myform.get('HouseNo').markAsDirty();

this.myform.get('StateId').markAsDirty();

this.myform.get('DistrictId').markAsDirty();

this.myform.get('SpecialityID').markAsDirty();

this.myform.get('DoctorId').markAsDirty();




this.myform.get('PinCode').markAsDirty();

this.myform.get('Prefix').markAsDirty();


let _dob=formatDate(this.Listdata.dateOfBirth, 'dd-MM-yyyy', 'en-US');
this.DobModel=_dob;
debugger
 });

  

}

fromModel(value: string): NgbDateStruct
{
   let devide=value.split('T');
   let parts=devide[0].split('-');
   return {day:+parts[2],month:+parts[1],year:+parts[0]}
}
// toModel(date: NgbDateStruct): Date // from internal model -> your mode
// {
//   {{ date_value | date :'short'}}
//   let k= date?date.year+"/"+('0'+date.month).slice(-2) +"/"+('0'+date.day).slice(-2):""
//   return k;
// }

  transformDate(date:any) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
  
  transformDate2(date:any) {
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }
  
  public calculateGae(Data:any)
  {
    debugger;
    let dob=new Date((<HTMLInputElement>document.getElementById('dob')).value )
    //let timeDiff = Math.abs(Date.now() - this.dob);

    var todayDate=new Date();
    var ageyear = todayDate.getFullYear() - dob.getFullYear();
    var agemonth = todayDate.getMonth() - dob.getMonth();
    var ageday = todayDate.getDate() - dob.getDate();
  
  

    // const bdate = new Date(dob);
    // let timeDiff = Math.abs(Date.now() - bdate.getTime() );
    
    // let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
  }

// getpatientdata(index: any, SelectedPatient: any ){
//   var patientId = SelectedPatient.patientId;
//   localStorage.removeItem('patId')
//  localStorage.setItem('pid',patientId)
//  this._patientid=patientId
//  this.http.get<any>(this.service.Serverbaseurl+'FetchMasterData/GetPatientDetailsbypidnew?patientid='+patientId)
//  .subscribe((result)=>{

// this.GetDistricts(result[0].statE_ID)
// debugger;
// var k=result
// if(result[0].agE_MODE==null)
// {
//   result[0].agE_MODE="Age Mode*";
// }
// if(result[0].statE_ID==null)
// {
//   result[0].statE_ID="State*";
// }

// if(result[0].districT_ID==null)
// {
//   result[0].districT_ID="District*";
// }

// if(result[0].patienT_ID!=null)
// {
//   localStorage.setItem('patId',result[0].patienT_ID)
// }

// let g= (result[0].datE_OF_BIRTH).split(" ",1);
// //var  ddd:any=this.sp[0]
//  (<HTMLInputElement>document.getElementById('dob')).value=g

// this.myform=this.formbuilder.group({
 
//   FirstName:[result[0].firsT_NAME],
//   LastName :[result[0].lasT_NAME],
//   //  DateOfBirth:[g],
//   Gender:result[0].gender,
//   AadhaarNumber:[result[0].aadhaR_NO],
//   MobileNumber:[result[0].mobilE_NUMBER],
//   RelegionId:result[0].religioN_ID,
//   NationalityId:result[0].nationalitY_ID,
//   HouseNo:[result[0].housenumber],
//   StateId:[result[0].statE_ID],
//   DistrictId:result[0].districT_ID,
//   City:[result[0].city],
//   Village:[result[0].Village],
//   PinCode:[result[0].pincode],
//   StartTime:[''],
//   EndTime:[''],
//   Age:[result[0].age],
//   AgeModId:result[0].agE_MODE,
//   Prefix:[result[0].prefix],
  
//   ScheduleTypeId:[0],
//   SpecialityID:[0],
//   DoctorId:[0],
//   ChargegroupId:[0],
//   ChargeItemId:[0],
  

// })
//  });
// }

public getAgeInDays(dateOfBirth: any): number {
  var today = new Date();
  debugger
  var dt=(<HTMLInputElement>document.getElementById('dob')).value
  var birthDate = new Date(dt);
  
  // Calculate the time difference in milliseconds between today and the birth date
  var timeDiff = today.getTime() - birthDate.getTime();
  var age=0
  // Convert milliseconds to days (1 day = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
  var days = Math.floor(timeDiff / (24 * 60 * 60 * 1000));
  if(days>=365)
  {
    age=Math.floor(days/365);
    (<HTMLInputElement>document.getElementById('txtAge')).value=age.toString();
    (<HTMLInputElement>document.getElementById('AgeModId')).value="3"
  }else
  if(days<365 && days>=30)
  {
    age=Math.floor(days/30);
    (<HTMLInputElement>document.getElementById('txtAge')).value=age.toString();
    (<HTMLInputElement>document.getElementById('AgeModId')).value="2"
  }
  else
  if(days<30)
  {
   // age=Math.floor(days/30);
    (<HTMLInputElement>document.getElementById('txtAge')).value=days.toString();
    (<HTMLInputElement>document.getElementById('AgeModId')).value="1"
  }
  return days;
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

AcceptAddharNoOnly(event: KeyboardEvent) {
  // Allow numbers, backspace, and delete keys
  if (
    [46, 8, 9, 27, 13].indexOf(event.keyCode) !== -1 ||
    // Allow Ctrl+A
    (event.keyCode === 65 && event.ctrlKey === true) ||
    // Allow Ctrl+C
    (event.keyCode === 67 && event.ctrlKey === true) ||
    // Allow Ctrl+V
    (event.keyCode === 86 && event.ctrlKey === true) ||
    // Allow Ctrl+X
    (event.keyCode === 88 && event.ctrlKey === true) ||
    // Allow home, end, left, right arrow keys
    (event.keyCode >= 35 && event.keyCode <= 39)
  ) {
    return;
  }
  debugger
  let txt=(<HTMLInputElement>document.getElementById('Aadhaar')).value;
  if (event.key >= "0" && event.key <= "1") {
    if(txt.length==0)
{
  

  event.preventDefault();
} 
}  
  // Allow only numeric input
  if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) {
    event.preventDefault();
  }}

//keydown event for accept only numbers and starting with 6 to 9 --madhu
AcceptMobilenumberOnly(event: KeyboardEvent) {
  debugger
  // Allow numbers, backspace, and delete keys
  if (
    [46, 8, 9, 27, 13].indexOf(event.keyCode) !== -1 ||
    // Allow Ctrl+A
    (event.keyCode === 65 && event.ctrlKey === true) ||
    // Allow Ctrl+C
    (event.keyCode === 67 && event.ctrlKey === true) ||
    // Allow Ctrl+V
    (event.keyCode === 86 && event.ctrlKey === true) ||
    // Allow Ctrl+X
    (event.keyCode === 88 && event.ctrlKey === true) ||
    // Allow home, end, left, right arrow keys
    (event.keyCode >= 35 && event.keyCode <= 39)
  ) {
    return;
  }
  debugger
  
  let txt=(<HTMLInputElement>document.getElementById('MobileNumber')).value;
  
    if (event.key >= "0" && event.key <= "5") {
      if(txt.length==0)
  {
   
      event.preventDefault();
    }
  }
 
    // Allow only numeric input
  if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) {
   
     
      event.preventDefault();
    }
  
  }
  //keydown event for accept only Characters--madhu
AcceptCharactersOnly(event:KeyboardEvent)
{
  if (
    [46, 8, 9, 27, 13].indexOf(event.keyCode) !== -1 ||
    // Allow Ctrl+A
    (event.keyCode === 65 && event.ctrlKey === true) ||
    // Allow Ctrl+C
    (event.keyCode === 67 && event.ctrlKey === true) ||
    // Allow Ctrl+V
    (event.keyCode === 86 && event.ctrlKey === true) ||
    // Allow Ctrl+X
    (event.keyCode === 88 && event.ctrlKey === true) ||
    // Allow home, end, left, right arrow keys
    (event.keyCode >= 35 && event.keyCode <= 39)
  ) {
    return;
  }
  if (!/^[a-zA-Z]$/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete') {
    event.preventDefault();
  }
}




setGenderByprefix(event:any)
{
  
  debugger
  if(event.target.value=="Mr"||event.target.value=="Mrs")
  {
    this.myform.get('Gender').patchValue(1)
  }
  if(event.target.value=="Miss"||event.target.value=="Ms")
  {
    this.myform.get('Gender').patchValue(2)
  }

}
//keydown event for accept only numbers and starting with 6 to 9 --madhu
AcceptHousenumberOnly(event: KeyboardEvent) {
  debugger
  const allowedCharacters = /^[0-9\-/]*$/; // Regular expression to match digits (0-9), "-", and "/"

  // Check if the pressed key matches the allowed characters
  if (!allowedCharacters.test(event.key)&& event.key !== 'Backspace' && event.key !== 'Delete') {
    event.preventDefault(); // Prevent the key from being entered
  }
  
  }
  
    
  AcceptPincodeOnly(event: KeyboardEvent) {
    debugger
    // Allow numbers, backspace, and delete keys
    if (
      [46, 8, 9, 27, 13].indexOf(event.keyCode) !== -1 ||
      // Allow Ctrl+A
      (event.keyCode === 65 && event.ctrlKey === true) ||
      // Allow Ctrl+C
      (event.keyCode === 67 && event.ctrlKey === true) ||
      // Allow Ctrl+V
      (event.keyCode === 86 && event.ctrlKey === true) ||
      // Allow Ctrl+X
      (event.keyCode === 88 && event.ctrlKey === true) ||
      // Allow home, end, left, right arrow keys
      (event.keyCode >= 35 && event.keyCode <= 39)
    ) {
      return;
    }
    debugger
    
    let txt=(<HTMLInputElement>document.getElementById('Pincode')).value;
    
      if (event.key == "0") {
        if(txt.length==0)
    {
        event.preventDefault();
      }
    }
   
      // Allow only numeric input
    if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) {
     
       
        event.preventDefault();
      }
    
    }
  
   
    onDateSelectDob(event:any) {
      debugger
      let year = event.year;
      let month = event.month <= 9 ? '0' + event.month : event.month;;
      let day = event.day <= 9 ? '0' + event.day : event.day;;
       let actual = day + "-" + month + "-" + year;
      
      this.DobModel=actual
    
     
     }
   
    onDateSelectAppdate(event:any) {
      debugger
      let year = event.year;
      let month = event.month <= 9 ? '0' + event.month : event.month;;
      let day = event.day <= 9 ? '0' + event.day : event.day;;
       let actual = day + "-" + month + "-" + year;
      
      this.AppdateModel=actual
      const currentDay = new Date();
     
        this.minDate = {
          year: currentDay.getFullYear(),
          month: currentDay.getMonth()+1,
          day: currentDay.getDate()
        };
      
     
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
  
    this.GetAppointment();
    debugger

    debugger
let _date=new Date();
this.AppdateModel=formatDate(_date,'yyyy-MM-dd','en-Us')
    this.AppointmentIdBynavigate=localStorage.getItem('editappointmentId')
    localStorage.setItem('header','Edit Appointment')
    this.service.getReligion().subscribe((result : Religion[])=>(this.Relig=result));
    this.service.getNationality().subscribe((result : Nationality[])=>(this.nat=result));
    this.service.GetStates().subscribe((result)=>(this.states=result));
    this.service.GetSchedulartypes().subscribe((result)=>{this.stype=result})
this.service.getSpeciality().subscribe((result)=>{this.speciality=result})


this.myform=this.formbuilder.group({
  FirstName:['',Validators.required],
  LastName :[''],
  DateOfBirth:['',Validators.required],
  Gender:['Gender*',Validators.required],
  AadhaarNumber:['',[Validators.required,Validators.minLength(12)]],
  MobileNumber:['',[Validators.required,Validators.minLength(10)]],
  RelegionId:['Religion*',Validators.required],
  NationalityId:['Nationality*',Validators.required],
  HouseNo:['',Validators.required],
  StateId:['State*',Validators.required],
  DistrictId:['District*',Validators.required],
  City:[''],
  Village:[''],
  PinCode:['',[Validators.required,Validators.minLength(6)]],
  ScheduleTypeId:[1,Validators.required],
  SpecialityID:['Speciality*',Validators.required],
  DoctorId:['Doctor*',Validators.required],
  AppointmentDate:['',Validators.required],
  StartTime:['',Validators.required],
  EndTime:['',Validators.required],
  Age:['',Validators.required],
  AgeModId:['Age Mode*',Validators.required],
  Prefix:['Prefix*',Validators.required]
     
})

//this.myform.get('FirstName').setErrors("required")
this.myform.get('ScheduleTypeId')?.disable();
this.myform.get('AgeModId')?.disable();
this.myform.get('Gender')?.disable()


  }
  

  @HostListener('document:click',['$event'])
  clickout(event: { target: any; }){
   

    if(this.StartTime.nativeElement.contains(event.target)){
     
        this.GetTimeSlotsForTimePicker(this.dateservice.GlobalStringDateFormat(this.AppdateModel),15)
        
        this.showModal2 = true;
      }
      else{
        this.showModal2 = false;
        this.istartdatetouched=true
      }

  }

  }  
  

  

