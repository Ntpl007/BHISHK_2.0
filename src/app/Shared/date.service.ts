import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  public LocalStringDateFormat(date:any)
  {
    debugger
    let fuldatesplit=date.split('-',3)
      let year = fuldatesplit[0];
      let month = fuldatesplit[1];
      let day =fuldatesplit[2];
      let requiredDate  = day + "-" + month + "-" + year;
      return  requiredDate

  }
  public GlobalStringDateFormat(date:any)
  {
    
  debugger
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


}
