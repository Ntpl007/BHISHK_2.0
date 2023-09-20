import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
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
import { DateService } from 'src/app/Shared/date.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingPopupComponent } from 'src/app/Components/PopUps/loading-popup/loading-popup.component';
import { DialogcommunicationService } from 'src/app/Shared/dialogcommunication.service';
@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css',"../../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../../css/dataTables.bootstrap4.min.css","../../../../../css/style.css","../../../../../css/bootstrap.min.css"
  ,"../../../../../css/responsive.bootstrap4.min.css","../../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../../css/dataTables.bootstrap4.min.css","../../../../../css/metisMenu.min.css"],
  encapsulation: ViewEncapsulation.None
})
export class CreateAppointmentComponent implements OnInit {
  _dob:any
  isLoading = false;
  starttime:any
  endtime:any
  timeintarval:any
  _AppointmentDate:any
  @ViewChild('StartTime')
  StartTime!: ElementRef;
  my:any=0
  showModal2: boolean = false;
  minDatefordob: { year: number; month: number; day: number; };
  minDate: { year: number; month: number; day: number; };
  maxDate: { year: number; month: number; day: number; };
  ischecked=false
  maxDateForAppointment: { year: number; month: number; day: number; };
  content: any;
  constructor(private modalService: NgbModal, private service:HimsServiceService,private http:HttpClient,private router:Router,private formbulder:FormBuilder,private datePipe: DatePipe,
    private dateservice:DateService,private dialogService:DialogcommunicationService,
    private dialog: MatDialog
    ) {

    const current = new Date();
   this.minDatefordob={
    year: 1900,
    month:1,
    day: 1
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
    this.maxDateForAppointment= {
      year: current.getFullYear(),
      month: current.getMonth()+4,
      day: current.getDate()
    };
    this.myform=formbulder.group({
     // customControl: new FormControl('', [])
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
 submittrue=false
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
  public createform :NgForm | undefined;
  form?:FormGroup
  dobModel:any
  AppdateModel:any
  aadhaar01accaptable=false
  savingData=false
  mobile05accaptable=false
  issearchhidden=true
  ischecktrue=false
  allocateid:any
  istartdatetouched=true
  getId(data:any)
  {
debugger
 let stypeid=data.target.value
 let speciality=data.target.value;
 if(stypeid=="1")
 {
  this.isspecialityhide=true
  this.isdoctorhide=true
  this.allocateid="1"
  
  this.ischargegrouphide=false
  this.ischargeItemhide=false
 }
 else if(stypeid=="2")
 {
  this.isspecialityhide=true
  this.isdoctorhide=false
  this.allocateid="2"
  this.ischargegrouphide=false
  this.ischargeItemhide=false
  
 }else 
  if(stypeid=="3"|| stypeid=="4" )
 {
  this.allocateid=stypeid;
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

  public GetChargeItems(Id:any)
  {
    debugger
   let chargegroupid=Id.target.value
    this.service.GetChargeItems(chargegroupid).subscribe((result)=>{this.chargeitems=result})
  }
  
  public SaveAppointment(Data:any){
    debugger
    this.submittrue=false;
    Data.Age=(<HTMLInputElement>document.getElementById('txtAge')).value
    Data.AgeModId=(<HTMLInputElement>document.getElementById('AgeModId')).value
    Data.AppointmentDate=this.dateservice.GlobalStringDateFormat((<HTMLInputElement>document.getElementById('AppointmentDate')).value)
    Data.DateOfBirth=this.dateservice.GlobalStringDateFormat((<HTMLInputElement>document.getElementById('dob')).value)
    Data.Gender=(<HTMLInputElement>document.getElementById('ddlSex')).value;
    let facilityid=localStorage.getItem('facilityId')
    let organizationid=localStorage.getItem('organizationId')
    Data.OrganizationId=organizationid;
    Data.FacilityId=facilityid;
    if(Data.Village==undefined)
    {
      Data.Village="";
    }
    if(Data.City==undefined)
    {
      Data.City="";
    }
    
    
    if(localStorage.getItem('patId')!=null)
    {

      Data.PatientId=localStorage.getItem('patId');
    } else 
    Data.PatientId=0;
    Data.CretedBy=localStorage.getItem('name')
   
    if(this.allocateid=="1" && Data.DoctorId!="Doctor*")
    {
      this.submittrue=true;
      Data.ChargeItemId=0
      Data.ChargegroupId=0
    }else
    if(this.allocateid=="2" && Data.SpecialityID!="Speciality*")
    {
      this.submittrue=true;
      Data.DoctorId=0
      Data.ChargeItemId=0
      Data.ChargegroupId=0 
    }else
    if((this.allocateid=="3"|| this.allocateid=="4")||Data.ChargeItemId!="Charge Item*")
    {
      this.submittrue=true;
      Data.SpecialityID=0
      Data.DoctorId=0
    }
    // if(Data.DoctorId!="Doctor*")
    // {
    //   this.submittrue=true;
    // }else
    // if(Data.ChargeItemId!="Charge Item*")
    // {
    //   this.submittrue=true;
    // }else  {this.submittrue=false}


    
  
    debugger

    // if(Data.SpecialityID=="Speciality*")
    // {
    //   Data.SpecialityID=0
      
    // }
    // if(Data.DoctorId=="Doctor*")
    // {
    //   Data.DoctorId=0
    //   this.myform.invalid
    // }
    // if(Data.ChargegroupId=="Charge Group*")
    // {
    //   Data.ChargegroupId=0
    // }
    // if(Data.ChargeItemId=="Charge Item*")
    // {
    //   Data.ChargeItemId=0
    // }
    if(Data.AgeModId=="Age Mode*")
    {
      Data.AgeModId=0
    }
  

    Data.DateOfBirth= this.dateservice.GlobalStringDateFormat((<HTMLInputElement>document.getElementById('dob')).value);
    debugger
    if(this.myform.invalid|| this.submittrue==false)
    {
     
     debugger
        this.validateallformfields(this.myform)
       
    }else
       {
        this.openDialog();
    this.service.SaveAppointments(Data).subscribe((result)=>
    {
      this.response=result;
      if(this.response>0)
      {
        this.submittrue=false;
      
       
        (<HTMLInputElement>document.getElementById('Mobilenumsearch')).value=""
       
        this.closeAllDialogs();
        Swal.fire('Success','Appointment Successfully Booked','success')
       
        this.clear()
      } else{
        
        Swal.fire('info','Something went wrong','info')
        this.closeAllDialogs();
        this.clear()
      }


    },
    error=>
    {
      debugger
      this.closeAllDialogs();
      Swal.fire('','Please fill all the required fields','info')
      //this.reset()
    }
    )
    debugger
       }
  }


  ChangeTimeSlot(index:any,items:any)
  {
    debugger
    this.istartdatetouched=false
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

  public clear()
  {
    
  //  this.isexistedpatientHide=true;
(<HTMLInputElement>document.getElementById('Mobilenumsearch')).value="";
(<HTMLInputElement>document.getElementById('chk')).checked=false;

this.isexistedpatientHide=false
    this.myform.reset();
    this.myform=this.formbulder.group({
      FirstName:['',Validators.required],
      LastName :[''],
      DateOfBirth:['',Validators.required],
      Gender:['Gender*'],
      AadhaarNumber:['',Validators.required],
      MobileNumber:['',Validators.required],
      RelegionId:['Religion*',Validators.required],
      NationalityId:['Nationality*',Validators.required],
      HouseNo:[''],
      StateId:[0,Validators.required],
      DistrictId:['District*',Validators.required],
      City:[''],
      Village:[''],
      PinCode:['',Validators.required],
      ScheduleTypeId:['ScheduleType*',Validators.required],
      SpecialityID:['Speciality*',Validators.required],
      DoctorId:['Doctor*',Validators.required],
      ChargegroupId:['Charge Group*',Validators.required],
      ChargeItemId:['Charge Item*',Validators.required],
      StartTime:['',Validators.required],
      EndTime:['',Validators.required],
      Age:[''],
      AgeModId:['Age Mode*'],
      Prefix:['Prefix*',Validators.required],
      AppointmentDate:['',Validators.required]
    
    });

    this.existedCheck();
(<HTMLInputElement>document.getElementById('mobilenumber')).value=""
this.ischecked=false



  }

  checkTime(event:any){
debugger
let k;
let b:any
let v=event.target.value;
const [hours, minutes] = v.split(':');
k = new Date();
k.setHours(Number(hours));
k.setMinutes(Number(minutes));
k.setMinutes(k.getMinutes() + 15);
 b= this.datePipe.transform(k, 'HH:mm tt');
(<HTMLInputElement>document.getElementById('etime')).value=b ;//this.dateservice.GlobalStringDateFormat(b);

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
funn()
{
  
    
(<HTMLInputElement>document.getElementById('chk')).checked=false
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
this._dob=g[0]
//var  ddd:any=this.sp[0]
this.dobModel=this.dateservice.LocalStringDateFormat(this._dob);
(<HTMLInputElement>document.getElementById('dob')).value=this.dobModel;
this.myform.get('FirstName').patchValue(result[0].firsT_NAME)
this.myform.get('LastName').patchValue(result[0].lasT_NAME)

this.myform.get('Gender').patchValue(result[0].gender)

this.myform.get('AadhaarNumber').patchValue(result[0].aadhaR_NO)

this.myform.get('MobileNumber').patchValue(result[0].mobilE_NUMBER)

this.myform.get('RelegionId').patchValue(result[0].religioN_ID)

this.myform.get('Age').patchValue(result[0].age)

this.myform.get('AgeModId').patchValue(result[0].agE_MODE)

this.myform.get('NationalityId').patchValue(result[0].nationalitY_ID)

this.myform.get('HouseNo').patchValue(result[0].housenumber)

this.myform.get('StateId').patchValue(result[0].statE_ID)

this.myform.get('DistrictId').patchValue(result[0].districT_ID)


if(result[0].city!=null || result[0].city!="")
{
  this.myform.get('City').patchValue(result[0].city)
}


if(result[0].Village!=null || result[0].Village!="")
{
  this.myform.get('Village').patchValue(result[0].Village)
}


this.myform.get('PinCode').patchValue(result[0].pincode)

this.myform.get('Prefix').patchValue(result[0].prefix)


//marks asdirty


this.dobModel=this.dateservice.LocalStringDateFormat(this._dob)

this.myform.get('DateOfBirth').markAsDirty();
this.myform.get('DateOfBirth').setErrors(null);
this.myform.get('DateOfBirth').markAsTouched();

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



this.myform.get('PinCode').markAsDirty();

this.myform.get('Prefix').markAsDirty();


 });
 //this.createform.controls['email'].setErrors({'incorrect': true});
 
}
setCustomControlAsInvalid() {
  const customControl = this.myform?.get('AadhaarNumber');
  
  // Set the control as invalid with a specific error
  customControl?.setErrors({ customError: true });
}
public getAgeInDays(dateOfBirth: any): number {
  var today = new Date();
  debugger
 // var dt=(<HTMLInputElement>document.getElementById('dob')).value
  var birthDate = new Date(dateOfBirth);
  
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

public checkVAlidAadhaar(event:any)
{
 let isvalid= this.service.isValidNumber(event);
 if(isvalid==false)
 {
(<HTMLInputElement>document.getElementById('Aadhaar')).value='';
 }else 
 if((<HTMLInputElement>document.getElementById('Aadhaar')).value="0")
 {
  (<HTMLInputElement>document.getElementById('Aadhaar')).value='';
  
 }
}


onKeyDown(event: KeyboardEvent) {
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
  
  this.aadhaar01accaptable=true;
  event.preventDefault();
} 
}else  this.aadhaar01accaptable=false;
  // Allow only numeric input
  if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) {
    event.preventDefault();
  }}

  onKeyDownForMobile(event: KeyboardEvent) {
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
      this.mobile05accaptable=true
        event.preventDefault();
      }
    }else this.mobile05accaptable=false
   
      // Allow only numeric input
    if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) {
     
       
        event.preventDefault();
      }
    
    }
  

    
  onKeyDownForMobile2(event: KeyboardEvent) {
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
    
    let txt=(<HTMLInputElement>document.getElementById('Mobilenumsearch')).value;
    
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
  
    
  onKeyDownForPincode(event: KeyboardEvent) {
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
  

  
  selectGender(event:any)
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
  datePatternValidator(control:any) {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
    if (!datePattern.test(control.value) || isNaN(Date.parse(control.value))) {
      if(control.value!="")
      {
        return { invalidDate: true };
      }else  return { invalidDate: false };
      
    }
    return null;
  }


  AcceptCharactersOnly(event:KeyboardEvent)
  {
    if (
      (event.keyCode === 9)||
      [46, 8, 9, 27, 13].indexOf(event.keyCode) !== -1 ||
      // Allow Ctrl+A
      (event.keyCode === 65 && event.ctrlKey === true) ||
      // Allow Ctrl+C
    //  (event.keyCode === 67 && event.ctrlKey === true) ||
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

  AcceptHouseNoOnly(event: KeyboardEvent) {
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-','/'];

    // Convert the pressed key to lowercase for case-insensitive comparison
    const pressedKey = event.key.toLowerCase();

    // Check if the pressed key is in the allowedKeys array
    if (!allowedKeys.includes(pressedKey)) {
      event.preventDefault(); // Prevent the keypress if not allowed
    }
  }
  

//keydown event for accept only numbers and starting with 6 to 9 --madhu
AcceptHousenumberOnly(event: KeyboardEvent) {
  debugger
  const allowedCharacters = /^[0-9\-/]*$/; // Regular expression to match digits (0-9), "-", and "/"

  // Check if the pressed key matches the allowed characters
  if (!allowedCharacters.test(event.key)&& event.key !== 'Backspace' && event.key !== 'Delete'&& event.key !== 'ArrowLeft'&& event.key !== 'ArrowRight') {
    event.preventDefault(); // Prevent the key from being entered
  }
  
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
    debugger
    let today=new Date();
    let _date=formatDate(today,'dd-MM-yyyy','en-Us');
    this.AppdateModel=_date;
    this.GetTimeSlotsForTimePicker(_date,15);
   // let t=this.timeintarval[0]
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
  Gender:['Gender*'],
  AadhaarNumber:['',[Validators.required,Validators.minLength(12)]],
  MobileNumber:['',[Validators.required,Validators.minLength(10)]],
  RelegionId:['Religion*',Validators.required],
  NationalityId:['Nationality*',Validators.required],
  HouseNo:['',Validators.required],
  StateId:[0,Validators.required],
  DistrictId:['District*',Validators.required],
  City:[''],
  Village:[''],
  PinCode:['',[Validators.required,Validators.minLength(6)]],
  ScheduleTypeId:['ScheduleType*',Validators.required],
  SpecialityID:['Speciality*',Validators.required],
  DoctorId:['Doctor*',Validators.required],
  ChargegroupId:['Charge Group*',Validators.required],
  ChargeItemId:['Charge Item*',Validators.required],
  StartTime:['',Validators.required],
  EndTime:['',Validators.required],
  Age:[''],
  AgeModId:['Age Mode*'],
  Prefix:['Prefix*',Validators.required],
  AppointmentDate:['',Validators.required]

})


this.myform.get('AgeModId')?.disable();
this.myform.get('Gender')?.disable();
  }

  
  public GetDistricts(Id:any)
  {
  
    this.service.GetDistricts(Id).subscribe((result)=>this.districts=result)
  }

  onDateSelectDob(event:any) {
    debugger
    let year = event.year;
    let month = event.month <= 9 ? '0' + event.month : event.month;;
    let day = event.day <= 9 ? '0' + event.day : event.day;;
     let actual = day + "-" + month + "-" + year;
    let gloabaldate=year+"-"+month + "-" +day;
       this.dobModel=actual
       this.getAgeInDays(gloabaldate)
  
   }

   
  onDateSelectAppdate(event:any) {
    debugger
    let year = event.year;
    let month = event.month <= 9 ? '0' + event.month : event.month;;
    let day = event.day <= 9 ? '0' + event.day : event.day;;
     let actual = day + "-" + month + "-" + year;
    (<HTMLInputElement>document.getElementById('AppointmentDate')).value=actual
    this.AppdateModel=actual
   // this.myform.get('AppointmentDate').patchValue(actual)
  
   
   }
  
  @HostListener('document:click',['$event'])
  clickout(event: { target: any; }){
   this.istartdatetouched=false
    if(this.Mobilenumsrch.nativeElement.contains(event.target)){
      this.showModal = true;
    }
    else{
      this.showModal = false;
    }
    debugger

    if(this.StartTime.nativeElement.contains(event.target)){
      let k=this.AppdateModel
      let g=this.dateservice.GlobalStringDateFormat(this.AppdateModel)
        this.GetTimeSlotsForTimePicker(this.dateservice.GlobalStringDateFormat(this.AppdateModel),15)
        
        this.showModal2 = true;
      }
      else{
        this.showModal2 = false;
        this.istartdatetouched=true
      }

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


   
  }  
  

  

