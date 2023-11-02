import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperadminComponent } from './superadmin/superadmin.component';
import { AuthguardGuard } from 'src/app/Shared/authguard.guard';
import { AddUserComponent } from '../admin-module/add-user/add-user.component';
import { SearchOrganizationComponent } from './search-organization/search-organization.component';
import { AddFacilitiesComponent } from '../admin-module/Manage-Facilities/add-facilities/add-facilities.component';
import { AddOrganizationsComponent } from './manage-organizations/add-organizations/add-organizations.component';
import { FacilityListComponent } from '../admin-module/Manage-Facilities/facility-list/facility-list.component';
import { UserListComponent } from '../admin-module/user-list/user-list.component';
import { SearchOrganizationsComponent } from './manage-organizations/search-organizations/search-organizations.component';
import { EditUserComponent } from '../admin-module/edit-user/edit-user.component';

const routes: Routes = [
  // { path: '', component: SuperadminComponent },
{
  path: '', component: SuperadminComponent,canActivate:[AuthguardGuard],
  children:[
    { path: 'Add-User', component: AddUserComponent,canActivate:[AuthguardGuard]},
    { path: '', component: SearchOrganizationComponent,canActivate:[AuthguardGuard]},
    { path: 'Add-Facilities', component: AddFacilitiesComponent,canActivate:[AuthguardGuard]},
    { path: 'Add-User', component: AddUserComponent,canActivate:[AuthguardGuard]},
    { path: 'Add-Organizations', component: AddOrganizationsComponent,canActivate:[AuthguardGuard]},
    { path: 'Facility-List', component: FacilityListComponent,canActivate:[AuthguardGuard]},
    { path: 'User-List', component: UserListComponent,canActivate:[AuthguardGuard]},
    { path: 'Organization-List', component: SearchOrganizationsComponent,canActivate:[AuthguardGuard]},
    { path: 'Edit-User', component: EditUserComponent,canActivate:[AuthguardGuard]}
   
]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadminRoutingModule { }
