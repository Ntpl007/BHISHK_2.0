import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { data } from 'jquery';
import { BehaviorSubject } from 'rxjs';
import { DialogcommunicationService } from 'src/app/Shared/dialogcommunication.service';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';
import { UserService } from 'src/app/Shared/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-doctor-facility-tariff',
  templateUrl: './edit-doctor-facility-tariff.component.html',
  styleUrls: ['./edit-doctor-facility-tariff.component.css',"../../../../../css/style.css","../../../../../css/bootstrap.min.css"
  ,"../../../../../css/responsive.bootstrap4.min.css","../../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../../css/dataTables.bootstrap4.min.css","../../../../../css/metisMenu.min.css"]
})

export class EditDoctorFacilityTariffComponent implements OnInit {

  myform:any
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

   rowlist1:any[]=[{
    Sno:0,
    Organization:"",
    FacilityId:"",
    ChargeItemId:"",
    BasePrice:"",
    DoctorId:"",
    UnitPrice:"",
    CreatedBy:"",
   }]

   rowlist2:any[]=[{
    Sno:0,
    DoctorTariffId:"",
    Organization:"",
    DoctorId:"",
    FacilityId:"",
    ChargeItemId:"",
    BasePrice:"",
    UnitPrice:"",
    CreatedBy:"",
   }]
  newArray=new Array()
  
  isChecked=false;
 horizontalPosition: MatSnackBarHorizontalPosition = 'center';
 verticalPosition: MatSnackBarVerticalPosition = 'top';
 durationInSeconds=3
fItems:any[]=[]
ChargeItem:any
fItems2:any[]=[]
chargeItemListNew:any
chargeItemList:any[]=[]
chargeItemList1:any[]=[]
chargeItemList2:any
chargrItemId:number=0
selectedItem:any
UnitCost:any
values:Number=0
selectedItemId:string | undefined
doctorList:any[]=[]

list:any=null
  constructor(
    
     @Inject(MAT_DIALOG_DATA) public Data: any,
    private service:HimsServiceService,
    private dialogCommunicationService: DialogcommunicationService,
    private user:UserService,
    private fb:FormBuilder,
    private _snackBar:MatSnackBar
    ) {
  
 
   }
  
  vitalsignsdetails=[]=[]
   ngOnInit(): void {
   let d=this.Data
    this.myform=this.fb.group({
      ChargeItemId:[0,Validators.required],
      DoctorId:[0,Validators.required]
    })
    
    debugger
    this.service.GetFecility(localStorage.getItem('organizationId')).subscribe((result:any)=>{
      debugger
      this.fItems2=result
    debugger
    });
    this.service.GetOrganisationDoctorDetails(localStorage.getItem('organizationId')).subscribe((result2:any)=>{
      debugger
      this.doctorList=result2
    debugger
    }); 

    this.service.GetChargeItemList().subscribe((result2:any)=>{
      debugger
      this.chargeItemList=result2
      
debugger
this.myform.get('ChargeItemId').patchValue(d.charge_Item_Id.toString());
this.myform.get('DoctorId').patchValue(d.doctor_Id.toString());
      (<HTMLInputElement>document.getElementById('Faddress_0')).value=d.base_Price.toString(); 
      (<HTMLInputElement>document.getElementById('UnitPrice_0')).value=d.overriden_Price.toString();

    debugger
    }); 
    debugger
    this.rowlist1=[{Sno:1,Organization:localStorage.getItem('organizationId'),FacilityId:this.Data,DoctorId:d.doctor_Id,
    ChargeItemId:d.charge_Item_Id.Tostring(),BasePrice:d.base_Price.toString(),UnitPrice:d.unit_Price.toString(),CreatedBy:this.user.getUserName()}]
    this._organization=this.rowlist[0].Organization;
    console.log(this.rowlist1)
debugger
    
   
  }
  LoadChargeItemData(event:any,index:number,id:any)
  {
    debugger
    this.selectedItem=event;    
    this.chargrItemId=event;
    debugger  
       

    let values=this.rowlist1.filter(x=>x.ChargeItemId== event);

    if(values.length>0)
    {
      Swal.fire('Charge Item Alredy Selected  Try Another')
    }
       
   let orgs=this.chargeItemList.filter(x=>x.chargeItemId==event)
   this.UnitCost=orgs[0].unitCost.toString();  
   (<HTMLInputElement>document.getElementById('Faddress_0')).value=this.UnitCost 
  
   this.ChargeItem=Number(event);


   this.rowlist1[index].BasePrice=(<HTMLInputElement>document.getElementById('Faddress_0')).value ;
   this.rowlist1[index].UnitPrice=(<HTMLInputElement>document.getElementById('UnitPrice_0')).value ;
   this.rowlist1[index].Organization=localStorage.getItem('organizationId')
   this.rowlist1[index].FacilityId=this.Data.facility_Id;
   this.rowlist1[index].ChargeItemId =this.ChargeItem;
   this.rowlist1[index].DoctorId =Number(id);
    
  }

  extractValueFromList(parameter: number): any {
    debugger
    this.service.GetChargeItemList().subscribe((result3:any)=>{
      this.chargeItemList1 =result3})
      debugger
    this.chargeItemList2 = this.chargeItemList1.find((data) => data.chargeItemId === parameter);
    return this.chargeItemList2
  }


  add()
  {
    debugger
    this.rowlist1.push({
    Sno:this.rowlist1.length+1, 
    Organization:this._organization,    
    FacilityId:"",
    doctorId:"",
    ChargeItemId:"",    
    BasePrice:"",
    UnitPrice:"",
    CreatedBy:this.user.getUserName()
  })
    this.newArray.push(this.rowlist1)
    
debugger
  }
  remove(index:number,value:any)
  {
debugger
this.rowlist1= this.rowlist1.filter(x=>x.Sno!=value.Sno)

    debugger
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
    debugger
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
      (<HTMLInputElement>document.getElementById('Faddress_'+index)).value=modifiedText;    }
    this.rowlist1[index].BasePrice=(<HTMLInputElement>document.getElementById('Faddress_'+index)).value ;
    this.rowlist1[index].UnitPrice=(<HTMLInputElement>document.getElementById('UnitPrice_'+index)).value ;
    this.rowlist1[index].Organization=localStorage.getItem('organizationId')
    this.rowlist1[index].FacilityId=this.Data.facility_Id;
    this.rowlist1[index].DoctorId=(<HTMLInputElement>document.getElementById('DoctorId'+index)).value ;
    
   if(this.ChargeItem == undefined)
   {
    this.rowlist1[index].ChargeItemId =this.myform.get('ChargeItemId').value;
   }
   else{
    this.rowlist1[index].ChargeItemId =this.ChargeItem;

   }

          
    
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
      let txt= (<HTMLInputElement>document.getElementById( "chargeitemid"+i)).value;
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
let k=0;

if(this.rowlist1[0].UnitPrice.trim()=="")
   {
    Swal.fire('Unit Price Should not be empty')
    
   }

   if(this.rowlist1[0].UnitPrice=="" &&this.rowlist1[0].BasePrice=="")
   {
    Swal.fire('Changes are Not Done')
    
   } 
     
    
if(k==0)
{
  debugger
  //  let istrue= this.hasDuplicates(this.rowlist1)
 let istrue=false;
       debugger
    if(istrue==false)
    {
      this.rowlist2=this.rowlist1;
      this.rowlist2[0].DoctorTariffId=this.Data.doctor_Tariff_Id.toString(); 
      this.rowlist2[0].CreatedBy=this.user.getUserName()     
      let data=this.rowlist2[0];
      debugger;
        this.service.UpdateDoctorFacilityTariffDetails(data).subscribe((result)=>
      {
       debugger
        let r=result;
        if(r>0)
        {
          Swal.fire('Succesfully Updated','','success')
          this.rowlist1=[{Sno:1,Organization:this.Data.Organization,FacilityId:"",
          ChargeItemId:"",BasePrice:"",UnitPrice:"",CreatedBy:this.user.getUserName()}]
        }else if(r==0) {  this.AlertBox('Already Existed') ;
        this.rowlist1=[{Sno:1,Organization:this.Data.Organization,FacilityId:"",
    ChargeItemId:"",BasePrice:"",UnitPrice:"",CreatedBy:this.user.getUserName()}]}
        else if(r=-1)
        {
          this.AlertBox('Please enter Facility Name')
        }
      })
    }
    else{
      this.AlertBox('Please Check is Facilities are Repeated?')
    }
   
    
}
   // this.rowlist[index].FacilityAddress
  

  }
  
  AlertBox(message:any)
  {
    this._snackBar.open(message,'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }

   validateAddress(event:any) {
    // Get the key code of the pressed key
    var keyCode = event.keyCode;
debugger
    // Allow alphanumeric characters, space, colons, semicolons, parentheses, and certain special characters (e.g., comma, period)
    if (
        (keyCode >= 48 && keyCode <= 57) || // 0-9
        (keyCode >= 65 && keyCode <= 90) || // A-Z
        (keyCode >= 97 && keyCode <= 122)// a-z 
    ) {
        return true; // Allow the keypress
    } else {
        event.preventDefault(); // Prevent the keypress
        return false;
    }
}


  view()
  {
    this.service.GetFecility(this.Data.organizationId).subscribe((result:any)=>{
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
  {debugger

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
      (event.keyCode >= 35 && event.keyCode <= 39)||// 0-9
      (event.keyCode === 188)|| // Comma
      (event.keyCode === 16) ||(event.keyCode === 18)||
      ((event.shiftKey && event.keyCode === 51)) ||//#
      ((event.shiftKey && event.keyCode === 186)) || //:
      (event.keyCode >= 48 && event.keyCode <= 57)  // 0-9
    ) {
      return;
    }
    debugger
    if (!/^[a-zA-Z]$/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete') {
      event.preventDefault();
    }
  }


}