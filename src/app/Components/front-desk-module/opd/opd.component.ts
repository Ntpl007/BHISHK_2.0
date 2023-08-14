import { TitleCasePipe, formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, HostListener,ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Area } from 'src/app/Model/Area';
import { Corporate } from 'src/app/Model/Corporate';
import { Doctors } from 'src/app/Model/Doctors';
import { Nationality } from 'src/app/Model/Nationality';
import { Occupation } from 'src/app/Model/Occupation';
import { PatientData } from 'src/app/Model/PatientData';
import { PatientRelation } from 'src/app/Model/PatientRelation';
import { PaymentVo } from 'src/app/Model/PaymentVo';
import { RefDoctor } from 'src/app/Model/RefDoctor';
import { Religion } from 'src/app/Model/Religion';
import { Speciality } from 'src/app/Model/Speciality';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-opd',
  templateUrl: './opd.component.html',
  styleUrls: ['./opd.component.css',"../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../css/dataTables.bootstrap4.min.css","../../../../css/style.css","../../../../css/bootstrap.min.css"
  ,"../../../../css/responsive.bootstrap4.min.css","../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../css/dataTables.bootstrap4.min.css","../../../../css/metisMenu.min.css"]
})
export class OpdComponent implements OnInit {

  minDate: { year: number; month: number; day: number; };
  constructor(private service:HimsServiceService,private http:HttpClient,private router:Router,private formbuilder:FormBuilder) {
    const current = new Date();
    this.minDate = {
      year: 1900,
      month: 1,
      day: 1
    };

   }
   //#region 
   isaadhaarvalid:boolean=false
   isaadhaarvalidsymbol?:boolean
   isconsultdoctorhide:boolean=true
   isnewchecked:boolean=false
   _aadhaar:any
   _districts:number=0
   _states:number=0
   opform:any
   states:any
   districts:any
  model?: NgbDateStruct;
  startDate:any
  date:Date=new Date()
  dt:any
  time:number=0;
  loginuser:any;
    docs: Doctors[]=[];
    OccuData:Occupation[]=[];
    Relig:Religion[]=[];
    nat:Nationality[]=[];
    areaa:Area[]=[];
    refd:RefDoctor[]=[];
    corp:Corporate[]=[];
    special:Speciality[]=[];
    relation:PatientRelation[]=[];
    dob:any ="";
   // displayedColumns=['firstName','mobileNumber']
  bg=""
  objpatinput:PaymentVo[]=[]
    //dataSource!:MatTableDataSource<any>;
    public text?=""
    finalamount?=""
    amnt?=""
    alt=""
    mobilenumber?:string=""
    Mobile?:string
    myform:FormGroup | undefined
    searchby?:number=0
      res?:number
       $: any;
    n?:number
    _patid:string|null=""
    isSubmitted=false
    name?: FormControl<any>;
    registerForm:any
  val:any |TitleCasePipe
    @ViewChild('reg') 
    public createform :NgForm | undefined;
    @ViewChild('Mobilenumsearch')
    Mobilenumsrch!: ElementRef;
    combobox!:ElementRef;
    Sex?:number=0;
    relation_data="relationtype"
    init='';
    RGA:string=""
    fname=""
    selecteddate=""
  pd:PatientData[]=[]
  PatientData: any = [];
  isChecked:boolean=true
  _patientid?:number
  PatientData2: any = [];
  InputData:any;
  InputDataaray:any=[]
  MyInputData:any=[];
  relType?:number=0
  objdata:any
  prefix?:string="0"
  relname?:string
  religion?:number=0
  nationality?:number=0
  oc?:number=0
  _area?:number=0
  _address?:string
  _email?:string
  pid ?:number=0
  doctorid?:number=0
  refdoctorid?:number=0
  specialityid?:number=0
  corporateid?:number=0
  paymentmodeid?:number=0
  pat_id?:number=0
  myControl = new FormControl('');
  patientId?:number=0
  filteredOptions: Observable<string[]> | undefined;
  regcheckamount?:boolean=false
  customRadio?:boolean=false
  _conamount=""
  controlpath=""
  paymentcategory:any
  paymentMode:any
  myform1:any
  PaymentCategoryId=0
  corporateList:any
  Corporate=0
  iscorporateenable=false
  //op?:string="false"
    showModal: boolean = false;
    param1:any
    param2:any
   _payamount=""
   _isrdchecked:boolean=true
   isrestart:boolean=false
   iscontxtdisable:boolean=true
  listOfDisplayData:any;

//methods

options: string[] = ['One', 'Two', 'Three'];

//#endregion
  public onKeyUp(x:any) { // appending the updated value to the variable
  debugger;
  this.n=0
   this.n +=Number(x.target.value)+Number(this.RGA) ;
   //this.RGA="50";
    this.text =this.n.toString()
    this.finalamount=this.n.toString();
   
  }
  checkIsAadhaarValid(aadhaar:any)
  {
    debugger
    let input=aadhaar.target.value
    if(input.length==12)
    {
      this.service.checkAadhaarValid(input).subscribe((result=>
        {
          debugger
          this.isaadhaarvalid=result
          if(result==false)
          {
            this.isaadhaarvalidsymbol=true
          }else {
            this.isaadhaarvalid=true
            this.isaadhaarvalidsymbol=false
          } 
          
        }))
    }else{
      this.isaadhaarvalidsymbol=false
    }
   

  }

