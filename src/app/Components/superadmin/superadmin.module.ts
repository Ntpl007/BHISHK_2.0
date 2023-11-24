import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe, HashLocationStrategy, JsonPipe, LocationStrategy } from '@angular/common';

import { SuperadminRoutingModule } from './superadmin-routing.module';
import { SuperadminComponent } from './superadmin/superadmin.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbDateAdapter, NgbModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { CustomNgbDateAdapter } from 'src/app/CustomClass/CustomNgbDateParserFormatter';
import { GlobalInterceptor } from 'src/global.interceptor';
import { AppComponent } from 'src/app/app.component';
import { AddUserComponent } from '../admin-module/add-user/add-user.component';
import { AdminModuleRoutingModule } from '../admin-module/admin-module-routing.module';
import { AdminModuleModule } from '../admin-module/admin-module.module';
import { SearchOrganizationComponent } from './search-organization/search-organization.component';
import { AddOrganizationsComponent } from './manage-organizations/add-organizations/add-organizations.component';
import { AddOrganizationPopupComponent } from './Popups/add-organization-popup/add-organization-popup.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { EditOrganizationComponent } from './Popups/edit-organization/edit-organization.component';
import { SearchOrganizationsComponent } from './manage-organizations/search-organizations/search-organizations.component';
import { EditFacilityComponent } from './Popups/edit-facility/edit-facility.component';
import { AddUserFacilityPopupComponent } from './Popups/add-user-facility-popup/add-user-facility-popup.component';
import { ImageUploadComponent } from '../PopUps/image-upload/image-upload.component';

@NgModule({
  declarations: [
    SuperadminComponent,
    SearchOrganizationComponent,
    AddOrganizationsComponent,
    AddOrganizationPopupComponent,
    EditOrganizationComponent,
    SearchOrganizationsComponent,
    EditFacilityComponent,
    ImageUploadComponent,
    
    
    
  ],
  imports: [
    CommonModule,
    SuperadminRoutingModule,
    
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgbModule,
    MatIconModule,
    NgbTimepickerModule,
     JsonPipe,
     MatDialogModule,
     MatButtonToggleModule,
     MatDialogModule

    
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
export class SuperadminModule { }
