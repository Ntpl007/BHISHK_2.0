import { Component, OnInit, ViewChild } from '@angular/core';
import { Doctors } from 'src/app/Model/Doctors';
import { Fecility } from 'src/app/Model/Fecility';
import { Organization } from 'src/app/Model/Organization';
import { Roles } from 'src/app/Model/Roles';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';
import{HostListener} from '@angular/core'
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from 'src/app/Shared/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatLabel } from '@angular/material/form-field';
import { MatAccordion } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { AddUserFacilityPopupComponent } from '../../superadmin/Popups/add-user-facility-popup/add-user-facility-popup.component';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  
})
export class EditUserComponent implements OnInit {
  isSuperAdmin=false;
  _role:number=0
  _gender:number=0
  _organization:number=0
  defaultFacilityId:any;
  _facility:number=0
  docs:Roles[]=[]
  p: number = 0;
  fecility:Fecility[]=[]
  organization:Organization[]=[]
  username=''
  speciality:any
  isspecialityhidden=true
  myform:any
  Personal:any 
  isrefdoctor:any=false
  myForm?:FormBuilder
  uservalid=false
  FacilityList:any
d=true
  isusernamevalid=false
  isusernameinvalid=false
  enbld:any="[attr.enabled]"
  @ViewChild('reg') 
    public createform :NgForm | undefined;
  userid: any;
  userfacilitylist: any;
  uname: any;
 showlist=false;
    constructor(private service:HimsServiceService,private formbulder:FormBuilder,
      private userservice:UserService,private route: ActivatedRoute,private router:Router,
      private popup:MatDialog
      
      ) {
    
      this.myform=formbulder.group({
      
       })
   }

   
  public SaveUser(data:any)
  {
    debugger
    
     
             
            
      //data.Organization_id=this.userservice.getOrganizationId();
            debugger
            data.FacilityId=this.myform.get('FacilityId').value;
            data.UserId=Number(this.userid)
            if(this.isspecialityhidden)
            {
              data.isProvider=null;
            }else
            if((<HTMLInputElement>document.getElementById('customCheck02')).checked)
            {
              data.isProvider=0
            }else data.isProvider=1
            data.FacilityId=this.defaultFacilityId
              this.service.UpdateUser(data).subscribe((result:any)=>{
                this.isrefdoctor=false
                debugger
                  let D=result
                 if(D!=null && D!='')
                 {
                   if(this.FacilityArrayForUpdate!=null && this.FacilityArrayForUpdate.length>0)
                   {
                    this.service.UpdateUserFacilities(this.FacilityArrayForUpdate).subscribe((result2:any)=>{
                       debugger
                       
                //    this.GetUserData(Number(this.userid));
                    this.Reload();
                    
                    })
                    
                   }else{
                    
  this.GetUserData(Number(this.userid));
                   }
                   
                    // if(localStorage.getItem('role')=='Admin')
                    // {
                    //   //this.router.navigateByUrl('/Admin/User-List')
                    // }else   if(localStorage.getItem('role')=='Super Admin')
                    // {
                    //  // this.router.navigateByUrl('/SuperAdmin/User-List')
                    // }
                    Swal.fire('Success',D,'success')
                  
                 }else{
                 
                  Swal.fire('Something went wrong',D,'info')
                 // this.reset()
        
                 }
                
                  
                 
          
                },
                error=>
                  {
                    debugger
                    Swal.fire('Failed',error,'error')
                    
    this.isusernamevalid=false
                    //this.reset()
                  }
                
                
                
                
                
                );
            
           
        
          
    
    this.isusernamevalid=false
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
checkUserRole()
{
  if(localStorage.getItem('role')=='Super Admin')
  {
    this.isSuperAdmin=true;
  }else 
  if(localStorage.getItem('role')=='Admin')
  {
    this.isSuperAdmin=false;
  }
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
    Organization_id:[ this.userservice.getOrganizationId],
    facility_id:['Facility*',Validators.required],
    User_Name:['',Validators.required],
    Password:['',Validators.required],
    
  Speciality:['Speciality*'],
    
  })
  
}//'Organization*'


