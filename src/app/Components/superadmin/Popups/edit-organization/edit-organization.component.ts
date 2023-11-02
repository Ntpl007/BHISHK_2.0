import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-organization',
  templateUrl: './edit-organization.component.html',
  styleUrls: ['./edit-organization.component.css']
})
export class EditOrganizationComponent implements OnInit {
  fcontrol:any
  isUpdated:number=0;
  constructor(private fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public Data: any,
    private service:HimsServiceService) { 
    
  }
SetControl()
{
  this.fcontrol=this.fb.group({
    Organization:['',Validators.required],
    Address:['',Validators.required],
    OrganizationId:[this.Data.organizationId]
  })
}
  ngOnInit(): void {
    debugger
    let r=this.Data
    this.SetControl();
    this.fcontrol.get('Organization').patchValue(this.Data.organizationName)
    this.fcontrol.get('Address').patchValue(this.Data.address)
    
    
  }
  Update(formdata:any){
debugger

$('#overlay').fadeIn();
this.service.UpdateOrganization(formdata).subscribe((result)=>
{
this.isUpdated=result;
if(this.isUpdated)
{
  $('#overlay').fadeOut();
  Swal.fire('Updated Successfully','','success')

}else  Swal.fire('Something went wrong','','info')
})
  }


}
