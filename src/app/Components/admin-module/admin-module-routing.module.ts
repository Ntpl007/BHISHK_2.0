import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModuleComponent } from './admin-module.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { AuthguardGuard } from 'src/app/Shared/authguard.guard';
import { SpecialityVitalsignSetupComponent } from './speciality-vitalsign-setup/speciality-vitalsign-setup.component';
import { AddFacilitiesComponent } from './Manage-Facilities/add-facilities/add-facilities.component';
import { SearchOrganizationComponent } from '../superadmin/search-organization/search-organization.component';
import { AddOrganizationsComponent } from '../superadmin/manage-organizations/add-organizations/add-organizations.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { FacilityTariffComponent } from './facility-tariff/facility-tariff.component';
import { DoctorFacilityTariffComponent } from './doctor-facility-tariff/doctor-facility-tariff.component';
//import { FacilityTariffComponent } from './facility-tariff/facility-tariff.component';

const routes: Routes = [
  { path: '', component: AdminModuleComponent ,canActivate:[AuthguardGuard],
  children:[
    { path: 'Add-User', component: AddUserComponent ,canActivate:[AuthguardGuard]},
    { path: 'User-List', component: UserListComponent,canActivate:[AuthguardGuard] },
    { path: 'Add-VitalSigns', component: SpecialityVitalsignSetupComponent,canActivate:[AuthguardGuard] },
    { path: 'Add-Facilities', component: AddOrganizationsComponent,canActivate:[AuthguardGuard] },
    { path: 'Edit-User', component: EditUserComponent,canActivate:[AuthguardGuard] },
    { path: 'Add-FacilityTariff', component: FacilityTariffComponent,canActivate:[AuthguardGuard] },
    { path: 'Add-FacilityDoctorTariff', component: DoctorFacilityTariffComponent,canActivate:[AuthguardGuard] }
  ]
  
},

]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminModuleRoutingModule { }
