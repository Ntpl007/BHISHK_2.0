import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup , Validators } from '@angular/forms';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-abha-status',
  templateUrl: './abha-status.component.html',
  styleUrls: ['./abha-status.component.css',"../../../../../../css/style.css","../../../../../../css/bootstrap.min.css"
  ,"../../../../../../css/responsive.bootstrap4.min.css","../../../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../../../css/dataTables.bootstrap4.min.css","../../../../../../css/metisMenu.min.css"]
})
export class ABHAStatusComponent implements OnInit {

  myform:any
obj:any
hid:any
hidnumber:any
status:any
name:any
ishide:any
isActive:boolean=false
  constructor(private service:HimsServiceService,private formbulder:FormBuilder) { 
    this.myform=this.formbulder.group({
  
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

  GetAbhaStatus(data:any)
  {
    debugger
    
    if(this.myform.valid)
    {

      this.service.GetabhaStatus(data).subscribe((result:any)=>{
        debugger
        if(result!=null)
        {
          this.obj=result
          this.hid=this.obj.healthId
          this.hidnumber=this.obj.healthIdNumber
          this.name=this.obj.name
this.status=this.obj.status

          if(this.obj.status=="ACTIVE")
          {
          this.isActive=true
          }else{
            this.isActive=false
          }
        }else{
          Swal.fire('Failed','Please Enter Valid Health Id Number','error')
        }
         
      }
      )
    }else{
      this.validateallformfields(this.myform)
    }

  }
  ngOnInit(): void {
   
    localStorage.setItem('header','Abha status')
    
    this.myform=this.formbulder.group({
      healthID:['',Validators.required]
    })
  }
  

}
