import { Component, OnInit ,Inject} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { DialogcommunicationService } from 'src/app/Shared/dialogcommunication.service';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';
import { UserService } from 'src/app/Shared/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-organization-popup',
  templateUrl: './add-organization-popup.component.html',
  styleUrls: ['./add-organization-popup.component.css',"../../../../../css/style.css","../../../../../css/bootstrap.min.css"
  ,"../../../../../css/responsive.bootstrap4.min.css","../../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../../css/dataTables.bootstrap4.min.css","../../../../../css/metisMenu.min.css"]
})
export class AddOrganizationPopupComponent implements OnInit {
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
  newArray=new Array()
  
  isChecked=false;
 horizontalPosition: MatSnackBarHorizontalPosition = 'center';
 verticalPosition: MatSnackBarVerticalPosition = 'top';
 durationInSeconds=3
fItems:any[]=[]
fItems2:any[]=[]
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
    debugger
    this.service.GetFecility(this.Data.organizationId).subscribe((result:any)=>{
      debugger
      this.fItems2=result
    debugger
    });
    //this.service.GetTotalFecilities().subscribe((result:any)=>{this.fItems=result});
    this.rowlist=[{Sno:1,Organization:this.Data.Organization,Facility:"",
    Address:this.Data.Address,CreatedBy:this.user.getUserName(),FacilityAddress:""}]
    this._organization=this.rowlist[0].Organization;
    console.log(this.rowlist)
debugger
    
   
  }
  add()
  {
    debugger
    this.rowlist.push({Sno:this.rowlist.length+1, Organization:this._organization,
    Facility:"",
    Address:this.Data.Address,CreatedBy:this.user.getUserName()
  })
    this.newArray.push(this.rowlist)
    
debugger
  }
  remove(index:number,value:any)
  {
debugger
this.rowlist= this.rowlist.filter(x=>x.Sno!=value.Sno)

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
let k=0;
    for(var i=0;i<this.rowlist.length;i++)
    {
       if(this.rowlist[i].FacilityAddress.trim()=="")
       {
        Swal.fire('Address Should not be empty')
        k++;
       }
    }
if(k==0)
{
  debugger
   let istrue= this.hasDuplicates(this.rowlist)
       debugger
    if(istrue==false)
    {
      
      let data=this.rowlist;
      debugger;
      this.service.SaveOrganizationsbySuperAdmin(data).subscribe((result)=>{
       debugger
        let r=result;
        if(r>0)
        {
          Swal.fire('Succesfully Saved','','success')
          this.rowlist=[{Sno:1,Organization:this.Data.Organization,Facility:"",
      Address:this.Data.Address,CreatedBy:this.user.getUserName()}]
        }else if(r==0) {  this.AlertBox('Already Existed') ;
         this.rowlist=[{Sno:1,Organization:this.Data.Organization,Facility:"",
        Address:this.Data.Address,CreatedBy:this.user.getUserName()}]}
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
