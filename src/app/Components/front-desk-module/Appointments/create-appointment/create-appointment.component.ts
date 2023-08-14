import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Nationality } from 'src/app/Model/Nationality';
import { Religion } from 'src/app/Model/Religion';
import { Speciality } from 'src/app/Model/Speciality';
import { NgbDateStruct, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';
import { ViewEncapsulation, Inject,  ViewChild } from '@angular/core';
import { NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe, formatDate } from '@angular/common';
import Swal from 'sweetalert2';
import { timeInterval } from 'rxjs';


@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateAppointmentComponent implements OnInit {
  
  
  minDate: { year: number; month: number; day: number; };
  maxDate: { year: number; month: number; day: number; };
  constructor( private service:HimsServiceService,private http:HttpClient,private router:Router,private formbulder:FormBuilder,private datePipe: DatePipe) {
    const current = new Date();
   
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
    this.myform=formbulder.group({
      
    })
  
  }
  sp:any[]=[]
  nationality:any
  _patientid:any
  PatientData:any
  @ViewChild('Mobilenumsearch')
  Mobilenumsrch!: ElementRef;

  
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
chargegroup:any
chargeitems:any
isspecialityhide:any=false
isIscheulehide:any=false
isdoctorhide:any=false
ischargegrouphide:any=false
ischargeItemhide:any=false
Mobile:any
  selectchargegroup=0
  selectchargeitem=0
  mobilenumber=""
  listOfDisplayData:any
  religion:any
  fname:any
  Sex:any
  prefix:any
  oc:any
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
    let spid=Id.target.value;
    debugger

    this.service.GetDoctorbyspeciality(spid).subscribe((result)=>{this.doctors=result})
    debugger
  }

  
  public GetChargeItems(Id:any)
  {
    debugger
   let chargegroupid=Id.target.value
    this.service.GetChargeItems(chargegroupid).subscribe((result)=>{this.chargeitems=result})
  }
  
  public SaveAppointment(Data:any){
    debugger
    Data.Age=(<HTMLInputElement>document.getElementById('txtAge')).value
    Data.AgeModId=(<HTMLInputElement>document.getElementById('AgeModId')).value
    Data.AppointmentDate=(<HTMLInputElement>document.getElementById('AppointmentDate')).value
    
    let facilityid=localStorage.getItem('facilityId')
    let organizationid=localStorage.getItem('organizationId')
    Data.OrganizationId=organizationid;
    Data.FacilityId=facilityid;
    if(localStorage.getItem('patId')!=null)
    {

      Data.PatientId=localStorage.getItem('patId');
    } else 
    Data.PatientId=0;
    Data.CretedBy=localStorage.getItem('name')
    if(Data.SpacialityID=="Spaciality*" || Data.SpacialityID=="")
    {
      Data.SpacialityID=0
    }
    if(Data.DoctorId=="Doctor*")
    {
      Data.DoctorId=0
    }
    if(Data.ChargegroupId=="Charge Group*")
    {
      Data.ChargegroupId=0
    }
    if(Data.ChargeItemId=="Charge Item*")
    {
      Data.ChargeItemId=0
    }
    if(Data.AgeModId=="Age Mode*")
    {
      Data.AgeModId=0
    }
  

    Data.DateOfBirth= this.transformDate((<HTMLInputElement>document.getElementById('dob')).value)
    this.service.SaveAppointments(Data).subscribe((result)=>
    {
      this.response=result;
      if(this.response>0)
      {
        Swal.fire('Success','Appointment Successfully Booked','success')
        this.cleare()
      } else{
        Swal.fire('info','Something went wrong','info')
      }


    },
    error=>
    {
      debugger
      Swal.fire('','Please fill all the required fields','info')
      //this.reset()
    }
    )
    debugger
  
  }
  public cleare()
  {
    (<HTMLInputElement>document.getElementById('mobilenumber')).value='';
    (<HTMLInputElement>document.getElementById('stime')).value='';
    (<HTMLInputElement>document.getElementById('etime')).value='';
this.isexistedpatientHide=false
this.myform=this.formbulder.group({
  FirstName:['',Validators.required],
  LastName :[''],
  DateOfBirth:['',Validators.required],
  Gender:['Gender*',Validators.required],
  AadhaarNumber:['',Validators.required],
  MobileNumber:['',Validators.required],
  RelegionId:['Religion*',Validators.required],
  NationalityId:['Nationality*',Validators.required],
  HouseNo:['',Validators.required],
  StateId:[0,Validators.required],
  DistrictId:['District*',Validators.required],
  City:[''],
  Village:[''],
  PinCode:['',Validators.required],
  ScheduleTypeId:[0,Validators.required],
  SpecialityID:[0,Validators.required],
  DoctorId:[0,Validators.required],
  ChargegroupId:[0,Validators.required],
  ChargeItemId:[0,Validators.required],
  StartTime:['',Validators.required],
  EndTime:['',Validators.required],
  Age:['',Validators.required],
  AgeModId:['Age Mode*',Validators.required],
  Prefix:['Prefix*',Validators.required]

})


  }
  transformDate(date:any) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
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
public existedCheck()
{
  debugger
  if(this.isexistedpatientHide==true)
  {
    this.isexistedpatientHide=false;
  } else this.isexistedpatientHide=true;
}


public getpatient(X:any)
{
  debugger
  this.listOfDisplayData=null
  this.mobilenumber=X.currentTarget.value;
  //this.mobilenumber=JSON.stringify({mobilenumber:this.mobilenumber})
  var mob=X.target.value;
  //debugger;
   if(this.mobilenumber?.length==10)
   {
  this.http.get<any>(this.service.Serverbaseurl+'FetchMasterData/GetPatientDetails?mobilenumber='+this.mobilenumber).subscribe(
    (data: any)=>{
      debugger;
      this.listOfDisplayData = data;

      
    this.fname=this.PatientData[0].firstName+" "+this.PatientData[0].lastName
    var dateofbirth= this.PatientData[0].dob.split("T");
    // var datestring = dateofbirth.Tostring();
    // var datesplit = dateofbirth[0].split("-");
this.dob = formatDate(this.PatientData[0].dob, 'yyyy-MM-dd', 'en-US'); // dateofbirth;
// this.dob= datesplit[2]+'-'+datesplit[1]+'-'+datesplit[0];
if(this.PatientData[0].relationtype!=null && this.PatientData[0].relationtype!="")
{
 // this.relType=this.PatientData[0].relationtype
}
  
    this.Sex=this.PatientData[0].sex
    if(this.PatientData[0].prefix!=null && this.PatientData[0].prefix!="")
    {
      this.prefix=this.PatientData[0].prefix
    }
   
   
    this.Mobile=this.PatientData[0].mobileNumber
    // if(this.PatientData[0].relationname!=null && this.PatientData[0].relationname!="")
    // {
    //  // this.relname=this.PatientData[0].relationname
    // }

    if(this.PatientData[0].religionid!=null && this.PatientData[0].religionid!="")
    {
      this.religion=this.PatientData[0].religionid
    }
    
    if(this.PatientData[0].nationalityid!=null && this.PatientData[0].nationalityid!="")
    {
      this.nationality=this.PatientData[0].nationalityid
    }
    
    if(this.PatientData[0].occupation!=null && this.PatientData[0].occupation!="")
    {
      this.oc=this.PatientData[0].occupation
    }
   
    
   
    //this._address=this.PatientData[0].
   
      
    } 
    );
  }
}

getpatientdata(index: any, SelectedPatient: any ){
  var patientId = SelectedPatient.patientId;
  localStorage.removeItem('patId')
 localStorage.setItem('pid',patientId)
 this._patientid=patientId
 this.http.get<any>(this.service.Serverbaseurl+'FetchMasterData/GetPatientDetailsbypidnew?patientid='+patientId)
 .subscribe((result)=>{

this.GetDistricts(result[0].statE_ID)
debugger;
var k=result
if(result[0].agE_MODE==null)
{
  result[0].agE_MODE="Age Mode*";
}
if(result[0].statE_ID==null)
{
  result[0].statE_ID="State*";
}

if(result[0].districT_ID==null)
{
  result[0].districT_ID="District*";
}

if(result[0].patienT_ID!=null)
{
  localStorage.setItem('patId',result[0].patienT_ID)
}

let g= (result[0].datE_OF_BIRTH).split(" ",1);
//var  ddd:any=this.sp[0]
 (<HTMLInputElement>document.getElementById('dob')).value=g

this.myform=this.formbulder.group({
 
  FirstName:[result[0].firsT_NAME],
  LastName :[result[0].lasT_NAME],
  //  DateOfBirth:[g],
  Gender:result[0].gender,
  AadhaarNumber:[result[0].aadhaR_NO],
  MobileNumber:[result[0].mobilE_NUMBER],
  RelegionId:result[0].religioN_ID,
  NationalityId:result[0].nationalitY_ID,
  HouseNo:[result[0].housenumber],
  StateId:[result[0].statE_ID],
  DistrictId:result[0].districT_ID,
  City:[result[0].city],
  Village:[result[0].Village],
  PinCode:[result[0].pincode],
  StartTime:[''],
  EndTime:[''],
  Age:[result[0].age],
  AgeModId:result[0].agE_MODE,
  Prefix:[result[0].prefix],
  
  ScheduleTypeId:[0],
  SpecialityID:[0],
  DoctorId:[0],
  ChargegroupId:[0],
  ChargeItemId:[0],
  

})
 });
}

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

  ngOnInit(): void {
    localStorage.setItem('header','Create Appointment')
    this.service.getReligion().subscribe((result : Religion[])=>(this.Relig=result));
    this.service.getNationality().subscribe((result : Nationality[])=>(this.nat=result));
    this.service.GetStates().subscribe((result)=>(this.states=result));
    this.service.GetSchedulartypes().subscribe((result)=>{this.stype=result})
this.service.getSpeciality().subscribe((result)=>{this.speciality=result})


this.myform=this.formbulder.group({
  FirstName:['',Validators.required],
  LastName :[''],
  DateOfBirth:['',Validators.required],
  Gender:['Gender*',Validators.required],
  AadhaarNumber:['',Validators.required],
  MobileNumber:['',Validators.required],
  RelegionId:['Religion*',Validators.required],
  NationalityId:['Nationality*',Validators.required],
  HouseNo:['',Validators.required],
  StateId:[0,Validators.required],
  DistrictId:['District*',Validators.required],
  City:[''],
  Village:[''],
  PinCode:['',Validators.required],
  ScheduleTypeId:[0,Validators.required],
  SpecialityID:[0,Validators.required],
  DoctorId:[0,Validators.required],
  ChargegroupId:[0,Validators.required],
  ChargeItemId:[0,Validators.required],
  StartTime:['',Validators.required],
  EndTime:['',Validators.required],
  Age:['',Validators.required],
  AgeModId:['Age Mode*',Validators.required],
  Prefix:['Prefix*',Validators.required],
  AppointmentDate:['',Validators.required]

})


  }
  public GetDistricts(Id:any)
  {
  
    this.service.GetDistricts(Id).subscribe((result)=>this.districts=result)
  }

  
  @HostListener('document:click',['$event'])
  clickout(event: { target: any; }){
   
    if(this.Mobilenumsrch.nativeElement.contains(event.target)){
      this.showModal = true;
    }
    else{
      this.showModal = false;
    }
    
    }

  }  
  

  

