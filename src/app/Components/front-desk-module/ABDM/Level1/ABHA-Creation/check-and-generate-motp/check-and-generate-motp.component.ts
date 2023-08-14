import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';

@Component({
  selector: 'app-check-and-generate-motp',
  templateUrl: './check-and-generate-motp.component.html',
  styleUrls: ['./check-and-generate-motp.component.css']
})
export class CheckAndGenerateMotpComponent implements OnInit {

  _form:any
  response:any
  txnId:any=localStorage.getItem('txnIdForcheckmobile')
  constructor(private formbuilder:FormBuilder,private himsservice:HimsServiceService,private router:Router) {
    this._form=formbuilder.group({
      
    })
   }
   Generateotp(form:any)
   {
    debugger
    //var txt=this._form.get('Aadhaar').value
    if(this._form.invalid)
    {
      this.validateallformfields(this._form);
    }
  else{
this.himsservice.SendOtpCheckMobileforCreateabha(form.Mobile,this.txnId).subscribe((result)=>{
  debugger
  if(result!=null)
  {

     this.response=result
     localStorage.setItem('txnforcreateabhainput',this.response.txnId)
     this.router.navigateByUrl('/FrontDesk/ABDM/BHA-Input')

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
    localStorage.setItem('header','Link Mobile number to ABHA ')
    this._form=this.formbuilder.group({
      Mobile:['',Validators.required]
    })
  }

}