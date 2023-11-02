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

@NgModule({
  declarations: [
    AdminModuleComponent,
    
    UserListComponent,
    
    SpecialityVitalsignSetupComponent,
         EditUserComponent,
       
       
         
  ],
  imports: [
    CommonModule,
    AdminModuleRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    
    
    
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
