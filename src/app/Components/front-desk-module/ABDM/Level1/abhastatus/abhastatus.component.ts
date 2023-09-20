import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl, Validators } from '@angular/forms';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abhastatus',
  templateUrl: './abhastatus.component.html',
  styleUrls: ['./abhastatus.component.css']
})
export class AbhastatusComponent implements OnInit {
myform:any

obj:any
hid:any="--"
hidnumber:any="--"
status:any="--"
name:any="--"
ishide:any
isActive:boolean=false
  constructor(private fb:FormBuilder,
    private service:HimsServiceService) { }

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
    
    this.myform=this.fb.group({
      healthID:['',Validators.required]
    })
  }
  

}

