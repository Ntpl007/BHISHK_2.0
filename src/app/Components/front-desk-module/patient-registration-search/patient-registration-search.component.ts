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
  selector: 'app-patient-registration-search',
  templateUrl: './patient-registration-search.component.html',
  styleUrls: ['./patient-registration-search.component.css',"../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../css/style.css","../../../../css/bootstrap.min.css"
  ,"../../../../css/responsive.bootstrap4.min.css","../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../css/dataTables.bootstrap4.min.css","../../../../css/metisMenu.min.css"],
  
 providers: [
  { provide: NgbDateAdapter, useClass: CustomAdapter },
  { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
],
})
export class PatientRegistrationSearchComponent implements OnInit {
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
  constructor(private formbuilder:FormBuilder,
    private himsservice:HimsServiceService,private config: NgbDatepickerConfig,
    private dateservice:DateService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
     private dateAdapter: NgbDateAdapter<string>,
     private ngbcalender:NgbCalendar,
     private datePipe:DatePipe,
     private service:HimsServiceService
    
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

      this.himsservice.SearchRegistrationPatients(Dates).subscribe((result)=>
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
     
     this.himsservice.GetSearchRegisterPatientToday().subscribe((result)=>
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
    localStorage.setItem('header','Search-Patient')
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
       ShowingRegPaymentReceipt(test:any) {
        debugger;             
  
                  var address=''
                  if((test.village!= null && test.village!="")&& (test.city!=null && test.city!="")) 
                  {
                  address=test.village+','+test.city;
                  } 
                  else if((test.village== null || test.village=="")&& (test.city!=null && test.city!="")) 
                  {
                  address=test.city;
                  } 
                  else if((test.village!= null && test.village!="")&& (test.city==null || test.city=="")) 
                  {
                  address=test.village;
                  }  
                  else{
                  address='-------';
                  }       
  
                //  var result= numToWords(test.registrationAmount);
               
                  var PaymentMode="";
                  if(test.paymentMode==1)
                  {
                    PaymentMode="Payment(CASH)";
  
                  }
                  else if(test.paymentMode==2)
                  {
                    PaymentMode="Payment(DEBIT/CREDIT CARD)";
                  }
                  else if(test.paymentMode==5)
                  {
                    PaymentMode="Payment(CHEQUE)";
                  }
                  else if(test.paymentMode==9)
                  {
                    PaymentMode="Payment(RTGS)";
                  }
                  else if(test.paymentMode==8)
                  {
                    PaymentMode="Payment(NEFT)";
                  }
                  else if(test.paymentMode==10)
                  {
                    PaymentMode="Payment(UPI)";
                  }
                  else 
                  {
                    PaymentMode="Payment(Payments From IP)";
                  }
                  const inputDateString = test.dateOfVisit                  ;
                  const inputDate = new Date(inputDateString);
                  var formattedDate = inputDateString//this.datePipe.transform(inputDate, 'dd/MM/yyyy  HH:mm a');
                  var HeaderFields = " <table style='font-size:20px' width='100%' border='0' align='center' cellpadding='0' cellspacing='0'><tr><td width='2%'></td><td>"  + "</td><td><b>Bill No:" +test.regBillNo + "</b></td><td align='right'><img src='assets/img/bhishak.png' style='height:85px;width:150px'/> </td><td width='5%'></td></tr><tr><td width='2%'></td></tr><tr><td colspan='5' align='center'><hr /> </td></tr></table>"
                  var PatientDetails = "<table style='font-size:12px' width='100%' border='0' align='center' cellpadding='0' cellspacing='0'><tr><td width='2%'></td><td width='8%' align='left'><b>Patient</b></td><td width='1%' align='center'><b>:</b></td><td width='20%' align='left'>" + test.name + "</td><td  width='8%' align='left'><b>Patient Id  </b></td><td align='center' ><b>:</b></td><td  width='19%' align='left'>" + test.patientMrn + "</td><td width='8%' align='left'><b>Mobile</b></td><td  width='34%'><b>: </b>" + test.mobileNumber + "</td></tr><tr><td width='2%'></td><td align='left' width='8%'><b>Age/Gender</b></td><td align='center' width='1%' ><b>:</b></td><td align='left' width='20%'>" + ''
                  + test.age+" "+ test.ageModeId + "/" + test.gender + "</td><td align='left' width='8%'><b>OP ID</b></td><td align='center'><b>:</b></td><td align='left' width='19%'>" + "-------"+ "</td><td align='left' width='8%'><b>Bill Date</b></td><td width='34%'><b> :</b> " + formattedDate+ "</td></tr><tr><td width='2%'></td><td align='left' width='8%' ><b>Address</b></td><td align='center' width='1%'><b>:</b></td><td align='left' width='20%'>" +address  + "</td><td align='left' width='8%'><b>Corporate</b></td><td align='center' ><b>:</b></td><td align='left' width='19%'>" + "----" + "</td><td align='left' width='8%'><b>Ref.Doctor</b></td><td width='34%'><b>:</b> " + "-----" + "</td></tr><tr><td width='2%'></td><td width='8%' align='left'><b>Doctor</b></td><td width='1%' align='center'><b>:</b></td><td width='70%' align='left' colspan='6'>" + "---------" + "</td></tr><tr><td colspan='9'><hr/></td></tr></table>"
                  var ParticularsHeader = "<table width='100%' style='font-size:12px'  border='0' align='center' cellspacing='0' cellpadding='0'><tr><td width='5%'></td><td width='45%'><strong>Particulars</strong></td><td width='15%'><strong>No.of Units</strong></td><td width='30%' align='right'><strong>Amount</strong></td><td width='5%'></td></tr><tr><td colspan='5'><hr/></td></tr>"          
                  var Particulars = "";
                  var Notes = "";
                  var Footer = "";
                  var TotalCharges = 0;                
                  var encId='';
                  var IsReview=false;                
                  const numWords = require('num-words') 
                  const amountInWords =this.service.ToCapital(numWords(test.regPaidAmount))  
                  var Review="";
                  Particulars = Particulars + "<tr><td width='5%'></td><td width='45%'>" + 'Registration' + "</td><td width='15%'>" + '1' + " </td><td width='30%' align='right'>" + test.registrationBill + ".00</td><td width='5%'></td></tr>";
                  Notes = "<tr><td colspan='5'></td></tr><tr><td colspan='5'></td></tr><tr><td colspan='5'><hr/></td></tr></table><table width='100%' style='font-size:12px'  border='0' align='center' cellspacing='0' cellpadding='0'><tr><td></td><td></td><td align='right'><b>Total Charges:&#160;&#160;" + test.registrationBill + ".00</b></td><td width='5%'></td></tr><tr><td colspan='4'><hr></hr></td></tr><tr><td width='2%'></td><td>" + PaymentMode + "</td><td align='right'><b>" + test.paidAmount + ".00</b></td><td width='5%'></td></tr><tr><td colspan='4'><hr></hr></td></tr> <tr><td width='2%'></td><td width='30%'><b>Notes :</b>" + "" + "</td><td><b>Total In Words:</b>" +amountInWords+" "+ 'Rupees Only' + "&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;<b>" + Review + "</b></td><td width='5%'></td></tr><tr><td width='2%'></td><td><b>Payment Received By:&#160;&#160;</b>" + 'ntc'
                   + "</td><td align='right'>Authorised Signature</td><td width='5%'></td></tr><tr><td colspan='4'><hr></hr></td></tr><tr><td colspan='4' align='center'>16-11-404/16, SBI Officers Colony Rd,Moosarambagh, Hyderabad-500036</td></tr>";
                  Footer = "<tr> </tr>";
                  var mywindow = window.open('', 'Payment Voucher', 'height=512,width=960');
                  mywindow?.document.write('<html><head><style type="text/css">@media print    {.printView        {            display: none;        }    }    @page    {        size: A4;       margin: 1;    }</style><style>@media print    {#printpagebutton        {            display: none;        }    } </style><style>@media print    {#OPprintpagebutton        {            display: none;        }    } </style><title>Payment Voucher</title>');
                  mywindow?.document.write("<script type='text/javascript'>function printpage(){ window.open('PrintPages/PatientEncounterPrescriptionPagePreviewNew.aspx?EncounterId=" + encId + "&WithHeader=" + false + ",width=1000,height=525');}");
                  mywindow?.document.write('\<\/script\>');
                  mywindow?.document.write("<script type='text/javascript'>function OPprintpage(){ window.open('PrintPages/OPConsultationPrescription.aspx?EncounterId=" + encId + "&IsReview=" + IsReview + "&WithHeader=" + false + ",width=1000,height=525');}");
                  mywindow?.document.write('\<\/script\>');
                  mywindow?.document.write('</head><body >');
                  mywindow?.document.write(HeaderFields + PatientDetails + ParticularsHeader + Particulars + Notes + Footer);
                  mywindow?.document.write('</table></body></html>');
                  mywindow?.print();
           
      }
  

}

