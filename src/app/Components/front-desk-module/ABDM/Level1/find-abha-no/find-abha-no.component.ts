import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-find-abha-no',
  templateUrl: './find-abha-no.component.html',
  styleUrls: ['./find-abha-no.component.css',"../../../../../../css/style.css","../../../../../../css/bootstrap.min.css"
  ,"../../../../../../css/responsive.bootstrap4.min.css","../../../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../../../css/dataTables.bootstrap4.min.css","../../../../../../css/metisMenu.min.css"]
})
export class FindABHANoComponent implements OnInit {

  _form:any
  isdisable:boolean=true
  response:any
    constructor(private himsservice:HimsServiceService,private formbulder:FormBuilder,private router:Router) {
  
  this._form=this.formbulder.group({
    Number: new FormControl( '', Validators.required),
    Otp: new FormControl('', Validators.required),
  
      })
     }
  
    SendOtp(Number:string)
    {
      debugger
    if(this._form.invalid)
    {
      this.validateallformfields(this._form);
    }
    else{
  
      debugger
       this.himsservice.SendOtp(Number).subscribe((result)=>{
        debugger;
       
          if(result!=null)
         {
         
          this.response=result
        localStorage.setItem('forgotabhabyaadharTxnId',this.response.txnId)
        this.router.navigateByUrl('/front-desk/Verify-Mobile-otp')
  
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
      localStorage.setItem('header','Know Health Account Number')
      this._form=this.formbulder.group({
    Number: new FormControl( '', [Validators.required,Validators.minLength(12)]),
    Otp: new FormControl({value: '', disabled: this.isdisable}, Validators.required),
  
      })
    }
  
  }
  