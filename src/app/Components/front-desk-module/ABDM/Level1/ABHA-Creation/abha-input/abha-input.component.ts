import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abha-input',
  templateUrl: './abha-input.component.html',
  styleUrls: ['./abha-input.component.css',"../../../../../../../css/style.css","../../../../../../../css/bootstrap.min.css"
  ,"../../../../../../../css/responsive.bootstrap4.min.css","../../../../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../../../../css/dataTables.bootstrap4.min.css","../../../../../../../css/metisMenu.min.css"]
})
export class ABHAInputComponent implements OnInit {

  _form:any
  response:any
  constructor(private formbuilder:FormBuilder,private router:Router,private himsservice:HimsServiceService) {
    this._form=formbuilder.group({

    })
   }
   Create(obj:any)
   {
    if(this._form.invalid)
    {
      this.validateallformfields(this._form)
    }
    else{
      debugger
      obj.txnId=localStorage.getItem('txnforcreateabhainput')
  
  this.himsservice.CreateABHA(obj).subscribe((result)=>{
    if(result!=null)
    {
      this.response=result
      localStorage.setItem('abhaname',this.response.name)
      localStorage.setItem('healthId',this.response.healthId)
      localStorage.setItem('healthIdNumber',this.response.healthIdNumber)
      Swal.fire('Success','Health Account Created','success')
      debugger
     
      this._form=this.formbuilder.group({
        healthId:['',Validators.required],
        password:['',Validators.required],
        email:['',Validators.required]
      })
  this.router.navigateByUrl('/FrontDesk/ABDM/ABDM-Profile')
    }
  })
    }
   

   }

reset()
{
  this._form=this.formbuilder.group({
    healthId:['',Validators.required],
    password:['',Validators.required],
    email:['',Validators.required]
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
    this._form=this.formbuilder.group({
      healthId:['',Validators.required],
      password:['',Validators.required],
      email:['',Validators.required]
    })
    localStorage.setItem('header','Create Ayushman Bharath Health Account')
  }

}

