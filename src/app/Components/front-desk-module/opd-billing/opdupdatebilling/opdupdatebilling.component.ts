import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChargeItem } from 'src/app/Model/ChargeItem';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { NgFor, AsyncPipe, CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-opdupdatebilling',
  templateUrl: './opdupdatebilling.component.html',
  styleUrls: ['./opdupdatebilling.component.css', "../../../../../css/buttons.bootstrap4.min.css",
    "../../../../../css/dataTables.bootstrap4.min.css", "../../../../../css/style.css", "../../../../../css/bootstrap.min.css"
    , "../../../../../css/responsive.bootstrap4.min.css", "../../../../../css/buttons.bootstrap4.min.css",
    "../../../../../css/dataTables.bootstrap4.min.css", "../../../../../css/metisMenu.min.css"],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgFor,
    AsyncPipe,
    MatSelectModule,
    CommonModule,
    NgbTooltipModule,
  ]
})
export class OpdupdatebillingComponent implements OnInit {

  constructor(private service: HimsServiceService, private formbuilder: FormBuilder, private http: HttpClient, private router: Router) {

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(''))
      );
      this.currentDate = new Date();
  }
  currentDate: Date;
  Listdata: any;
  opbilling: any;
  public patientMRN: string = '';
  public opId: string = '';
  public gender: string = '';
  public doctor: string = '';
  public refDoctor: string = '';
  public corporate: string = '';
  public dateOfVisit: string = '';
  public mobileNo: string = '';
  public occupation: string = '';
  public religion: string = '';
  public name: string = '';
  public age: string = '';
  public ageMode: string = '';
  public patientId: string = '';
  public encounterId: string = '';
  public doctorId?: number;
  public refPhysicianId?: number;
  chargeItem: Array<ChargeItem> = [];
  chItem: any;
  chargeItemlist: any[] = [];
  billSummary:any[]=[];
  formGroup: any;
  paymentMode: any
  myControl = new FormControl('');
  chargeItems: ChargeItem[] = [];
  filteredOptions: Observable<ChargeItem[]>;
  chargeItemprice: number = 0;
  chargeId?: number;
  chargeName: string = '';
  noOfUnits: number = 1;
  unitPrice: number = 0;
  totAmount: number = 0;
  dueAmount: number = 0;
  payingAmount: number = 0;
  @ViewChild('txtNoOfUnits') txtNoOfUnits!: ElementRef;
  @ViewChild('txtPrice') txtPrice!: ElementRef;
  @ViewChild('txtPaymentAmount') txtPaymentAmount!: ElementRef;
  @ViewChild('txtdueAmount') txtdueAmount!: ElementRef;
  @ViewChild('txtDiscountAmount') txtDiscountAmount!: ElementRef;
  @ViewChild('txtDiscountPerc') txtDiscountPerc!: ElementRef;
  @ViewChild('ddlPaymentMode') ddlPaymentMode!: ElementRef;
  @ViewChild('txtRefNo') txtRefNo!: ElementRef;
  discAmount: number = 0;
  discPerc: number = 0;
  chargeItemData: any[] = [];
  isShown: boolean = false;
  selectedDiscountType: string = 'amount';
  percentageDiscountValue: number = 0;
  discountamountValue: number = 0;
  totdiscAmt:number=0;
  totpaidAmt:number=0;
  totdueAmt:number=0;
  isSummary:boolean=false;
  isPayment:boolean=false;
  RefNo:string='';

  ngOnInit(): void {
    debugger
    localStorage.setItem('header','OPD Billing Update')
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.GetPatientBillingDetails();
    this.GetChargeItemDetails();
    this.getBillChargeItemDetails();
    this.getBillPriceDetails();
    this.service.GetPaymentMode().subscribe((result) => { this.paymentMode = result })
    this.getBillSummaryDetails();

    this.opbilling = this.formbuilder.group({
      paymentMode: ['0', Validators.required],
      payingAmount: ['0', Validators.required],
      // TotalDueAmount: ['', Validators.required],
      // TotalDiscAmount: ['', Validators.required],
      // TotalDiscPerc: [''],
    });
  }
  private _filter(value: string): any[] {

    const filterValue = value;
    if (!isNaN(parseFloat(filterValue))) {
      return this.chargeItems.filter(chargeItems => chargeItems.shortName.includes(filterValue));
    } else {
      return this.chargeItems.filter(chargeItems => chargeItems.shortName.toLowerCase().includes(filterValue));
    }

  }
  public GetPatientBillingDetails() {

    let patientId = localStorage.getItem('patientId');
    this.service.GetPatientDetailsById(patientId).subscribe((result) => {
      debugger
      this.Listdata = result[0]


      debugger
      if (result[0] != null) {
        this.patientMRN = result[0].patientMrn;
        this.opId = result[0].opId;
        this.gender = result[0].gender;
        this.doctor = result[0].doctorName;
        this.refDoctor = result[0].referalDoctor;
        this.corporate = result[0].corporate;
        this.mobileNo = result[0].mobileNumber;
        this.occupation = result[0].occupation;
        this.religion = result[0].religionName;
        this.dateOfVisit = result[0].dateOfVisit.split('T')[0];
        this.name = result[0].name;
        this.age = result[0].age;
        this.ageMode = result[0].ageModeId;
        this.patientId = result[0].patientId;
        this.encounterId = result[0].encounterId;
        this.doctorId = result[0].doctorId;
        this.refPhysicianId = result[0].refPhysicianId;
      }
    });

  }

  public GetChargeItemDetails() {
    
    this.service.GetChargeItemDetails().subscribe((result: ChargeItem[]) => {
      debugger
      //this.chargeItem = result;
      if (result != null) {
        for (let item of result) {
          this.chargeItems.push({ encounterId: 0, patientId: 0, chargeItemId: item.chargeItemId, shortName: item.shortName, unitPrice: item.unitPrice, noOfUnits: 1, payingAmount: 0, discountAmount: 0, discountPerc: 0, amountPerc: 0, dueAmount: 0 })
          //this.chargeItem.push({ chargeItemId: item.chargeItemId, shortName: item.shortName })
        }
      }
    });
  }
  public getBillChargeItemDetails() {
    let encounterId = localStorage.getItem('encounterId');
    let billId = localStorage.getItem('billId');
    this.service.GetBillChargeItemDetails(billId,encounterId).subscribe((result: ChargeItem[]) => {
      debugger
      //this.chargeItem = result;
      if (result != null) {
        //this.ddlPaymentMode.nativeElement.value = result[0].paymentMode;
        for (let item of result) {

          this.chargeItemData.push({ EncounterId: item.encounterId, PatientId: item.patientId, ChargeItemId: item.chargeItemId, ProviderId: item.providerId, ShortName: item.shortName, UnitPrice: item.unitPrice, NoOfUnits: item.noOfUnits, ReferingPhysicianId: item.referingPhysicianId, PayingAmount: item.payingAmount, DiscountAmount: item.discountAmount, DiscountPerc: item.discountPerc, AmountPerc: item.amountPerc, DueAmount: item.dueAmount });
        }
        this.isShown = true;
      }
    });
  }

  public getBillPriceDetails() {
    let billId = localStorage.getItem('billId');
    this.service.GetBillPriceDetails(billId).subscribe((result: any) => {
      debugger
      //this.chargeItem = result;
      if (result != null) {
        this.totAmount = result[0].billedAmount;
       // this.payingAmount = result[0].totalPaidAmount;
       this.totpaidAmt=result[0].totalPaidAmount;
        this.dueAmount = result[0].totalDue;
        this.totdueAmt = result[0].totalDue;
       // this.discAmount = result[0].totalDiscountAmount;
        this.totdiscAmt=result[0].totalDiscountAmount;
        //this.ddlPaymentMode.nativeElement.value=result[0].paymentModeId;


      }
    });
  }
  public getBillSummaryDetails() {
    let billId = localStorage.getItem('billId');
    this.service.GetBillSummaryDetails(billId).subscribe((result: any) => {
      debugger
      if (result != null) {
      this.billSummary = result;
      }
    });
  }

  addChargeItems() {
    debugger
    if (this.chargeId == undefined || this.chargeId == null || this.chargeId == 0) {
      Swal.fire('Please Enter Charge Item', '', 'info');
    }
    const selectedItem = this.chargeItemData.find((item) => item.ChargeItemId === this.chargeId)
    //alert(selectedItem);
    if (selectedItem) {
      Swal.fire('Charge Item Already Selected', '', 'info');
      this.chargeId = 0;
      this.myControl.reset();
      this.chargeItemprice = 0;
      this.noOfUnits = 1;
    }
    else {


      this.isShown = true;
      if (this.chargeItemData != null) {
        this.chargeItemData = this.chargeItemData.map(item => ({
          ...item,

        }));
      }
      this.chargeItemData.push({ EncounterId: this.encounterId, PatientId: this.patientId, ChargeItemId: this.chargeId, ProviderId: this.doctorId, ShortName: this.chargeName, UnitPrice: this.chargeItemprice, NoOfUnits: this.noOfUnits, ReferingPhysicianId: this.refPhysicianId, PayingAmount: 0, DiscountAmount: 0, DiscountPerc: 0, AmountPerc: 0, DueAmount: 0 });
      this.totAmount = this.totAmount + this.chargeItemprice;
      this.dueAmount = this.dueAmount + this.chargeItemprice;
      this.totdueAmt=this.totdueAmt + this.chargeItemprice;
      this.chargeId = 0;
      this.myControl.reset();
      this.chargeItemprice = 0;
      this.noOfUnits = 1;
    }
  }
  getChargItem(chargeItemId: any): any {
    let chargeItemname: any;
    chargeItemname = this.chargeItems.find((option) => option.chargeItemId === chargeItemId)?.shortName;
    this.chargeName = chargeItemname;
    return chargeItemname;
  }
  getChargItemPrice(chargeItemId: any): any {
    debugger;
    let chargeItemnprice: any;
    this.service.GetDoctorChargePriceDetails(chargeItemId,this.doctorId).subscribe((result: any) => {
      debugger
      if (result.length>0) {
      this.chargeItemprice = result[0].unitPrice;
      this.unitPrice = result[0].unitPrice;
      }else{
        chargeItemnprice = this.chargeItems.find((option) => option.chargeItemId === chargeItemId)?.unitPrice;
        this.chargeItemprice = chargeItemnprice;
        this.unitPrice = chargeItemnprice;
      }
    });
    
    this.chargeId = chargeItemId;
    return chargeItemnprice;
  }
  getUnitPrice() {
    debugger;
    this.chargeItemprice = 0;

    if (this.txtNoOfUnits) {
      debugger;
      let price = this.unitPrice;
      const units = this.txtNoOfUnits.nativeElement.value;
      this.noOfUnits = units;
      this.chargeItemprice = units * Number(price);
    }


  }
  getTotalDue() {
    let payAmt = this.txtPaymentAmount?.nativeElement.value;
    //let dueAmt=this.txtdueAmount.nativeElement.value;
    if (this.selectedDiscountType == 'amount') {
      this.discAmount = this.txtDiscountAmount?.nativeElement.value;

    } else {
      this.discPerc = this.txtDiscountPerc?.nativeElement.value;
      if (this.discPerc != 0) {
        this.discAmount = Number((Number(this.totAmount) / 100) * Number(this.discPerc))
      }

    }
    if(payAmt>this.dueAmount){
      Swal.fire('Payment Amount should not allow more then Due Amount', '', 'info');
      this.txtPaymentAmount.nativeElement.value=0;
      return false;

    }
    if(this.discAmount>this.dueAmount){
      Swal.fire('Discount Amount should not allow more then Due Amount', '', 'info');
      this.txtDiscountAmount.nativeElement.value=0;
      this.discAmount=0;
      return false;

    }
//this.totdiscAmt=Number(this.discAmount)+Number(this.totdiscAmt);
    this.dueAmount = Number(this.totAmount) - Number(this.totpaidAmt)-Number(payAmt) - Number(Number(this.totdiscAmt) +Number(this.discAmount));

    
    this.totdueAmt=this.dueAmount;
   
   // this.totdiscAmt=this.discAmount;
    if (this.chargeItemData != null) {
      this.chargeItemData = this.chargeItemData.map(item => ({
        ...item,
        AmountPerc: ((item.UnitPrice * 100) / this.totAmount).toFixed(2),
        DiscountAmount: (((item.UnitPrice * 100) / this.totAmount) * (Number(this.totdiscAmt)+Number(this.discAmount)) / 100).toFixed(2),
        PayingAmount: (((item.UnitPrice * 100) / this.totAmount) * payAmt / 100).toFixed(2),
        DueAmount: (item.UnitPrice - (((item.UnitPrice * 100) / this.totAmount) * payAmt / 100) - (((item.UnitPrice * 100) / this.totAmount) * (Number(this.totdiscAmt)+Number(this.discAmount)) / 100)).toFixed(2),
      }));
    }
    //this.totdiscAmt=Number(this.discAmount)+Number(this.totdiscAmt);
    return true;
  }

  deleterow(row: any) {
    debugger;

    if (this.chargeItemData.length > 1) {
      var choice = confirm('Do you want to delete this Charge Item?');
      if (choice == true) {
        for (let i = 0; i <= this.chargeItemData.length; i++) {

          if (this.chargeItemData[i].ChargeItemId == row) {
            this.totAmount = this.totAmount - this.chargeItemData[i].UnitPrice;
            this.dueAmount = this.dueAmount - this.chargeItemData[i].UnitPrice;
            this.chargeItemData.splice(i, 1);

          }

        }
        let billId = localStorage.getItem('billId');
    this.service.deleteBillServiceDetails(billId,row).subscribe((result: any) => {
      debugger
      if (result != null) {
      this.billSummary = result;
      }
    });
      }
    }
  }
  getDiscountType(type: any) {
    // alert(type);
    this.selectedDiscountType = type;
    if (type == 'amount') {
      this.discPerc = 0;
    } else {
      this.discAmount = 0;
    }

  }
  
  showRowconsult() {
    debugger


  }
  validateallformfields(formgroup: FormGroup) {
    debugger
    Object.keys(formgroup.controls).forEach(fields => {
      const control = formgroup.get(fields)
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true })
      } else if (control instanceof FormGroup) {
        this.validateallformfields(control)
      }
    })
  }
  saveBilling(data: any) {

    //data.TotalPaidAmount=this.
    debugger;
    this.payingAmount = Number(this.txtPaymentAmount?.nativeElement.value);
    //this.validateallformfields(this.opbilling)

    if (this.chargeItemData.length == 0) {
      Swal.fire('Please Select atleast one Service', '', 'info');
      return false;
    }
    if (this.opbilling.invalid) {
      this.validateallformfields(this.opbilling)
    }

    if (Number(this.txtPaymentAmount?.nativeElement.value) == 0) {
      this.opbilling.get('payingAmount').pristine = true;
      this.opbilling.get('payingAmount').touched = true;
      //Swal.fire('Please Enter Paying Amount','','info');
      return false;
    }
    if (this.ddlPaymentMode?.nativeElement.value == "0") {
      this.opbilling.get('paymentMode').pristine = true;
      this.opbilling.get('paymentMode').touched = true;
      // Swal.fire('Please Select Payment Mode','','info');
      return false;
    }
    else {

      if (this.opbilling.valid) {
        data.TotalDiscAmount = Number(this.discAmount);
        data.TotalPaidAmount = Number(this.txtPaymentAmount?.nativeElement.value);
        data.TotalRefundAmount = 0;
        data.TotalDueAmount = this.dueAmount;
        data.TotalDiscPerc = this.discPerc;
        data.PatientId = this.patientId;
        data.PatientMrn = this.patientMRN;
        data.EncounterId = this.encounterId;
        data.TotalAmount = this.totAmount;
        data.RefNo=this.RefNo;
        //data.RefNo=this.txtRefNo.nativeElement.value;
        data.BillingDetails = this.chargeItemData;
        data.BillId = localStorage.getItem('billId');
        data.CreatedBy = localStorage.getItem('name');
        data.OrganizationId=localStorage.getItem('organizationId');
        data.FacilityId=localStorage.getItem('facilityId');
        this.service.saveBillingDetails(data).subscribe((result) => {
          debugger
          if (result > 0) {
            data.BillId=result;
            Swal.fire('Thank you...', 'Updated Successfuly', 'success');
            this.BillReceipt(data);
            debugger;
            
            
            this.totAmount = 0;
            this.txtPaymentAmount.nativeElement.value = 0;
            this.dueAmount = 0;
            this.discAmount = 0;
            this.discPerc = 0;
            this.chargeItemData = [];
            this.isShown = false;
            this.paymentMode = 0;
            this.router.navigateByUrl('/FrontDesk/opdbilling-Search');
          }
        });

      }

    }
    return true;

  }
  onKeyDownForPayment(event: KeyboardEvent) {
    //debugger
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
    //debugger
    // Allow only numeric input
    if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) {


      event.preventDefault();
    }

  }
  getRefNo(){
    if(this.ddlPaymentMode.nativeElement.value!=1){
    this.isPayment =true;
    }else{
      this.isPayment=false;
    }
  }
  showBillSumm(){
    this.isSummary =!this.isSummary;
  }
  getRefNovalue(event: any){
this.RefNo=event.target.value;
  }
  NavigatePage() {
    this.router.navigateByUrl('/FrontDesk/opdbilling-Search');
  }
   BillReceipt(bill:any) {
      debugger;             
                var PaymentMode="";
                if(bill.paymentMode==1)
                {
                  PaymentMode="Payment(CASH)";

                }
                else if(bill.paymentMode==2)
                {
                  PaymentMode="Payment(DEBIT/CREDIT CARD)";
                }
                else if(bill.paymentMode==5)
                {
                  PaymentMode="Payment(CHEQUE)";
                }
                else if(bill.paymentMode==9)
                {
                  PaymentMode="Payment(RTGS)";
                }
                else if(bill.paymentMode==8)
                {
                  PaymentMode="Payment(NEFT)";
                }
                else if(bill.paymentMode==10)
                {
                  PaymentMode="Payment(UPI)";
                }
                else 
                {
                  PaymentMode="Payment(Payments From IP)";
                }

              
                const inputDateString = this.currentDate;
                const inputDate = new Date(inputDateString);
                //var formattedDate = this.datePipe.transform(inputDate, 'dd/MM/yyyy  HH:mm a');
                var HeaderFields = " <table style='font-size:20px' width='100%' border='0' align='center' cellpadding='0' cellspacing='0'><tr><td width='2%'></td><td>"  + "</td><td><b>Bill No:" +bill.BillId + "</b></td><td align='right'><img src='assets/img/bhishak.png' style='height:85px;width:150px'/> </td><td width='5%'></td></tr><tr><td width='2%'></td></tr><tr><td colspan='5' align='center'><hr /> </td></tr></table>"
                var PatientDetails = "<table style='font-size:12px' width='100%' border='0' align='center' cellpadding='0' cellspacing='0'><tr><td width='2%'></td><td width='8%' align='left'><b>Name</b></td><td width='1%' align='center'><b>:</b></td><td width='20%' align='left'>" + this.name + "</td><td  width='8%' align='left'><b>Patient Id  </b></td><td align='center' ><b>:</b></td><td  width='19%' align='left'>" + this.patientMRN + "</td><td width='8%' align='left'><b>OP Id</b></td><td  width='34%'><b>: </b>" + this.opId + "</td></tr><tr><td width='2%'></td><td align='left' width='8%'><b>Age/Gender</b></td><td align='center' width='1%' ><b>:</b></td><td align='left' width='20%'>" + ''
                + this.age+" "+ this.ageMode + "/" + this.gender + "</td><td align='left' width='8%'><b>Doctor</b></td><td align='center'><b>:</b></td><td align='left' width='19%'>" + this.doctor+ "</td><td align='left' width='8%'><b>Ref Doctor</b></td><td width='34%'><b> :</b> " +this.refDoctor  + "</td></tr><tr><td width='2%'></td><td align='left' width='8%' ><b>Corporate</b></td><td align='center' width='1%'><b>:</b></td><td align='left' width='20%'>" +this.corporate  + "</td><td align='left' width='8%'><b>Date Of Visit</b></td><td align='center' ><b>:</b></td><td align='left' width='19%'>" + this.dateOfVisit+ "</td><td align='left' width='8%'><b>Mobile</b></td><td width='34%'><b>:</b> " + this.mobileNo + "</td></tr><tr><td colspan='9'><hr/></td></tr></table>"
                var ParticularsHeader = "<table width='100%' style='font-size:12px'  border='0' align='center' cellspacing='0' cellpadding='0'><tr><td width='5%'>S. No</td><td width='45%'><strong>Particulars</strong></td><td width='15%'><strong>No.of Units</strong></td><td width='30%' align='right'><strong>Amount</strong></td><td width='5%'></td></tr><tr><td colspan='5'><hr/></td></tr>"          
                var Particulars = "";
                var Notes = "";
                var Footer = "";
                var TotalCharges = 0;                
                var encId='';
                var IsReview=false;                
                const numWords = require('num-words') 
                const amountInWords =this.service.ToCapital( numWords(bill.TotalPaidAmount) )
                var Review=0;
                var sno=1;
                for(let charge of bill.BillingDetails){
                  
                Particulars +="<tr><td width='5%'>" + sno + "</td><td width='45%'>" + charge.ShortName + "</td><td width='15%'>" + charge.NoOfUnits + " </td><td width='30%' align='right'>" + charge.UnitPrice + ".00</td><td width='5%'></td></tr>"
                sno=sno+1;  
              }
                Notes += "<tr><td colspan='5'></td></tr><tr><td colspan='5'></td></tr><tr><td colspan='5'><hr/></td></tr></table><table width='100%' style='font-size:12px'  border='0' align='center' cellspacing='0' cellpadding='0'><tr><td></td><td></td><td align='right'><b>Total Bill Amount:&#160;&#160;" + bill.TotalAmount + ".00</b></td><td width='5%'></td></tr><tr><td></td><td></td><td align='right'><b>Payments:&#160;&#160;" + bill.TotalPaidAmount + ".00</b></td><td width='5%'></td></tr><tr><td></td><td></td><td align='right'><b>Concession:&#160;&#160;" + bill.TotalDiscAmount + ".00</b></td><td width='5%'></td></tr><tr><td></td><td></td><td align='right'><b>Refunds:&#160;&#160;" + bill.TotalRefundAmount + ".00</b></td><td width='5%'></td></tr><tr><td colspan='4'><hr></hr></td></tr><tr><td width='2%'></td><td>Balance Amount:&#160;&#160;</td><td align='right'><b>" + bill.TotalDueAmount + ".00</b></td><td width='5%'></td></tr><tr><td colspan='4'><hr></hr></td></tr><tr><td width='2%'></td><td>" + PaymentMode + "</td><td align='right'><b>" + bill.TotalPaidAmount + ".00</b></td><td width='5%'></td></tr><tr><td colspan='4'><hr></hr></td></tr> <tr><td width='2%'></td><td width='30%'><b>Notes :</b> </td><td><b>Total In Words:</b>" + amountInWords+" "+'Rupees Only' + "&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;</td><td width='5%'></td></tr><tr><td width='2%'></td><td><b>Payment Received By:&#160;&#160;</b>" +bill.CreatedBy+""
                Notes +="</td><td align='right'>Authorised Signature</td><td width='5%'></td></tr><tr><td colspan='4'><hr></hr></td></tr><tr><td colspan='4' align='center'>16-11-404/16, SBI Officers Colony Rd,Moosarambagh, Hyderabad-500036</td></tr>";
                Footer = "<tr> </tr>";

                
                var mywindow = window.open('', 'Payment Voucher', 'height=512,width=960');
                mywindow?.document.write('<html><head><style type="text/css">@media print    {.printView        {            display: none;        }    }    @page    {        size: A4;       margin: 1;    }</style><style>@media print    {#printpagebutton        {            display: none;        }    } </style><style>@media print    {#OPprintpagebutton        {            display: none;        }    } </style><title>Payment Voucher</title>');
                // mywindow?.document.write("<script type='text/javascript'>function printpage(){ window.open('PrintPages/PatientEncounterPrescriptionPagePreviewNew.aspx?EncounterId=" + encId + "&WithHeader=" + false + ",width=1000,height=525');}");
                // mywindow?.document.write('\<\/script\>');
                // mywindow?.document.write("<script type='text/javascript'>function OPprintpage(){ window.open('PrintPages/OPConsultationPrescription.aspx?EncounterId=" + encId + "&IsReview=" + IsReview + "&WithHeader=" + false + ",width=1000,height=525');}");
                // mywindow?.document.write('\<\/script\>');
                // mywindow?.document.write('</head><body >');
                mywindow?.document.write(HeaderFields + PatientDetails + ParticularsHeader + Particulars + Notes + Footer);
                mywindow?.document.write('</table></body></html>');
                mywindow?.print();
         
    }
}