AcceptMobilenumberOnly(event: KeyboardEvent) {
  debugger
  // Allow numbers, backspace, and delete keys
  if (
    [46, 8, 9, 27, 13].indexOf(event.keyCode) !== -1 ||
    // Allow Ctrl+A
    (event.keyCode === 65 && event.ctrlKey === true) ||
    // Allow Ctrl+C
    (event.keyCode === 67 && event.ctrlKey === true) ||
    // Allow Ctrl+V
    (event.keyCode === 86 && event.ctrlKey === true) ||
    // Allow Ctrl+X
    (event.keyCode === 88 && event.ctrlKey === true) ||
    // Allow home, end, left, right arrow keys
    (event.keyCode >= 35 && event.keyCode <= 39)
  ) {
    return;
  }
  debugger
 // let txtmobile=this.myform.get('Mobile_Number').value
  let txt=(<HTMLInputElement>document.getElementById('Mobile')).value;
  
    if (event.key >= "0" && event.key <= "5") {
      if(txt.length==0)
  {
   
      event.preventDefault();
    }
  }
 
    // Allow only numeric input
  if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) {
   
     
      event.preventDefault();
    }
  
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
      //  if(txtmobile.length==0)
      //  {
        if(evt.key>=6)
        {
          return true;

        }else{
          return false
        }
      //}
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
  this.isusernamevalid=true
    if(this.isrefdoctor==false)
    {
      this.isrefdoctor=true
    }else this.isrefdoctor=false
  }


  onKeyPress(event: KeyboardEvent) {
    // Check if the pressed key is a number
    if (!isNaN(Number(event.key)) || /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(event.key)) {
      event.preventDefault(); // Prevent input of numeric characters
    }
  }

CheckUsernameisExisted(user:any)
{
debugger

  let text=(<HTMLInputElement>document.getElementById('txtusername')).value;
 let OrganizationId=this.userservice.getOrganizationId();
 let Uname=user.target.value

if(text!="")
{
  this.service.CheckUsernameIsExisted(Uname,OrganizationId).subscribe((result)=>{
    debugger
        let resp=result;
        if(resp==true)
        {
          
    //this.myform.get('User_Name').setErrors("required");
    //this.myform.get('User_Name').markAsTouched();
    //this.myform.get('User_Name').markAsDirty();
     
    this.uservalid=false
    this.isusernamevalid=false
    this.isusernameinvalid=true
        }else
        if(resp==false)
        {
          this.isusernamevalid=true
          this.isusernameinvalid=false
          this.uservalid=false
        }
     
      })
}else{
  this.isusernameinvalid=false
}
  
    
 

}
Uid:any
FieldsBinding(Obj:any)
{
  debugger
  
 
this.myform.get('FirstName').patchValue(Obj[0].firstName)
this.myform.get('LastName').patchValue(Obj[0].lastName)
this.myform.get('MobileNumber').patchValue(Obj[0].mobileNumber)
this.myform.get('RoleId').patchValue(Obj[0].roleId)
this.myform.get('FacilityId').patchValue(Obj[0].facilityId)

this.myform.get('OrganizationId').patchValue(Obj[0].organizationId)

if(Obj[0].specialityId!=null)
{
  this.isspecialityhidden=false;
  this.myform.get('SpecialityId').patchValue(Obj[0].specialityId)
  
//(<HTMLInputElement>document.getElementById('cmbsepciality')).value=Obj[0].specialityId
  
}
if(Obj[0].isProvider==0)
{
  
(<HTMLInputElement>document.getElementById('customCheck02')).checked=true
}


}
UserList:any
GetUserData(Id:Number)
{
  debugger;
  this.service.GetUserById(Id).subscribe((result)=>{
    debugger
this.UserList=result;
this.FieldsBinding(result)
console.log(result)
  })
}
  ngOnInit(): void {
    debugger
    // this.route.queryParams.subscribe(params=>{
    //   this.userid=params['D']
    // })
    this.route.queryParams.subscribe(params => {
      debugger
    //this.userid=params['params'];
    this.userid=params['id'];
  
   
    //this.userid=params['id'];
    //this.getuserbyfacilitylist
    
    
  
        // Use param1 and param2 as needed in this component
      });
    this.Reload();
   

  }
  FacilityArrayForUpdate:any[]=[]

  List=new Array();
