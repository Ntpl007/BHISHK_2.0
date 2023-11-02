import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';
import Swal from 'sweetalert2';
import * as $ from 'jquery';

@Component({
  selector: 'app-edit-facility',
  templateUrl: './edit-facility.component.html',
  styleUrls: ['./edit-facility.component.css',"../../../../../css/style.css","../../../../../css/bootstrap.min.css"
  ,"../../../../../css/responsive.bootstrap4.min.css","../../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../../css/dataTables.bootstrap4.min.css","../../../../../css/metisMenu.min.css"]
})
export class EditFacilityComponent implements OnInit {

  islload=false
  fcontrol:any
  isUpdated:number=0;
  constructor(private fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public Data: any,
    private service:HimsServiceService,
    private modalService:NgbModal) { 
    
  }
  // openModal(content: any) {
  //   const modalRef = this.modalService.open(content); // Open the modal with the content template
  // }
SetControl()
{
  this.fcontrol=this.fb.group({
    Facility:['',Validators.required],
    Address:['',Validators.required],
    FacilityMappingId:[this.Data.facilityMappingId]
  })
}


validateallformfields(formgroup:FormGroup)
{
  debugger
 Object.keys(formgroup.controls).forEach(fields=>{
 const control=formgroup.get(fields)
 if(control instanceof FormControl)
 {
   control.markAsTouched({onlySelf:true})
}else if(control instanceof FormGroup)
{
  this.validateallformfields(control)
}
})
}
  ngOnInit(): void {
    debugger
    let r=this.Data
    this.SetControl();
    this.fcontrol.get('Facility').patchValue(this.Data.facility)
    this.fcontrol.get('Address').patchValue(this.Data.address)
    
    
  }
  UpdateFacility(formdata:any){
   debugger 
   this.islload=true
   //$('#overlay').fadeIn().delay(200000).fadeOut();
  
   formdata.Facility=this.service.ToCapital(formdata.Facility)
   
 if(this.fcontrol.invalid)
 {
  this.validateallformfields(this.fcontrol)

 }else{
   $('#overlay').fadeIn();
   this.service.UpdateFacility(formdata).subscribe((result)=>
   {
   this.isUpdated=result;
  if(this.isUpdated)
  {
  Swal.fire('Updated Successfully','','success')
  $('#overlay').fadeIn().fadeOut();
  }else{
    $('#overlay').fadeIn().fadeOut();
    Swal.fire('Nothing is Changed','','info')
  } 
  
 
  this.islload=false;
})
 }
  }

  isValid(event:Event)
  {
    debugger
     // Get the input element's value
     const inputElement = event.target as HTMLInputElement;
     const inputValue = inputElement.value;
     if(inputValue.trim()!="")
     {
      this.fcontrol.get('Address').patchValue(inputValue);
     } 
    
  }
   
}
