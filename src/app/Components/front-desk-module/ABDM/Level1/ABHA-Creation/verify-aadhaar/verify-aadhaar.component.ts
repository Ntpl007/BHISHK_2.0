import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';

@Component({
  selector: 'app-verify-aadhaar',
  templateUrl: './verify-aadhaar.component.html',
  styleUrls: ['./verify-aadhaar.component.css']
})
export class VerifyAadhaarComponent implements OnInit {

  _form:any
  response:any
  txnId:any=localStorage.getItem('txnIdverifyAdharforcreateabha')
  constructor(private formbuilder:FormBuilder,private himsservice:HimsServiceService,private router:Router) {
    this._form=formbuilder.group({

    })
   }

   VerifyOtp(object:any)
   {
    debugger
    if(this._form.invalid)
    {
      this.validateallformfields(this._form)

    }
    else{
      
this.himsservice.VerifyOtptocreateAbhabyaadhaar(object.Otp,this.txnId).subscribe((result)=>{
  debugger
  if(result!=null)
  {
   
    this.response=result
    localStorage.setItem('txnIdForcheckmobile',this.response.txnId)
    this.router.navigateByUrl('/FrontDesk/ABDM/Check-And-Generate-Mobile-otp')
  }
})

    }
    
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
  
    this._form=this.formbuilder.group({
      Otp:['',Validators.required]
    })
  }

}
