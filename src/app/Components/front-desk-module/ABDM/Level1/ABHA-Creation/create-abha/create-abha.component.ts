import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';

@Component({
  selector: 'app-create-abha',
  templateUrl: './create-abha.component.html',
  styleUrls: ['./create-abha.component.css',"../../../../../../../css/style.css","../../../../../../../css/bootstrap.min.css"
  ,"../../../../../../../css/responsive.bootstrap4.min.css","../../../../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../../../../css/dataTables.bootstrap4.min.css","../../../../../../../css/metisMenu.min.css"]
})
export class CreateABHAComponent implements OnInit {

  _form:any
  response:any
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
this.himsservice.SendOtptocreateAbhabyaadhaar(form.Aadhaar).subscribe((result)=>{
  debugger
  if(result!=null)
  {

     this.response=result
     localStorage.setItem('txnIdverifyAdharforcreateabha',this.response.txnId)
     this.router.navigateByUrl('/FrontDesk/ABDM/Verify-Aadhaar')

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
    localStorage.setItem('header','Create Health Account')
    this._form=this.formbuilder.group({
      Aadhaar:['',[Validators.required,Validators.minLength(12)]]
    })
  }

}
