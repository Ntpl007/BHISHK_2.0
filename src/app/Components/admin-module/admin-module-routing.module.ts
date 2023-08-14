import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModuleComponent } from './admin-module.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { AuthguardGuard } from 'src/app/Shared/authguard.guard';

const routes: Routes = [
  { path: '', component: AdminModuleComponent ,canActivate:[AuthguardGuard],
  children:[
    { path: 'Add-User', component: AddUserComponent ,canActivate:[AuthguardGuard]},
    { path: 'User-List', component: UserListComponent,canActivate:[AuthguardGuard] }
  ]

},

]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminModuleRoutingModule { }
