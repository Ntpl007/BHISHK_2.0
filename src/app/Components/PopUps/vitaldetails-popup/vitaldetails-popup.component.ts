import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';
import { UserService } from 'src/app/Shared/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vitaldetails-popup',
  templateUrl: './vitaldetails-popup.component.html',
  styleUrls: ['./vitaldetails-popup.component.css',"../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../css/dataTables.bootstrap4.min.css","../../../../css/bootstrap.min.css"
  ,"../../../../css/responsive.bootstrap4.min.css","../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../css/dataTables.bootstrap4.min.css","../../../../css/metisMenu.min.css"]
})
export class VitaldetailsPopupComponent implements OnInit {
  Vitalform:any;
 arrayValues=new Array()
  VitalList:any
  pushValue:any
  saveVo:{
    'EncounterId':null,
    'VitalSignId':null,
    'CeatedBy':string,
    'Value':string
  }[]=[]
  
  loadvalues=
  {
   FacilityId:null,
   OrganizationId:null,
   SpecialityId:null,
  }
  constructor( @Inject(MAT_DIALOG_DATA) public Data: any,    private service:HimsServiceService,
  private user:UserService) {}
  Entry(index:any,item:any)
  {
 debugger
 let txt=(<HTMLInputElement>document.getElementById('order'+index)).value;
 this.pushValue= this.VitalList
//  this.saveVo.Value=txt
//  this.saveVo.EncounterId=this.Data.EncounterId
//  this.saveVo.VitalSignId=this.VitalList[index].vitalSignId
//  this.saveVo.CeatedBy=this.user.getUserName();
 //this.arrayValues.push(this.saveVo)

 debugger

  }
  GetVitals()
  {
    this.loadvalues.FacilityId=this.Data.FacilityId
    this.loadvalues.OrganizationId=this.Data.OrganizationId
    this.loadvalues.SpecialityId=this.Data.SpecialityId
     this.service.LoadVitalsignsData(this.loadvalues).subscribe((result:any)=>{
       debugger
       this.VitalList =result
    })
  }


saveVitalsignsforpatient()
{
debugger
this.saveVo=new Array()
  for(var i=0;i<this.VitalList.length;i++)
  {
debugger
    let txt=(<HTMLInputElement>document.getElementById('order'+i)).value;
    
    this.saveVo.push({
      EncounterId: this.Data.EncounterId,
      VitalSignId: this.VitalList[i].vitalSignId,
      CeatedBy:localStorage.getItem('name')?.toString()||"  ",
      Value: txt
    })

//  this.saveVo.Value=txt
//  this.saveVo.EncounterId=this.Data.EncounterId
//  this.saveVo.VitalSignId=this.VitalList[i].vitalSignId
//  this.saveVo.CeatedBy=this.user.getUserName();
//  this.arrayValues.push(this.saveVo)

  }
  
this.service.SavePatientVitalSigns(this.saveVo).subscribe((result)=>{
  debugger
  let d=result;
  if(result>0) 
  {
    Swal.fire('Saved Successfully','','success')
  }
}

)
 this.pushValue= this.VitalList
}



  ngOnInit(): void
  {
    debugger
    let a=this.Data
    this.GetVitals();
  }

}
