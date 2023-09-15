import { Component, OnInit } from '@angular/core';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';

@Component({
  selector: 'app-speciality-vitalsign-setup',
  templateUrl: './speciality-vitalsign-setup.component.html',
  styleUrls: ['./speciality-vitalsign-setup.component.css',"../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../css/dataTables.bootstrap4.min.css","../../../../css/style.css","../../../../css/bootstrap.min.css"
  ,"../../../../css/responsive.bootstrap4.min.css","../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../css/dataTables.bootstrap4.min.css","../../../../css/metisMenu.min.css"]
})
export class SpecialityVitalsignSetupComponent implements OnInit {
 specialityList:any
  constructor(private service:HimsServiceService) { }

  ngOnInit(): void {
    this.service.getSpeciality().subscribe((result)=>this.specialityList=result)
    localStorage.setItem('header','Vital Signs')
  }

}
