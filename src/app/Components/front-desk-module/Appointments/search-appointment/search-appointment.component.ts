import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';
import { DatePipe, formatDate, JsonPipe } from '@angular/common';
import Swal from 'sweetalert2';

import {MatIconModule} from '@angular/material/icon';

//import { FilterPipe } from 'src/app/filter.pipe';
import {  NgbDate, NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Buffer } from "buffer";
import { Router } from '@angular/router';
import { DateService } from 'src/app/Shared/date.service';
import { MatDialog } from '@angular/material/dialog';
import { RescheduleComponent } from 'src/app/Components/PopUps/reschedule/reschedule.component';
import { TransferAppointmentComponent } from 'src/app/Components/PopUps/transfer-appointment/transfer-appointment.component';
import { DialogcommunicationService } from 'src/app/Shared/dialogcommunication.service';
import { Subscription } from 'rxjs';
import { CustomAdapter } from 'src/app/Shared/Dates/CustomAdapter ';
import { CustomDateParserFormatter } from 'src/app/Shared/Dates/CustomDateParserFormatter ';
//import { TransferAppointmentComponent } from 'src/app/Components/PopUps/transfer-appointment/transfer-appointment.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-search-appointment',
  templateUrl: './search-appointment.component.html',
  styleUrls: ['./search-appointment.component.css',"../../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../../css/style.css","../../../../../css/bootstrap.min.css"
  ,"../../../../../css/responsive.bootstrap4.min.css","../../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../../css/dataTables.bootstrap4.min.css","../../../../../css/metisMenu.min.css"],
 
 providers: [
  { provide: NgbDateAdapter, useClass: CustomAdapter },
  { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
],
})
export class SearchAppointmentComponent implements OnInit  {
 //#region Declerations
  mydate?:NgbDate
  private dialogClosedSubscription?: Subscription;
  
  todayfrom:any// formatDate(new Date(), 'yyyy-MM-dd', 'en-US'); // dateofbirth;
  todayTo:any
  isDateDisabled=false;
  title="OPD Search"
  model?: NgbDateStruct;
  model2?: NgbDateStruct;
 
searchform:any
islload:boolean=false
datenow=new Date();
norecords:any
patientList:any
frmdate=new Date
tDate=new Date
rowscount:any=0
p: number = 0;
searchText = '';
_fromdate:any
doctors:any
_todate:any
_todate2:any
_fromdate2:any
id:string="";
appointmentstatus:any
paymentcategory:any
loadData:any;
isfdateempty=false
istdateempty=false
//array
pulldata={
AppointmentStatusId:0,
DoctorId:0,
FromDate:"",
ToDate:"",
MobileNumber:"",
PatientName:""

}
//-----------------
setdateload:any
iscancelled?:false
isvi:boolean=false
  maxDate: { year: number; month: number; day: number; };
  minDate: { year: number; month: number; day: number; };
  //#endregion
 //#region constructor
  constructor(private pop:MatDialog,
     private dateservice:DateService,
     private datePipe:DatePipe,
     private formbuilder:FormBuilder,
     private himsservice:HimsServiceService,
     private rout:Router,
     private dialogCommunicationService:DialogcommunicationService
    ) {

    const current = new Date();
    this.maxDate = {
      year: current.getFullYear()+1,
      month: current.getMonth(),
      day: current.getDate()
    };
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth()+1,
      day: current.getDate()
    };
    this.searchform=formbuilder.group({

    });

