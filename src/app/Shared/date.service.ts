import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  time_15min:any;
  constructor(private datePipe:DatePipe) { }

  public LocalStringDateFormat(date:any)
  {
  
    let fuldatesplit=date.split('-',3)
      let year = fuldatesplit[0];
      let month = fuldatesplit[1];
      let day =fuldatesplit[2];
      let requiredDate  = day + "-" + month + "-" + year;
      return  requiredDate

  }
  public GlobalStringDateFormat(date:any)
  {
    
  
  let fuldatesplit=date.split('-',3)
    let year = fuldatesplit[2];
    let month = fuldatesplit[1];
    let day =fuldatesplit[0];
    let requiredDate = year + "-" + month + "-" + day;
    return  requiredDate;
    
  }

  public DateSelectedEvent(event:any)
  {
    let year = event.year;
    let month = event.month <= 9 ? '0' + event.month : event.month;;
    let day = event.day <= 9 ? '0' + event.day : event.day;;
    let required = day + "-" + month + "-" + year;
    return required;
  }

  public get15MinTime()
  {
  this.time_15min=  [
      "12:00 AM",
      "12:15 AM",
      "12:30 AM",
      "12:45 AM",
      "01:00 AM",
      "01:15 AM",
      "01:30 AM",
      "01:45 AM",
      "02:00 AM",
      "02:15 AM",
      "02:30 AM",
      "02:45 AM",
      "03:00 AM",
      "03:15 AM",
      "03:30 AM",
      "03:45 AM",
      "04:00 AM",
      "04:15 AM",
      "04:30 AM",
      "04:45 AM",
      "05:00 AM",
      "05:15 AM",
      "05:30 AM",
      "05:45 AM",
      "06:00 AM",
      "06:15 AM",
      "06:30 AM",
      "06:45 AM",
      "07:00 AM",
      "07:15 AM",
      "07:30 AM",
      "07:45 AM",
      "08:00 AM",
      "08:15 AM",
      "08:30 AM",
      "08:45 AM",
      "09:00 AM",
      "09:15 AM",
      "09:30 AM",
      "09:45 AM",
      "10:00 AM",
      "10:15 AM",
      "10:30 AM",
      "10:45 AM",
      "11:00 AM",
      "11:15 AM",
      "11:30 AM",
      "11:45 AM",
      "12:00 PM",
  "12:15 PM",
  "12:30 PM",
  "12:45 PM",
  "01:00 PM",
  "01:15 PM",
  "01:30 PM",
  "01:45 PM",
  "02:00 PM",
  "02:15 PM",
  "02:30 PM",
  "02:45 PM",
  "03:00 PM",
  "03:15 PM",
  "03:30 PM",
  "03:45 PM",
  "04:00 PM",
  "04:15 PM",
  "04:30 PM",
  "04:45 PM",
  "05:00 PM",
  "05:15 PM",
  "05:30 PM",
  "05:45 PM",
  "06:00 PM",
  "06:15 PM",
  "06:30 PM",
  "06:45 PM",
  "07:00 PM",
  "07:15 PM",
  "07:30 PM",
  "07:45 PM",
  "08:00 PM",
  "08:15 PM",
  "08:30 PM",
  "08:45 PM",
  "09:00 PM",
  "09:15 PM",
  "09:30 PM",
  "09:45 PM",
  "10:00 PM",
  "10:15 PM",
  "10:30 PM",
  "10:45 PM",
  "11:00 PM",
  "11:15 PM",
  "11:30 PM",
  "11:45 PM"
    ]

  }

  
  formatNgbDateToString(date: NgbDate): string|null {
    if (date) {
      // Convert NgbDate to JavaScript Date
      const jsDate = new Date(date.year, date.month - 1, date.day);

      // Format the JavaScript Date using DatePipe
      return this.datePipe.transform(jsDate, 'dd-MM-yyyy');
    }
    return '';
  }


}
