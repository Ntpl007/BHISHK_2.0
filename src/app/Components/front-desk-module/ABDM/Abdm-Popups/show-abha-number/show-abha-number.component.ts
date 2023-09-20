import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';
import { UserService } from 'src/app/Shared/user.service';
@Component({
  selector: 'app-show-abha-number',
  templateUrl: './show-abha-number.component.html',
  styleUrls: ['./show-abha-number.component.css']
})
export class ShowAbhaNumberComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public Data: any) { }

  ngOnInit(): void {
  }

}