ar:any[]=[]
  selectedOption="";

  Reload()
  {
   
  
    this.service.getuserbyfacilitylist(this.userid).subscribe((result:any)=>{
      debugger;
      this.userfacilitylist=result;
      this.defaultFacilityId=this.userfacilitylist[0].facilityid;

      this.uname=this.userfacilitylist[0].UserName


        })
    let role=localStorage.getItem('role')
    this.service.GetOrganization().subscribe((result : Organization[])=>(this.organization=result));
    let OrgId=Number(this.userservice.getOrganizationId())
   this.GetFecility(OrgId)
   this.service.GetRoles().subscribe((result : Roles[])=>(this.docs=result));
   this.service.getSpeciality().subscribe((result)=>this.speciality=result)
this.myform=this.formbulder.group({
 
  FirstName:[''],
  LastName:[''],
  MobileNumber:[''],
  RoleId:['Role*'],
  OrganizationId:['Organization*'],
  FacilityId:['Facility*'],
  SpecialityId:["0"],
  isProvider:[],
 
  
})

    localStorage.setItem('header','Modify User Details')
    this.service.GetRoles().subscribe((result : Roles[])=>{
      debugger;
      this.docs= role=="Admin"? this.docs=this.docs.filter(x=>x.role!='Super Admin'):this.docs
    
      });

      if(role=='Admin')
      {
        debugger
        this.myform.get('OrganizationId').disable();
        this.myform.get('OrganizationId').patchValue(OrgId);
       
      } 
   
    
      this.GetUserData(Number(this.userid))
  }
  selectChangeForRemove(index:Number,Item:any)
  {
   // let k=0;
   if((<HTMLInputElement>document.getElementById('isdefault'+index)).checked==true)
   {
      Swal.fire("This is Default Facility.It can't be removed",'','info');
      (<HTMLInputElement>document.getElementById('isfacility'+index)).checked=true
   }else{
    this.FacilityArrayForUpdate=[]
    for(var i=0;i<this.userfacilitylist.length;i++)
    {
      
     
      if((<HTMLInputElement>document.getElementById('isfacility'+i)).checked==true)
      {
        this.FacilityArrayForUpdate.push({FacilityListId:this.userfacilitylist[i].facilityListId,DefaultFacilityId:this.defaultFacilityId,UserId:this.userid});
        
     //  this.List.push(this.FacilityArrayForUpdate);
      //  k=k+1;
      }
    }
   }
  
    debugger
  }
  selectchange(index:Number,Item:any)
  {
    debugger
   // this.FacilityArrayForUpdate=[]
    for(var i=0;i<this.userfacilitylist.length;i++)
    {
      this.ar[i]='isdefault'+i;
      
     // if('isdefault'+index!='isdefault'+i)
     // (<HTMLInputElement>document.getElementById('isdefault'+index)).checked=false
     if( this.ar[i]!='isdefault'+index)
     {
      (<HTMLInputElement>document.getElementById('isdefault'+i)).checked=false
     }
     else{
      this.defaultFacilityId=Item.facilityListId;
      if(this.FacilityArrayForUpdate.length>0)
      {
        this.FacilityArrayForUpdate[0].DefaultFacilityId=this.defaultFacilityId;
        this.FacilityArrayForUpdate[0].UserId=this.userid;
        
      }
      else{
        this.FacilityArrayForUpdate.push({FacilityListId:0,DefaultFacilityId:this.defaultFacilityId,UserId:this.userid});
     
      }
      
       
      console.log( this.defaultFacilityId)
     }
    }
    this.ar=[]
    
   

  }
  config={}
  dl:any
  AddMoreFacilities()
  {
    debugger
    if(this.userfacilitylist.length==0)
    {
      //localStorage.setItem('userOrgId',localStorage.getItem('usersearchOrganization'))
  // .. this.userfacilitylist[0]=  localStorage.getItem('usersearchOrganization')
    }else    localStorage.setItem('userOrgId',this.userfacilitylist[0].organizationId)
   //let dl.Organization_id=userfacilitylist[0].organizationId
    this.config = {  width: '900px', maxWidth: '90%' ,data:this.userfacilitylist};
    // let value= this.OrganizationsList.filter(x=> x.organization_Name.includes(this.Organization))
     const dialogRef=this.popup.open(AddUserFacilityPopupComponent,this.config)
     
 dialogRef.afterClosed().subscribe(result => {
  // This code will execute when the dialog is closed
 
  this.Reload();
  
});

  }

}

