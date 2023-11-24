import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';
import { AddOrganizationPopupComponent } from '../../Popups/add-organization-popup/add-organization-popup.component';
import { BehaviorSubject } from 'rxjs';
import { EditOrganizationComponent } from '../../Popups/edit-organization/edit-organization.component';
import { FacilityListComponent } from 'src/app/Components/admin-module/Manage-Facilities/facility-list/facility-list.component';
import { ActivatedRoute } from '@angular/router';
import { EditFacilityComponent } from '../../Popups/edit-facility/edit-facility.component';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/Shared/user.service';
import { ImageUploadComponent } from 'src/app/Components/PopUps/image-upload/image-upload.component';

@Component({
  selector: 'app-add-organizations',
  templateUrl: './add-organizations.component.html',
  styleUrls: ['./add-organizations.component.css',"../../../../../css/style.css","../../../../../css/bootstrap.min.css"
  ,"../../../../../css/responsive.bootstrap4.min.css","../../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../../css/dataTables.bootstrap4.min.css","../../../../../css/metisMenu.min.css"],
  providers: [ImageUploadComponent]
})
export class AddOrganizationsComponent implements OnInit {
  OrganizationsList:any[]=[]
  isRecordsAvailable=false
  searchText=""
  fcontrol:any;
  isSelected=false
  Organization=""
  facilitiesbyorg:any
  FacilityList:any
  //isAddressExisted=false
  isRecordsHave=false;
  p:number=0;
  private isMobile = new BehaviorSubject<boolean>(false);
arraylist=[{Id:1,name:""},{}]
fItems:any[]=[]
fItems2:any[]=[]
organizationId=0;
issuperadmin:any
selectedOrganizationData:any[]=[]
list:any=null
src?:string = '';
file : any;
imagepath : string ='';
  constructor(private service:HimsServiceService,
    private fb:FormBuilder,
    private popup:MatDialog,
    private route:ActivatedRoute,
    private userservice:UserService,
    private imageUploadComponent : ImageUploadComponent
    ) {
      this.checkIfMobile();
      window.addEventListener('resize', () => this.checkIfMobile());
     
     

     }
     customValidator() {
      debugger
      return (control: FormControl) => {
        debugger
        const pattern = /^[A-Za-z ]+$/;
        if (!pattern.test(control.value)) {
          return { invalidInput: true };
        }
        return null;
      };
    }
Reset()
{
  debugger
  (<HTMLInputElement>document.getElementById('image_src')).style.backgroundImage = '';
  this.isSelected=false
 // this.isAddressExisted=false; 
  this.fcontrol=this.fb.group({
    Organization:['',[Validators.required,Validators.pattern('!/^[A-Za-z ]+$/')]],
    Address:['',[Validators.required,Validators.pattern('!/^[A-Za-z ]+$/')]],
    // src:['', Validators.required]
  })
  this.FacilityList=[]
  if(this.FacilityList.length>0)
  {
    this.isRecordsHave=true;
  } else this.isRecordsHave=true;
}
    private checkIfMobile() {
      this.isMobile.next(window.innerWidth <= 768); // Adjust the breakpoint as needed
    }
orgname=""
paramList:any
// processFile(imageInput: any)
//   {
//     debugger;
//     const file:File = imageInput.files[0];
//     const reader = new FileReader();
//     reader.addEventListener('load',(event) =>{
//       debugger;
//       this.src = event.target?.result?.toString();
//       this.file = file;
//     });
//     reader.readAsDataURL(file);
//   }
Binding2()
{
  
 //this.Organization=this.paramList.OrganizationName;
  this.organizationId=this.paramList.OrganizationId
  this.service.GetOrganization().subscribe((result:any)=>{
   (this.OrganizationsList=result)
 debugger
   let orgs=this.OrganizationsList.filter(x=>x.organizationId==this.organizationId)
   this.Organization=orgs[0].organization_Name
 
   
 })

}
respData:any
bindData(Id:any)
{
  debugger
  this.service.GetOrganizationDataById(Id).subscribe((result: any)=>{
    this.respData=result

    debugger
    (<HTMLInputElement>document.getElementById('Organization')).value=this.respData.organization;
    (<HTMLInputElement>document.getElementById('Address')).value=this.respData.address;
    this.fcontrol.get('Address').value=this.respData.organization;
    this.fcontrol.get('Organization').value=this.respData.address;
    
    console.log(this.respData.organizationimage);
    localStorage.setItem('imagepath',"");
    //localStorage.setItem('imagepath','123.jpg');
    
    // (<HTMLInputElement>document.getElementById('image_src')).style.backgroundImage = '';
    // console.log((<HTMLInputElement>document.getElementById('image_src')).style.backgroundImage);
    //this.imagepath = "123.jpg";
    //localStorage.setItem('imagepath','123.jpg');
    //this.imageUploadComponent.ngOnInit();
    //localStorage.setItem('imagepath','');
    //(<HTMLInputElement>document.getElementById('image_src')).style.backgroundImage =  `url('${this.respData.organizationimage}')`;
    //"url('"+this.respData.organizationimage+"')";
    //'url("'+this.respData.organizationimage+'")';
     
    
  })


}
  ngOnInit(): void {
    
    
  this.fcontrol=this.fb.group({
    Organization:['',[Validators.required,Validators.pattern(/^[A-Za-z -]+$/)]],
     Address:['',[Validators.required,Validators.pattern(/^[A-Za-z0-9 :,-/]+$/)]],
    //  src:['', Validators.required]
   })
   debugger
    if(localStorage.getItem('role')=='Super Admin')
    {
      localStorage.setItem('header','Add Organizations/Facilities')
       this.issuperadmin=true
    } else
    if(localStorage.getItem('role')=='Admin')
     {
    //   (<HTMLInputElement>document.getElementById('Organization')).value=;
    let k=this.userservice.getOrganizationName();
     
      localStorage.setItem('header','Add Facilities')
      this.issuperadmin=false
    }else this.issuperadmin=false
    
    this.route.queryParams.subscribe(params => {
       this.orgname = params['params'];
  });
  this.p=0;
 // this.Reset();
 debugger
  
if(this.orgname!=""&&this.orgname!=undefined)
{
//this.Reset();
  const textDecoder = new TextDecoder('utf-8');
  const text =atob(this.orgname) //textDecoder.decode(new Uint8Array(this.orgname.length).map((_, i) => this.orgname.charCodeAt(i)));
  this.paramList=JSON.parse(text)
  this.getFacilityList(this.paramList.OrganizationId)
  this.bindData(this.paramList.OrganizationId)
this.isSelected=true;

  //this.Organization=this.paramList.OrganizationName;
  this.organizationId=this.paramList.OrganizationId
  this.service.GetOrganization().subscribe((result:any)=>{
   this.OrganizationsList=result
 debugger
   let orgs=this.OrganizationsList.filter(x=>x.organizationId==this.organizationId);
   //this.Organization=orgs[0].organization_Name
   this.fcontrol.get('Organization').setErrors(null)
   this.fcontrol.get('Address').setErrors(null)
  
   //this.bindData(this.paramList.OrganizationId)
  })
     
     // this.getFacilityList(this.paramList.OrganizationId)
}
   // this.service.GetTotalFecilities().subscribe((result:any)=>{this.fItems=result});
    this.service.GetOrganization().subscribe((result:any)=>{(this.OrganizationsList=result)})
   
  }
  address="";
  SelectedOrganization(index:any,selected:any)
  {
debugger
this.isSelected=true
    this.fcontrol.get('Organization').patchValue(selected.organization_Name);
    (<HTMLInputElement>document.getElementById('Address')).value=selected.organization_Name
//this.Organization=selected.organization_Name;
    this.organizationId=selected.organizationId
    this.getFacilityList(selected.organizationId)
    //this.service.GetFacilitiesList(selected.organizationId).subscribe((result)=>{this.FacilityList=result})
    this.service.GetFecility(selected.organizationId).subscribe((result)=>{this.facilitiesbyorg=result})
    this.service.GetOrganizationAddress(selected.organizationId).subscribe((result)=>
{ this.address=result;
  (<HTMLInputElement>document.getElementById('Address')).value=result;
  if(result!=null||result!="")
  {
    //this.isAddressExisted=true;
    this.fcontrol.get('Address').setErrors(null);
  }else{
    this.fcontrol.get('Address').setErrors('required');
  //  this.isAddressExisted=false;
  } 
})
this.list=null

  }
  
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
  getFacilityList(OrgId:number)
  {
    this.service.GetFacilitiesList(OrgId).subscribe((result)=>{this.FacilityList=result
    if(this.FacilityList.length>0)
    {
      this.isRecordsHave=true
    } else this.isRecordsHave=true
    })
   
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
  filteredItems(event:any) {
    debugger
    
    this.searchText=event.target.value;
    if(this.searchText==" ")
    {
      (<HTMLInputElement>document.getElementById('Organization')).value="";
   
    }
    const pattern = / {2,}/;

    if (pattern.test(this.searchText)) {
      debugger
      const modifiedText =  this.searchText.trim().replace(/ +/g, ' ');
     let  modifiedText2 = modifiedText.replace(/ +$/, '');
    //  const modifiedText = this.searchText.replace(/ +/, ' ');
      (<HTMLInputElement>document.getElementById('Organization')).value=modifiedText;
    }
    if(event.target.value.trim()!="")
    {
      this.fItems2=this.OrganizationsList
      this.list= this.fItems2.filter(item => item.organization_Name.toLowerCase().includes(this.searchText.toLowerCase()));
  if(this.list.length==0){
    this.list=null
  }
    }else {
      
this.isSelected=false;
      (<HTMLInputElement>document.getElementById('Address')).value=""
     // this.isAddressExisted=false
      this.list=null
    }
   //return list;
  
  }
  selected={organization_Name:'',organizationId:0}
  OrganizationsList2:any[]=[]
  
  openEditOrganizationPopup() {
   debugger
    // if (this.isMobile.value) {
    //   // Modify the dialog size for mobile view
    //   this.config = {  width: '90%', maxWidth: '90%' ,data:{organizationName:(<HTMLInputElement>document.getElementById('Organization')).value,address:(<HTMLInputElement>document.getElementById('Address')).value,organizationId: this.organizationId}};
    // }else{
    //   this.config = {  width: '50%', maxWidth: '50%',data:{organizationName:(<HTMLInputElement>document.getElementById('Organization')).value,address:(<HTMLInputElement>document.getElementById('Address')).value,organizationId: this.organizationId}};
    // }
    if( this.organizationId!=0)
    {
this.Update();
  //     const dialogRef=this.popup.open(EditOrganizationComponent,this.config
        
    
  // )
  // dialogRef.afterClosed().subscribe(result => {
  //   debugger
  //   this.service.GetOrganization().subscribe((result:any)=>{
  //     debugger
  //     this.OrganizationsList2=result;
  //     let org=this.OrganizationsList2.filter(x=>x.organizationId==(this.organizationId));
  //     this.fcontrol.get('Organization').value=org[0].organization_Name;
  //     this.selected.organization_Name=(<HTMLInputElement>document.getElementById('Organization')).value
  //     this.selected.organizationId=org[0].organizationId
  //     this.SelectedOrganization(0,this.selected)
  //     this.Binding2();

  //     })
  //  // This code will execute when the dialog is closed
  //  //this.Reset()
   
  // });
  
    }else{
      Swal.fire('Please select Organization From Dropdown','','info')
    }
   
     
    }
    isUpdated:any
    formdata={Organization:'',OrganizationId:0,Address:'', organizationimage:''}
  Update(){
debugger

this.formdata.Organization=(<HTMLInputElement>document.getElementById('Organization')).value;
this.formdata.OrganizationId=this.organizationId;
this.formdata.Address=((<HTMLInputElement>document.getElementById('Address')).value);
var og= (<HTMLInputElement>document.getElementById('image_src')).style.backgroundImage;
this.formdata.organizationimage = og.replace("url(","").replace(")","").slice(1);
//this.formdata.src= this.src?.toString();     

$('#overlay').fadeIn();
this.service.UpdateOrganization(this.formdata).subscribe((result)=>
{
  debugger
  //OrganizationId
this.isUpdated=result;
if(result>0)
{
  Swal.fire('Updated Successfully','','success')
}

this.bindData(this.organizationId)
if(this.isUpdated>0)
{
  this.paramList.OrganizationName=  (<HTMLInputElement>document.getElementById('Address')).value;
  this.paramList.Address=(<HTMLInputElement>document.getElementById('Address')).value;
  $('#overlay').fadeOut();
  Swal.fire('Updated Successfully','','success')

}else  Swal.fire('Nothing is Changed','','info')
})
  }
  config={}
  openModal(dataList:any) {
  debugger
  dataList.organizationId=this.organizationId;
  dataList.Address=this.address==""?(<HTMLInputElement>document.getElementById('Address')).value:this.address;
  this.Organization=(<HTMLInputElement>document.getElementById('Organization')).value;
  dataList.Organization=this.Organization;
  var og= (<HTMLInputElement>document.getElementById('image_src')).style.backgroundImage;
  dataList.organizationimage = og.replace("url(","").replace(")","").slice(1);
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
 debugger
 //this.Reset()
 this.LoadFacilities();
});

 }

  }

  dataList2:any
  openEditFacilityPopup(index:any,item:any) {
   debugger
   
  this.checkIfMobile();
  window.addEventListener('resize', () => this.checkIfMobile());
    if (this.isMobile.value) {
      // Modify the dialog size for mobile view
      this.config = {  width: '90%', maxWidth: '90%' ,data:item};
    }else{
      this.config = {  width: '50%', maxWidth: '50%',data:item };
    }
    const dialogRef=this.popup.open(EditFacilityComponent,this.config
     
    
  )
  dialogRef.afterClosed().subscribe(result => {
   // This code will execute when the dialog is closed
   //this.Reset()
   this.LoadFacilities();
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
  }

  @ViewChild('mytable')
  mytable!: ElementRef;
isVisible=false;
@HostListener('document:click',['$event'])
clickout(event: { target: any; }){
 
 debugger

  if(this.mytable.nativeElement.contains(event.target)){
   
    this.isVisible = true;
  }
  else{
    this.isVisible = false;
  }
  
  }
}
