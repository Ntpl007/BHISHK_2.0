import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorTempleteComponent } from './doctor-templete.component';
import { AuthguardGuard } from 'src/app/Shared/authguard.guard';
import { DoctorDashboardComponent } from '../DashBoards/doctor-dashboard/doctor-dashboard.component';

const routes: Routes = [
  
  { path: '', component: DoctorTempleteComponent ,canActivate:[AuthguardGuard],
  children:[
   { path: 'DashBoard', component: DoctorDashboardComponent ,canActivate:[AuthguardGuard]},
   
  ]

},

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorModuleRoutingModule { }
