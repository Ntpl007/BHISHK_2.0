import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';
import { DatePipe, formatDate } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { VitaldetailsPopupComponent } from '../../PopUps/vitaldetails-popup/vitaldetails-popup.component';
//import { FilterPipe } from 'src/app/filter.pipe';
import { NgbAlertModule, NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerConfig, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DateService } from 'src/app/Shared/date.service';
import { CustomAdapter } from 'src/app/Shared/Dates/CustomAdapter ';
import { CustomDateParserFormatter } from 'src/app/Shared/Dates/CustomDateParserFormatter ';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/Shared/user.service';

@Component({
  selector: 'app-opnursing-station',
  templateUrl: './opnursing-station.component.html',
  styleUrls: ['./opnursing-station.component.css',"../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../css/style.css","../../../../css/bootstrap.min.css"
  ,"../../../../css/responsive.bootstrap4.min.css","../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../css/dataTables.bootstrap4.min.css","../../../../css/metisMenu.min.css"],
  
 providers: [
  { provide: NgbDateAdapter, useClass: CustomAdapter },
  { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
],
})
export class OPNursingStationComponent implements OnInit {
  //#region Declarations
  datenow=new Date();
  //today=formatDate(new Date(), 'yyyy-MM-dd', 'en-US'); // dateofbirth;
  title="OP Nursing Search"
  fromdatemodel:any
VitalList:any
  todatemodel=""
  model?: NgbDateStruct;
  model2?: NgbDateStruct;
  OPNursingForm:any
ob:any
islload:boolean=false
myclass:any
speciality:any
doctors:any
norecords:any
patientList:any
frmdate=new Date
tDate=new Date
rowscount:any=0
p: number = 0;
searchText = '';
_fromdate1:any
_todate1:any
AcceptCharsOnly=false
mobile05accaptable=false
pushData={
  AppointmentStatusId:0,
  
  DoctorId:0,
  FromDate:"",
  ToDate:"",
  MobileNumber:"",
  PatientName:""
  
  }

_fromdate2:any
_todate2:any
isvi:boolean=false
  maxDate: { year: number; month: number; day: number; };

  //#endregion declaration end
//#region Constructor
  constructor(private pop:MatDialog,private formbuilder:FormBuilder,private service:HimsServiceService,private himsservice:HimsServiceService,private config: NgbDatepickerConfig,
    private dateservice:DateService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
     private dateAdapter: NgbDateAdapter<string>,
     private ngbcalender:NgbCalendar,private user:UserService,
   
    
    ) {
    const current = new Date();
    this.maxDate = {
      year: current.getFullYear(),
      month: current.getMonth() +1,
      day: current.getDate()
    };
    
    this.OPNursingForm=formbuilder.group({

    })
   }
//#endregion
  
onDateSelectfromdate(event:any) {
    let year = event.year;
    let month = event.month <= 9 ? '0' + event.month : event.month;;
    let day = event.day <= 9 ? '0' + event.day : event.day;;
   debugger
    this._fromdate1 = year + "-" + month + "-" + day;
      let localdate=day+ "-" + month + "-" +year;

    this._todate1=this.dateservice.GlobalStringDateFormat( (<HTMLInputElement>document.getElementById('toDate')).value)
    if(this._todate1<this._fromdate1)
    {

        this.isvi=true
    }else  this.isvi=false
    this.model=this._fromdate1
     this.fromdatemodel=localdate
  
   
   }
   public getDoctors(Id:any)
   {
     let spid=Id.target.value;
     debugger
 
     this.service.GetDoctorbyspeciality(spid).subscribe((result)=>{this.doctors=result})
     debugger
   }
   
   formatDate2(date: NgbDateStruct): string {
    if (date) {
      return this.ngbDateParserFormatter.format(date);
    }
    return '';
  }
  
//keydown event for accept only numbers and starting with 6 to 9 --madhu
// DateTextDisable(event: KeyboardEvent) {
//   debugger

//       event.preventDefault();

  
//   }


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
      if(txt.length<10){
        this.mobile05accaptable=true
      }else  this.mobile05accaptable=false
      
        event.preventDefault();
      }
    
    }
  

    

  AcceptCharactersOnly(event:KeyboardEvent)
  {
    if (//Tab
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
      this.AcceptCharsOnly=true
      event.preventDefault();
    }else  this.AcceptCharsOnly=false
  }

   onDateSelecttodate(event:any) {
    debugger
    let year = event.year;
    let month = event.month <= 9 ? '0' + event.month : event.month;;
    let day = event.day <= 9 ? '0' + event.day : event.day;;
    this._todate2 = year + "-" + month + "-" + day;
    let localdate=day+ "-" + month + "-" +year;
    this._fromdate2=(<HTMLInputElement>document.getElementById('fdate')).value;
    if(this._todate2>this._fromdate2)
    {
      this.isvi=true
      this.OPNursingForm.get('FromDate').setErrors('required')
      this.OPNursingForm.get('To Date').setErrors('required')
    }
      else 
      {
        this.isvi=false
      this.OPNursingForm.get('FromDate').setErrors('required')
      this.OPNursingForm.get('To Date').setErrors('required')
      }
      

    
    this.model2=this._todate2
    this.todatemodel=localdate
   }

   resetdates()
   {
    debugger
    let date=new Date()
    this.todatemodel=formatDate(date,'dd-MM-yyyy','en-Us')
    this.fromdatemodel=formatDate(date,'dd-MM-yyyy','en-Us')

    this.OPNursingForm=this.formbuilder.group({
      FromDate:[this.fromdatemodel,[Validators.required,Validators.pattern(/^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/)]],
      ToDate:[this.todatemodel,[Validators.required,Validators.pattern(/^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/)]],
      MobileNumber:[''],
      FirstName:[''],
      SpecialityID:['0',Validators.required],
      DoctorId:['0',Validators.required],
    });

  
   }
   SearchPatients(Dates:any)
   {
    debugger
    this.islload=true
    
      Dates.FromDate=this.dateservice.GlobalStringDateFormat(this.fromdatemodel);

      Dates.ToDate=this.dateservice.GlobalStringDateFormat(this.todatemodel);
    
    debugger
    if(this.OPNursingForm.invalid)
    {
      this.validateallformfields(this.OPNursingForm)
      this.islload=false
    }else{

      this.himsservice.OpNurseStation(Dates).subscribe((result)=>
      {
        debugger
        if(result.length!=0)
        {
         
          this.islload=false
          debugger
          this.patientList=result
          this.norecords=false
          this.rowscount=this.patientList.length
           for(var i=0;i<this.patientList.length;i++)
           {
             this.patientList[i].dateOfVisit=formatDate(this.patientList[i].dateOfVisit, 'dd-MM-yyyy', 'en-US');
           }
          this.rowscount=this.patientList.length
         
        }else{
          this.patientList=result
          this.rowscount=result.length
          this.norecords=true
  
          //Swal.fire('','No Patients at this date range','info')
          this.islload=false
          
          this.patientList.forEach((element: number,index: any)=>{
            if(element==2) this.patientList.splice(index,1);
         });
  
        
        }
       
      })
    }
 
   }
   vitaldeatils(index:any,row:any)
   {
    debugger
    this.loadvalues.OrganizationId=this.user.getOrganizationId();
    this.loadvalues.FacilityId=this.user.getFacilityId();
    this.loadvalues.SpecialityId=row.specialityId
    this.loadvalues.EncounterId=row.encounterId
    
 
     debugger
     const dialogRef=this.pop.open(VitaldetailsPopupComponent,{
        width:"30%",
        height:"500px",
        data:  this.loadvalues
     
    }
    )
    dialogRef.afterClosed().subscribe(result => {
     // This code will execute when the dialog is closed
     if (result === 'someValue') {
     debugger
   this.OPNursingForm(this.pushData);
     }
   });
 
   debugger
  
 
   }
   SearchPatientsinload()
   {
    debugger
     
     this.himsservice.SearchPatientstbytoday().subscribe((result)=>
    {
      debugger
      if(result.length!=0)
      {
        this.patientList=result
        this.norecords=false
        this.rowscount=this.patientList.length
        for(var i=0;i<this.patientList.length;i++)
        {
          this.patientList[i].dateOfVisit=formatDate(this.patientList[i].dateOfVisit, 'dd-MM-yyyy', 'en-US');
        }

      }else this.norecords=true
    });
   

   }
   loadvalues=
   {
    FacilityId:null,
    PatientId:null,
    OrganizationId:null,
    SpecialityId:null,
    EncounterId:null

   }
   Loaddata(){
    









   }
getvitals()
{
  this.loadvalues.OrganizationId=this.user.getOrganizationId();
  this.loadvalues.FacilityId=this.user.getFacilityId();
 // this.loadvalues.SpecialityId=this.Data.specialityId()

  this.service.LoadVitalsignsData(this.loadvalues).subscribe((result:any)=>{
    this.VitalList =result
  })

}

  ngOnInit(): void {
    
   this.SearchPatientsinload();
    localStorage.setItem('header','OP Nursing Search')
    this.patientList=[]
    debugger
    let dt=formatDate(this.datenow,'dd-MM-yyyy','en-Us') 
    this.fromdatemodel=dt
   this.todatemodel=dt
   this.service.getSpeciality().subscribe((result)=>{this.speciality=result})
  //  debugger
     //let mydate=this.ngbcalender.getToday();
    this.OPNursingForm=this.formbuilder.group({
      FromDate:[dt,[Validators.required,Validators.pattern(/^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/)]],
      ToDate:[dt,[Validators.required,Validators.pattern(/^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/)]],
      MobileNumber:[''],
      FirstName:[''],
      SpecialityID:['0',Validators.required],
      DoctorId:['0',Validators.required],
    });


  }

  

}

