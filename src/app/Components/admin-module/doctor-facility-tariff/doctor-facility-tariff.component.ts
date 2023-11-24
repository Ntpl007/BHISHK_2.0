import { Component, OnInit } from '@angular/core';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';
import { SpecialityVitalsignComponent } from '../../PopUps/Admin/speciality-vitalsign/speciality-vitalsign.component';
import { FacilitiTariffComponent } from '../../PopUps/Admin/faciliti-tariff/faciliti-tariff.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogcommunicationService } from 'src/app/Shared/dialogcommunication.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { DateService } from 'src/app/Shared/date.service';
import { UserService } from 'src/app/Shared/user.service';
import Swal from 'sweetalert2';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { EditFacilityTariffComponent } from '../../PopUps/Admin/edit-facility-tariff/edit-facility-tariff.component';
import { CreateDoctorFacilityTariffComponent } from '../../PopUps/Admin/create-doctor-facility-tariff/create-doctor-facility-tariff.component';
import { EditDoctorFacilityTariffComponent } from '../../PopUps/Admin/edit-doctor-facility-tariff/edit-doctor-facility-tariff.component';

@Component({
  selector: 'app-doctor-facility-tariff',
  templateUrl: './doctor-facility-tariff.component.html',
  styleUrls: ['./doctor-facility-tariff.component.css',"../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../css/dataTables.bootstrap4.min.css","../../../../css/style.css","../../../../css/bootstrap.min.css"
  ,"../../../../css/responsive.bootstrap4.min.css","../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../css/dataTables.bootstrap4.min.css","../../../../css/metisMenu.min.css"]
})
export class DoctorFacilityTariffComponent implements OnInit {

  myform:any
  isfootertrue=true;
  
  private dialogClosedSubscription?: Subscription;
  count:any
  inputtext:any
  selectedItem:any=0;
 specialityList:any
 FacilityList:any
 BindTabledata:any=null
 istrue:boolean=false
 isordernull=false
 VaitalInput={
  FacilityId:null,
  OrganizationId:null,
  SpecialityId:null
 }
 horizontalPosition: MatSnackBarHorizontalPosition = 'center';
 verticalPosition: MatSnackBarVerticalPosition = 'top';
 durationInSeconds=3
 constructor(private pop:MatDialog,
  private dateservice:DateService,
  private datePipe:DatePipe,
  private formbuilder:FormBuilder,
  private service:HimsServiceService,
  private rout:Router,
  private dialogCommunicationService:DialogcommunicationService,
  private fb:FormBuilder,
  private user:UserService,private _snackBar: MatSnackBar
 ) {
  this.myform=this.fb.group({

  });
  
  this.dialogClosedSubscription = this.dialogCommunicationService.dialogClosed$.subscribe(() => {
    this.methodToFireAfterDialogClosed();
  });
  }
 
  methodToFireAfterDialogClosed() {
    // Your method logic here
    debugger
    this.LoadVitalSignsData(this.selectedItem)
  }
//keydown event for accept only numbers and starting with 6 to 9 --madhu
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
  
