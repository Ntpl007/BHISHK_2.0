import { Injectable } from "@angular/core";
import { NgbDateAdapter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {
   readonly DELIMITER = '-';
day:any
   fromModel(value: string | null): NgbDateStruct | null {
       if (value) {
           const date = value.split(this.DELIMITER);
           return {
               day: parseInt(date[0], 10),
               month: parseInt(date[1], 10),
               year: parseInt(date[2], 10),
           };
       }
       return null;
   }

   toModel(date: NgbDateStruct | null): string | null {
    const dayString = date ?date.day.toString().padStart(2, '0'):null
    const monthString = date ?date.month.toString().padStart(2, '0'):null
    const yearString = date ?date.year.toString():null

    return  dayString + this.DELIMITER + monthString + this.DELIMITER + yearString;
}
}