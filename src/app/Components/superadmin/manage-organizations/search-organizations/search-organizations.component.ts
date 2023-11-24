import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';
import { AddOrganizationPopupComponent } from '../../Popups/add-organization-popup/add-organization-popup.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { EditOrganizationComponent } from '../../Popups/edit-organization/edit-organization.component';
import { FacilityListComponent } from 'src/app/Components/admin-module/Manage-Facilities/facility-list/facility-list.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-search-organizations',
  templateUrl: './search-organizations.component.html',
  styleUrls: ['./search-organizations.component.css',"../../../../../css/style.css","../../../../../css/bootstrap.min.css"
  ,"../../../../../css/responsive.bootstrap4.min.css","../../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../../css/dataTables.bootstrap4.min.css","../../../../../css/metisMenu.min.css"]
})
export class SearchOrganizationsComponent implements OnInit {

  OrganizationsList:any[]=[]
  isRecordsAvailable=false
  searchText=""
  fcontrol:any;
  Organization=""
  facilitiesbyorg:any
  isAddressExisted=false
  organizationData:any
  p:number=0;
  private isMobile = new BehaviorSubject<boolean>(false);
arraylist=[{Id:1,name:""},{}]
fItems:any[]=[]
fItems2:any[]=[]
organizationId=0;
selectedOrganizationData:any[]=[]
list:any=null
  constructor(private service:HimsServiceService,
    private fb:FormBuilder,
    private popup:MatDialog,
    private http:HttpClient,
    private router:Router
    ) {
      this.checkIfMobile();
      window.addEventListener('resize', () => this.checkIfMobile());
      this.fcontrol=this.fb.group({
        Organization:['',Validators.required],
        Address:['',Validators.required]
      })
   

     }
Reset()
{
  this.isAddressExisted=false;
  this.fcontrol=this.fb.group({
    Organization:[0,Validators.required],
   
  })
  this.LoadOrganizations()
}
    private checkIfMobile() {
      this.isMobile.next(window.innerWidth <= 768); // Adjust the breakpoint as needed
    }

  ngOnInit(): void {
    debugger
    this.Reset();
    this.LoadOrganizations();
    //this.service.GetTotalFecilities().subscribe((result:any)=>{this.fItems=result});
    this.service.GetOrganization().subscribe((result:any)=>{
      this.OrganizationsList=result;
    
      })
    localStorage.setItem('header','Organizations List')
  }

  ChangeOrganization(event:any)
  {
    debugger
    let n=parseInt(event.target.value)
    this.organizationData= this.selectedOrganizationData.filter(item => item.organizationId==n);
    localStorage.setItem('imagepath',this.organizationData[0].organizationimage);
  }
  address="";
  SelectedOrganization(index:any,selected:any)
  {
         debugger
    this.fcontrol.get('Organization').patchValue(selected.organization_Name);
//this.Organization=selected.organization_Name;
    this.organizationId=selected.organizationId
    this.service.GetFecility(selected.organizationId).subscribe((result)=>{this.facilitiesbyorg=result})
    this.service.GetOrganizationAddress(selected.organizationId).subscribe((result)=>
{ this.address=result;
  (<HTMLInputElement>document.getElementById('Address')).value=result;
  if(result!=null||result!="")
  {
    this.isAddressExisted=true;
    this.fcontrol.get('Address').setErrors(null);
  }else{
    this.fcontrol.get('Address').setErrors('required');
    this.isAddressExisted=false;
  } 
})
this.list=null

  }
  LoadOrganizations()
  {
    this.service.GetorganizationMappedData().subscribe((result)=>{
      debugger; this.selectedOrganizationData=result
      this.organizationData=result;
    })
   
  }
  filteredItems(event:any) {
    debugger
    this.searchText=event.target.value;
    if(event.target.value.trim()!="")
    {

      this.fItems2=this.OrganizationsList
      this.list= this.fItems2.filter(item => item.organization_Name.toLowerCase().includes(this.searchText.toLowerCase()));
  if(this.list.length==0){
    this.list=null
  }
    }else {
      (<HTMLInputElement>document.getElementById('Address')).value=""
      this.isAddressExisted=false
      this.list=null
    }
   //return list;
  }
  config={}
  openModal(dataList:any) {
  debugger
  dataList.organizationId=this.organizationId;
  dataList.Address=this.address==""?(<HTMLInputElement>document.getElementById('Address')).value:this.address;
  this.Organization=(<HTMLInputElement>document.getElementById('Organization')).value;
  dataList.Organization=this.Organization;
  debugger
  let value= this.OrganizationsList.filter(x=> x.organization_Name.includes(this.Organization))
  
 if(this.fcontrol.invalid)
 {
  this.validateallformfields(this.fcontrol)

 }else{

  if (this.isMobile.value) {
    // Modify the dialog size for mobile view
    this.config = {  width: '90%', maxWidth: '90%' ,data:dataList};
  }else{
    this.config = {  width: '70%', maxWidth: '70%',data:dataList };
  }
  const dialogRef=this.popup.open(AddOrganizationPopupComponent,this.config
   
  
)
dialogRef.afterClosed().subscribe(result => {
 // This code will execute when the dialog is closed
 this.Reset()
 this.LoadOrganizations();
});

 }

  //  ($('#myModal') as any).modal('show');
 // Open the modal
  }
  base64QueryString: string = '';

  encodeQueryString(item:any){
    debugger
    let _Array={OrganizationName:item.organizationName,OrganizationId:item.organizationId,Address:item.address
      }
    let queryString=JSON.stringify(_Array);
    const base64QueryString = btoa(queryString);
  //  const params = new HttpParams().set('mylist', base64QueryString);
//this.base64QueryString=base64QueryString;

const queryParams: NavigationExtras = {
  queryParams: {
  params:base64QueryString
  },
};

// Navigate to the route with query parameters
this.router.navigate(['/SuperAdmin/Add-Organizations'], queryParams);
    
  }

  dataList2:any
  openEditOrganizationPopup(index:any,item:any) {
   
    if (this.isMobile.value) {
      // Modify the dialog size for mobile view
      this.config = {  width: '90%', maxWidth: '90%' ,data:item};
    }else{
      this.config = {  width: '50%', maxWidth: '50%',data:item };
    }
    const dialogRef=this.popup.open(EditOrganizationComponent,this.config
     
    
  )
  dialogRef.afterClosed().subscribe(result => {
   // This code will execute when the dialog is closed
   this.Reset()
   this.LoadOrganizations();
  });
  
    }
    
  openEditFOrganizationPopup(index:any,item:any) {
   
    if (this.isMobile.value) {
      // Modify the dialog size for mobile view
      this.config = {  width: '90%', maxWidth: '90%' ,data:item};
    }else{
      this.config = {  width: '50%', maxWidth: '50%',data:item };
    }
    const dialogRef=this.popup.open(FacilityListComponent,this.config
     
    
  )
  dialogRef.afterClosed().subscribe(result => {
   // This code will execute when the dialog is closed
   this.Reset()
   this.LoadOrganizations();
  });
  
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
  closeModal() {
    ($('#myModal') as any).modal('hide'); // Close the modal
  }

  
  fetchFacility(event:any)
  {
    debugger
    this.searchText=event.target.value;
    if(event.target.value.trim()!="")
    {

      this.list= this.fItems.filter(x=> x.organization_Name.toLowerCase().includes(this.searchText.toLowerCase()));
  if(this.list.length==0){
    this.list=null
  }
    }else this.list=null


   // this.OrganizationsList[index].Facility=(<HTMLInputElement>document.getElementById('facility_'+index)).value;

  }
}