import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Doctors } from 'src/app/Model/Doctors';
import { Fecility } from 'src/app/Model/Fecility';
import { Organization } from 'src/app/Model/Organization';
import { AddOrganizationPopupComponent } from '../../superadmin/Popups/add-organization-popup/add-organization-popup.component';
import { Roles } from 'src/app/Model/Roles';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';
import{HostListener} from '@angular/core'
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from 'src/app/Shared/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddUserFacilityPopupComponent } from '../../superadmin/Popups/add-user-facility-popup/add-user-facility-popup.component';
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css',"../../../../css/style.css","../../../../css/bootstrap.min.css"
  ,"../../../../css/responsive.bootstrap4.min.css","../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../css/dataTables.bootstrap4.min.css","../../../../css/metisMenu.min.css"],
  
})
export class AddUserComponent implements OnInit {
   isSuperAdmin=false;
  _role:number=0
  _gender:number=0
  _organization:number=0
  _facility:number=0
  docs:Roles[]=[]
  fecility:Fecility[]=[]
  organization:Organization[]=[]
  organizationId=0;
  username=''
  speciality:any
  isspecialityhidden=true
  myform:any
  Personal:any 
  isrefdoctor:any=false
  myForm?:FormBuilder
  uservalid=false
  OrganizationsList:any[]=[]
  isRecordsAvailable=false
  searchText=""
  fcontrol:any;
  isSelected=false
  Organization=""
  facilitiesbyorg:any
  FacilityList:any
  userlist:any
  //isAddressExisted=false
  isRecordsHave=false;
  p:number=0;
  private isMobile = new BehaviorSubject<boolean>(false);
  selectedOrganizationData:any[]=[]
arraylist=[{Id:1,name:""},{}]
fItems:any[]=[]
fItems2:any[]=[]

issuperadmin:any
d=true
  isusernamevalid=false
  isusernameinvalid=false
  enbld:any="[attr.enabled]"
  @ViewChild('reg') 
    public createform :NgForm | undefined;
 
    constructor(private service:HimsServiceService,private formbulder:FormBuilder,
      private popup:MatDialog,
      private router:Router,
      private userservice:UserService) {
        
      this.myform=formbulder.group({
        
       })
   }
   @ViewChild('mytable')
   mytable!: ElementRef;
 isVisible=false;

