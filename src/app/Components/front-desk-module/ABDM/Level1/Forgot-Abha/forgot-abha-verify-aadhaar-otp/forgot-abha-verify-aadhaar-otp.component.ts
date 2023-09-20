import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';
import Swal from 'sweetalert2';
import { ShowAbhaNumberComponent } from '../../../Abdm-Popups/show-abha-number/show-abha-number.component';

@Component({
  selector: 'app-forgot-abha-verify-aadhaar-otp',
  templateUrl: './forgot-abha-verify-aadhaar-otp.component.html',
  styleUrls: ['./forgot-abha-verify-aadhaar-otp.component.css',"../../../../../../../css/style.css","../../../../../../../css/bootstrap.min.css"
  ,"../../../../../../../css/responsive.bootstrap4.min.css","../../../../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../../../../css/dataTables.bootstrap4.min.css","../../../../../../../css/metisMenu.min.css"]
})
export class ForgotAbhaVerifyAadhaarOtpComponent implements OnInit {

  _form:any
  isdisable:boolean=true
  response:any
    constructor(private himsservice:HimsServiceService,
      private formbulder:FormBuilder,
      private router:Router,
      private pop:MatDialog) {
  
  this._form=this.formbulder.group({
    otp: new FormControl( '', Validators.required),
    Otp: new FormControl('', Validators.required),
  
      })
     }
  
    SendOtp(Data:any)
    {
      debugger
      let TxnId=localStorage.getItem('forgotabhabyaadharTxnId');
    if(this._form.invalid)
    {
      this.validateallformfields(this._form);
    }
    else{
  
      debugger
       this.himsservice.VerifyForgotenAbhaAdhaarotp(Data.otp,TxnId).subscribe((result)=>{
        debugger;
       
          if(result!=null)
         {
         debugger
          this.response=result
          const dialogRef= this.pop.open(ShowAbhaNumberComponent,{
            width:"25%",
            height:"200px",
            data:result
           
        })
        dialogRef.afterClosed().subscribe(result => {
          // This code will execute when the dialog is closed
         this.router.navigateByUrl('/FrontDesk/ABDM')
        });
       
  
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
      localStorage.setItem('header','Aadhaar OTP Verification')
      this._form=this.formbulder.group({
    otp: new FormControl( '', [Validators.required,Validators.minLength(6)]),
    Otp: new FormControl({value: '', disabled: this.isdisable}, Validators.required),
  
      })
    }
  
  }
  
