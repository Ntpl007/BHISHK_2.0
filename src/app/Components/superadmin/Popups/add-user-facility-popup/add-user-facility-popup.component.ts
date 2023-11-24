import { Component, OnInit ,Inject} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { NavigationExtras, Router } from '@angular/router';
import { data } from 'jquery';
import { BehaviorSubject } from 'rxjs';
import { DialogcommunicationService } from 'src/app/Shared/dialogcommunication.service';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';
import { UserService } from 'src/app/Shared/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-user-facility-popup',
  templateUrl: './add-user-facility-popup.component.html',
  styleUrls: ['./add-user-facility-popup.component.css',"../../../../../css/style.css","../../../../../css/bootstrap.min.css"
  ,"../../../../../css/responsive.bootstrap4.min.css","../../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../../css/dataTables.bootstrap4.min.css","../../../../../css/metisMenu.min.css"]

  
})
export class AddUserFacilityPopupComponent implements OnInit {


  // commaSeparatedValues: string = ''; // Initialize this property
  selectedItems: any[] = []; // Initialize an array to hold selected items

  items: any[] = [ /* An array of items to iterate over in the template */ ];
  selectedIds2:any[]=[];
  myform:any
  defaultFid:any;
  Organization:"" | undefined
  facappend:any
  isRecordsHave=false
  private isMobile = new BehaviorSubject<boolean>(false);
  row=1;
  _organization=""
  rowlist:any[]=[{
    Sno:0,
    Organization:"",
    Facility:"",
    Address:"",
    CreatedBy:"",
    FacilityAddress:""
   }]
  newArray=new Array()
  isCheck: boolean | undefined;
  isChecked=false;
 horizontalPosition: MatSnackBarHorizontalPosition = 'center';
 verticalPosition: MatSnackBarVerticalPosition = 'top';
 durationInSeconds=3
fItems:any[]=[]
fItems2:any[]=[]
list:any=null
  FacilityList: any;
  isusernamevalid: boolean | undefined;
  isrefdoctor: boolean | undefined;
  OrganizationsList:any[]=[]
  userservice: any;
  commaSeparatedValues: any;
  selectedIds=new Array();
 isFirst=true;
  
 
  constructor(
    
    @Inject(MAT_DIALOG_DATA) 
    public data:any,
    private service:HimsServiceService,
    private dialogCommunicationService: DialogcommunicationService,
    private user:UserService,
    private fb:FormBuilder,
    private _snackBar:MatSnackBar,
    private router:Router
    ) {
  
 
   }
  
