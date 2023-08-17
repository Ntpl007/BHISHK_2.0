import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';
import { DatePipe, formatDate } from '@angular/common';
import Swal from 'sweetalert2';

import {MatIconModule} from '@angular/material/icon';

//import { FilterPipe } from 'src/app/filter.pipe';
import { NgbAlertModule, NgbDatepickerConfig, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Buffer } from "buffer";
import { Router } from '@angular/router';
import { DateService } from 'src/app/Shared/date.service';
import { MatDialog } from '@angular/material/dialog';
import { RescheduleComponent } from 'src/app/Components/PopUps/reschedule/reschedule.component';

@Component({
  selector: 'app-search-appointment',
  templateUrl: './search-appointment.component.html',
  styleUrls: ['./search-appointment.component.css',"../../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../../css/dataTables.bootstrap4.min.css","../../../../../css/style.css","../../../../../css/bootstrap.min.css"
  ,"../../../../../css/responsive.bootstrap4.min.css","../../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../../css/dataTables.bootstrap4.min.css","../../../../../css/metisMenu.min.css"],
 
})
export class SearchAppointmentComponent implements OnInit {

  todayfrom:any// formatDate(new Date(), 'yyyy-MM-dd', 'en-US'); // dateofbirth;
  todayTo:any
  title="OPD Search"
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
_fromdate:any
doctors:any
_todate:any
_todate2:any
_fromdate2:any
id:string="";
dct?:0
astatus?:0
appointmentstatus:any
paymentcategory:any
loadData:any;
pulldata:any=[]
iscancelled?:false
isvi:boolean=false
  maxDate: { year: number; month: number; day: number; };
  minDate: { year: number; month: number; day: number; };
  constructor(private pop:MatDialog,private dateservice:DateService, private datePipe:DatePipe, private formbuilder:FormBuilder,private himsservice:HimsServiceService,private config: NgbDatepickerConfig,private rout:Router) {
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

    })
   }

   onDateSelectfromdate(event:any) {
    debugger
    let year = event.year;
    let month = event.month <= 9 ? '0' + event.month : event.month;;
    let day = event.day <= 9 ? '0' + event.day : event.day;;
    this._fromdate = day + "-" + month + "-" + year;
    
    this._todate= (<HTMLInputElement>document.getElementById('toDate')).value;
    let t= year + "-" + month + "-" + day;
    if(t>this._todate)
    {
      this.isvi=true
    
    }
    this.todayfrom=this._fromdate
  
   
   }
localDateStringFormat(date:any):string
{
debugger
 let response= this.dateservice.LocalStringDateFormat(date);
 return response;

//   debugger
// let fuldatesplit=date.split('-',3)
//   let year = fuldatesplit[0];
//   let month = fuldatesplit[1];
//   let day =fuldatesplit[2];
//   let dateset  = day + "-" + month + "-" + year;
//   return  dateset

}


GlobalDateStringFormat(date:any):string
{
  let response= this.dateservice.GlobalStringDateFormat(date);
//   debugger
//  let fuldatesplit=date.split('-',3)
//   let year = fuldatesplit[2];
//   let month = fuldatesplit[1];
//   let day =fuldatesplit[0];
//   let dt = year + "-" + month + "-" + day;
  return  response;

}



   
   onDateSelecttodate(event:any) {
    debugger
    let year = event.year;
    let month = event.month <= 9 ? '0' + event.month : event.month;;
    let day = event.day <= 9 ? '0' + event.day : event.day;;
    this._todate2 = day + "-" + month + "-" + year;
    this._fromdate2=(<HTMLInputElement>document.getElementById('fdate')).value;
    let f= year + "-" + month + "-" + day;
    if(f<this._fromdate2)
    {
      this.isvi=true
    
    }
    //(<HTMLInputElement>document.getElementById('toDate')).value=this._todate
    this.todayTo=this._todate2
   }

   resetdates()
   {
    debugger
    this._todate="";
    this._fromdate=""
   }

   
  transformDate(date:any) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
   SearchAppointments(data:any)
   {
    debugger
    this.islload=true
    this.pulldata=data;
    
      //Dates.FromDate=(<HTMLInputElement>document.getElementById('fdate')).value;

      //Dates.ToDate=(<HTMLInputElement>document.getElementById('toDate')).value;
    

    
   
    // if((Dates.ToDate==null || Dates.FromDate==null) ||(Dates.ToDate=="" || Dates.FromDate==""))
    // {
    //   Swal.fire('','From date and To date should not be empty','info')
    //   this.islload=false
    // }
    // else{

    // if(Dates.ToDate<Dates.FromDate)
    // {
    //   Swal.fire('','To date must be greater than From date','info')
    //    this.islload=false
      

    // } else{
      
  
    debugger
   // var a=this.searchform.get('FromDate').value
    debugger   
    data.FromDate=this.GlobalDateStringFormat((<HTMLInputElement>document.getElementById('fdate')).value) ;

    data.ToDate=this.GlobalDateStringFormat((<HTMLInputElement>document.getElementById('toDate')).value);
    this.himsservice.GetAppointments(data).subscribe((result)=>
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

        Swal.fire('','No Patients at this date range','info')
        this.islload=false
        
        this.patientList.forEach((element: number,index: any)=>{
          if(element==2) this.patientList.splice(index,1);
          
    this.islload=false
       });

      
      }
     
    })
   
 

   }

   public CancelAppointment(index: any, SelectedPatient: any )
   {
    debugger
    this.id=SelectedPatient.appointmentId.toString();
   var EncryptedId= Buffer.from(this.id).toString('base64')
   
   this.himsservice.CancelAppointments(EncryptedId).subscribe((result)=>{
    debugger
    let a=result
    this.SearchAppointments(this.pulldata);
   
   })



   }

   

   public EditAppointment(index: any, SelectedPatient: any )
   {
    debugger
     localStorage.setItem('editappointmentId',SelectedPatient.appointmentId)
     this.rout.navigateByUrl('/FrontDesk/Edit-Appointments');
     

   }

reschedule(index:any,row:any)
{
  
  debugger
  const dialogRef=this.pop.open(RescheduleComponent,{
     width:"65%",
     height:"450px",
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

debugger
 

}
  ngOnInit(): void {
    debugger
    
    this.searchform=this.formbuilder.group({
      // FromDate:[this.today],
      // ToDate:[this.today],
      MobileNumber:[null],
      PatientName:[null],
      AppointmentStatusId:['0'],
      
      DoctorId:['']
    });
    localStorage.removeItem('editappointmentId')
this.himsservice.getDoctors().subscribe((result)=>{this.doctors=result})
this.himsservice.GetAppointmentsStatus().subscribe((result)=>{this.appointmentstatus=result})
let dtf=formatDate(new Date(), 'yyyy-MM-dd', 'en-US'); 
this.todayfrom=this.localDateStringFormat(dtf)
this.todayTo=this.localDateStringFormat(dtf)
    localStorage.setItem('header','Search Appointments')
    this.patientList=[]
    debugger
   
    
    (<HTMLInputElement>document.getElementById('fdate')).value=this.todayfrom;
    
    (<HTMLInputElement>document.getElementById('toDate')).value=this.todayTo;
  
  
  
  }

  

}