  showRowconsult()
  {
    debugger
    if( this.isconsultdoctorhide==false)
    {
      this.isconsultdoctorhide=true
      this.iscontxtdisable=true
      this._conamount="0"
      var RegAmount=(<HTMLInputElement>document.getElementById('txtRegAmount')).value
      this.finalamount=parseFloat(RegAmount) +parseFloat(this._conamount) +""

    }else{
      this.isconsultdoctorhide=false
      this.iscontxtdisable=false
     
    }
   
  }


   public gotoAbhaCreation()
   {
debugger
    this.router.navigate(['/AbhaHome']);


   }
  public getpatient(X:any)
  {
    this.listOfDisplayData=null
    this.mobilenumber=X.currentTarget.value;
    //this.mobilenumber=JSON.stringify({mobilenumber:this.mobilenumber})
    var mob=X.target.value;
    //debugger;
     if(this.mobilenumber?.length==10)
     {
    this.http.get<PatientData>(this.service.Serverbaseurl+'FetchMasterData/GetPatientDetails?mobilenumber='+this.mobilenumber).subscribe(
      (data: any)=>{
        debugger;
        this.listOfDisplayData = data;
        
      } 
      );
    }
  }
  
getdob(x:any)
{
  debugger;
  this.dob=x.target.value;
}
getpatientdata(index: any, SelectedPatient: any ){
   var patientId = SelectedPatient.patientId;
   debugger
   
   const inputElement = (<HTMLInputElement>document.getElementById('dob')).value;
  localStorage.setItem('pid',patientId)
  this._patientid=patientId
  this.http.get<PatientData>(this.service.Serverbaseurl+'FetchMasterData/GetPatientDetailsbypid?patientid='+patientId)
  .subscribe((result)=>{
 debugger;
    this.PatientData = result;
   // console.warn("RRRRR", this.PatientData[0].occupation)
   // console.log(this.PatientData)
    // this.showModal = false;
    this.fname=this.PatientData[0].firstName+" "+this.PatientData[0].lastName
    var dateofbirth= this.PatientData[0].dob.split("T");
    const current =new Date(this.PatientData[0].dob)
    this.startDate = {
      year: current.getFullYear(),
      month: current.getMonth() +1,
      day: current.getDate()
    };
    this.model=this.startDate
    
   // this.model2=this.minDate
   
    // var datestring = dateofbirth.Tostring();
    // var datesplit = dateofbirth[0].split("-");
    // const arr = this.PatientData[0].dob.split(' ');
    // const strDate = dateofbirth[0];
    // const dateArr = strDate.split('-');
    // const ngbDate: NgbDateStruct = {
    //   year: dateArr[2],
    //   month: dateArr[1],
    //   day: dateArr[0],
   // }
debugger
    
//this.dob = ngbDate//formatDate(this.PatientData[0].dob, 'yyyy-MM-dd', 'en-US'); // dateofbirth;
// this.dob= datesplit[2]+'-'+datesplit[1]+'-'+datesplit[0];
if(this.PatientData[0].relationtype!=null && this.PatientData[0].relationtype!="")
{
  this.relType=this.PatientData[0].relationtype
}
  
    this.Sex=this.PatientData[0].sex
    if(this.PatientData[0].prefix!=null && this.PatientData[0].prefix!="")
    {
      this.prefix=this.PatientData[0].prefix
    }
   
   
    this.Mobile=this.PatientData[0].mobileNumber
    if(this.PatientData[0].relationname!=null && this.PatientData[0].relationname!="")
    {
      this.relname=this.PatientData[0].relationname
    }

    if(this.PatientData[0].religionid!=null && this.PatientData[0].religionid!="")
    {
      this.religion=this.PatientData[0].religionid
    }
    
    if(this.PatientData[0].nationalityid!=null && this.PatientData[0].nationalityid!="")
    {
      this.nationality=this.PatientData[0].nationalityid
    }
    
    if(this.PatientData[0].occupation!=null && this.PatientData[0].occupation!="")
    {
      this.oc=this.PatientData[0].occupation
    }
   
    if(this.PatientData[0].areaid!=null && this.PatientData[0].areaid!="")
    {
      this._area=this.PatientData[0].areaid
    }
   
   
    if(this.PatientData[0].emailid && this.PatientData[0].emailid!="")
    {
      this._email=this.PatientData[0].emailid
    }
   
    //this._address=this.PatientData[0].
   
    this._address=this.PatientData[0].address
  })
}


SaveOp(input :NgForm)
  {
    this.isChecked=false
    this.isrestart=false;
    debugger;
   // this.res="";

   this._conamount=""
   let patid=localStorage.getItem('pid');
   // this._patid=localStorage.getItem('pid');
   localStorage.removeItem('pid');
   debugger;
    //var d_t=  
   this.MyInputData=input;
   this.MyInputData.PatientId=patid;
   //this.MyInputData.SpacialityId=(<HTMLInputElement>document.getElementById('ddlSpecialityId')) 
   let _dateofbirth=(<HTMLInputElement>document.getElementById('dob')).value;
   let datestruct=this.MyInputData.dob
   let year = datestruct.year
   let month = datestruct.month <= 9 ? '0' + datestruct.month : datestruct.month;;
   let day = datestruct.day <= 9 ? '0' + datestruct.day : datestruct.day;;
   let _dob = year + "-" + month + "-" + day;
   this.MyInputData.dob=_dateofbirth
   this.MyInputData.CreatedBy=localStorage.getItem('name');
   
   this.MyInputData.FacilityId=localStorage.getItem('facilityId');
   
   this.MyInputData.Organization_id=localStorage.getItem('organizationId');
   
   //var _paymentamount=this.InputData.PaymentAmount;
if(patid!=null && patid!="0")
{
  this.controlpath='CreateOP/SaveExistingOP'
 
}else this.controlpath='CreateOP/SaveOp'
  this.http.post<any>('https://localhost:44336/'+ this.controlpath,this.MyInputData).subscribe(
    (result)=>{
      var msg=result;
      if(msg.message=='Success')
      {
    if(this.MyInputData.PaymentAmount=="")
    {
      this._payamount="0";
    }else  this._payamount=this.MyInputData.PaymentAmount
      this.InputData=result;

      this.InputDataaray=[
        {
          PatienTId:this.InputData.patientID,
          encounterId:this.InputData.encounterID,
          Comments:this.MyInputData.Comments,
          createdBy:"admin",
          PaymentModeId:this.MyInputData.PaymentModeId,
          PaymentAmount:this._payamount,
          DoctorId:this.MyInputData.DoctorId,
          RefDoctorId:this.MyInputData.RefDoctorId,
          PaymentCategoryId:this.MyInputData.PaymentCategoryId,
          ChargeAmount:(<HTMLInputElement>document.getElementById('txtfinalamount')).value
      }

       ]
     
       debugger;
       //const httpOptions = {
       // headers: new HttpHeaders({'Content-Type': 'application/json'})
      //}
       //input.reset();
       var objpatinput=this.InputDataaray;
      this.http.post<void>('https://localhost:44311/'+"Payments/SavePayments",objpatinput).subscribe( );
      this.isaadhaarvalidsymbol=false
         Swal.fire('Thank you...','Saved Successfuly','success')
        debugger;
        this.isnewchecked=false
         this.text=""
         this.finalamount=""
         this.isChecked=false;
         this.pid=0
         this.searchby=0
         this.mobilenumber=""
        this._isrdchecked=false
        this._districts=0
        this._states=0
         this.createform?.reset({
        finalamount:"",
        Prefix:0,
        isrestart:false,
        
      RelationType:0,
      Sex:0,
      Occupation:0,
      name:['',Validators.required],
      ReligionId:0,
      NationalityId:0,
      AreaId:0,
      SpecialityId:0,
      DoctorId:0,
      RefDoctorId:0,
      CorporateId:0,
      PaymentModeId:0,
      pid:0,
      patientId:0,
      
      searchby:0,
      customRadio:false,
      regcheckamount:false
      
      });
    
      }else{
        debugger
      
        Swal.fire('',msg.message,'error');
      
      }
     // console.warn("result",result)
    }
  )
console.log(input)
this.listOfDisplayData=null
//this.init='select'
  }
   