    this.dialogClosedSubscription = this.dialogCommunicationService.dialogClosed$.subscribe(() => {
      this.methodToFireAfterDialogClosed();
    });
   }
   //#endregion
  //#region Methods
   exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.patientList);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'exported-data.xlsx');
  }
   onDateSelectfromdate(event:any):any {
    debugger
    let year = event.year;
    let month = event.month <= 9 ? '0' + event.month : event.month;;
    let day = event.day <= 9 ? '0' + event.day : event.day;;
    

    //let b= this.formatDate2(this.minDate)
    this._fromdate = day + "-" + month + "-" + year;
    let sdate=year + "-" + month + "-" + day;
    let dt =formatDate(new Date(),'yyyy-MM-dd','en-Us')
    this.datePipe.transform(sdate, 'dd-MM-yyyy');

      let _todate= this.dateservice.GlobalStringDateFormat((<HTMLInputElement>document.getElementById('toDate')).value);
      let t= year + "-" + month + "-" + day;
      if(t>_todate)
      {
       
        this.isvi=true
      }else 
      {
        this.isvi=false
        this.isfdateempty=false
      }
      
   }
   
   onDateSelecttodate(event:any) {
    debugger
    let year = event.year;
    let month = event.month <= 9 ? '0' + event.month : event.month;;
    let day = event.day <= 9 ? '0' + event.day : event.day;;
    this._todate2 =year + "-" + month + "-" + day;
    this._fromdate2=this.dateservice.GlobalStringDateFormat((<HTMLInputElement>document.getElementById('fdate')).value);
    let f= year + "-" + month + "-" + day;
    if(this._todate2>this._fromdate2)
    {
      this.isvi=false
      this.istdateempty=false
    
    }else  {this.isvi=true ; }
    this.todayTo=this.dateservice.LocalStringDateFormat(this._todate2)
   }
  
   Reset()
   {
    debugger
    let date=new Date();
    this.todayfrom=formatDate(date,'dd-MM-yyyy','en-Us');
    this.todayTo=formatDate(date,'dd-MM-yyyy','en-Us');
  
    this.searchform=this.formbuilder.group({
      FromDate:[this.todayfrom,Validators.required],
      ToDate:[this.todayfrom,Validators.required],
      MobileNumber:[null],
      PatientName:[null],
      AppointmentStatusId:['Appointment Status'],
      DoctorId:['Doctor']
    });
    
    this.isvi=false
  this.istdateempty=false
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
  setData()
  {
  
     this.pulldata.FromDate=(<HTMLInputElement>document.getElementById('fdate')).value;
     this.pulldata.ToDate=(<HTMLInputElement>document.getElementById('toDate')).value
     this.pulldata.PatientName=(<HTMLInputElement>document.getElementById('PatientName')).value
     this.pulldata.MobileNumber=(<HTMLInputElement>document.getElementById('MobileNumber')).value
     let did=(<HTMLInputElement>document.getElementById('DoctorId')).value
     let sid=(<HTMLInputElement>document.getElementById('AppointmentStatusId')).value
     if(did=="Doctor")
      {
        this.pulldata.DoctorId=0;
      } else this.pulldata.DoctorId=Number(did)

     if(sid=="Appointment Status")
      {
        this.pulldata.AppointmentStatusId=0;
      } else this.pulldata.AppointmentStatusId=Number(sid)

  }
SearchAppointments(data:any)
  {
  debugger
  let b=this.model2
  if(data.AppointmentStatusId=='Appointment Status')
    {
      data.AppointmentStatusId=0;
  } else  if(data.AppointmentStatusId==null)
    {
      data.AppointmentStatusId=0;
    }
    if(data.DoctorId=='Doctor')
    {
      data.DoctorId=0
    } else if(data.DoctorId==null)
    {
      data.DoctorId=0;
    }
   
    if(this.isvi==false&&(this.isfdateempty==false&&this.istdateempty==false))
    {
      debugger
     this.pulldata=data;
     let check=data.FromDate.split('-');

     if(check[0].length<4)
     {

     
     data.FromDate=this.dateservice.GlobalStringDateFormat(data.FromDate) ;
     data.ToDate=this.dateservice.GlobalStringDateFormat(data.ToDate);
     }
    if(this.searchform.invalid)
    {
      this.validateallformfields(this.searchform);
    }
     else{
          this.himsservice.GetAppointments(data).subscribe((result)=>
        {
       this.islload=true
       debugger
      if(result.length!=0)
        {
          for(var i=0;i<result.length;i++)
          {
  
            if(result[i].appointment_status=="Cancelled")
            {
              result[i].status=true
            }else  result[i].status=false
    
          }
          debugger
         this.patientList=result;
         this.rowscount=result.length
      this.islload=false
      this.norecords=false
        }
        else{
          this.patientList=result
          this.rowscount=result.length
          this.norecords=true
        //  Swal.fire('','No Patients at this date range','info')
          this.islload=false
          this.patientList.forEach((element: number,index: any)=>{
            if(element==2) this.patientList.splice(index,1);
            
          this.islload=false
            });
        }
       
      })
    }
    
    this.islload=false
  }

}

   SearchAppointmentsToday()
   {
    this.islload=true
    this.himsservice.GetAppointmentsToday().subscribe((result)=>
    {
      debugger
    
      if(result.length!=0)
      {
        for(var i=0;i<result.length;i++)
        {

          if(result[i].appointment_status=="Cancelled")
          {
            result[i].status=true
          }else  result[i].status=false
  
        }
        debugger
       this.patientList=result;
       this.rowscount=result.length
    this.islload=false
    this.norecords=false
      }
      else{
        this.patientList=result
        this.rowscount=result.length
        this.norecords=true

        this.islload=false
        
        this.patientList.forEach((element: number,index: any)=>{
          if(element==2) 
          this.patientList.splice(index,1);
              this.islload=false
       });

      
      }
     
    
    
    });

   }

   public CancelAppointment(index: any, SelectedPatient: any )
   {
    
    Swal.fire({
     
      text:'Are you sure to cancel?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      cancelButtonText:'No'
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked "Yes, delete it!"
        // Implement your deletion logic here
     
    debugger
    this.id=SelectedPatient.appointmentId.toString();
   var EncryptedId= Buffer.from(this.id).toString('base64')
   
   this.himsservice.CancelAppointments(EncryptedId).subscribe((result)=>{
    debugger
    let a=result
    debugger
    this.setData()
    this.SearchAppointments(this.pulldata);
   
   })





        Swal.fire('Cancelled!', 'This Appointment has been Cancelled.', 'success');
      }
    });
    


   }

   public EditAppointment(index: any, SelectedPatient: any )
   {
    debugger
     localStorage.setItem('editappointmentId',SelectedPatient.appointmentId)
     this.rout.navigateByUrl('/FrontDesk/Edit-Appointments');
     

   }

  