    // Allow only numeric input
  if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) {
   
     
      event.preventDefault();
    }
  
  }
  onInputChange(index: number,list:any) {
    // Handle input change event for the specific row (index)
   debugger
  }
  updateModel(i:any,event:any)
  {
     
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
  
    // Allow only numeric input
  if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) {
   
    (<HTMLInputElement>document.getElementById( "txt_"+i)).value=""
      event.preventDefault();
    }else{
      let txt=(<HTMLInputElement>document.getElementById( "txt_"+i)).value
      
      for(var j=0;j<this.BindTabledata.length;j++)
      {
        if(this.BindTabledata[j].orderNumber==parseInt(txt))
        {
          if(i!=j)
          {
           // this.istrue=true;
          //  (<HTMLInputElement>document.getElementById( "txt_"+i)).value="";
         // this.BindTabledata[i].orderNumber=null;
           // this.AlertBox(txt+' order already given')
          }
         
          
        }
      }
      if(this.istrue==true)
      {
        (<HTMLInputElement>document.getElementById( "txt_"+i)).value=""
        this.BindTabledata[i].orderNumber=null
       
        this.istrue=false
      }else{
        if(parseInt(txt)>this.BindTabledata.length||parseInt(txt)==0)
        {
          this.AlertBox(txt+' is invalid order number');
          (<HTMLInputElement>document.getElementById( "txt_"+i)).value=""
          this.BindTabledata[i].orderNumber=null

        }else
        this.BindTabledata[i].orderNumber=txt
      }
     
    }
    debugger
   
  }
  AlertBox(message:any)
  {
    this._snackBar.open(message,'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }
  existedTrue(i:any,event:any)
  {

  }

  hasDuplicates(arr:any[]): boolean {
    const seen = new Set();
    let li=[]
    for(var i=0;i<arr.length;i++)
    {
      let txt= (<HTMLInputElement>document.getElementById( "txt_"+i)).value
      li.push(txt);
    }
    
    for (const item of li) {
      if (seen.has(item)) {

        return true;
      }
      seen.add(item);
    }
    return false;
  }
   isValueRepeated(arr: any[]): boolean {
    
    let count = 0;
   
    for(var i=0;i<arr.length;i++)
    {
      let txt= (<HTMLInputElement>document.getElementById( "txt_"+i)).value
      for (const item of arr) {
       
           if (item.orderNumber === txt) {
               count++;
           }
           if (item.orderNumber === null || txt.trim()=="") {
              this.isordernull=true;
        }
          
       }
    }
   
    return count > 1;
}
  UpdateVitalsOrder()
  {
   this.isordernull=false
    let a=this.BindTabledata;
    debugger
;
this.isValueRepeated(a)
if(this.isordernull==false)
  {
if (this.hasDuplicates(a)) {
this.AlertBox('Please make sure order no. should not be repeated')
   // console.log(`${valueToCheck} is repeated in the array.`);
} else {
  debugger
  
  this.service.UpdateVitalsignsOrder(this.BindTabledata).subscribe((result)=>
  {
    debugger
    if(result>0)
    {
      debugger
     
        this.LoadVitalSignsData(this.selectedItem)
        this.AlertBox('Success');
     
     
    }else  this.AlertBox('Order position not changed');
  })
}

    //console.log(`${valueToCheck} is not repeated in the array.`);
}else 
{
  this._snackBar.open('Please fill all the fields','X', {
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
    duration: this.durationInSeconds * 1000,
  });
  //this.AlertBox('Please fill all the fields');
}

  }
  LoadVitalSignsData(event:any)
  {
    this.selectedItem=event;    
    debugger
    this.VaitalInput.FacilityId=this.user.getFacilityId();
    this.VaitalInput.OrganizationId=this.user.getOrganizationId();
    let FacilityId=this.myform.get('FacilityId').value;
    this.VaitalInput.SpecialityId=event;  
    this.service.GetFecilityDoctorTariffDetails(this.VaitalInput.OrganizationId,FacilityId).subscribe(result=>{
      
    debugger
   
    if(result.length>0)
    {
      this.BindTabledata=result
      this.count=result.length
      this.isfootertrue=false
    }else   this.isfootertrue=true
  })
    
  }
  Remove(index:any,valueObj:any)
  {
    debugger
    this.service.RemoveDoctorFacilityTariffChargeId(valueObj.doctor_Tariff_Id).subscribe(((result)=>{
      if(result>0)
      {
        this.AlertBox(valueObj.chargE_ITEM+' is Removed');
        this.LoadVitalSignsData(this.selectedItem)
      }
      
    }))
    //facilityVitalSignId
  }
openPopup(event:any)
{
  
  debugger
  let facilityid=this.myform.get('FacilityId').value;
  if(facilityid==0)
  {
    this.myform.get('FacilityId').setErrors('required')
  }else{
    this.myform.get('FacilityId').setErrors(null)
  }
if(this.myform.invalid)
{
  this.validateallformfields(this.myform)
}else{

  const dialogRef=this.pop.open(CreateDoctorFacilityTariffComponent,{
    width:"60%",
    height:"310px",
    data:facilityid
      
}
)
dialogRef.afterClosed().subscribe(result => {
 // This code will execute when the dialog is closed
 this.LoadVitalSignsData(this.selectedItem)
});
}
}


openPopupEdit(index:any,valueObj:any)
{
  
  debugger
  let facilityid=this.myform.get('FacilityId').value;
  if(facilityid==0)
  {
    this.myform.get('FacilityId').setErrors('required')
  }else{
    this.myform.get('FacilityId').setErrors(null)
  }
if(this.myform.invalid)
{
  this.validateallformfields(this.myform)
}else{

  const dialogRef=this.pop.open(EditDoctorFacilityTariffComponent,{
    width:"60%",
    height:"310px",
    // data:facilityid,
    data:valueObj
      
}
)
dialogRef.afterClosed().subscribe(result => { 
 this.LoadVitalSignsData(this.selectedItem)
});
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
});
}
  ngOnInit(): void {
    debugger
    this.myform=this.fb.group({
      FacilityId:[0,Validators.required]
    })
    
  
    this.service.GetFecility(localStorage.getItem('organizationId')).subscribe((result:any)=>{
      debugger
      if(result!=null){
       
        this.FacilityList=result
      }
    })
    localStorage.setItem('header','Facility Doctor Tariff')
  }


}
