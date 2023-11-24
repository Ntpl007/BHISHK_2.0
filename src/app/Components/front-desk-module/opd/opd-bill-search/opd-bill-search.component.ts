import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';
import { DatePipe, formatDate } from '@angular/common';
import Swal from 'sweetalert2';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
//import { FilterPipe } from 'src/app/filter.pipe';
import { NgbAlertModule, NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerConfig, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DateService } from 'src/app/Shared/date.service';
import { CustomAdapter } from 'src/app/Shared/Dates/CustomAdapter ';
import { CustomDateParserFormatter } from 'src/app/Shared/Dates/CustomDateParserFormatter ';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-opd-bill-search',
  templateUrl: './opd-bill-search.component.html',
  styleUrls: ['./opd-bill-search.component.css',"../../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../../css/style.css","../../../../../css/bootstrap.min.css"
  ,"../../../../../css/responsive.bootstrap4.min.css","../../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../../css/dataTables.bootstrap4.min.css","../../../../../css/metisMenu.min.css"],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
})
export class OpdBillSearchComponent implements OnInit {

  //#region Declarations
  datenow=new Date();
  //today=formatDate(new Date(), 'yyyy-MM-dd', 'en-US'); // dateofbirth;
  title="OPD Bill Search"
  fromdatemodel:any
  todatemodel=""
  model?: NgbDateStruct;
  model2?: NgbDateStruct;
searchform:any
ob:any
islload:boolean=false
myclass:any
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
  constructor(private formbuilder:FormBuilder,private himsservice:HimsServiceService,private config: NgbDatepickerConfig,
    private dateservice:DateService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
     private dateAdapter: NgbDateAdapter<string>,
     private ngbcalender:NgbCalendar,
     private rout:Router,
    
    ) {
    const current = new Date();
    this.maxDate = {
      year: current.getFullYear(),
      month: current.getMonth() +1,
      day: current.getDate()
    };
    
    this.searchform=formbuilder.group({

    })
   }
//#endregion
  



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

  
   SearchBillingsinload()
   {
    debugger
     
    let encounterId = localStorage.getItem('encId');
     this.himsservice.GetBillingDetails(encounterId).subscribe((result)=>
    {
      debugger
      if(result.length!=0)
      {
        this.patientList=result
        this.norecords=false
        this.rowscount=this.patientList.length
        for(var i=0;i<this.patientList.length;i++)
        {
          //this.patientList[i].dateOfVisit=formatDate(this.patientList[i].dateOfVisit, 'dd-MM-yyyy', 'en-US');
        }

      }else this.norecords=true
    });
   
    
   }
   public EditBilling(index: any, SelectedPatient: any )
   {
    debugger
     localStorage.setItem('patientId',SelectedPatient.patientMrn)
     localStorage.setItem('billId',SelectedPatient.billId)
     localStorage.setItem('encounterId',SelectedPatient.encounterId)
     this.rout.navigateByUrl('/FrontDesk/opdupdatebilling');
     

   }

  ngOnInit(): void {
    debugger
   this.SearchBillingsinload();
    localStorage.setItem('header','OPD Bill Search')
    this.patientList=[]
    debugger
    let dt=formatDate(this.datenow,'dd-MM-yyyy','en-Us') 
    this.fromdatemodel=dt
   this.todatemodel=dt
  //  debugger
     //let mydate=this.ngbcalender.getToday();
     //localStorage.removeItem('patientId')
     localStorage.removeItem('billId')
     localStorage.removeItem('encounterId')
     
    this.searchform=this.formbuilder.group({
      FromDate:[dt,[Validators.required,Validators.pattern(/^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/)]],
      ToDate:[dt,[Validators.required,Validators.pattern(/^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/)]],
      MobileNumber:[''],
      FirstName:['']
      
    });


  }
  addBilling(){
    // let patientId = localStorage.getItem('patientId') as string;
    // localStorage.setItem('patientId',patientId)
    // alert(patientId)
    this.rout.navigateByUrl('/FrontDesk/opdbilling');
  }


}