  vitalsignsdetails=[]=[]
  k=[]
  k2=[]
  isfromedituser:any;
  OrgId:any=localStorage.getItem('userOrgId');
 
  
  availedFacilities:any[]=[]
  notavailedFacilities:any[]=[]
  ngOnInit(): void {
    debugger
    let a=this.data;
    if(this.OrgId==null||this.OrgId==undefined)
    {
     this.OrgId= localStorage.getItem('usersearchOrganization')
      
    }
    if(this.data.Organization_id==undefined)
    {
      
    this._defaultFid=this.data[0].facilityid;
      this.selectedIds2=[]
      this._organization=this.data[0].organizationName
      this.isfromedituser=true;
      this.service.GetFacilitiesList(this.OrgId).subscribe((result)=>{this.FacilityList=result
        debugger
        for(var j=0;j<this.FacilityList.length;j++)
        {
          this.FacilityList[j].isSelected=false;
          this.FacilityList[j].isDefault=false;
        }
        if(this.FacilityList.length>0)
        {
          for(var i=0;i<this.data.length;i++)
          {
            for(var j=0;j<this.FacilityList.length;j++)
            {
              if(this.data[i].facilityName==this.FacilityList[j].facility)
              {
                debugger
                this.FacilityList[j].isDefault=true
                this.selectMid2(true, this.data[i]);
                //this.selectedIds2.push(this.data[i].facilityListId)
              }
              {

              }
               if(this.data[i].facilityListName==this.FacilityList[j].facility)
               {
             
                this.FacilityList[j].isSelected=true;
                   
               }
             
            }
          }
debugger
          this.data.facility_id=this.FacilityList[0].facilityId
          this.isRecordsHave=true
         
        
          debugger
        } else this.isRecordsHave=true


        })
       
        this.service.GetOrganization().subscribe((result:any)=>{
          (this.OrganizationsList=result)
        debugger
          let orgs=this.OrganizationsList.filter(x=>x.organizationId==this.data.Organization_id)
          this._organization=orgs[0].organization_Name
        
          
        })
    }else{
      debugger
      this.isfromedituser=false;
      this.service.GetFacilitiesList(this.data.Organization_id).subscribe((result)=>{this.FacilityList=result
        if(this.FacilityList.length>0)
        {
          this.data.facility_id=this.FacilityList[0].facilityId
          this.isRecordsHave=true
        } else this.isRecordsHave=true
        })
       
        this.service.GetOrganization().subscribe((result:any)=>{
          (this.OrganizationsList=result)
        debugger
          let orgs=this.OrganizationsList.filter(x=>x.organizationId==this.data.Organization_id)
          this._organization=orgs[0].organization_Name
        
          
        })
    }
     
   
    //this.service.GetTotalFecilities().subscribe((result:any)=>{this.fItems=result});
//     this.rowlist=[{Sno:1,Organization:this.data.Organization,Facility:"",
//     Address:this.data.Address,CreatedBy:this.user.getUserName(),FacilityAddress:""}]
//     this._organization=this.rowlist[0].Organization;
//     console.log(this.rowlist)
// debugger
    
   
  }
  add()
  {
    debugger
    this.rowlist.push({Sno:this.rowlist.length+1, Organization:this._organization,
    Facility:"",
    Address:this.data.Address,CreatedBy:this.user.getUserName()
  })
    this.newArray.push(this.rowlist)
    
debugger
  }
  _defaultFid:any;
  SelectFid(item:any)
  {
    //if()
    debugger
    this.data.facility_id=item.facilityId;
    this._defaultFid=item.facilityId;
  }
  
  SelectFid2(index:any,item:any)
  {
   if((<HTMLInputElement>document.getElementById('flexCheckDefault'+index)).checked==false)
   {
   //(<HTMLInputElement>document.getElementById('flexRadioDefault'+index)).checked=false
   (<HTMLInputElement>document.getElementById('flexCheckDefault'+index)).checked=true
   this.selectMid2(true,item)
    //Swal.fire('This Facilities is not Mapped','','info')
   }
    debugger
    this.data.facility_id=item.facilityId;
    this._defaultFid=item.facilityId;
  }
  remove(index:number,value:any)
  {
debugger
this.rowlist= this.rowlist.filter(x=>x.Sno!=value.Sno)

    debugger
  }

//   selectMid(item:any){
//     debugger
//  this.commaSeparatedValues =item.facilityId.join(',');
//   }

  

// selectMid(item: any) {
//   debugger;

//    this.isCheck=true; // You might need to add a property like 'isChecked' to your 'item' object.

//   if (this.isCheck) {
//     this.selectedItems.push(item);
//   } else {
//     // Remove the item when the checkbox is unchecked
//     const index = this.selectedItems.indexOf(item);
//     if (index !== -1) {
//       this.selectedItems.splice(index, 1);
//     }
//   }

//   // Join the facilityIds of selected items and update the commaSeparatedValues
//   this.commaSeparatedValues = this.selectedItems.join(',')
//     .map(x => x.facilityId.join(','))
    
// }

selectMid(event: any, item: any) {
  debugger;
  const isChecked = event.target.checked;
  
  if (!this.selectedIds) {
    this.selectedIds = [];
  }


  if (isChecked) {
    // Push the facilityId into selectedIds
    this.isFirst=false;
    this.selectedIds.push(item.facilityId);
  } 
  else {
    // Remove the facilityId when the checkbox is unchecked
    const index = this.selectedIds.indexOf(item.facilityId);
    if (index !== -1) {
      this.selectedIds.splice(index, 1);
    }
  }

  // Join the selected facilityIds and update commaSeparatedValues
  this.commaSeparatedValues = this.selectedIds.join(',');
}


selectMid2(event: any, item: any) {
  debugger;
  const isChecked = event;
  
  if (!this.selectedIds) {
    this.selectedIds = [];
  }


  if (isChecked) {
    // Push the facilityId into selectedIds
    this.isFirst=false;
    this.selectedIds.push(item.facilityListId);
  } 
  else {
    // Remove the facilityId when the checkbox is unchecked
    const index = this.selectedIds.indexOf(item.facilityId);
    if (index !== -1) {
      this.selectedIds.splice(index, 1);
    }
  }

  // Join the selected facilityIds and update commaSeparatedValues
  this.commaSeparatedValues = this.selectedIds.join(',');
}

  
  AddressKeyup(event:any)
  {
      
    let _address=event.target.value;
    if(_address==" ")
    {
      (<HTMLInputElement>document.getElementById('Address')).value="";
   
    }
    const pattern = / {2,}/;

    if (pattern.test(_address)) {
      debugger
      const modifiedText =  _address.trim().replace(/ +/g, ' ');
     let  modifiedText2 = modifiedText.replace(/ +$/, '');
    //  const modifiedText = this.searchText.replace(/ +/, ' ');
      (<HTMLInputElement>document.getElementById('Address')).value=modifiedText;
    }
  }
  fetchFAddress(index:number,event:any)
  {
    let _address=event.target.value;
    if(_address==" ")
    {
      (<HTMLInputElement>document.getElementById('Faddress_'+index)).value="";
   
    }
    const pattern = / {2,}/;

    if (pattern.test(_address)) {
      debugger
      const modifiedText =  _address.trim().replace(/ +/g, ' ');
     let  modifiedText2 = modifiedText.replace(/ +$/, '');
    //  const modifiedText = this.searchText.replace(/ +/, ' ');
      (<HTMLInputElement>document.getElementById('Faddress_'+index)).value=modifiedText;
    }
    this.rowlist[index].FacilityAddress=this.service.ToCapital((<HTMLInputElement>document.getElementById('Faddress_'+index)).value) ;
  }
  
