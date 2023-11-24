import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AdminModuleRoutingModule } from './admin-module-routing.module';
import { AdminModuleComponent } from './admin-module.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserListComponent } from './user-list/user-list.component';

import {NgxPaginationModule} from 'ngx-pagination';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { GlobalInterceptor } from 'src/app/global.interceptor';
import { AppComponent } from 'src/app/app.component';
import { SpecialityVitalsignSetupComponent } from './speciality-vitalsign-setup/speciality-vitalsign-setup.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddUserFacilityPopupComponent } from '../superadmin/Popups/add-user-facility-popup/add-user-facility-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FacilityTariffComponent } from './facility-tariff/facility-tariff.component';
import { EditFacilityTariffComponent } from '../PopUps/Admin/edit-facility-tariff/edit-facility-tariff.component';
import { FacilitiTariffComponent } from '../PopUps/Admin/faciliti-tariff/faciliti-tariff.component';
import { DoctorFacilityTariffComponent } from './doctor-facility-tariff/doctor-facility-tariff.component';
@NgModule({
  declarations: [
    AdminModuleComponent,
    
    UserListComponent,
    
    SpecialityVitalsignSetupComponent,
         EditUserComponent,
         AddUserFacilityPopupComponent,
         
         FacilityTariffComponent,
         EditFacilityTariffComponent,
         FacilitiTariffComponent,
         DoctorFacilityTariffComponent
         
       
         
         
         
       
       
         
  ],
  imports: [
    CommonModule,
    AdminModuleRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule
    
    
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
export class AdminModuleModule { }
