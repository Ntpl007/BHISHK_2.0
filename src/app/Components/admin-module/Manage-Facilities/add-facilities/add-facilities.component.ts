import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';
import * as jQuery from 'jquery';
@Component({
  selector: 'app-add-facilities',
  templateUrl: './add-facilities.component.html',
  styleUrls: ['./add-facilities.component.css']
})
export class AddFacilitiesComponent implements OnInit {
OrganizationsList:any
isSuperAdmin=false;
fControl:any
showModal=false;
searchText="";
fItems:any[]=[]
items: any[] = [
  { name: 'Item 1' },
  { name: 'Item 2' },
  { name: 'Item 3' },]
list:any=null
@ViewChild('StartTime')
Facility!: ElementRef;

  constructor(private service:HimsServiceService,
    private fb:FormBuilder,
    ) { }

    filteredItems(event:any) {
      debugger
      this.searchText=event.target.value;
      if(event.target.value.trim()!="")
      {

        this.list= this.fItems.filter(item => item.facilityName.toLowerCase().includes(this.searchText.toLowerCase()));
    if(this.list.length==0){
      this.list=null
    }
      }else this.list=null
     //return list;
    }
  CheckUserRole()
  {
    let Role=localStorage.getItem('role');
    if(Role=="Super Admin")
    {
       this.isSuperAdmin=true;
    }else if(Role=="Admin")
    {
       this.isSuperAdmin=false;
    }
    this.SetValidations(this.isSuperAdmin);

  }

  SelectedFacility(index:any,selected:any)
  {
debugger
this.searchText=selected.facilityName;
this.list=null

  }
 SetValidations(isSuperAdmin:boolean)
 {

  if(isSuperAdmin==true)
  {
      this.fControl=this.fb.group({
        OrganizationId:[0,Validators.required],
        FacilityId:['',Validators.required]
      })
  }else{
    this.fControl=this.fb.group({
      OrganizationId:[0,Validators.required],
      FacilityId:['',Validators.required]
    })
    this.fControl.get('OrganizationId').disable();
  }

 }


 query: string = '';
 suggestions: any[] = [];

  ngOnInit(): void {
    debugger
    this.CheckUserRole();
    this.service.GetTotalFecilities().subscribe((result:any)=>{this.fItems=result});
    this.service.GetOrganization().subscribe((result:any)=>
    {
debugger
      (this.OrganizationsList=result)
    })
   
  }
  
  // @HostListener('document:click',['$event'])
  // clickout(event: { target: any; }){
  //  //this.istartdatetouched=false
  //   if(this.Facility.nativeElement.contains(event.target)){
  //     this.showModal = true;
  //   }
  //   else{
  //     this.showModal = false;
  //   }
  //   debugger

  //   if(this.Facility.nativeElement.contains(event.target)){
  //    // let k=this.AppdateModel
  //    // let g=this.dateservice.GlobalStringDateFormat(this.AppdateModel)
  //     //  this.GetTimeSlotsForTimePicker(this.dateservice.GlobalStringDateFormat(this.AppdateModel),15)
        
  //       this.showModal = true;
  //     }
  //     else{
  //       this.showModal = false;
  //     //  this.istartdatetouched=true
  //     }

  // }

  
  openModal() {
    ($('#myModal') as any).modal('show');
 // Open the modal
  }

  closeModal() {
    ($('#myModal') as any).modal('hide'); // Close the modal
  }

}