  fetchFacility(index:number,event:any)
  {
    debugger
   
    
    let _facility=event.target.value;
    if(_facility==" ")
    {
      (<HTMLInputElement>document.getElementById('facility_'+index)).value="";
   
    }
    const pattern = / {2,}/;

    if (pattern.test(_facility)) {
      debugger
      const modifiedText =  _facility.trim().replace(/ +/g, ' ');
     let  modifiedText2 = modifiedText.replace(/ +$/, '');
    //  const modifiedText = this.searchText.replace(/ +/, ' ');
      (<HTMLInputElement>document.getElementById('facility_'+index)).value=modifiedText;
    }
    
    this.searchText=event.target.value;
    this.rowlist[index].Facility=this.service.ToCapital((<HTMLInputElement>document.getElementById('facility_'+index)).value);

  }
  
  filteredItems(event:any) {
    debugger
    this.searchText=event.target.value;
    
    if(event.target.value.trim()!="")
    {

      this.list= this.fItems.filter(x=> x.facilityName.toLowerCase().includes(this.searchText.toLowerCase()));
  if(this.list.length==0){
    this.list=null
  }
    }else this.list=null
   //return list;
  }
  searchText=""
  
  searchText2=""
  SelectedFacility(index:any,selected:any)
  {
debugger
(<HTMLInputElement>document.getElementById("facility_"+index)).value=selected.facilityName
this.searchText=selected.facilityName;

this.list=null

  }

  hasDuplicates(arr:any[]): boolean {
    const seen = new Set();
    let li=[]
    for(var i=0;i<arr.length;i++)
    {
      let txt= (<HTMLInputElement>document.getElementById( "facility_"+i)).value;
      li.push(txt.replace(/\s/g, ''));
    }
    
    for (const item of li) {
      if (seen.has(item)) {

        return true;
      }
      seen.add(item);
    }
    return false;
  }
  Save()
  {
    debugger
    let a=this.data;
    // this.service.GetFecility(this.data.Organization_id).subscribe((result:any)=>{
    //   debugger
    //   this.fItems2=result
    //   //this.fItems2[0].fecilityId+','+this.fItems2[1].fecilityId+','+this.fItems2[2]==this.facappend
    // }
    // )
if(this.isfromedituser==true)
{
  
  this.service.UpdateUserFacilitiesbyEditUser(this.commaSeparatedValues,this.data[0].userId,this._defaultFid).subscribe((result)=>{
    debugger
    let r=result;
    Swal.fire('Updated Successfully','','success')
  })
  // if(this.isFirst==true)
  // {
  //   let fString="";
  //   for(var i=0;i<this.selectedIds2.length;i++)
  //   {
  //     if(i==(this.selectedIds2.length-1))
  //     {
  //       fString=fString+this.selectedIds2[i]
  //     }else  fString=fString+this.selectedIds2[i]+","
      
  //   }
  //   this.selectedIds.push(fString)
    
  // }else{

  // }
debugger
}else{
  this.service.SaveUser(this.data,this.commaSeparatedValues).subscribe((result:any)=>{
    debugger
    this.isrefdoctor=false
    debugger
      let D=result
      //let Id=D
      const queryParams1: NavigationExtras = {
        queryParams: {
          params:D
        },
      };
      
      this.router.navigate(['/SuperAdmin/Edit-User'], queryParams1);
     if(D!=null && D!='')
     {
      if(D=='User Name is Already Exists')
      {
       
        Swal.fire('Failed',D,'info')
      
      }
      else{
        
this.isusernamevalid=false
        Swal.fire('Success',D,'success')
        
       
      }
    }
 
});

    

  
    
let k=0;

// if(this.isusernamevalid=true)
// {
//     if(this.myform.invalid || this.isusernamevalid!=true)
//     {
//         this.validateallformfields(this.myform)
//     }else
//        {
       
//         if(this.Data.Speciality=="Speciality*")
//         {
//           this.Data.Speciality="0"

//         }
//         if(localStorage.getItem('role')=='Admin')
//         {
//           this.Data.Organization_id=this.userservice.getOrganizationId();
//         }
     
//       debugger
//     //this.fecility;
//     this.Data.Organization_id;
//       // data.Address=this.address==""?(<HTMLInputElement>document.getElementById('Address')).value:this.address;
//       //this.Organization=(<HTMLInputElement>document.getElementById('Organization_id')).value;
//       this.Data.Organization=this._organization;
//       debugger
//       let orgs=this.OrganizationsList.filter(x=>x.organizationId==this.Data.Organization_id)
//       this.Organization=orgs[0].organization_Name
    
   

//         this.service.SaveUser(this.Data).subscribe((result:any)=>{
//           this.isrefdoctor=false
//           debugger
//             let D=result
//            if(D!=null && D!='')
//            {
//             if(D=='User Name is Already Exists')
//             {
             
//               Swal.fire('Failed',D,'info')
//               this.reset()
    
//             }
//             else{
              
// this.isusernamevalid=false
//               Swal.fire('Success',D,'success')
//               this.reset()
           
//             }
    
//            }else{
           
// this.isusernamevalid=false
//             Swal.fire('Something went wrong',D,'info')
//             this.reset()
  
//            }
          
            
           
    
//           },
//           error=>
//             {
//               debugger
//               Swal.fire('Failed',error,'error')
              
// this.isusernamevalid=false
//               //this.reset()
//             }
         
//           );
     
//     }
// } 

}
 
  }
  validateallformfields(myform: any) {
    throw new Error('Method not implemented.');
  }
  reset() {
    throw new Error('Method not implemented.');
  }
  
  AlertBox(message:any)
  {
    this._snackBar.open(message,'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }
  view()
  {
    this.service.GetFecility(this.data.organizationId).subscribe((result:any)=>{
      debugger
      this.fItems2=result
      this.isChecked=true;
    debugger
    });
   
  }
  FunAdd()
  {
    this.isChecked=false;
  }
  ViewFacilities(isChecked:any)
  {
    debugger
    let c=(<HTMLInputElement>document.getElementById("Checkbox"))
    if(c.checked)
    {
      this.isChecked=true;
    }else this.isChecked=false;
debugger
  }
  
  AcceptCharactersOnly(event:KeyboardEvent)
  {

    // Allow numbers, backspace, and delete keys
    if (
      [46, 8, 9, 27, 13,32].indexOf(event.keyCode) !== -1 ||
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
    if (!/^[a-zA-Z]$/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete') {
      event.preventDefault();
    }
  }

 
}
