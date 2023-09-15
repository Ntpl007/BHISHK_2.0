import { Component, ElementRef, HostListener, OnInit, ViewChild, HostBinding } from '@angular/core';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';
import{FormArray, FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgbAlert, NgbDateStruct, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe, formatDate } from '@angular/common';
import { ScheduleTemplate } from 'src/app/Model/ScheduleTemplate';




@Component({
  selector: 'app-schedule-type',
  templateUrl:'./schedule-type.component.html',
  styleUrls: ['./schedule-type.component.css', "../../../../css/dataTables.bootstrap4.min.css","../../../../css/style.css","../../../../css/bootstrap.min.css"
  ,"../../../../css/responsive.bootstrap4.min.css","../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../css/dataTables.bootstrap4.min.css","../../../../css/metisMenu.min.css"]
})
export class ScheduleTypeComponent implements OnInit {
  @ViewChild('StartTime')
  StartTime!: ElementRef;
 
  showModal2: boolean = false;
  @ViewChild('EndTime')
  EndTime!: ElementRef;

showModal3: boolean = false;
ScheduleForm : FormGroup;
stype:any
speciality:any
doctors:any
chargegroup:any
chargeitems:any
isspecialityhide:any=false
isIscheulehide:any=false
isdoctorhide:any=false
ischargegrouphide:any=false
ischargeItemhide:any=false
facilityname:any;
providerName:any;
model?: NgbDateStruct;
model2?: NgbDateStruct;
_fromdate:any;
_todate:any;
isvi:boolean=false;
today=formatDate(new Date(), 'yyyy-MM-dd', 'en-US'); 
scheduleArray: Array<ScheduleTemplate> = [];
newAttribute: any = {};
days: any[]=[];
itemsDelta: any;
time:any =  '10:00:00';
scheduleTemplateData : any = {};
providerId : any;
facilityId : any;
createdby : any;
providerScheduleList:any = [];
p: number = 0;
timeintarval:any;
starttime=""
endtime=""
limittimeslist : any[] = [];
tempScheduleArray: Array<ScheduleTemplate> = [];
editStatus:any = true;
scheduleTemplatePeriodList:any = [];
schedulestarttime : any;
scheduleslotname:any = "New";
// public time = '10:00:00';
// public min = '08:15:30';
// public max = '18:15:30';



  constructor(private service:HimsServiceService, public datepipe: DatePipe) { 
    this.ScheduleForm = new FormGroup({
      ScheduleType : new FormControl(),
      Speciality : new FormControl()
    })
  }




  ChangeTimeSlot(index:any,item:any)
  {
    
    this.starttime = item;
    //this.scheduleArray[index].schedulestarttime=item;
    this.showModal2 = false;
    
  }
  ChangeTimeSlotEndDate(index:any,item:any)
  {
    this.endtime = item;
    this.scheduleArray[index].scheduleendtime=item;
    this.showModal3 = false;
    //console.log(this.scheduleArray);
  }
  getId(data:any)
  {

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


  this.service.GetChargeGroups(Id).subscribe((result)=>{this.chargegroup=result})
}
  public getDoctors(Id:any)
  {
    
    this.service.GetDoctorbyspeciality(Id.target.value).subscribe((result)=>{this.doctors=result})
  }


  public GetChargeItems(Id:any)
  {
   
   let chargegroupid=Id.target.value
    this.service.GetChargeItems(chargegroupid).subscribe((result)=>{this.chargeitems=result})
  }