reschedule(index:any,row:any)
{
 
  const dialogRef=this.pop.open(RescheduleComponent,{
     width:"65%",
     height:"410px",
     data:row
    
 }
 )
 dialogRef.afterClosed().subscribe(result => {
  // This code will execute when the dialog is closed
  if (result === 'someValue') {
 
   this.SearchAppointments(this.pulldata);
  }
});

debugger
 


}

Transfer(index:any,row:any)
{
  debugger
  const dialogRef=this.pop.open(TransferAppointmentComponent,{
       width:"65%",
       height:"550px",
       data:row
       }
   )
  dialogRef.afterClosed().subscribe(result => {
    // This code will execute when the dialog is closed
    if (result === 'someValue') {
    debugger
      this.SearchAppointments(this.pulldata);
  }
});
}

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
  methodToFireAfterDialogClosed() {
    // Your method logic here
    debugger
    this.setData();
  
    debugger
   this.SearchAppointments(this.pulldata)
  }
  //#endregion
 
  ngOnInit(): void {
    debugger
    localStorage.setItem('header','Search Appointments')
    this.patientList=[]
    debugger
    let dt=formatDate(this.datenow,'dd-MM-yyyy','en-Us') 
    this.todayfrom=dt//{ year: 2023, month: 9, day: 5 }; //this.setdateload;
    this.todayTo=dt
     //configurations for validations and default vallues for form fields
    this.searchform=this.formbuilder.group({
      FromDate:[dt,[Validators.required,Validators.pattern(/^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/)]],
      ToDate:[dt,[Validators.required,Validators.pattern(/^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/)]],
      MobileNumber:[''],
      PatientName:[''],
      AppointmentStatusId:['Appointment Status'],
      DoctorId:['Doctor']
    });
    
    this.SearchAppointmentsToday();
    localStorage.removeItem('editappointmentId')
    this.himsservice.getDoctors().subscribe((result)=>{this.doctors=result})
    this.himsservice.GetAppointmentsStatus().subscribe((result)=>{this.appointmentstatus=result})
    debugger
   this.setData();
   var f=(<HTMLInputElement>document.getElementById('fdate')).value;
  //var t=(<HTMLInputElement>document.getElementById('toDate')).value
    
  }
 
Checkin(Item:any)
{
  debugger
  localStorage.setItem('patientTempId',Item.patientTempId)
  this.rout.navigateByUrl('/FrontDesk/opd-appointment');
}
}
