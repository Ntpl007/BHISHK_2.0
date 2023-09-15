import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Injectable()
export class Validations  {
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

}