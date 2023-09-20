import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';
import { UserService } from 'src/app/Shared/user.service';
import Swal from 'sweetalert2';
export interface AddVitals {
  VitalSignId: number;
  SpecialityId: number;
  FacilityId: number;
  CreatedBy:string;
 }
@Component({
  selector: 'app-speciality-vitalsign',
  templateUrl: './speciality-vitalsign.component.html',
  styleUrls: ['./speciality-vitalsign.component.css',"../../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../../css/dataTables.bootstrap4.min.css","../../../../../css/bootstrap.min.css"
  ,"../../../../../css/responsive.bootstrap4.min.css","../../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../../css/dataTables.bootstrap4.min.css","../../../../../css/metisMenu.min.css"],
})
export class SpecialityVitalsignComponent implements OnInit {
vitalsignslist:any
vitalsignsdetails:any
selectedVitalsignId:any
ishide=true
Vitals={
  VitalSignId: null,
  SpecialityId: null,
  FacilityId: null,
  OrganizationId:null,
  CreatedBy:null
}
  constructor(private service:HimsServiceService,private user:UserService,
    @Inject(MAT_DIALOG_DATA) public Data: any,) { }

  BindVitalsignDetails(Id:any)
  {
    debugger
   this.selectedVitalsignId=Id;
this.service.GetVitalSignsDetails(Id).subscribe((result)=>{
  debugger
  this.vitalsignsdetails=result
  this.ishide=false
})
  }
AddVitalDetails()
{
  debugger
  this.Vitals.SpecialityId=this.Data;
  this.Vitals.FacilityId=this.user.getFacilityId();
  this.Vitals.CreatedBy=this.user.getUserName();
  this.Vitals.VitalSignId=this.selectedVitalsignId;
  this.Vitals.OrganizationId=this.user.getOrganizationId();
this.service.AddVitalSignsToSpeciality(this.Vitals).subscribe((result)=>{
debugger
let r=result;
if(r>0)
{
  Swal.fire('Vital Sign Added','','success');
  (<HTMLInputElement>document.getElementById('vitalsins')).value="Vital signs*";
  this.ishide=true
}else if(r==0)
{
  Swal.fire('Already Added','','info');
}

})

}
  ngOnInit(): void {
    this.service.GetVitalSigns().subscribe((result)=>{
      debugger
      this.vitalsignslist=result})
  }

}
