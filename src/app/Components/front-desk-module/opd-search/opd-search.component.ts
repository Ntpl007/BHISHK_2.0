import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';
import { DatePipe, formatDate } from '@angular/common';
import Swal from 'sweetalert2';

//import { FilterPipe } from 'src/app/filter.pipe';
import { NgbAlertModule, NgbDatepickerConfig, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-opd-search',
  templateUrl: './opd-search.component.html',
  styleUrls: ['./opd-search.component.css',"../../../../css/style.css","../../../../css/bootstrap.min.css"
  ,"../../../../css/responsive.bootstrap4.min.css","../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../css/dataTables.bootstrap4.min.css","../../../../css/metisMenu.min.css"]
})
export class OpdSearchComponent implements OnInit {

  today=formatDate(new Date(), 'yyyy-MM-dd', 'en-US'); // dateofbirth;
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
_fromdate1:any
_todate1:any

_fromdate2:any
_todate2:any
isvi:boolean=false
  maxDate: { year: number; month: number; day: number; };
  constructor(private formbuilder:FormBuilder,private himsservice:HimsServiceService,private config: NgbDatepickerConfig) {
    const current = new Date();
    this.maxDate = {
      year: current.getFullYear(),
      month: current.getMonth() +1,
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
    this._fromdate1 = year + "-" + month + "-" + day;
    this._todate1= (<HTMLInputElement>document.getElementById('toDate')).value;
     this.model=this._fromdate1
  
   
   }

   
   onDateSelecttodate(event:any) {
    debugger
    let year = event.year;
    let month = event.month <= 9 ? '0' + event.month : event.month;;
    let day = event.day <= 9 ? '0' + event.day : event.day;;
    this._todate2 = year + "-" + month + "-" + day;
    this._fromdate2=(<HTMLInputElement>document.getElementById('fdate')).value;
    if(this._todate2<this._fromdate2)
    {
      this.isvi=true
      

    }
    this.model2=this._todate2
   }

   resetdates()
   {
    debugger
    this._todate2="";
    this._fromdate1=""
   }
   SearchPatients(Dates:any)
   {
    debugger
    this.islload=true
    
      Dates.FromDate=(<HTMLInputElement>document.getElementById('fdate')).value;

      Dates.ToDate=(<HTMLInputElement>document.getElementById('toDate')).value;
    

    
   
    if((Dates.ToDate==null || Dates.FromDate==null) ||(Dates.ToDate=="" || Dates.FromDate==""))
    {
      Swal.fire('','From date and To date should not be empty','info')
      this.islload=false
    }
    else{

    if(Dates.ToDate<Dates.FromDate)
    {
      Swal.fire('','To date must be greater than From date','info')
       this.islload=false
      

    } else{
      
  
    debugger
   // var a=this.searchform.get('FromDate').value
    debugger
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

        Swal.fire('','No Patients at this date range','info')
        this.islload=false
        
        this.patientList.forEach((element: number,index: any)=>{
          if(element==2) this.patientList.splice(index,1);
       });

      
      }
     
    })
   
  }
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
    
    this.searchform=this.formbuilder.group({
      FromDate:[this.today],
      ToDate:[this.today],
      MobileNumber:[''],
      FirstName:['']
      
    })
  }

  

}
