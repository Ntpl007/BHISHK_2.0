import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-find-abha',
  templateUrl: './find-abha.component.html',
  styleUrls: ['./find-abha.component.css',"../../../../../../../css/style.css","../../../../../../../css/bootstrap.min.css"
  ,"../../../../../../../css/responsive.bootstrap4.min.css","../../../../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../../../../css/dataTables.bootstrap4.min.css","../../../../../../../css/metisMenu.min.css"]
})
export class FindAbhaComponent implements OnInit {

  _form:any
  isdisable:boolean=true
  response:any
    constructor(private himsservice:HimsServiceService,private formbulder:FormBuilder,private router:Router) {
  
  this._form=this.formbulder.group({
    Number:['', Validators.required],
    Otp: ['', Validators.required],
  
      })
     }
  
    SendOtp(Data:any)
    {
      debugger
    if(this._form.invalid)
    {
      this.validateallformfields(this._form);
    }
    else{
  
      debugger
       this.himsservice.SendOtp(Data.Number).subscribe((result)=>{
        debugger;
       
          if(result!=null)
         {
         
          this.response=result
        localStorage.setItem('forgotabhabyaadharTxnId',this.response.txnId)
        this.router.navigateByUrl('/FrontDesk/ABDM/Verify-Aadhaar-OTP')
  
        }else{
          Swal.fire('','Health Account is not available','info')
        }
  
      });
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
      localStorage.setItem('header','Forgot Abha')
      
  this._form=this.formbulder.group({
    Number:['', [Validators.required,Validators.minLength(12)]],
    
  
      })
      this._form=this.formbulder.group({
    Number: new FormControl( '', [Validators.required,Validators.minLength(12)]),
    
  
      })
    }
  
  }
  