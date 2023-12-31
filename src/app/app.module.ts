import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { HimsServiceService } from './Shared/hims-service.service';
import { GlobalInterceptor } from './global.interceptor';
import { AuthService } from './Shared/auth.service';
//import { FilterPipe } from './filter.pipe';
import { NgbDateAdapter, NgbModule, NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';
//import { ScheduleModule, RecurrenceEditorModule ,DayService,WeekService,MonthService,WorkWeekService,MonthAgendaService} from '@syncfusion/ej2-angular-schedule';
//import { ScheduleAllModule } from '@syncfusion/ej2-angular-schedule';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{MatIconModule} from '@angular/material/icon';
//import { SchedulePopupComponent } from './Components/schedule-popup/schedule-popup.component';
import {MatToolbar, MatToolbarModule} from '@angular/material/toolbar';
import {  MatDialogModule } from '@angular/material/dialog';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { RescheduleComponent } from './Components/PopUps/reschedule/reschedule.component';
import { TransferAppointmentComponent } from './Components/PopUps/transfer-appointment/transfer-appointment.component';
import { LoadingPopupComponent } from './Components/PopUps/loading-popup/loading-popup.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Import the module
import { CustomNgbDateAdapter } from './CustomClass/CustomNgbDateParserFormatter';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SpecialityVitalsignComponent } from './Components/PopUps/Admin/speciality-vitalsign/speciality-vitalsign.component';
import { AddUserComponent } from './Components/admin-module/add-user/add-user.component';
import { AddFacilitiesComponent } from './Components/admin-module/Manage-Facilities/add-facilities/add-facilities.component';
import { VitaldetailsPopupComponent } from './Components/PopUps/vitaldetails-popup/vitaldetails-popup.component';
import { DoctorDashboardComponent } from './Components/DashBoards/doctor-dashboard/doctor-dashboard.component';
import { FrontdeskDashboardComponent } from './Components/DashBoards/frontdesk-dashboard/frontdesk-dashboard.component';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { EditDoctorFacilityTariffComponent } from './Components/PopUps/Admin/edit-doctor-facility-tariff/edit-doctor-facility-tariff.component';
import { CreateDoctorFacilityTariffComponent } from './Components/PopUps/Admin/create-doctor-facility-tariff/create-doctor-facility-tariff.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RescheduleComponent,
    TransferAppointmentComponent,
    LoadingPopupComponent,
    SpecialityVitalsignComponent,
    AddUserComponent,
    AddFacilitiesComponent,
    VitaldetailsPopupComponent,
    DoctorDashboardComponent,
    FrontdeskDashboardComponent,
    EditDoctorFacilityTariffComponent,
    CreateDoctorFacilityTariffComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    FormsModule,
    MatNativeDateModule,
     NgxPaginationModule,
     NgbModule,
     MatProgressSpinnerModule,
     BrowserAnimationsModule,
     MatIconModule,
     MatDialogModule,
    TextFieldModule,
     MatInputModule,
     MatFormFieldModule,
    MatAutocompleteModule,
     MatToolbarModule,
     MatTableModule,
     MatDatepickerModule,
     MatDialogModule,
     MatSnackBarModule,
     MatFormFieldModule,
     MatExpansionModule,
     
        
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
export class AppModule { }

