import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';
import { DatePipe, formatDate } from '@angular/common';
import Swal from 'sweetalert2';

//import { FilterPipe } from 'src/app/filter.pipe';
import { NgbAlertModule, NgbDatepickerConfig, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css',"../../../../css/style.css","../../../../css/bootstrap.min.css"
  ,"../../../../css/responsive.bootstrap4.min.css","../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../css/dataTables.bootstrap4.min.css","../../../../css/metisMenu.min.css"]
})
export class UserListComponent implements OnInit {

  today=formatDate(new Date(), 'yyyy-MM-dd', 'en-US'); // dateofbirth;
  title="OPD Search"
  model?: NgbDateStruct;
  model2?: NgbDateStruct;
searchform:any
ob:any
islload:boolean=false
userlist:any
patientList:any
frmdate=new Date
tDate=new Date
rowscount:any=0
p: number = 0;
searchText = '';
_fromdate:any
_todate:any
isvi:boolean=false
  maxDate: { year: number; month: number; day: number; };
  constructor(private formbuilder:FormBuilder,private himsservice:HimsServiceService,private config: NgbDatepickerConfig) {
    const current = new Date();
    this.maxDate = {
      year: current.getFullYear(),
      month: current.getMonth() +1,
      day: current.getDate()
    };
    
    this.model=this.maxDate
    this.model2=this.maxDate
    this.searchform=formbuilder.group({

    })
   }

   onDateSelectfromdate(event:any) {
    debugger
    
    let year = event.year;
    let month = event.month <= 9 ? '0' + event.month : event.month;;
    let day = event.day <= 9 ? '0' + event.day : event.day;;
    this._fromdate = year + "-" + month + "-" + day;
    this._todate= (<HTMLInputElement>document.getElementById('toDate')).value;
  this.model=this.maxDate
  
   
   }

   
   onDateSelecttodate(event:any) {
    debugger
    let year = event.year;
    let month = event.month <= 9 ? '0' + event.month : event.month;;
    let day = event.day <= 9 ? '0' + event.day : event.day;;
    this._todate = year + "-" + month + "-" + day;
    this._fromdate=(<HTMLInputElement>document.getElementById('fdate')).value;
    if(this._todate<this._fromdate)
    {
      this.isvi=true
      

    }
   }

   resetdates()
   {
    debugger
    this._todate="";
    this._fromdate=""
   }

   

   
  ngOnInit(): void {
    debugger
    let organizationName=localStorage.getItem('organization')
   this.himsservice.GetUsers(organizationName).subscribe((result)=>{
    debugger
    this.userlist=result})
    localStorage.setItem('header','User List')
    this.patientList=[]
    this.searchform=this.formbuilder.group({
      FromDate:[this.today],
      ToDate:[this.today],
      MobileNumber:[''],
      FirstName:['']
      
    })
  }

  

}