   filteredItems2: any[] = [];
  LoadFacilities()
  {
    debugger
    this.service.GetorganizationMappedData().subscribe((result)=>{debugger; this.selectedOrganizationData=result
      this.filteredItems2=this.selectedOrganizationData.filter(x=>x.organizationName.toLowerCase().includes((<HTMLInputElement>document.getElementById('Organization')).value.toLowerCase()))
      if(this.filteredItems2!=null)
      {
        this.organizationId=this.filteredItems2[0].organizationId
       this.service.GetFacilitiesList(this.filteredItems2[0].organizationId).subscribe((result)=>{this.FacilityList=result})
      
      }
    })
   
  }
   config={}
  public SaveUser(data:any)
  {
    debugger
  
    
      
      this.myform.get('Organization_id').markAsDirty();
      this.myform.get('Organization_id').setErrors(null);
      this.myform.get('Organization_id').markAsTouched();
      if(this.isrefdoctor==true)
      {
      
        this.myform.get('Password').markAsDirty();
        this.myform.get('Password').setErrors(null);
        this.myform.get('Password').markAsTouched();
        
        this.myform.get('User_Name').markAsDirty();
        this.myform.get('User_Name').setErrors(null);
        this.myform.get('User_Name').markAsTouched();
      }
      if(this.isusernamevalid=true)
      {
          if(this.myform.invalid || this.isusernamevalid!=true)
          {
              this.validateallformfields(this.myform)
          }else
             {
             
              if(data.Speciality=="Speciality*")
              {
                data.Speciality="0"
      
              }
              if(localStorage.getItem('role')=='Admin')
              {
                data.Organization_id=this.userservice.getOrganizationId();
              }
           
            debugger
            this.fecility;
   
    this.config = {  width: '750px', maxWidth: '90%' ,data:data};
    // let value= this.OrganizationsList.filter(x=> x.organization_Name.includes(this.Organization))
     const dialogRef=this.popup.open(AddUserFacilityPopupComponent,this.config)
     
          // this.fecility;
          //   data.Organization_id;
          //   // data.Address=this.address==""?(<HTMLInputElement>document.getElementById('Address')).value:this.address;
          //   //this.Organization=(<HTMLInputElement>document.getElementById('Organization_id')).value;
          //   data.Organization=this.Organization;
          //   debugger
          //   let orgs=this.OrganizationsList.filter(x=>x.organizationId==data.Organization_id)
          //   this.Organization=orgs[0].organization_Name
          
         

             
          }
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
 
  const queryParams1: NavigationExtras = {
    queryParams: {
    //params1:D
    },
  };
  
  this.router.navigate(['/SuperAdmin/Edit-User?id='+queryParams1]);
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
  //debugger
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
  removestartSpace(event:any)
  {
    let text= (<HTMLInputElement>document.getElementById('txtfname')).value 
    if(text.trim()=="")
    {
      (<HTMLInputElement>document.getElementById('txtfname')).value =""
    }
    const pattern = / {2,}/;

    if (pattern.test(text)) {
      debugger
      const modifiedText =  text.trim().replace(/ +/g, ' ');
     let  modifiedText2 = modifiedText.replace(/ +$/, '');
    //  const modifiedText = this.searchText.replace(/ +/, ' ');
      (<HTMLInputElement>document.getElementById('txtfname')).value=modifiedText;
    }
  }

  
  removestartSpace2(event:any)
  {
    let text= (<HTMLInputElement>document.getElementById('txtlname')).value 
    if(text.trim()=="")
    {
      (<HTMLInputElement>document.getElementById('txtlname')).value =""
    }
    const pattern = / {2,}/;

    if (pattern.test(text)) {
      debugger
      const modifiedText =  text.trim().replace(/ +/g, ' ');
     let  modifiedText2 = modifiedText.replace(/ +$/, '');
    //  const modifiedText = this.searchText.replace(/ +/, ' ');
      (<HTMLInputElement>document.getElementById('txtlname')).value=modifiedText;
    }
  }

  onKeyPress(event: KeyboardEvent) {
    // Check if the pressed key is a number
    // if (!isNaN(Number(event.key)) || /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(event.key)) {
    //   event.preventDefault(); // Prevent input of numeric characters
    // }
   
    if (!/^[a-zA-Z\s]*$/.test(event.key)) {
      event.preventDefault(); // Prevent input of non-letter and non-space characters
    }
  

   
  }

CheckUsernameisExisted(user:any)
{
debugger
  
  let text=(<HTMLInputElement>document.getElementById('txtusername')).value;
(<HTMLInputElement>document.getElementById('txtusername')).value=text.trim();
  if(text.trim()=="")
  {
    this.isusernamevalid=false
    text=(<HTMLInputElement>document.getElementById('txtusername')).value=""
  }else this.isusernamevalid=true
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


  ngOnInit(): void {
    debugger
    
    // const queryParams1: NavigationExtras = {
    //   queryParams: {
    //   params1:4
    //   },
    // };
    
    // this.router.navigate(['/SuperAdmin/Edit-User'], queryParams1);
    let role=localStorage.getItem('role')
    this.service.GetOrganization().subscribe((result : Organization[])=>(this.organization=result));
    this.service.GetOrganization().subscribe((result:any)=>{(this.OrganizationsList=result)})
    
    let OrgId=Number(this.userservice.getOrganizationId())
   this.GetFecility(OrgId)
   //this.service.GetRoles().subscribe((result : Roles[])=>(this.docs=result));
   this.service.getSpeciality().subscribe((result)=>this.speciality=result)
this.myform=this.formbulder.group({
  First_Name:['',Validators.required],
  Last_Name:['',Validators.required],
  Mobile_Number:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern(/^[6-9]\d*$/)]],
  userrole:['Role*',Validators.required],
  Organization_id:['Organization*'],
  facility_id:['Facility*',Validators.required],
  Speciality:['Speciality*'],
  isReferDoctor:[false],

  User_Name:['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9]*$/)]],
  Password:['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9 @$#*]*$/)]],
  
})

    localStorage.setItem('header','User Registration')
    this.service.GetRoles().subscribe((result : Roles[])=>(
      
     // this.docs= role=="Admin"? this.docs=this.docs.filter(x=>x.role!='Super Admin'):this.docs
     this.docs=result.filter(x=>x.role!='Super Admin')
      ));

      if(role=='Admin')
      {
        debugger
        this.myform.get('Organization_id').disable();
        this.myform.get('Organization_id').patchValue(OrgId);
       
      } 
   // this.service.GetFecility().subscribe((result : Fecility[])=>(this.fecility=result));
   
    debugger
    
   

  }

  

}