  Clear(){
    debugger;
    this.text=""
     this.finalamount=''
     this.mobilenumber=""
     this.isChecked=false;
     this._isrdchecked=false
     this._conamount=""
     this.createform?.reset({
      isrestart:false,
      Prefix:0,
      RelationType:0,
      Sex:0,
      Occupation:0,
      name:['',Validators.required],
      ReligionId:0,
      NationalityId:0,
      AreaId:0,
      SpecialityId:0,
      DoctorId:this.init,
      RefDoctorId:this.init,
      CorporateId:this.init,
      PaymentModeId:this.init,
      pid:0,
      searchby:0,
      patientId:0,
      regcheckamount:false,
      customRadio:false
      
      });
  }

  public GetDistricts(Id:any)
  {
    debugger
    this.service.GetDistricts(Id).subscribe((result)=>this.districts=result)
  }
  
  modelBind(id:any)
  {
    debugger
 // this.service.GetRefDoctorbyspeciality(id.target.value).subscribe((result)=>{
  //  debugger
  //  this.refd=result})
  }

  public getCorporate(Id:any)
  {
    debugger
    if(Id.target.value=="3" || Id.target.value=="4" )
    {
      this.iscorporateenable=true;
      this.service.getCorporate(Id.target.value).subscribe((result)=>this.corporateList=result)
    }else this.iscorporateenable=false;
    
  }

//----------

  ngOnInit(): void {
    debugger
    this.RGA='50'
    this.finalamount=this.RGA
      
    localStorage.setItem('header','Detailed OP Registration')
   
    this.service.getDoctors().subscribe((result : Doctors[])=>(this.docs=result));
    this.service.GetOccupation().subscribe((result : Occupation[])=>(this.OccuData=result));
    this.service.getReligion().subscribe((result : Religion[])=>(this.Relig=result));
    this.service.getNationality().subscribe((result : Nationality[])=>(this.nat=result));
    this.service.getArea().subscribe((result : Area[])=>(this.areaa=result));
    this.service.GetRefDoctor().subscribe((result : RefDoctor[])=>(this.refd=result));
    //this.service.getCorporate().subscribe((result : Corporate[])=>(this.corp=result));
    this.service.GetStates().subscribe((result)=>(this.states=result));
    
    this.service.getSpeciality().subscribe((result : Speciality[])=>(this.special=result));
    
    this.service.getPatientRelation().subscribe((result : PatientRelation[])=>(this.relation=result));
    
this.service.GetPaymentCategory().subscribe((result)=>{this.paymentcategory=result})

this.service.GetPaymentMode().subscribe((result)=>{this.paymentMode=result})

    
   
  }

  
  @HostListener('document:click',['$event'])
  clickout(event: { target: any; }){
   
    if(this.Mobilenumsrch.nativeElement.contains(event.target)){
      this.showModal = true;
    }
    else{
      this.showModal = false;
    }
    
    }
}
