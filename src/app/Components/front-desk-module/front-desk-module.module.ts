import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe, HashLocationStrategy, JsonPipe, LocationStrategy } from '@angular/common';

import { FrontDeskModuleRoutingModule } from './front-desk-module-routing.module';
import { FrontDeskModuleComponent } from './front-desk-module.component';
import { OpdComponent } from './opd/opd.component'; 

import {NgxPaginationModule} from 'ngx-pagination';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct, NgbDatepickerConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OpdSearchComponent } from './opd-search/opd-search.component';
import { AbdmHomeComponent } from './ABDM/abdm-home/abdm-home.component';
//import { DayService, MonthAgendaService, MonthService, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';
import { GlobalInterceptor } from 'src/app/global.interceptor';
import { AppComponent } from 'src/app/app.component';
import { ABHAProfileComponent } from './ABDM/Level1/abha-profile/abha-profile.component';
import { CreateABHAComponent } from './ABDM/Level1/ABHA-Creation/create-abha/create-abha.component';
import { VerifyAadhaarComponent } from './ABDM/Level1/ABHA-Creation/verify-aadhaar/verify-aadhaar.component';
import { CheckAndGenerateMotpComponent } from './ABDM/Level1/ABHA-Creation/check-and-generate-motp/check-and-generate-motp.component';
import { ABHAInputComponent } from './ABDM/Level1/ABHA-Creation/abha-input/abha-input.component';
import { FindABHANoComponent } from './ABDM/Level1/find-abha-no/find-abha-no.component';
import { ScheduleTypeComponent } from './schedule-type/schedule-type.component';
import { SearchAppointmentComponent } from './Appointments/search-appointment/search-appointment.component'; 
import { EditAppointmentsComponent } from './Appointments/edit-appointments/edit-appointments.component';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';


import {MatIconModule} from '@angular/material/icon';
import { CustomNgbDateAdapter } from 'src/app/CustomClass/CustomNgbDateParserFormatter';
import { AbhastatusComponent } from './ABDM/Level1/abhastatus/abhastatus.component';
import { FindAbhaComponent } from './ABDM/Level1/Forgot-Abha/find-abha/find-abha.component';
import { ForgotAbhaVerifyAadhaarOtpComponent } from './ABDM/Level1/Forgot-Abha/forgot-abha-verify-aadhaar-otp/forgot-abha-verify-aadhaar-otp.component';
import { ShowAbhaNumberComponent } from './ABDM/Abdm-Popups/show-abha-number/show-abha-number.component';
//import { CalendarscheduleComponent } from './calendar-schedule/calendar-schedule.component';
import { CreateAppointmentComponent } from './Appointments/create-appointment/create-appointment.component';
import { CalendarscheduleComponent } from './calendar-schedule/calendar-schedule.component';
import { PatientRegistrationSearchComponent } from './patient-registration-search/patient-registration-search.component';
import { OpdBillingSearchComponent } from './opd-billing/opd-billing-search/opd-billing-search.component';
import { OpdBillSearchComponent } from './opd/opd-bill-search/opd-bill-search.component';
import { OpdbillingforexistingpatientComponent } from './opd-billing/opdbillingforexistingpatient/opdbillingforexistingpatient.component';
import { OpdAppointmentComponent } from './opd-appointment/opd-appointment.component';
@NgModule({
  declarations: [
    FrontDeskModuleComponent,
    OpdComponent,
    OpdSearchComponent,
    AbdmHomeComponent,
    ABHAProfileComponent,
    CreateABHAComponent,
    VerifyAadhaarComponent,
    CheckAndGenerateMotpComponent,
    ABHAInputComponent,
    FindABHANoComponent,
    ScheduleTypeComponent,
    SearchAppointmentComponent,
    EditAppointmentsComponent,
    CreateAppointmentComponent,
    AbhastatusComponent,
    CalendarscheduleComponent,
    FindAbhaComponent,
         ForgotAbhaVerifyAadhaarOtpComponent,
         ShowAbhaNumberComponent,
         PatientRegistrationSearchComponent,
         OpdBillingSearchComponent,
         OpdBillSearchComponent,
         OpdAppointmentComponent
         
         
         
         
  ],
  imports: [
    CommonModule,
    FrontDeskModuleRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgbModule,
    MatIconModule,
    NgbTimepickerModule,
     JsonPipe,
     MatDialogModule,
     
    
        
  ],
  
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},DatePipe,
    { provide: NgbDateAdapter, useClass: CustomNgbDateAdapter },
   
  {
   provide: HTTP_INTERCEPTORS,
   useClass: GlobalInterceptor,
   multi: true
  },
  { provide: LOCALE_ID, useValue: 'en-US' },
  ],
  bootstrap: [AppComponent]
})
export class FrontDeskModuleModule { }
