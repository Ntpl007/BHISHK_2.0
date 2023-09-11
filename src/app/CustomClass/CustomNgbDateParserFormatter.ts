import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomNgbDateAdapter extends NgbDateAdapter<string> {
  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      const parts = value.trim().split('-');
      if (parts.length === 3) {
        return {
          year: +parts[2],
          month: +parts[1],
          day: +parts[0],
        };
      }
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? `${this.pad(date.day)}-${this.pad(date.month)}-${date.year}` : null;
  }

  private pad(n: number): string {
    return n < 10 ? `0${n}` : `${n}`;
  }
}
