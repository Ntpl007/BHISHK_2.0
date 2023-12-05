import { TitleCasePipe, formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';
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
import { DateService } from 'src/app/Shared/date.service';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';
import { DialogcommunicationService } from 'src/app/Shared/dialogcommunication.service';
import { LoadingPopupComponent } from 'src/app/Components/PopUps/loading-popup/loading-popup.component';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/Shared/user.service';

@Component({
  selector: 'app-opd',
  templateUrl: './opd.component.html',
  styleUrls: ['./opd.component.css',"../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../css/dataTables.bootstrap4.min.css","../../../../css/style.css","../../../../css/bootstrap.min.css"
  ,"../../../../css/responsive.bootstrap4.min.css","../../../../css/buttons.bootstrap4.min.css" ,
  "../../../../css/dataTables.bootstrap4.min.css","../../../../css/metisMenu.min.css"]
})
export class OpdComponent implements OnInit {
  form!: FormGroup;
    submitted = false;
   
;
  minDate: { year: number; month: number; day: number; };
  maxDate:{ year: number; month: number; day: number; };
  isrefNoShow=false
  constructor(private service:HimsServiceService,
    private dialogService:DialogcommunicationService,
    private http:HttpClient,private router:Router,
    private formbuilder:FormBuilder,
    private dateservice:DateService ,
    private userservice:UserService,
    private datePipe: DatePipe
   
    ) {
    const current = new Date();
    this.minDate = 
    {
      year: 1900,
      month: 1,
      day: 1
    };
    this.maxDate = {
      year: current.getFullYear(),
      month: current.getMonth()+1,
      day: current.getDate()
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
   response:any
   states:any
   myform:FormBuilder|undefined
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

    searchby?:number=0
      res?:number
       $: any;
    n?:number
    _patid:string|null=""
    isSubmitted=false
    name?: FormControl<any>;
    registerForm:any
  val:any |TitleCasePipe
  datepipe?:Date |TitleCasePipe
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
    lname=""
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
  _conamount="0"
  controlpath=""
  paymentcategory:any
  paymentMode:any
  myform1:any
  PaymentCategoryId=0
  corporateList:any
  Corporate=0
  submittrue=false
  iscorporateenable=false
  aadhaar01accaptable=false
chkConsultation=false;
  mobile05accaptable=false
  //op?:string="false"
    showModal: boolean = false;
    param1:any
    param2:any
   _payamount=""
   _isrdchecked:boolean=true
   isrestart:boolean=false
   iscontxtdisable:boolean=true
  listOfDisplayData:any;
  dobModel:any=""
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



  setGenderByprefix(event:any)
  {

    debugger
    if(event.target.value=="Mr"||event.target.value=="Mrs")
    {
     // this.Sex=1;
      this.opform.get('Sex').patchValue(1)
    }
    if(event.target.value=="Miss"||event.target.value=="Ms")
    {
     // this.Sex=2
     this.opform.get('Sex').patchValue(2)
    }
    if(event.target.value=="Others")
    {
     // this.Sex=3
     this.opform.get('Sex').patchValue(3)
    }
    

  }

  onDateSelectDob(event:any) {
    debugger
    let year = event.year;
    let month = event.month <= 9 ? '0' + event.month : event.month;;
    let day = event.day <= 9 ? '0' + event.day : event.day;;
     let actual = day + "-" + month + "-" + year;
   // let gloabaldate=year+"-"+month + "-" +day;
       this.dobModel=actual;
      // (<HTMLInputElement>document.getElementById('dob')).value=actual
      this.getAgeInDays(this.dateservice.GlobalStringDateFormat(actual) );
   }
checkMobileisInteger(event:any)
{
  var istrue=this.checkIsinteger(event)
  if(istrue==false)
  {
    this.Mobile=""
  }
}

  checkIsAadhaarValid(aadhaar:any)
  {
   this.onKeyDown(aadhaar)



      let input=aadhaar.target.value
      if(input.length==12)
      {
        this.service.checkAadhaarValid(input).subscribe((result=>
          {

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
  conAmountisReadobly=true;
  showRowconsult()
  {

    debugger
    if( this.isconsultdoctorhide==false)
    {
      this.isconsultdoctorhide=true
      this.iscontxtdisable=true
      this._conamount="0"
    //   var RegAmount=(<HTMLInputElement>document.getElementById('txtRegAmount')).value
    //   this.finalamount=parseFloat(RegAmount) +parseFloat(this._conamount) +""  ;    
    
    //  (<HTMLInputElement>document.getElementById('txtPaymentAmount')).value=this.finalamount
     
      this.conAmountisReadobly=true


    }else{
      this.isconsultdoctorhide=false
      this.iscontxtdisable=false
      // var RegAmount=(<HTMLInputElement>document.getElementById('txtRegAmount')).value
      // this.finalamount=parseFloat(RegAmount) +parseFloat(this._conamount) +""  ;    
      // (<HTMLInputElement>document.getElementById('txtPaymentAmount')).value=this.finalamount
      this.conAmountisReadobly=false
    

    }

  }

  
 clearField()
 {
  debugger
  (<HTMLInputElement>document.getElementById('BenificiaryId')).value='';
  this.opform.get('BenificiaryId').setErrors('required');
 }
  UpdateConAmount(event:any)
  {
    debugger
    let text=(<HTMLInputElement>document.getElementById('txtconamount')).value;
    if(text=="")
    {
      (<HTMLInputElement>document.getElementById('txtconamount')).value="0";
    }let convertedText=Number(text);
    (<HTMLInputElement>document.getElementById('txtconamount')).value=convertedText.toString();
  }

   public gotoAbhaCreation()
   {
debugger
    this.router.navigate(['/AbhaHome']);


   }


   GetDoctor(id:any)
   {
    this.service.GetDoctorbyspeciality(id.target.value).subscribe((result : Doctors[])=>(this.docs=result));

  this.service.GetRefDoctorbyspeciality(id.target.value).subscribe((result : RefDoctor[])=>(this.refd=result));
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
    this.fname=this.PatientData[0].firstName
    this.lname=this.PatientData[0].lastName
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


SaveOp(data :any)
  {

    if((data.City==undefined&&data.Village==undefined)||(data.City==""&&data.Village==""))
  {
    Swal.fire('Please fill City / Village any one of them','','info')
  }else{
    if(data.City!="")
    {
      data.City=this.service.ToCapital(data.City);
    }
    if(data.Village!="")
    {
      data.Village=this.service.ToCapital(data.Village);
    }
   
  }
      //#region 
    this.isChecked=false
    this.isrestart=false;
    debugger;
     this.MyInputData=data;
    let sex=(<HTMLInputElement>document.getElementById('ddlSex')).value;
     if(data.conamount.trim()!="")
     {
       this.opform.get('conamount').setErrors(null);
      
     }else{
      this.opform.get('conamount').setErrors('required');
     }
   
   if(data.PaymentCategoryId=="1")
   {
     this.opform.get('CorporateId').setErrors(null);
     this.opform.get('BenificiaryId').setErrors(null);
   }else{
    if(this.opform.get('CorporateId').value!="0")
    {
      this.opform.get('CorporateId').setErrors(null);
    }else  this.opform.get('CorporateId').setErrors({ customError: true });

    if(this.opform.get('BenificiaryId').value!="")
    {
      this.opform.get('BenificiaryId').setErrors(null);
    }
   else  this.opform.get('BenificiaryId').setErrors({ customError: true });

   }

   this.MyInputData.dob=this.dateservice.GlobalStringDateFormat(data.dob)

   this.MyInputData.CreatedBy=this.userservice.getUserName()
    this.MyInputData.FacilityId=this.userservice.getFacilityId()
    this.MyInputData.Organization_id=this.userservice.getOrganizationId()
   
if(this.isconsultdoctorhide==true)
{
 
    this.opform.get('SpacialityId').setErrors(null);
 
    this.opform.get('DoctorId').setErrors(null)
 
    this.opform.get('RefDoctorId').setErrors(null)
 
    this.opform.get('RefDoctorId').setErrors(null)
  
}else{
  
  if(this.opform.get('SpacialityId').value!="0")
  {
    this.opform.get('SpacialityId').setErrors(null);
  }else this.opform.get('SpacialityId').setErrors({ customError: true });

  if(this.opform.get('DoctorId').value!="0")
  {
    this.opform.get('DoctorId').setErrors(null)
  }
else  this.opform.get('DoctorId').setErrors({ customError: true });
 

}
this.MyInputData.Sex=sex;
//#endregion 
debugger
 this.controlpath='CreateOP/SaveOp'
 if(this.opform.invalid)
 {
  
  this.validateallformfields(this.opform);
  
 //(<HTMLInputElement>document.getElementById('txtName')).focus();
 }else
 {
  if(this.MyInputData.City.trim()!=""||this.MyInputData.Village.trim()!="")
  {
  this.openDialog();

  this.http.post<any>(this.service.Serverbaseurl+ this.controlpath,this.MyInputData).subscribe(
    (result)=>{
      debugger;
      var msg=result;
      if(msg.encounterID=="" && msg.opID==0)
      {
      this.http.get<any>(this.service.Serverbaseurl+'api/Home/GetRegistrationPaymentDetails?PatientId='+msg.patientID).subscribe((result1)=>
      { 
        debugger
        if(result1.length!=0)
        {
         
        this.ShowingRegPaymentReceipt(result1[0]);
        }
      })
    }
    
    else
    {
      if(this.MyInputData.PaymentAmount=="")
      {
        this._payamount="0";
      }else  this._payamount=this.MyInputData.PaymentAmount
        this.InputData=result;
        debugger
      this.InputDataaray=[
        {
          PatienTId:this.InputData.patientID,
          ReferenceNo:data.ReferenceNo,
          encounterId:this.InputData.encounterID,
          Comments:this.MyInputData.Comments,
          createdBy:localStorage.getItem('name'),
          PaymentModeId:this.MyInputData.PaymentMode,

          // PaymentAmount:this._payamount,
          DoctorId:this.MyInputData.DoctorId,
          RefDoctorId:this.MyInputData.RefDoctorId,
          PaymentCategoryId:this.MyInputData.PaymentCategoryId,
          PaymentAmount:(<HTMLInputElement>document.getElementById('txtPaymentAmount')).value,
          ChargeAmount:(<HTMLInputElement>document.getElementById('txtfinalamount')).value
      }

       ]

       debugger;
       //const httpOptions = {
       // headers: new HttpHeaders({'Content-Type': 'application/json'})
      //}
       //input.reset();
       var objpatinput=this.InputDataaray;
      this.http.post<void>(this.service.Serverbaseurl+"api/Payments/SavePayments",objpatinput).subscribe((result)=>{
      debugger 
      this.http.get<any>(this.service.Serverbaseurl+'api/Home/GetRegistrationandConsulatationPaymentDetails?PatientId='+msg.patientID+'&EncounterId='+msg.encounterID).subscribe((result2)=>
        { debugger
          if(result2.length!=0)
          {
           
          this.ShowingRegConsultationPaymentReceipt(result2[0]);
          }
        })
      });
     
    }
   
      this.isaadhaarvalidsymbol=false
      Swal.fire('Thank you...','Saved Successfuly','success')
  //   if(msg.encounterID=="" && msg.opID==0)
  //   {
  //     this.http.get<any>('https://localhost:44336/'+'api/Home/GetRegistrationPaymentDetails?PatientId='+msg.patientID).subscribe((result1)=>
  //   { 
  //     debugger
  //     if(result1.length!=0)
  //     {
       
  //     this.ShowingRegPaymentReceipt(result1[0]);
  //     }
  //   })
  // }
  // else{
  //     this.http.get<any>('https://localhost:44336/'+'api/Home/GetRegistrationandConsulatationPaymentDetails?PatientId='+msg.patientID+'&EncounterId='+msg.encounterID).subscribe((result2)=>
  //     { debugger
  //       if(result2.length!=0)
  //       {
         
  //       this.ShowingRegConsultationPaymentReceipt(result2[0]);
  //       }
  //     })
  //   }
  
        debugger;
        this.isnewchecked=false
         this.text=""
         this.finalamount=""
         this.isChecked=false;
         this.pid=0
         this.searchby=0
         this.mobilenumber=""
        this._isrdchecked=false;

        (<HTMLInputElement>document.getElementById('txtconamount')).value="";

        this.Clear();
        this.closeAllDialogs();

      // }
      debugger


      //     let apdata=data;
      //     apdata.PatientId=this.InputData.patientID
      // this.service.SaveAppointments(data).subscribe((result)=>
      // {
      //   debugger
      //   this.response=result;
      //   if(this.response>0)
      //   {




      //     (<HTMLInputElement>document.getElementById('Mobilenumsearch')).value=""

      //     this.closeAllDialogs();
      //     Swal.fire('Success','Appointment Successfully Booked','success')

      //     this.Clear()
      //   } else{

      //     Swal.fire('info','Something went wrong','info')
      //     this.closeAllDialogs();
      //     this.Clear()
      //   }


      // },
      // error=>
      // {
      //   debugger
      //   this.closeAllDialogs();
      //   Swal.fire('','Please fill all the required fields','info')
      //   //this.reset()
      // }
      // )
      // debugger
      //    }
      // else{
      //   debugger

      //   Swal.fire('',msg.message,'error');

      }
     // console.warn("result",result)

  )
console.log(data)
this.listOfDisplayData=null
//this.init='select'
 }
 }
  }

public Clear(){
  debugger
  (<HTMLInputElement>document.getElementById('txtAge')).value="";
  (<HTMLInputElement>document.getElementById('ddlAgeMode')).value="0";
  (<HTMLInputElement>document.getElementById('txtfinalamount')).value=this.RGA
  this.finalamount=this.RGA
this._conamount="0"
this.districts=null;
this.mobile05accaptable=false
this.aadhaar01accaptable=false
this.opform=this.formbuilder.group({
 FirstName:['',Validators.required],
 LastName:['',Validators.required],
 dob:["",Validators.required],
 Sex:[{value:'0',disabled: true}],
  Aadhaar:['',[Validators.required,Validators.pattern(/^[2-9]\d{11}$/)]],
  MobileNumber:['',[Validators.required,Validators.pattern(/^[6-9]\d{9}$/)]],
  ReligionId:['0',Validators.required],
  NationalityId:['0',Validators.required],
  HouseNo:['',Validators.required],
  State:['0',Validators.required],
  District:['0',Validators.required],
  City:[''],
  Village:[''],
  Pincode:['',[Validators.required,Validators.minLength(6)]],
  SpacialityId:['0',Validators.required],
  DoctorId:['0',Validators.required],
  RefDoctorId:['0'],
  Prefix:['Prefix*',Validators.required],
  Occupation:['0',Validators.required],
  CorporateId:['0',Validators.required],
  BenificiaryId:['',Validators.required],
  PaymentAmount:[this.RGA,Validators.required],
  PaymentMode:['0',Validators.required],
  Comments:[''],
  PaymentCategoryId:['0',Validators.required],
  EmailId: ['', Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i)])],
  conamount:['0',[Validators.required,Validators.pattern(/^[0-9]\d{9}$/)]],
  txtRefDoctor:[''],
  ReferenceNo:['',Validators.required]

});

this.iscorporateenable=false
this.isconsultdoctorhide=true;
(<HTMLInputElement>document.getElementById('customRadio7')).checked=false

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
  public GetConsultationAmount()
  {
    let OrganizationId=localStorage.getItem('organizationId')
    let FacilityId=localStorage.getItem('facilityId')
    let DoctorId=this.opform.get('DoctorId').value;
    this.service.GetConsultationAmount(DoctorId,OrganizationId,FacilityId,725).subscribe((result : any)=>{
       // alert(result);
       
       this.opform.get('conamount').patchValue(result);
        let payamt= parseFloat(this.RGA)+parseFloat(result);
        this.opform.get('PaymentAmount').patchValue(payamt);
      });
  }

  public getCorporate(Id:any)
  {
    debugger
    this.opform.get('BenificiaryId').patchValue('');
    if(Id.target.value=="3" || Id.target.value=="4"|| Id.target.value=="2" )
    {

      this.opform.get('CorporateId').setErrors('required');

      this.iscorporateenable=true;
      this.service.getCorporate(Id.target.value).subscribe((result)=>this.corporateList=result)
    }else
    {
      this.iscorporateenable=false;
      //this.opform.get('CorporateId').setErrors(null)
    //  this.opform.get('BenificiaryId').setErrors(null)


    }


  }

  public dropdownchange(event:any)
  {
    debugger
    this.opform.get('BenificiaryId').patchValue('');
   
  }

  public checkIsinteger(evt:any):boolean
  {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
      return false;
    return true;
  }
  validateallformfields(formgroup:FormGroup)
{
  debugger
 Object.keys(formgroup.controls).forEach(fields=>{
const control=formgroup.get(fields)
if(control instanceof FormControl)
{
  control.markAsTouched({onlySelf:true})
  window.scrollTo({ top: 0, behavior: 'smooth' });
}else if(control instanceof FormGroup)
{
  this.validateallformfields(control)
}
})
}

public checkVAlidAadhaar(event:any)
{
 let isvalid= this.service.isValidNumber(event);
 if(isvalid==false)
 {
(<HTMLInputElement>document.getElementById('Aadhaar')).value='';
 }else
 if((<HTMLInputElement>document.getElementById('Aadhaar')).value="0")
 {
  (<HTMLInputElement>document.getElementById('Aadhaar')).value='';

 }
}



  AcceptHouseNoOnly(event: KeyboardEvent) {
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-','/'];

    // Convert the pressed key to lowercase for case-insensitive comparison
    const pressedKey = event.key.toLowerCase();

    // Check if the pressed key is in the allowedKeys array
    if (!allowedKeys.includes(pressedKey)) {
      event.preventDefault(); // Prevent the keypress if not allowed
    }
  }



  onKeyDownForMobile(event: KeyboardEvent) {
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

    let txt=(<HTMLInputElement>document.getElementById('txtMobile')).value;

      if (event.key >= "0" && event.key <= "5") {
        if(txt.length==0)
    {
      this.mobile05accaptable=true
        event.preventDefault();
      }
    }else this.mobile05accaptable=false

      // Allow only numeric input
    if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) {
      if(txt.length<10){
        this.mobile05accaptable=true
      }else  this.mobile05accaptable=false


        event.preventDefault();
      }

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

  onKeyDownForMobile2(event: KeyboardEvent) {
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

    let txt=(<HTMLInputElement>document.getElementById('Mobilenumsearch')).value;

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

    //Paymentamount


  onKeyDownForPayment(event: KeyboardEvent) {
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

    // let txt=(<HTMLInputElement>document.getElementById('txtPaymentAmount')).value;

    //   if (event.key >= "0") {
    //     if(txt.length==0)
    // {
    //          event.preventDefault();
    //   }
    // }

      // Allow only numeric input
    if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) {


        event.preventDefault();
      }

    }
//pincode

onKeyDownForPincode(event: KeyboardEvent) {
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

  let txt=(<HTMLInputElement>document.getElementById('Pincode')).value;

    if (event.key == "0") {
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


  //aadhaarvalidations

  onKeyDown(event: KeyboardEvent) {
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
    let txt=(<HTMLInputElement>document.getElementById('Aadhaar')).value;
    if (event.key >= "0" && event.key <= "1") {
      if(txt.length==0)
  {

    this.aadhaar01accaptable=true;
    event.preventDefault();
  }
  }else  this.aadhaar01accaptable=false;
    // Allow only numeric input
    if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) {
      if(txt.length<12)
      {
        this.aadhaar01accaptable=true;
      }
     else this.aadhaar01accaptable=false;
      event.preventDefault();
    }}


      AcceptHousenumberOnly(event: KeyboardEvent) {
        debugger
        event.preventDefault(); // Prevent the key from being entered




    }
  
  ngOnInit(): void {
    debugger
    this.RGA='50'
    this.finalamount=this.RGA;
    
    (<HTMLInputElement>document.getElementById('txtPaymentAmount')).value=this.RGA
   

    localStorage.setItem('header','Detailed OP Registration')

   // this.service.getDoctors().subscribe((result : Doctors[])=>(this.docs=result));
    this.service.GetOccupation().subscribe((result : Occupation[])=>(this.OccuData=result));
    this.service.getReligion().subscribe((result : Religion[])=>(this.Relig=result));
    this.service.getNationality().subscribe((result : Nationality[])=>(this.nat=result));
    this.service.getArea().subscribe((result : Area[])=>(this.areaa=result));
   // this.service.GetRefDoctor().subscribe((result : RefDoctor[])=>(this.refd=result));
    //this.service.getCorporate().subscribe((result : Corporate[])=>(this.corp=result));
    this.service.GetStates().subscribe((result)=>(this.states=result));

    this.service.getSpeciality().subscribe((result : Speciality[])=>(this.special=result));

    this.service.getPatientRelation().subscribe((result : PatientRelation[])=>(this.relation=result));

this.service.GetPaymentCategory().subscribe((result)=>{this.paymentcategory=result})

this.service.GetPaymentMode().subscribe((result)=>{this.paymentMode=result});
const emailPattern = new RegExp('\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*');

//let pattern = "\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*";

this.opform=this.formbuilder.group({
  FirstName:['',Validators.required],
  LastName:['',Validators.required],
  dob:["",Validators.required],
  Sex:[{value:'0',disabled: true}],
  Aadhaar:['',[Validators.required,Validators.pattern(/^[2-9]\d{11}$/)]],
  MobileNumber:['',[Validators.required,Validators.pattern(/^[6-9]\d{9}$/)]],
  ReligionId:['0',Validators.required],
  NationalityId:['0',Validators.required],
  HouseNo:['',[Validators.required,Validators.pattern(/^[A-Za-z0-9/.,\\-]*$/)]],
  State:['0',Validators.required],
  District:['0',Validators.required],
  City:[''],
  Village:[''],
  Pincode:['',[Validators.required,Validators.minLength(6)]],
  SpacialityId:['0',Validators.required],
  DoctorId:['0',Validators.required],
  RefDoctorId:['0'],
  Prefix:['Prefix*',Validators.required],
  Occupation:['0',Validators.required],
  CorporateId:['0',Validators.required],
  BenificiaryId:['',Validators.required],
  PaymentAmount:[this.RGA,Validators.required],
  PaymentMode:['0',Validators.required],
  Comments:[''],
  PaymentCategoryId:['0',Validators.required],
 // EmailId: ['', Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i)])],
 EmailId: ['', Validators.compose([Validators.required,Validators.pattern(emailPattern)])],
 
 conamount:['0',[Validators.required,Validators.pattern(/^[0-9]\d{9}$/)]],
  txtRefDoctor:[''],
  
  ReferenceNo:['',[Validators.required,Validators.pattern(/^[A-Za-z0-9]*$/)]]

});


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
    closeAllDialogs(): void {
      this.dialogService.closeAll();
    }
    openDialog(): void {
      debugger
      this.dialogService.open(LoadingPopupComponent, {
       // width: '250px', // Adjust the width as needed
       data:"Saving....."
      });
      const dialogRef = this.dialogService.open(LoadingPopupComponent);

  dialogRef.afterClosed().subscribe((result) => {
    debugger
    if (result === 'OK') {
      console.log('OK was clicked');
      // this.ShowingPaymentReceipt('12');
    }
    });
  }



     ShowingRegPaymentReceipt(test:any) {
      debugger;             

                var address=''
                if((test.village!= null && test.village!="")&& (test.city!=null && test.city!="")) 
                {
                address=test.village+','+test.city;
                } 
                else if((test.village== null || test.village=="")&& (test.city!=null && test.city!="")) 
                {
                address=test.city;
                } 
                else if((test.village!= null && test.village!="")&& (test.city==null || test.city=="")) 
                {
                address=test.village;
                }  
                else{
                address='-------';
                }       

              //  var result= numToWords(test.registrationAmount);
             
                var PaymentMode="";
                if(test.paymentMode==1)
                {
                  PaymentMode="Payment(CASH)";

                }
                else if(test.paymentMode==2)
                {
                  PaymentMode="Payment(DEBIT/CREDIT CARD)";
                }
                else if(test.paymentMode==5)
                {
                  PaymentMode="Payment(CHEQUE)";
                }
                else if(test.paymentMode==9)
                {
                  PaymentMode="Payment(RTGS)";
                }
                else if(test.paymentMode==8)
                {
                  PaymentMode="Payment(NEFT)";
                }
                else if(test.paymentMode==10)
                {
                  PaymentMode="Payment(UPI)";
                }
                else 
                {
                  PaymentMode="Payment(Payments From IP)";
                }
                const inputDateString = test.createdDate;
                const inputDate = new Date(inputDateString);
                var formattedDate = this.datePipe.transform(inputDate, 'dd/MM/yyyy  HH:mm a');
                var HeaderFields = " <table style='font-size:20px' width='100%' border='0' align='center' cellpadding='0' cellspacing='0'><tr><td width='2%'></td><td>"  + "</td><td><b>Bill No:" +test.receiptNumber + "</b></td><td align='right'><img src='assets/img/bhishak.png' style='height:85px;width:150px'/> </td><td width='5%'></td></tr><tr><td width='2%'></td></tr><tr><td colspan='5' align='center'><hr /> </td></tr></table>"
                var PatientDetails = "<table style='font-size:12px' width='100%' border='0' align='center' cellpadding='0' cellspacing='0'><tr><td width='2%'></td><td width='8%' align='left'><b>Patient</b></td><td width='1%' align='center'><b>:</b></td><td width='20%' align='left'>" + test.name + "</td><td  width='8%' align='left'><b>Patient Id  </b></td><td align='center' ><b>:</b></td><td  width='19%' align='left'>" + test.patientMrn + "</td><td width='8%' align='left'><b>Mobile</b></td><td  width='34%'><b>: </b>" + test.mobileNumber + "</td></tr><tr><td width='2%'></td><td align='left' width='8%'><b>Age/Gender</b></td><td align='center' width='1%' ><b>:</b></td><td align='left' width='20%'>" + ''
                + test.age+" "+ test.ageModeId + "/" + test.gender + "</td><td align='left' width='8%'><b>OP ID</b></td><td align='center'><b>:</b></td><td align='left' width='19%'>" + "-------"+ "</td><td align='left' width='8%'><b>Bill Date</b></td><td width='34%'><b> :</b> " + formattedDate+ "</td></tr><tr><td width='2%'></td><td align='left' width='8%' ><b>Address</b></td><td align='center' width='1%'><b>:</b></td><td align='left' width='20%'>" +address  + "</td><td align='left' width='8%'><b>Corporate</b></td><td align='center' ><b>:</b></td><td align='left' width='19%'>" + "----" + "</td><td align='left' width='8%'><b>Ref.Doctor</b></td><td width='34%'><b>:</b> " + "-----" + "</td></tr><tr><td width='2%'></td><td width='8%' align='left'><b>Doctor</b></td><td width='1%' align='center'><b>:</b></td><td width='70%' align='left' colspan='6'>" + "---------" + "</td></tr><tr><td colspan='9'><hr/></td></tr></table>"
                var ParticularsHeader = "<table width='100%' style='font-size:12px'  border='0' align='center' cellspacing='0' cellpadding='0'><tr><td width='5%'></td><td width='45%'><strong>Particulars</strong></td><td width='15%'><strong>No.of Units</strong></td><td width='30%' align='right'><strong>Amount</strong></td><td width='5%'></td></tr><tr><td colspan='5'><hr/></td></tr>"          
                var Particulars = "";
                var Notes = "";
                var Footer = "";
                var TotalCharges = 0;                
                var encId='';
                var IsReview=false;                
                const numWords = require('num-words') 
                const amountInWords =this.service.ToCapital(numWords(test.regPaidAmount))  
                var Review=0;
                Particulars = Particulars + "<tr><td width='5%'></td><td width='45%'>" + 'Registration' + "</td><td width='15%'>" + '1' + " </td><td width='30%' align='right'>" + test.registrationAmount + ".00</td><td width='5%'></td></tr>";
                Notes = "<tr><td colspan='5'></td></tr><tr><td colspan='5'></td></tr><tr><td colspan='5'><hr/></td></tr></table><table width='100%' style='font-size:12px'  border='0' align='center' cellspacing='0' cellpadding='0'><tr><td></td><td></td><td align='right'><b>Total Charges:&#160;&#160;" + test.registrationAmount + ".00</b></td><td width='5%'></td></tr><tr><td colspan='4'><hr></hr></td></tr><tr><td width='2%'></td><td>" + PaymentMode + "</td><td align='right'><b>" + test.regPaidAmount + ".00</b></td><td width='5%'></td></tr><tr><td colspan='4'><hr></hr></td></tr> <tr><td width='2%'></td><td width='30%'><b>Notes :</b>" + 0 + "</td><td><b>Total In Words:</b>" +amountInWords+" "+ 'Rupees Only' + "&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;<b>" + Review + "</b></td><td width='5%'></td></tr><tr><td width='2%'></td><td><b>Payment Received By:&#160;&#160;</b>" + 'ntc'
                 + "</td><td align='right'>Authorised Signature</td><td width='5%'></td></tr><tr><td colspan='4'><hr></hr></td></tr><tr><td colspan='4' align='center'>16-11-404/16, SBI Officers Colony Rd,Moosarambagh, Hyderabad-500036</td></tr>";
                Footer = "<tr> </tr>";
                var mywindow = window.open('', 'Payment Voucher', 'height=512,width=960');
                mywindow?.document.write('<html><head><style type="text/css">@media print    {.printView        {            display: none;        }    }    @page    {        size: A4;       margin: 1;    }</style><style>@media print    {#printpagebutton        {            display: none;        }    } </style><style>@media print    {#OPprintpagebutton        {            display: none;        }    } </style><title>Payment Voucher</title>');
                mywindow?.document.write("<script type='text/javascript'>function printpage(){ window.open('PrintPages/PatientEncounterPrescriptionPagePreviewNew.aspx?EncounterId=" + encId + "&WithHeader=" + false + ",width=1000,height=525');}");
                mywindow?.document.write('\<\/script\>');
                mywindow?.document.write("<script type='text/javascript'>function OPprintpage(){ window.open('PrintPages/OPConsultationPrescription.aspx?EncounterId=" + encId + "&IsReview=" + IsReview + "&WithHeader=" + false + ",width=1000,height=525');}");
                mywindow?.document.write('\<\/script\>');
                mywindow?.document.write('</head><body >');
                mywindow?.document.write(HeaderFields + PatientDetails + ParticularsHeader + Particulars + Notes + Footer);
                mywindow?.document.write('</table></body></html>');
                mywindow?.print();
         
    }

 
    ShowingRegConsultationPaymentReceipt(test:any) {
      debugger;             

                var address=''
                if((test.village!= null && test.village!="")&& (test.city!=null && test.city!="")) 
                {
                address=test.village+','+test.city;
                } 
                else if((test.village== null || test.village=="")&& (test.city!=null && test.city!="")) 
                {
                address=test.city;
                } 
                else if((test.village!= null && test.village!="")&& (test.city==null || test.city=="")) 
                {
                address=test.village;
                }  
                else{
                address='-------';
                }       

             
                var PaymentMode="";
                if(test.paymentMode==1)
                {
                  PaymentMode="Payment(CASH)";

                }
                else if(test.paymentMode==2)
                {
                  PaymentMode="Payment(DEBIT/CREDIT CARD)";
                }
                else if(test.paymentMode==5)
                {
                  PaymentMode="Payment(CHEQUE)";
                }
                else if(test.paymentMode==9)
                {
                  PaymentMode="Payment(RTGS)";
                }
                else if(test.paymentMode==8)
                {
                  PaymentMode="Payment(NEFT)";
                }
                else if(test.paymentMode==10)
                {
                  PaymentMode="Payment(UPI)";
                }
                else 
                {
                  PaymentMode="Payment(Payments From IP)";
                }

              
                const inputDateString = test.createdDate;
                const inputDate = new Date(inputDateString);
                var formattedDate = this.datePipe.transform(inputDate, 'dd/MM/yyyy  HH:mm a');
                var HeaderFields = " <table style='font-size:20px' width='100%' border='0' align='center' cellpadding='0' cellspacing='0'><tr><td width='2%'></td><td>"  + "</td><td><b>Bill No:" +test.receiptNumber + "</b></td><td align='right'><img src='assets/img/bhishak.png' style='height:85px;width:150px'/> </td><td width='5%'></td></tr><tr><td width='2%'></td></tr><tr><td colspan='5' align='center'><hr /> </td></tr></table>"
                var PatientDetails = "<table style='font-size:12px' width='100%' border='0' align='center' cellpadding='0' cellspacing='0'><tr><td width='2%'></td><td width='8%' align='left'><b>Patient</b></td><td width='1%' align='center'><b>:</b></td><td width='20%' align='left'>" + test.name + "</td><td  width='8%' align='left'><b>Patient Id  </b></td><td align='center' ><b>:</b></td><td  width='19%' align='left'>" + test.patientMrn + "</td><td width='8%' align='left'><b>Mobile</b></td><td  width='34%'><b>: </b>" + test.mobileNumber + "</td></tr><tr><td width='2%'></td><td align='left' width='8%'><b>Age/Gender</b></td><td align='center' width='1%' ><b>:</b></td><td align='left' width='20%'>" + ''
                + test.age+" "+ test.ageModeId + "/" + test.gender + "</td><td align='left' width='8%'><b>OP ID</b></td><td align='center'><b>:</b></td><td align='left' width='19%'>" + "-------"+ "</td><td align='left' width='8%'><b>Bill Date</b></td><td width='34%'><b> :</b> " + formattedDate + "</td></tr><tr><td width='2%'></td><td align='left' width='8%' ><b>Address</b></td><td align='center' width='1%'><b>:</b></td><td align='left' width='20%'>" +address  + "</td><td align='left' width='8%'><b>Corporate</b></td><td align='center' ><b>:</b></td><td align='left' width='19%'>" + "----" + "</td><td align='left' width='8%'><b>Ref.Doctor</b></td><td width='34%'><b>:</b> " + "-----" + "</td></tr><tr><td width='2%'></td><td width='8%' align='left'><b>Doctor</b></td><td width='1%' align='center'><b>:</b></td><td width='70%' align='left' colspan='6'>" + "---------" + "</td></tr><tr><td colspan='9'><hr/></td></tr></table>"
                var ParticularsHeader = "<table width='100%' style='font-size:12px'  border='0' align='center' cellspacing='0' cellpadding='0'><tr><td width='5%'></td><td width='45%'><strong>Particulars</strong></td><td width='15%'><strong>No.of Units</strong></td><td width='30%' align='right'><strong>Amount</strong></td><td width='5%'></td></tr><tr><td colspan='5'><hr/></td></tr>"          
                var Particulars = "";
                var Notes = "";
                var Footer = "";
                var TotalCharges = 0;                
                var encId='';
                var IsReview=false;                
                const numWords = require('num-words') 
                const amountInWords =this.service.ToCapital( numWords(test.regPaidAmount) )
                var Review=0;
                Particulars = Particulars + "<tr><td width='5%'></td><td width='45%'>" + 'Registration' + "</td><td width='15%'>" + '1' + " </td><td width='30%' align='right'>" + test.registrationAmount + ".00</td><td width='5%'></td></tr>";
                Notes = "<tr><td colspan='5'></td></tr><tr><td colspan='5'></td></tr><tr><td colspan='5'><hr/></td></tr></table><table width='100%' style='font-size:12px'  border='0' align='center' cellspacing='0' cellpadding='0'><tr><td></td><td></td><td align='right'><b>Total Charges:&#160;&#160;" + test.registrationAmount + ".00</b></td><td width='5%'></td></tr><tr><td colspan='4'><hr></hr></td></tr><tr><td width='2%'></td><td>" + PaymentMode + "</td><td align='right'><b>" + test.regPaidAmount + ".00</b></td><td width='5%'></td></tr><tr><td colspan='4'><hr></hr></td></tr> <tr><td width='2%'></td><td width='30%'><b>Notes :</b>" + 0 + "</td><td><b>Total In Words:</b>" + amountInWords+" "+'Rupees Only' + "&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;<b>" + Review + "</b></td><td width='5%'></td></tr><tr><td width='2%'></td><td><b>Payment Received By:&#160;&#160;</b>" + 'ntc'
                 + "</td><td align='right'>Authorised Signature</td><td width='5%'></td></tr><tr><td colspan='4'><hr></hr></td></tr><tr><td colspan='4' align='center'>16-11-404/16, SBI Officers Colony Rd,Moosarambagh, Hyderabad-500036</td></tr>";
                Footer = "<tr> </tr>";

                var HeaderFields1 = " <table style='font-size:20px' width='100%' border='0' align='center' cellpadding='0' cellspacing='0'><tr><td width='2%'></td><td>"  + "</td><td><b>Token Number:&#160;&#160;" + '' + "</b></td><td><b>Bill No:" +test.finalBillingId + "</b></td><td align='right'><img src='assets/img/bhishak.png' style='height:85px;width:150px'/> </td><td width='5%'></td></tr><tr><td width='2%'></td><td colspan='4' style='font-size:20px'><b>Chamber No:" + "" + "</b></td></tr><tr><td colspan='5' align='center'><hr /> </td></tr></table>"
                var PatientDetails1 = "<table style='font-size:12px' width='100%' border='0' align='center' cellpadding='0' cellspacing='0'><tr><td width='2%'></td><td width='8%' align='left'><b>Patient</b></td><td width='1%' align='center'><b>:</b></td><td width='20%' align='left'>" + test.name + "</td><td  width='8%' align='left'><b>Patient Id  </b></td><td align='center' ><b>:</b></td><td  width='19%' align='left'>" + test.patientMrn + "</td><td width='8%' align='left'><b>Mobile</b></td><td  width='34%'><b>: </b>" + test.mobileNumber + "</td></tr><tr><td width='2%'></td><td align='left' width='8%'><b>Age/Gender</b></td><td align='center' width='1%' ><b>:</b></td><td align='left' width='20%'>" + ''
                + test.age+" "+ test.ageModeId + "/" + test.gender + "</td><td align='left' width='8%'><b>OP ID</b></td><td align='center'><b>:</b></td><td align='left' width='19%'>" + test.opId+ "</td><td align='left' width='8%'><b>Bill Date</b></td><td width='34%'><b> :</b> " + formattedDate + "</td></tr><tr><td width='2%'></td><td align='left' width='8%' ><b>Address</b></td><td align='center' width='1%'><b>:</b></td><td align='left' width='20%'>" +address  + "</td><td align='left' width='8%'><b>Corporate</b></td><td align='center' ><b>:</b></td><td align='left' width='19%'>" + "</td><td align='left' width='8%'><b>Ref.Doctor</b></td><td width='34%'><b>:</b> " + ((test.refDoctorName != "" &&test.refDoctorName != null) ? test.refDoctorName : "-----------") + "</td></tr><tr><td width='2%'></td><td width='8%' align='left'><b>Doctor</b></td><td width='1%' align='center'><b>:</b></td><td width='70%' align='left' colspan='6'>" + test.listName + "</td></tr><tr><td colspan='9'><hr/></td></tr></table>"
                var ParticularsHeader1 = "<table width='100%' style='font-size:12px'  border='0' align='center' cellspacing='0' cellpadding='0'><tr><td width='5%'></td><td width='45%'><strong>Particulars</strong></td><td width='15%'><strong>No.of Units</strong></td><td width='30%' align='right'><strong>Amount</strong></td><td width='5%'></td></tr><tr><td colspan='5'><hr/></td></tr>"          
                var Particulars1 = "";
                var Notes1 = "";
                var Footer1 = "";
                var TotalCharges = 0;                
                var encId='';
                var IsReview=false;                
                const numWords1 = require('num-words') 
                const amountInWords1 = this.service.ToCapital(numWords(test.paidAmount))
                
                var Review=0;
                Particulars1 = Particulars1 + "<tr><td width='5%'></td><td width='45%'>" + 'Consultation' + "</td><td width='15%'>" + '1' + " </td><td width='30%' align='right'>" + test.totalBilledAmount + ".00</td><td width='5%'></td></tr>";
                Notes1 = "<tr><td colspan='5'></td></tr><tr><td colspan='5'></td></tr><tr><td colspan='5'><hr/></td></tr></table><table width='100%' style='font-size:12px'  border='0' align='center' cellspacing='0' cellpadding='0'><tr><td></td><td></td><td align='right'><b>Total Charges:&#160;&#160;" + test.totalBilledAmount + ".00</b></td><td width='5%'></td></tr><tr><td colspan='4'><hr></hr></td></tr><tr><td width='2%'></td><td>" + PaymentMode + "</td><td align='right'><b>" + test.paidAmount + ".00</b></td><td width='5%'></td></tr><tr><td colspan='4'><hr></hr></td></tr> <tr><td width='2%'></td><td width='30%'><b>Notes :</b>" + 0 + "</td><td><b>Total In Words:</b>" + amountInWords1+" "+'Rupees Only' + "&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;<b>" + Review + "</b></td><td width='5%'></td></tr><tr><td width='2%'></td><td><b>Payment Received By:&#160;&#160;</b>" + 'ntc'
                 + "</td><td align='right'>Authorised Signature</td><td width='5%'></td></tr><tr><td colspan='4'><hr></hr></td></tr><tr><td colspan='4' align='center'>16-11-404/16, SBI Officers Colony Rd,Moosarambagh, Hyderabad-500036</td></tr>";
                Footer1 = "<tr> </tr>";

                var mywindow = window.open('', 'Payment Voucher', 'height=512,width=960');
                mywindow?.document.write('<html><head><style type="text/css">@media print    {.printView        {            display: none;        }    }    @page    {        size: A4;       margin: 1;    }</style><style>@media print    {#printpagebutton        {            display: none;        }    } </style><style>@media print    {#OPprintpagebutton        {            display: none;        }    } </style><title>Payment Voucher</title>');
                mywindow?.document.write("<script type='text/javascript'>function printpage(){ window.open('PrintPages/PatientEncounterPrescriptionPagePreviewNew.aspx?EncounterId=" + encId + "&WithHeader=" + false + ",width=1000,height=525');}");
                mywindow?.document.write('\<\/script\>');
                mywindow?.document.write("<script type='text/javascript'>function OPprintpage(){ window.open('PrintPages/OPConsultationPrescription.aspx?EncounterId=" + encId + "&IsReview=" + IsReview + "&WithHeader=" + false + ",width=1000,height=525');}");
                mywindow?.document.write('\<\/script\>');
                mywindow?.document.write('</head><body >');
                mywindow?.document.write(HeaderFields + PatientDetails + ParticularsHeader + Particulars + Notes + Footer+HeaderFields1 + PatientDetails1 + ParticularsHeader1 + Particulars1 + Notes1 + Footer1);
                mywindow?.document.write('</table></body></html>');
                mywindow?.print();
         
    }

    public ShowRefNumber(event:any)
    {
      debugger
      let PaymentModeId=event.target.value;

      if(PaymentModeId==1)
      {
        this.isrefNoShow=false;
        this.opform.get('ReferenceNo').setErrors(null)
        
      }else 
      {
        this.opform.get('ReferenceNo').setErrors('required')
        this.isrefNoShow=true;
       
      }
      
    }
  
public getAgeInDays(dateOfBirth: any): number {
  var today = new Date();
  debugger
 // var dt=(<HTMLInputElement>document.getElementById('dob')).value
  var birthDate = new Date(dateOfBirth);
  
  // Calculate the time difference in milliseconds between today and the birth date
  var timeDiff = today.getTime() - birthDate.getTime();
  var age=0
  // Convert milliseconds to days (1 day = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
  var days = Math.floor(timeDiff / (24 * 60 * 60 * 1000));
  if(days>=365)
  {
    age=Math.floor(days/365);
    (<HTMLInputElement>document.getElementById('txtAge')).value=age.toString();
   (<HTMLInputElement>document.getElementById('ddlAgeMode')).value="3"
  }else
  if(days<365 && days>=30)
  {
    age=Math.floor(days/30);
    (<HTMLInputElement>document.getElementById('txtAge')).value=age.toString();
    (<HTMLInputElement>document.getElementById('ddlAgeMode')).value="2"
  }
  else
  if(days<30)
  {
   // age=Math.floor(days/30);
    (<HTMLInputElement>document.getElementById('txtAge')).value=days.toString();
   (<HTMLInputElement>document.getElementById('ddlAgeMode')).value="1"
  }
  return days;
}

}