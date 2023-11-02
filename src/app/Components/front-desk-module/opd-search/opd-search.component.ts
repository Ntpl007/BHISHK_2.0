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
@Component({
  selector: 'app-opd-search',
  templateUrl: './opd-search.component.html',
  styleUrls: ['./opd-search.component.css',"../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../css/style.css","../../../../css/bootstrap.min.css"
  ,"../../../../css/responsive.bootstrap4.min.css","../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../css/dataTables.bootstrap4.min.css","../../../../css/metisMenu.min.css"],
  
 providers: [
  { provide: NgbDateAdapter, useClass: CustomAdapter },
  { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
],
})
export class OpdSearchComponent implements OnInit {
  //#region Declarations
  datenow=new Date();
  //today=formatDate(new Date(), 'yyyy-MM-dd', 'en-US'); // dateofbirth;
  title="OPD Search"
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
     private ngbcalender:NgbCalendar
    
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
        
      this.searchform.get('FromDate').setErrors('required')
      this.searchform.get('ToDate').setErrors('required')
    }else  {this.isvi=false
      this.searchform.get('FromDate').setErrors(null)
      this.searchform.get('ToDate').setErrors(null)
    }
    this.model=this._fromdate1
     this.fromdatemodel=localdate
  
   
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
    this._fromdate2=this.dateservice.GlobalStringDateFormat( (<HTMLInputElement>document.getElementById('fdate')).value);
    
    if(this._todate2<this._fromdate2)
    {
      this.isvi=true
      this.searchform.get('FromDate').setErrors('required')
      this.searchform.get('ToDate').setErrors('required')
    }else{
      this.isvi=false
      this.searchform.get('FromDate').setErrors(null)
      this.searchform.get('ToDate').setErrors(null)
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

    this.searchform=this.formbuilder.group({
      FromDate:[this.todatemodel,[Validators.required,Validators.pattern(/^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/)]],
      ToDate:[this.fromdatemodel,[Validators.required,Validators.pattern(/^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/)]],
      MobileNumber:[''],
      FirstName:['']
      
    });

  
   }
   SearchPatients(Dates:any)
   {
    debugger
    this.islload=true
    
      Dates.FromDate=this.dateservice.GlobalStringDateFormat(Dates.FromDate);

      Dates.ToDate=this.dateservice.GlobalStringDateFormat(Dates.ToDate);
    
    debugger
    if(this.searchform.invalid)
    {
      this.validateallformfields(this.searchform)
      this.islload=false
    }else{

      this.himsservice.SearchPatients(Dates).subscribe((result)=>
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
  
         // Swal.fire('','No Patients at this date range','info')
          this.islload=false
          
          this.patientList.forEach((element: number,index: any)=>{
            if(element==2) this.patientList.splice(index,1);
         });
  
        
        }
       
      })
    }
 
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


  ngOnInit(): void {
    debugger
   this.SearchPatientsinload();
    localStorage.setItem('header','OPD Search')
    this.patientList=[]
    debugger
    let dt=formatDate(this.datenow,'dd-MM-yyyy','en-Us') 
    this.fromdatemodel=dt
   this.todatemodel=dt
  //  debugger
     //let mydate=this.ngbcalender.getToday();
    this.searchform=this.formbuilder.group({
      FromDate:[dt,[Validators.required,Validators.pattern(/^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/)]],
      ToDate:[dt,[Validators.required,Validators.pattern(/^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/)]],
      MobileNumber:[''],
      FirstName:['']
      
    });


  }
  printThisPage(index: any, SelectedPatient: any) {
    debugger;                             
           var billno=''; 
           var address=''
           if((SelectedPatient.village!= null && SelectedPatient.village!="")&& (SelectedPatient.city!=null && SelectedPatient.city!="")) 
           {
            address=SelectedPatient.village+','+SelectedPatient.city;
           } 
           else if((SelectedPatient.village== null || SelectedPatient.village=="")&& (SelectedPatient.city!=null && SelectedPatient.city!="")) 
           {
            address=SelectedPatient.city;
           } 
           else if((SelectedPatient.village!= null && SelectedPatient.village!="")&& (SelectedPatient.city==null || SelectedPatient.city=="")) 
           {
            address=SelectedPatient.village;
           }  
           else{
            address='-------';
           }       
           var Header = '<table width="900" border="0" cellspacing="0" cellpadding="0" align="center" style="padding-bottom:50px;padding-left:30px;padding-right:30px;"><tr height="30px"></tr><tr><td><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td align="center">' + "<input id='printpagebutton' type='button' value='Print' onclick='Print();'/>" + '</td></tr><tr><td><table width="100%" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td align="left"><p style="margin:0;font-size:16px;line-height:16px;">Door No:5-1-11, Opp.SBI Main Branch,</p><p style="margin:0;font-size:16px;line-height:16px;">Srinivasnagar, Vizianagaram-535 002</p><p style="margin:0;font-size:16px;line-height:16px;">Ph: 08922-225177, 225188</p><p style="margin:0;font-size:16px;line-height:16px;">https://www.queensnrihospital.com</p><p style="margin:0;font-size:16px;line-height:16px;"> mailto:e-mail:queensnrivzm@gmail.com </p></td><td valign="top" align="right"><img  src="assets/img/bhishak.png" width="350px"></td></tr></tbody></table></td></tr><tr height="10px"></tr><tr><td align="center" style="border-top: 2px solid #565656;"><h2 style="font-size:20px;line-height:22px;text-transform:uppercase;margin:0">Out Patient Assessment Record</h2></td></tr></table> </td></tr>'
           var tblPatients = Header + '<tr height="10px"></tr><tr><td style="border-top: 2px solid #565656;"><table id="tbl_patientDetails" width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td align="left" valign="top"><p style="margin:0"><strong style="font-size:14px;line-height:16px;font-weight:bold;text-transform:uppercase;"><span style="text-transform: capitalize;">Patient Name :</span>' + SelectedPatient.name+ '</strong></p><p style="margin:0"><strong style="font-size:14px;line-height:16px;font-weight:normal;">Address :' + address+'</strong></p></td><td align="left" valign="top"><p style="margin:0"><strong style="font-size:14px;line-height:16px;font-weight:normal;">Age/Gender : ' + SelectedPatient.age+'('+SelectedPatient.ageModeId+')/'+SelectedPatient.gender + '</strong></p><p style="margin:0"><strong style="font-size:14px;line-height:16px;font-weight:normal;">Occupation :  ' + ((SelectedPatient.occupation != "" && SelectedPatient.occupation != null) ? SelectedPatient.occupation: "Not Specified") + '</strong></p><p style="margin:0"><strong style="font-size:14px;line-height:16px;font-weight:normal;">Bill No: ' + billno + '</strong></p><p style="margin:0"><strong style="font-size:14px;line-height:16px;font-weight:normal;">Nationality : ' + ((SelectedPatient.nationalityName != "" &&SelectedPatient.nationalityName != null) ? SelectedPatient.nationalityName : "Not Specified") + '</strong></p></td><td align="left" valign="top"><p style="margin:0"><strong style="font-size:14px;line-height:16px;font-weight:normal;">UMR No : ' + SelectedPatient.patientMrn + '</strong></p><p style="margin:0"><strong style="font-size:14px;line-height:16px;font-weight:normal;">Reg. Date : ' + SelectedPatient.dateOfVisit + '</strong></p><p style="margin:0"><strong style="font-size:14px;line-height:16px;font-weight:normal;">Religion   : ' + ((SelectedPatient.religionName != "" || SelectedPatient.religionName != null) ? SelectedPatient.religionName: "Not Specified") + '</strong></p><p style="margin:0"><strong style="font-size:14px;line-height:16px;font-weight:normal;">Mobile No : ' + SelectedPatient.mobileNumber + '</strong></p><p style="margin:0"><strong style="font-size:14px;line-height:16px;font-weight:bold;">OP.No : ' + SelectedPatient.opId + '</strong></p></td></tr></table></td></tr>';
           var tblbody = tblPatients + '<tr height="10px"></tr><tr><td><table width="100%" border="1" cellspacing="0" cellpadding="0" class="table2"><tr><td colspan="4" style="border-right:none"><b style="font-size:14px;line-height:16px;"><i style="font-style: normal;color:blue;">Consultant</i> : ' + SelectedPatient.listName + '  </b></td><td colspan="1" style="border-left:none"><b style="font-size:14px;line-height:16px;">Department of ' + SelectedPatient.speciaity + ' <br>OP Room No. : ' +  'Not Specified'+ ' </b></td></tr><tr height="40px"><td width="20%"><span style="display:block;font-size:12px;">HEIGHT:</span></td><td width="20%"><span style="float:left;display:block;font-size:12px;">WEIGHT:</span><span style="float:right;display:block;font-size:12px;">kg</span></td><td width="15%"><span style="float:left;display:block;font-size:12px;">TEMP:</span><span style="float:right;display:block;font-size:12px;">F</span></td><td width="20%"><span style="display:block;font-size:12px;float:left">PULSE RATE:</span><span style="display:block;font-size:12px;float:right">/min</span></td><td width="15%"><span style="display:block;font-size:12px;float:left;">BLOOD PRESSURE:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/<span style="display:block;font-size:12px;float:right;">mm of Hg</span></td></tr><tr><td colspan="4">DRUG ALLERGIES (if any) :</td><td colspan="1"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td><span style="display: inline-block;">PAIN <br>SCALE</span></td><td align="right"><img src="assets/img/rating-scale-img2.png"  width="270" height="87px"></td></tr></table></td></tr><tr><td colspan="1" align="center"><b>DATE &amp; TIME</b></td><td colspan="4" align="center"><b>CLINICAL NOTES / INVESTIGATIONS/ TREATMENT</b></td></tr><tr><td colspan="1" align="center"><p style="height:300px;"></p></td><td colspan="4" align="center"><p style="height:700px;"></p></td></tr></table></td></tr><tr><td></td></tr><tr><td></td></tr></table><br/>';
           var tbody1 = '<table width="900" border="0" cellspacing="0" cellpadding="0" align="center" style="padding-bottom:70px;padding-left:30px;padding-right:30px;"></table><table width="900" border="0" cellspacing="0" cellpadding="0" align="center" style="padding-bottom:50px;padding-left:30px;padding-right:30px;"><tr height="50px"></tr><tr><td style="padding-bottom: 0"><table width="100%" border="1" cellspacing="0" cellpadding="0" class="table2" style="border-bottom: none;"><tr><td colspan="5" align="center"><b>MEDICATIONS ADVISED</b></td></tr></table></td></tr><tr><td style="padding-top: 0"><table width="100%" border="1" cellspacing="0" cellpadding="0"><tr><td rowspan="2" align="center">S.No</td><td rowspan="2" align="center">Form</td><td rowspan="2" align="center" width="400">Medication</td><td rowspan="2" align="center">Dose</td><td rowspan="2" align="center">Route</td><td rowspan="2" align="center"><img src="assets/img/sunrise.png" width="40px" alt="sun rise"> <br>Morning</td><td rowspan="2" align="center"><img src="assets/img/sun.png" width="35px" alt="sun"> <br>noon</td><td rowspan="2" align="center"><img src="assets/img/night-mode.png" width="35px" alt="moon"> <br>Night</td><td rowspan="2" align="center" width="35">No of Days</td><td rowspan="2" align="center">Others</td><td colspan="2" align="center"><img src="assets/img/dish.jpg"" width="35px" alt="Food"> <br> Food</td></tr><tr><td align="center">Before</td><td align="center">after</td></tr><tr align="center" style="line-height:70px;"><td >1</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr align="center" style="line-height:70px;"><td>2</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr align="center" style="line-height:70px;"><td>3</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr align="center" style="line-height:70px;"><td>4</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr align="center" style="line-height:70px;"><td>5</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr align="center" style="line-height:70px;"><td>6</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr align="center" style="line-height:70px;"><td>7</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr align="center" style="line-height:70px;"><td>8</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr align="center" style="line-height:70px;"><td>9</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr align="center" style="line-height:70px;"><td>10</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td colspan="12" height="100px" valign="top"><b>DIET ADVICE (IF ANY):</b></td></tr></table></td></tr><tr style="height:90px;"><td></td></tr><tr><td align="right"><b>CONSULTANT SIGNATURE.</b></td></tr><tr height="20px"></tr><tr><td style="font-size:12px;"><b>NOTE : IF THERE ARE ANY SIDE EFFECTS WITH THE MEDICINE, STOP THE MEDICINE AND REPORT IMMEDIATELY TO THE HOSPITAL.</b></td></tr><tr height="20px"></tr><tr><td width="13%">Next Review on :<input type="text" style="border: none; border-bottom:1px solid black;">&nbsp; <b>For Emergency Contact: 08922-225188 &nbsp; For Appointment Contact: 08922-225177</b></td></tr><tr height="10px"></tr>';
           var Notes = "";           
           Notes = tbody1 + '</table>';                       
           var mywindow = window.open('', 'OP Prescription', 'height=600,width=960');
           mywindow?.document.write('<html><head><style type="text/css">@media print    {.printView        {            display: none;        }    }    @page    {        size: A4;       margin: 1;    }</style><style>@media print    {#printpagebutton        {            display: none;        }    } </style><title>OP Prescription</title>');
           mywindow?.document.write("<script type='text/javascript'>function Print(){ window.print();}");
           mywindow?.document.write('\<\/script\>');
           mywindow?.document.write('</head><body>');                        
           mywindow?.document.write(tblbody + Notes);                        
           mywindow?.document.write('</body></html>');
           mywindow?.print();
          //  alt="Rating Scale"
       }
  

}
