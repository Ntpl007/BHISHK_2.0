import { Component, OnInit, ViewChild } from '@angular/core';
import { Doctors } from 'src/app/Model/Doctors';
import { Fecility } from 'src/app/Model/Fecility';
import { Organization } from 'src/app/Model/Organization';
import { Roles } from 'src/app/Model/Roles';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';
import{HostListener} from '@angular/core'
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css',"../../../../css/style.css","../../../../css/bootstrap.min.css"
  ,"../../../../css/responsive.bootstrap4.min.css","../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../css/dataTables.bootstrap4.min.css","../../../../css/metisMenu.min.css"]
})
export class AddUserComponent implements OnInit {

  _role:number=0
  _gender:number=0
  _organization:number=0
  _facility:number=0
  docs:Roles[]=[]
  fecility:Fecility[]=[]
  organization:Organization[]=[]
  username=''
  speciality:any
  isspecialityhidden=true
  myform:any
  Personal:any 
  isrefdoctor:any=false
  myForm?:FormBuilder
  enbld:any="[attr.enabled]"
  @ViewChild('reg') 
    public createform :NgForm | undefined;
 
    constructor(private service:HimsServiceService,private formbulder:FormBuilder) {
    
      this.myform=formbulder.group({
      
       })
   }
  public SaveUser(data:any)
  {
    debugger
    if(this.myform.invalid)
    {
        this.validateallformfields(this.myform)
    }else
       {

      debugger
      this.service.SaveUser(data).subscribe((result:any)=>{
        debugger
          let D=result
         if(D!=null && D!='')
         {
          if(D=='User Name is Already Exists')
          {
           
            Swal.fire('Failed',D,'info')
            this.reset()
  
          }
          else{
            Swal.fire('Success',D,'success')
            this.reset()
         
          }
  
         }else{
         
          Swal.fire('Failed',D,'info')
          this.reset()

         }
        
          
         
  
        },
        error=>
          {
            debugger
            Swal.fire('Failed',error,'error')
            //this.reset()
          }
        
        
        
        
        
        );
  
    }
  }
 public GetFecility(SelectedOrganization: any )
  {
    debugger
    this.service.GetFecility(SelectedOrganization).subscribe((result:any)=>{
      debugger
      if(result!=null){
       
        this.fecility=result
      }
       


      }
      
      
      );
console.log(this.fecility);


  }

public reset()
{
  debugger
  
  //this.myform.reset();
  this.myform=this.formbulder.group({
    First_Name:['',Validators.required],
    Last_Name:['',Validators.required],
    Mobile_Number:['',[Validators.required,Validators.minLength(10)]],
    userrole:['Role*',Validators.required],
    Organization_id:['Organization*',Validators.required],
    facility_id:['Facility*',Validators.required],
    User_Name:['',Validators.required],
    Password:['',Validators.required],
    
  Speciality:['Speciality*'],
    
  })
  
}
_keyUp(evt: any) {
  debugger
     // Only ASCII character in that range allowed
     var ASCIICode = (evt.which) ? evt.which : evt.keyCode
     if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        {
         return false
         
        }
        let txtmobile=this.myform.get('Mobile_Number').value
       if(txtmobile.length==0)
       {
        if(evt.key>=6)
        {
          return true;

        }else{
          return false
        }
      }
         return true;
//   debugger
//  var d=event.target.value;
 
//  if(parseInt(d))
//  {

//  }else{
//   this.myform=this.formbulder.group({
//     Mobile_Number:''
//   })
//  }
}
checkIsDoctorRole(role:any)
{
debugger
if(role=="14")
{
  this.isspecialityhidden=false
 
}else{
 
  this.isspecialityhidden=true
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
  ischecked()
  {
    debugger
  
    if(this.isrefdoctor==false)
    {
      this.isrefdoctor=true
    }else this.isrefdoctor=false
  }

  ngOnInit(): void {
   
    
   this.service.getSpeciality().subscribe((result)=>this.speciality=result)
this.myform=this.formbulder.group({
  First_Name:['',Validators.required],
  Last_Name:['',Validators.required],
  Mobile_Number:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern(/^[6-9]\d*$/)]],
  userrole:['Role*',Validators.required],
  Organization_id:['Organization*',Validators.required],
  facility_id:['Facility*',Validators.required],
  Speciality:['Speciality*'],
  isReferDoctor:[false],

  User_Name:[''],
  Password:[''],
  
})

    localStorage.setItem('header','User Registration')
    this.service.GetRoles().subscribe((result : Roles[])=>(this.docs=result));
   // this.service.GetFecility().subscribe((result : Fecility[])=>(this.fecility=result));
    this.service.GetOrganization().subscribe((result : Organization[])=>(this.organization=result));
    debugger
    
   

  }

  

}