  // schdule Realted

GetTimeSlotsForTimePicker(date:any,TimeInterval:any)
{
  
  this.service.GetTimeSlotsForTimePicker(date,TimeInterval).subscribe((result)=>{
    
    this.timeintarval=result;
    //this.limittimeslist = result;
    //console.log(this.timeintarval);
  
  })
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
  alldayschecked(index: number, status:boolean)
  {
    for (var i = 0; i < this.days.length; i++) {
      let chkid = <HTMLInputElement>document.getElementById(this.days[i]+ "_" + index);
      chkid.checked = status;
    }
  }
  checkUncheckAll(items :any, index : any) {
    ;
    var gtid = items + "_" + index;
    let chkid = <HTMLInputElement>document.getElementById(gtid);
    var selectedstarttime = <HTMLInputElement>document.getElementById( "txtStartTime_" + index);
    var selectedendtime = <HTMLInputElement>document.getElementById( "txtEndTime_" + index);
    var selecteddayid = -1;
    var regex = new RegExp(':', 'g');

    //Rearrange the block of code
    

    //this.addselecteddayids(index);
    // var splitselectedstarttime = selectedstarttime.value.split(":",2);
    // var splitselectedendtime = selectedendtime.value.split(":",2);
    
    if(items == "All")
    {
      selecteddayid = 7;
    }
    else if(items == "Sun")
    {
      selecteddayid = 0;
    }
    else if(items == "Mon")
    {
      selecteddayid = 1;
    }
    else if(items == "Tue")
    {
      selecteddayid = 2;
    }
    else if(items == "Wed")
    {
      selecteddayid = 3;
    }
    else if(items == "Thu")
    {
      selecteddayid = 4;
    }
    else if(items == "Fri")
    {
      selecteddayid = 5;
    }
    else if(items == "Sat")
    {
      selecteddayid = 6
    }

    if(parseInt(selectedstarttime.value.replace(regex, ''), 10) >= parseInt(selectedendtime.value.replace(regex, ''), 10))
    {
      Swal.fire('','start time should be less then end time!');
      chkid.checked = false;
      this.alldayschecked(index, false);
    }
    else if(items == "All")
    {
      if(chkid.checked ){
        var breakvalueall:number = 0;
        if(this.scheduleArray.length != 1)
        {
          for(var j = 0 ; j < this.scheduleArray.length; j++)
            {
              if( breakvalueall == 0  && ((this.scheduleArray.length-1) != j))
              {
                var prevstarttime = this.scheduleArray[j].schedulestarttime;
                var prevendtime = this.scheduleArray[j].scheduleendtime;
                //var prevdayid = parseInt(this.scheduleArray[j].daysids);
                var regex = new RegExp(':', 'g');

                if(prevstarttime == selectedstarttime.value && prevendtime == selectedendtime.value)
                {
                  // Swal.fire('','Already selected this slot');
                  // chkid.checked = false;
                  // this.alldayschecked(index, false);
                  breakvalueall = 1;
                  //break;
                }
                else if ((parseInt(selectedstarttime.value.replace(regex, ''), 10) >= parseInt(prevstarttime.replace(regex, ''), 10)) 
                && (parseInt(selectedstarttime.value.replace(regex, ''), 10) <= parseInt(prevendtime.replace(regex, ''), 10)) 
                ) {
                  // Swal.fire('','Already selected this slot');
                  // chkid.checked = false;
                  // this.alldayschecked(index, false);
                  breakvalueall = 1;
                  //break;
                }
                else if ((parseInt(selectedendtime.value.replace(regex, ''), 10) >= parseInt(prevstarttime.replace(regex, ''), 10)) 
                && (parseInt(selectedendtime.value.replace(regex, ''), 10) <= parseInt(prevendtime.replace(regex, ''), 10)) 
                ) {
                  breakvalueall = 1;
                  //break;
                }
                else
                {
                  this.alldayschecked(index, true);
                  //breakvalueall = 1;
                  //break;
                  //break;
                }
              }
              if(breakvalueall == 1)
              {
                Swal.fire('','Already selected this slot');
                this.alldayschecked(index, false);
              }
              
            }
        }
        else{
          this.alldayschecked(index, true);
        }
      }
      else{
        //this.scheduleArray[index].daysids = "";
        this.alldayschecked(index, false);
      }
    }
    else
    {
      if(chkid.checked)
      {
        var i:number = 0;
        var ri:number = this.scheduleArray.length;
        var breakvalue:number = 0;
          if(this.scheduleArray.length != 1)
          {
            
            for(i ; i < this.scheduleArray.length; i++)
            {
              if( breakvalue == 0 )
              {
                var prevstarttime = this.scheduleArray[i].schedulestarttime;
                var prevendtime = this.scheduleArray[i].scheduleendtime;
                var regex = new RegExp(':', 'g');
                var prevdaysids = this.scheduleArray[i].daysids.slice(0, -1);
                const Arrayprevdaysids = prevdaysids.split(",");
                for(var k =0; k < Arrayprevdaysids.length; k++)
                {
                  var prevdayid = parseInt(Arrayprevdaysids[k]);
                  if(prevstarttime == selectedstarttime.value && prevendtime == selectedendtime.value &&
                    prevdayid == selecteddayid)
                  {
                    // Swal.fire('','Already selected this slot');
                    // chkid.checked = false;
                    breakvalue = 1;
                    //break;
                  }
                  else if(prevdayid == 7 && prevstarttime == selectedstarttime.value && prevendtime == selectedendtime.value )
                  {
                    // Swal.fire('','Already selected this slot');
                    // chkid.checked = false;
                    breakvalue = 1;
                    //break;  
                  }
                  else if ((parseInt(selectedstarttime.value.replace(regex, ''), 10) >= parseInt(prevstarttime.replace(regex, ''), 10)) 
                  && (parseInt(selectedstarttime.value.replace(regex, ''), 10) <= parseInt(prevendtime.replace(regex, ''), 10)) 
                  && (prevdayid == selecteddayid || prevdayid == 7)) {
                    // Swal.fire('','Already selected this slot');
                    // chkid.checked = false;
                    breakvalue = 1;
                    //break;
                  }
                  else if ((parseInt(selectedendtime.value.replace(regex, ''), 10) >= parseInt(prevstarttime.replace(regex, ''), 10)) 
                  && (parseInt(selectedendtime.value.replace(regex, ''), 10) <= parseInt(prevendtime.replace(regex, ''), 10)) 
                  && ((prevdayid == selecteddayid || prevdayid == 7))) {
                    // Swal.fire('','Already selected this slot');
                    // chkid.checked = false;
                    breakvalue = 1;
                    //break;
                  }
                  else
                  {
                    chkid.checked = true;
                  }
                }
              }
            }

            // Reverse Checking
            
            for(ri ; ri < this.scheduleArray.length; ri--)
            {
              if(breakvalue = 0)
              {
                var prevstarttime = this.scheduleArray[ri].schedulestarttime;
                var prevendtime = this.scheduleArray[ri].scheduleendtime;
                var regex = new RegExp(':', 'g');
                var prevdaysids = this.scheduleArray[ri].daysids.slice(0, -1);
                const Arrayprevdaysids = prevdaysids.split(",");
                for(var k =0; k < Arrayprevdaysids.length; k++)
                {
                  var prevdayid = parseInt(Arrayprevdaysids[k]);

                  if(prevstarttime == selectedstarttime.value && prevendtime == selectedendtime.value &&
                    prevdayid == selecteddayid)
                  {
                    // Swal.fire('','Already selected this slot');
                    // chkid.checked = false;
                    breakvalue = 1;
                    //break;
                  }
                  else if(prevdayid == 7 && prevstarttime == selectedstarttime.value && prevendtime == selectedendtime.value )
                  {
                    // Swal.fire('','Already selected this slot');
                    // chkid.checked = false;
                    breakvalue = 1;
                    //break;  
                  }
                  else if ((parseInt(selectedstarttime.value.replace(regex, ''), 10) >= parseInt(prevstarttime.replace(regex, ''), 10)) 
                  && (parseInt(selectedstarttime.value.replace(regex, ''), 10) <= parseInt(prevendtime.replace(regex, ''), 10)) 
                  && (prevdayid == selecteddayid || prevdayid == 7)) {
                    // Swal.fire('','Already selected this slot');
                    // chkid.checked = false;
                    breakvalue = 1;
                    //break;
                  }
                  else if ((parseInt(selectedendtime.value.replace(regex, ''), 10) >= parseInt(prevstarttime.replace(regex, ''), 10)) 
                  && (parseInt(selectedendtime.value.replace(regex, ''), 10) <= parseInt(prevendtime.replace(regex, ''), 10)) 
                  && ((prevdayid == selecteddayid || prevdayid == 7))) {
                    // Swal.fire('','Already selected this slot');
                    // chkid.checked = false;
                    breakvalue = 1;
                    //break;
                  }

                }
              }
            }

            if(breakvalue == 1)
              {
                Swal.fire('','Already selected this slot');
                chkid.checked = false;
              }
          }
          else
          {
            chkid.checked = true;
          }
        
      }
      else
      {
        //this.scheduleArray[index].daysids = "";
        chkid.checked = false;
      } 
    }
  }

  deleterow(row: any){
    if(this.scheduleArray.length > 1){
      this.scheduleArray.splice(row, 1);
      this.scheduleArray[row].daysids = "";
      this.alldayschecked(row, false);
    }
    //console.log(this.scheduleArray);
  }

  getScheduleTemplatePerioddataset(scheduleTemplateId : any)
  {
    this.scheduleTemplatePeriodList = [];
    this.scheduleArray =[];
    this.service.GetScheduleTemplatePeriodData(scheduleTemplateId).subscribe((result)=>{
      this.scheduleTemplatePeriodList=result;
      console.log(this.scheduleTemplatePeriodList);
      if(this.scheduleTemplatePeriodList != null && this.scheduleTemplatePeriodList.length > 0)
      {
        
        for(var l = 0; l < this.scheduleTemplatePeriodList.length; l++)
        {
          
          this.newAttribute = {schedulestarttime: "", ScheduleEndTime: ""}; 
          this.scheduleArray.push(this.newAttribute);
        }
        //this.adddata();
        this.GettingData();
      }
      else{
        this.newAttribute = {schedulestarttime: "", ScheduleEndTime: ""}; 
        this.scheduleArray.push(this.newAttribute);
      }
    })
  }

  removerow(row: any){
    debugger
    if(this.scheduleTemplatePeriodList.length > 0){
     var scheduleTemplatePeriodId = this.scheduleTemplatePeriodList[row].scheduleTemplatePeriodId;
     var scheduleTemplateId = this.scheduleTemplatePeriodList[row].scheduleTemplateId;
     this.service.RemoveScheduleTemplatePeriodDataByUsingScheduleTemplatePeriodId(scheduleTemplatePeriodId).subscribe((result)=>{
     
      let a=result;
      console.log("resultt" + a);
      if(a!=0)
      {
        this.getScheduleTemplatePerioddataset(scheduleTemplateId);
      }
     })

    }
  }

  blockrow(row: any)
  {
    if(this.scheduleTemplatePeriodList.length > 0){
      var scheduleTemplatePeriodId = this.scheduleTemplatePeriodList[row].scheduleTemplatePeriodId;
      var scheduleTemplateId = this.scheduleTemplatePeriodList[row].scheduleTemplateId;
      this.service.BlockScheduleTemplatePeriod(scheduleTemplatePeriodId).subscribe((result)=>{
     
        let a=result;
        console.log("resultt" + a);
        if(a!=0)
        {
          this.getScheduleTemplatePerioddataset(scheduleTemplateId);
        }
       })

    }

  }

  Unblockrow(row: any)
  {
    if(this.scheduleTemplatePeriodList.length > 0){
      var scheduleTemplatePeriodId = this.scheduleTemplatePeriodList[row].scheduleTemplatePeriodId;
      var scheduleTemplateId = this.scheduleTemplatePeriodList[row].scheduleTemplateId;
      this.service.UnBlockScheduleTemplatePeriod(scheduleTemplatePeriodId).subscribe((result)=>{
     
        let a=result;
        console.log("resultt" + a);
        if(a!=0)
        {
          this.getScheduleTemplatePerioddataset(scheduleTemplateId);
        }
       })

    }

  }
  EditTemplate(ScheduleTemplateId: any, row: any)
  {
    this.scheduleArray = [];
    this.editStatus = false;
    var backOfferButton =  (<HTMLSelectElement>document.getElementById('btnEditTemplate_'+ row));
   
    this.service.GetScheduleTemplatePeriodData(ScheduleTemplateId).subscribe((result)=>{
      this.scheduleTemplatePeriodList=result;
      console.log(this.scheduleTemplatePeriodList);
      //this.scheduleArray = result;
    })
    if(this.scheduleTemplatePeriodList != null && this.scheduleTemplatePeriodList.length > 0)
    {
      backOfferButton.setAttribute('data-toggle', 'modal');
      backOfferButton.setAttribute('data-target', '#exampleModalLong');
      for(var l = 0; l < this.scheduleTemplatePeriodList.length; l++)
      {
        
        this.newAttribute = {schedulestarttime: "", ScheduleEndTime: ""}; 
        this.scheduleArray.push(this.newAttribute);
      }
      //this.adddata();
      this.GettingData();
    }
    
  }

 public  GettingData(){
    setTimeout(() => {
        this.adddata();
    }, 1000);
}

  adddata()
  {
    debugger;
    for(var k = 0; k < this.scheduleTemplatePeriodList.length; k++)
      {
        this.facilityname = this.scheduleTemplatePeriodList[k].facilityName;
        this.providerName = this.scheduleTemplatePeriodList[k].providerName;
        let scheduleInterval = (<HTMLInputElement>document.getElementById('ddlScheduleInterval'));
        scheduleInterval.value =  this.scheduleTemplatePeriodList[k].scheduleIntravel;
        let templateName = (<HTMLInputElement>document.getElementById('txtTemplateName'));
        templateName.value = this.scheduleTemplatePeriodList[k].sceheduleTemplateName;
        let effctivedatedate = (<HTMLInputElement>document.getElementById('fdate')); 
        effctivedatedate.value = this.scheduleTemplatePeriodList[k].scheduleTemplateEffectiveDate.split("T",2)[0];
        let  schedulevalidupto = (<HTMLInputElement>document.getElementById('toDate')); 
        schedulevalidupto.value = this.scheduleTemplatePeriodList[k].scheduleTemplateExpirationDate.split("T",2)[0];
        for (var j = 0; j < this.days.length; j++) {
          //v ar gtid = items + "_" + i;
          let chkid = <HTMLInputElement>document.getElementById(this.days[j] + "_" + k);
          if(this.scheduleTemplatePeriodList[k].isSunday && this.scheduleTemplatePeriodList[k].isMonday
            && this.scheduleTemplatePeriodList[k].isTuesday && this.scheduleTemplatePeriodList[k].isWednesday
            && this.scheduleTemplatePeriodList[k].isThursday && this.scheduleTemplatePeriodList[k].isFriday
            &&this.scheduleTemplatePeriodList[k].isSaturday)
          {
            chkid.checked = true;
          }
          else
          {
            if(this.scheduleTemplatePeriodList[k].isSunday && this.days[j] == "Sun")
            {
              chkid.checked = true;
            }
            else if(this.scheduleTemplatePeriodList[k].isMonday && this.days[j] == "Mon")
            {
              chkid.checked = true;
            }
            else if(this.scheduleTemplatePeriodList[k].isTuesday && this.days[j] == "Tue")
            {
              chkid.checked = true;
            }
            else if(this.scheduleTemplatePeriodList[k].isWednesday && this.days[j] == "Wed")
            {
              chkid.checked = true;
            }
            else if(this.scheduleTemplatePeriodList[k].isThursday && this.days[j] == "Thu")
            {
              chkid.checked = true;
            }
            else if(this.scheduleTemplatePeriodList[k].isFriday && this.days[j] == "Fri")
            {
              chkid.checked = true;
            }
            else if(this.scheduleTemplatePeriodList[k].isSaturday && this.days[j] == "Sat")
            {
              chkid.checked = true;
            }

          }

          
         
        }
        // var gtid = items + "_" + index;
        // let chkid = <HTMLInputElement>document.getElementById(gtid);
         let selectedstarttime = <HTMLInputElement>document.getElementById( "txtStartTime_" + k);
         selectedstarttime.value = this.scheduleTemplatePeriodList[k].periodStart.split("T", 2)[1];
         let selectedendtime = <HTMLInputElement>document.getElementById( "txtEndTime_" + k);
         selectedendtime.value = this.scheduleTemplatePeriodList[k].periodEnd.split("T", 2)[1];
         let deletelink = <HTMLInputElement>document.getElementById( "iDelete_" + k);
         deletelink.style.display = "none";
         let removelink = <HTMLInputElement>document.getElementById( "iRemove_" + k);
         let blocklink = <HTMLInputElement>document.getElementById( "iBlock_" + k);
         let unblocklink = <HTMLInputElement>document.getElementById( "iUnBlock_" + k);
         //let slotschedulestatus = <HTMLInputElement>document.getElementById( "lblslotschedulestatus_" + k);
         if(this.scheduleTemplatePeriodList[k].scheduleslotstatusid == 1)
         {
            removelink.style.display = "";
            blocklink.style.display = "";
            unblocklink.style.display = "none";
            this.scheduleslotname = "Running";
            //slotschedulestatus.value = "Running";
         }
         else if(this.scheduleTemplatePeriodList[k].scheduleslotstatusid == 3)
         {
            removelink.style.display = "";
            blocklink.style.display = "none";
            unblocklink.style.display = "";
            this.scheduleslotname = "Blocked";
            //slotschedulestatus.value = "Blocked";

         }
      }
  }

  addselecteddayids(i:number){
    this.scheduleArray[i].daysids = "";
      for (var j = 0; j < this.days.length; j++) {
        //var gtid = items + "_" + i;
        let chkid = <HTMLInputElement>document.getElementById(this.days[j] + "_" + i);
        if(chkid != null && chkid.checked)
        {
          if(this.days[j] == "All")
          {
            this.scheduleArray[i].daysids = "7,";
            break;
          }
          else
          {
            if(this.days[j] == "Sun")
            {
              this.scheduleArray[i].daysids = "0," ;
            }
            else if(this.days[j] == "Mon")
            {
              this.scheduleArray[i].daysids = this.scheduleArray[i].daysids + "1,";
            }
            else if(this.days[j] == "Tue")
            {
              this.scheduleArray[i].daysids = this.scheduleArray[i].daysids + "2,";
            }
            else if(this.days[j] == "Wed")
            {
              this.scheduleArray[i].daysids = this.scheduleArray[i].daysids + "3,";
            }
            else if(this.days[j] == "Thu")
            {
              this.scheduleArray[i].daysids = this.scheduleArray[i].daysids + "4,";
            }
            else if(this.days[j] == "Fri")
            {
              this.scheduleArray[i].daysids = this.scheduleArray[i].daysids + "5,";
            }
            else if(this.days[j] == "Sat")
            {
              this.scheduleArray[i].daysids = this.scheduleArray[i].daysids + "6,";
            }
          }
          
        }
        //let chkid = <HTMLInputElement>document.getElementById(gtid);
      }      
  }

  public addTableCell() {
    
    this.newAttribute = {ScheduleStartTime: "", ScheduleEndTime: ""}; 
    this.scheduleArray.push(this.newAttribute);
  
    this.addDayids();
    // console.log(this.scheduleArray);
    
  }

  public addDayids()
  {
    var i:number = 0;
    var j:number = 0;
    for(i ; i < this.scheduleArray.length; i++)
    {
      this.scheduleArray[i].daysids = "";
      for (var j = 0; j < this.days.length; j++) {
        //var gtid = items + "_" + i;
        let chkid = <HTMLInputElement>document.getElementById(this.days[j] + "_" + i);
        if(chkid != null && chkid.checked)
        {
          if(this.days[j] == "All")
          {
            this.scheduleArray[i].daysids = "7,";
            break;
          }
          else
          {
            if(this.days[j] == "Sun")
            {
              this.scheduleArray[i].daysids = "0," ;
            }
            else if(this.days[j] == "Mon")
            {
              this.scheduleArray[i].daysids = this.scheduleArray[i].daysids + "1,";
            }
            else if(this.days[j] == "Tue")
            {
              this.scheduleArray[i].daysids = this.scheduleArray[i].daysids + "2,";
            }
            else if(this.days[j] == "Wed")
            {
              this.scheduleArray[i].daysids = this.scheduleArray[i].daysids + "3,";
            }
            else if(this.days[j] == "Thu")
            {
              this.scheduleArray[i].daysids = this.scheduleArray[i].daysids + "4,";
            }
            else if(this.days[j] == "Fri")
            {
              this.scheduleArray[i].daysids = this.scheduleArray[i].daysids + "5,";
            }
            else if(this.days[j] == "Sat")
            {
              this.scheduleArray[i].daysids = this.scheduleArray[i].daysids + "6,";
            }
          }
          
        }
        //let chkid = <HTMLInputElement>document.getElementById(gtid);
      }  
    }

  }

public onDateSelecttodate(event:any) {
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

public onDateSelectfromdate(event:any) {    
    let year = event.year;
    let month = event.month <= 9 ? '0' + event.month : event.month;;
    let day = event.day <= 9 ? '0' + event.day : event.day;;
    this._fromdate = year + "-" + month + "-" + day;
    this._todate= (<HTMLInputElement>document.getElementById('toDate')).value;
    //this.model=this.maxDate;
   }

  OpenSchedulePopup()
  {
    this.scheduleslotname = "New";
     var exampleModalLong = (<HTMLSelectElement>document.getElementById('exampleModalLong'));
        console.log(exampleModalLong);    
    this.editStatus = true;
    // this.newAttribute = {ScheduleStartTime: "", ScheduleEndTime: ""};  
    // this.scheduleArray.push(this.newAttribute);  
    if((<HTMLSelectElement>document.getElementById('ddlScheduleType')).value == "0")
    {
      Swal.fire('','please select ScheduleType');    
    }
    else if((<HTMLSelectElement>document.getElementById('ddlSpecialityId')).value == "0")
    {
      Swal.fire('','please select Speciality');
    }
    else if((<HTMLSelectElement>document.getElementById('ddlDoctor')).value == "0")
    {
      Swal.fire('','please select Doctor');
    }
    else
    {
      var backOfferButton =  (<HTMLSelectElement>document.getElementById('btnAddSchedule'));

      backOfferButton.setAttribute('data-toggle', 'modal');
      backOfferButton.setAttribute('data-target', '#exampleModalLong');
      if((<HTMLSelectElement>document.getElementById('ddlDoctor')) != null)
      {
        var splitdd = (<HTMLSelectElement>document.getElementById('ddlDoctor')).value.split("+",2);
        this.providerName = splitdd[1];
        this.providerId = splitdd[0];
        this.facilityId =localStorage.getItem('facilityId');
      }
      this.facilityname=localStorage.getItem('facility');
    } 
  }

  SaveScheduleTemplate()
  {
    
    var effctivedatedata = (<HTMLInputElement>document.getElementById('fdate'));
    var schedulevaliduptodata = (<HTMLInputElement>document.getElementById('toDate'));
    var templateName = (<HTMLInputElement>document.getElementById('txtTemplateName'));
    var scheduleInterval = (<HTMLInputElement>document.getElementById('ddlScheduleInterval'));
    // var providernamevalue = (<HTMLInputElement>document.getElementById('lblProviderName'));
    // var facilitynamevalue = (<HTMLInputElement>document.getElementById('lblFacilityName'));

    
    if(templateName.value == "")
    {
      Swal.fire('','please select Template');
    }
    else if(scheduleInterval.value == "0")
    {
      Swal.fire('','please select Interval');
    }
    else if(effctivedatedata.value == "")
    {
     Swal.fire('','please select effictivedate');
    }
    else if(schedulevaliduptodata.value == "")
    {
     Swal.fire('','please select validupto');
    }
    else
    {
       var scheduleTemplateTable = (<HTMLInputElement>document.getElementById('tablerow'));
       var i:number = 0;
       var j:number = 0;
       var rowscount:number = 0;
       rowscount = this.scheduleArray.length;
       for(i ; i < rowscount; i++)
       {
        //this.days = ["All","Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
         let starttime_data = (<HTMLInputElement>document.getElementById('txtStartTime_'+i));
         let endtime_data = (<HTMLInputElement>document.getElementById('txtEndTime_'+i));
         let chkall = (<HTMLInputElement>document.getElementById('All_'+i));
         let chksun = (<HTMLInputElement>document.getElementById('Sun_'+i));
         let chkmon = (<HTMLInputElement>document.getElementById('Mon_'+i));
         let chktue = (<HTMLInputElement>document.getElementById('Tue_'+i));
         let chkwed = (<HTMLInputElement>document.getElementById('Wed_'+i));
         let chkthu = (<HTMLInputElement>document.getElementById('Thu_'+i));
         let chkfri = (<HTMLInputElement>document.getElementById('Fri_'+i));
         let chksat = (<HTMLInputElement>document.getElementById('Sat_'+i));
         let chkcount = 0;
         
        
         if(starttime_data.value == "")
         {
           Swal.fire('','please select starttime');
         }
         else if(endtime_data.value == "")
         {
           Swal.fire('','please select endtime');
         }
         else
         {
          if(chkall.checked)
          {
            chkcount = 1;
            this.scheduleArray[i].dayid = 7;
          }
          else if(chksun.checked)
          {
            chkcount =1;
            this.scheduleArray[i].dayid = 0;
          }
          else if(chkmon.checked)
          {
            chkcount =1;
            this.scheduleArray[i].dayid = 1;
          }
          else if(chktue.checked)
          {
            chkcount=1;
            this.scheduleArray[i].dayid = 2;
          }
          else if(chkwed.checked)
          {
            chkcount=1;
            this.scheduleArray[i].dayid = 3;
          }
          else if(chkthu.checked)
          {
            chkcount=1;
            this.scheduleArray[i].dayid = 4;
          }
          else if(chkfri.checked)
          {
            chkcount=1;
            this.scheduleArray[i].dayid = 5;
          }
          else if(chksat.checked)
          {
            chkcount=1;
            this.scheduleArray[i].dayid = 6;
          }
        
          if(chkcount == 0)
          {
            Swal.fire('','please check atleast one check box');
          }
          else
          {
              this.createdby = localStorage.getItem('name');
              this.scheduleArray[i].effictivedate = effctivedatedata.value;
              this.scheduleArray[i].schedulevaliduptodate = schedulevaliduptodata.value;
              this.scheduleArray[i].facilityId = this.facilityId;
              this.scheduleArray[i].providerId = this.providerId;
              this.scheduleArray[i].interval = scheduleInterval.value;
              this.scheduleArray[i].templateName = templateName.value;
              this.scheduleArray[i].createdby = this.createdby ;
             
          }
        
         }
       }
       if(this.scheduleArray.length != 0)
       {
          let chkarry = 0;
          var i:number = 0;
          for(i ; i < this.scheduleArray.length; i++)
          {
            if(this.scheduleArray[i].facilityId == null)
            {
              chkarry = 1 ;
            }
          }
          if(chkarry != 1)
          {   
            this.addDayids();
          
            this.service.SaveAppointmentSchedule(this.scheduleArray).subscribe((result)=>{
              if(result!=null)
              {
                Swal.fire('','schedule created !');
                this.ResetModel();
                // this.response=result
                // localStorage.setItem('txnIdForcheckmobile',this.response.txnId)
                // this.router.navigateByUrl('/FrontDesk/ABDM/Check-And-Generate-Mobile-otp')
              }
            })
          }
        
       }
       
    }
   // console.log(this.scheduleArray);
  }

  UpdateScheduleTemplate()
  {

  }

  public searchData()
  {
    this.getproviderScheduleTemplateData();
  }

  public getproviderScheduleTemplateData()
  {
    var splitdd = (<HTMLSelectElement>document.getElementById('ddlDoctor')).value.split("+",2);
    this.service.GetProviderScheduleTeamplateData(splitdd[0]).subscribe((result)=>{
      
      this.providerScheduleList=result;
    })
  }

  public ResetModel()
  {
    var effctivedatedata = (<HTMLInputElement>document.getElementById('fdate'));
    var schedulevaliduptodata = (<HTMLInputElement>document.getElementById('toDate'));
    var templateName = (<HTMLInputElement>document.getElementById('txtTemplateName'));
    var scheduleInterval = (<HTMLInputElement>document.getElementById('ddlScheduleInterval'));

    effctivedatedata.value = "";
    schedulevaliduptodata.value = "";
    templateName.value = "";
    scheduleInterval.value = "0";
    for(var i = 0; i < this.scheduleArray.length; i++)
    {
      let starttime_data = (<HTMLInputElement>document.getElementById('txtStartTime_'+i));
      let endtime_data = (<HTMLInputElement>document.getElementById('txtEndTime_'+i));
      starttime_data.value = "";
      endtime_data.value = "";
    }
    this.scheduleArray = [];
    this.tempScheduleArray = [];
    this.newAttribute = {ScheduleStartTime: "", ScheduleEndTime: ""};  
    this.scheduleArray.push(this.newAttribute);
    //this.tempScheduleArray = [];  
  }

  public closeModel()
  {
    this.ResetModel();
    this.getproviderScheduleTemplateData();
  }

  public FillTimes()
  {
    
    //var quarterHours: any = {};
    var quarterHours:string[] = ["00", "15", "30", "45"];
    //var Templimittimeslist : any[] = [];

    for (var i = 0; i < 24; i++) {
      for (var j = 0; j < 4; j++) {
          var time = i + ":" + quarterHours[j];
          if (i < 10) {
              time = "0" + time;
          }
          this.limittimeslist.push(time);
      }
    }
    //console.log(this.limittimeslist);
  }


ngOnInit(): void {

  this.newAttribute = {ScheduleStartTime: "", ScheduleEndTime: ""};  
  this.scheduleArray.push(this.newAttribute);  
  this.days = ["All","Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  //this.limittimeslist = ["00:15", "00:30", "00:45","00:15", "00:30", "00:45","00:15", "00:30", "00:45","00:15", "00:30", "00:45"];
  this.service.GetSchedulartypes().subscribe((result)=>{this.stype=result})
  this.service.getSpeciality().subscribe((result)=>{this.speciality=result})
  let today=new Date();
  let _date=formatDate(today,'dd-MM-yyyy','en-Us');
  //this.AppdateModel=_date;
  //this.GetTimeSlotsForTimePicker(_date,15);
  this.FillTimes();
  }
  
  

}
