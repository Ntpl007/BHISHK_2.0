import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';
import { DatePipe, formatDate } from '@angular/common';
import Swal from 'sweetalert2';

//import { FilterPipe } from 'src/app/filter.pipe';
import { NgbAlertModule, NgbDatepickerConfig, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DateService } from 'src/app/Shared/date.service';
import { UserService } from 'src/app/Shared/user.service';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css',"../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../css/style.css","../../../../css/bootstrap.min.css"
  ,"../../../../css/responsive.bootstrap4.min.css","../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../css/dataTables.bootstrap4.min.css","../../../../css/metisMenu.min.css"]
})
export class UserListComponent implements OnInit {
userRole:any
  today=formatDate(new Date(), 'yyyy-MM-dd', 'en-US'); // dateofbirth;
  title="OPD Search"
  model?: NgbDateStruct;
  model2?: NgbDateStruct;
  organization:any
searchform:any
ob:any
islload:boolean=false
userlist:any
patientList:any
frmdate=new Date
tDate=new Date
rowscount:any=0
userCount=0
p: number = 0;
searchText = '';
_fromdate:any
Roles:any
_todate:any
isSuperAdmin:any
facilityList:any
isvi:boolean=false
  maxDate: { year: number; month: number; day: number; };
  constructor(private formbuilder:FormBuilder,private service:HimsServiceService,private config: NgbDatepickerConfig,
    private dateservice:DateService
    ,private userservice:UserService,
    private router:Router) {
    const current = new Date();
    this.maxDate = {
      year: current.getFullYear(),
      month: current.getMonth() +1,
      day: current.getDate()
    };
    
    this.model=this.maxDate
    this.model2=this.maxDate
    this.searchform=formbuilder.group({

    })
   }

EditUser(SelectedRow:any)
{
  debugger
  this.router.navigateByUrl('/Admin/Edit-User')
}

   public GetFacility(SelectedOrganization: any )
   {
     debugger
     localStorage.setItem('usersearchOrganization',SelectedOrganization)
     this.service.GetFecility(SelectedOrganization).subscribe((result:any)=>{
       debugger
       if(result!=null){
        
         this.facilityList=result
       }
         
       }
        
       );
      }
   SearchUserByAdmin(Data:any)
   {
    this.service.GetUsers(Data).subscribe((result)=>{
      debugger
      
       this.userCount=result.length
       debugger
       for(var i=0;i<result.length;i++)
       {
         let d= result[i].created_Date.split('T');
         result[i].created_Date=this.dateservice.LocalStringDateFormat(d[0])
       }
       $('#overlay').fadeOut();
      
      this.userlist=result})
   }
   SearchUserBySuperAdmin(Data:any)
   {
    this.service.GetUsers(Data).subscribe((result)=>{
      debugger
      
       this.userCount=result.length
       debugger
       for(var i=0;i<result.length;i++)
       {
         let d= result[i].created_Date.split('T');
         result[i].created_Date=this.dateservice.LocalStringDateFormat(d[0])
       }
       $('#overlay').fadeOut();
      this.userlist=result})
   }
getusers(Data:any)
{
  debugger
  if(this.searchform.invalid)
  {
    
    this.validateallformfields(this.searchform)
  }
  else{
    $('#overlay').fadeIn();
if(this.userRole=="Admin")
{
  Data.Organization=this.userservice.getOrganizationId();
  this.SearchUserByAdmin(Data)
}else
if(this.userRole=="Super Admin")
{
   this.SearchUserBySuperAdmin(Data)
}

   
   
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
    debugger
    this.userlist=null;
 this.userRole=localStorage.getItem('role')
 if(this.userRole=="Admin")
 {
  this.GetFacility(localStorage.getItem('organizationId'));
  this.isSuperAdmin=false;
 } else  if(this.userRole=="Super Admin")
 {
  this.isSuperAdmin=true;
 }
    this.searchform=this.formbuilder.group({
      Facility:[0],
      Username:[''],
      Role:[0],
      Organization:[0,Validators.required]
    });
    localStorage.setItem('header','User List')
    this.service.GetRoles().subscribe((result : any)=>{
      let role=localStorage.getItem('role')
      if(role=='Admin')
      {
        this.Roles=result.filter((x: { role: string; })=>x.role!='Super Admin')
      }else if(role=='Super Admin')
      {
        this.Roles=result
      }
     }
    );
  // this.service.get().subscribe((result : ])=>(this.fecility=result));
     this.service.GetOrganization().subscribe((result : any)=>(this.organization=result));
   //this.GetFacility(this.userservice.getOrganizationId())
   let OrgId=Number(this.userservice.getOrganizationId())
    
  }

  

}
