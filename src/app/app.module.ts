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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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

import { RescheduleComponent } from './Components/PopUps/reschedule/reschedule.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RescheduleComponent,
    
    
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
     NgbModule,
    
     BrowserAnimationsModule,
     MatIconModule,
     MatDialogModule,
    TextFieldModule,
     MatInputModule,
     MatFormFieldModule,
    MatAutocompleteModule,
     MatToolbarModule,
     MatTableModule,
     
  ],
 
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},DatePipe,
    
   
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

