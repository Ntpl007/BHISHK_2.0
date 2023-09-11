import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontDeskModuleComponent } from './front-desk-module.component';
import { OpdComponent } from './opd/opd.component';
import { OpdSearchComponent } from './opd-search/opd-search.component';
import { AuthguardGuard } from 'src/app/Shared/authguard.guard';
import { AbdmHomeComponent } from './ABDM/abdm-home/abdm-home.component';
import { ABHAStatusComponent } from './ABDM/Level1/abha-status/abha-status.component';

import { ABHAProfileComponent } from './ABDM/Level1/abha-profile/abha-profile.component';
import { CreateABHAComponent } from './ABDM/Level1/ABHA-Creation/create-abha/create-abha.component';
import { VerifyAadhaarComponent } from './ABDM/Level1/ABHA-Creation/verify-aadhaar/verify-aadhaar.component';
import { CheckAndGenerateMotpComponent } from './ABDM/Level1/ABHA-Creation/check-and-generate-motp/check-and-generate-motp.component';
import { ABHAInputComponent } from './ABDM/Level1/ABHA-Creation/abha-input/abha-input.component';
import { ScheduleTypeComponent } from './schedule-type/schedule-type.component';
import { EditAppointmentsComponent } from './Appointments/edit-appointments/edit-appointments.component';
import { CreateAppointmentComponent } from './Appointments/create-appointment/create-appointment.component';
import { SearchAppointmentComponent } from './Appointments/search-appointment/search-appointment.component';

const routes: Routes = [{ path: '', component: FrontDeskModuleComponent },
{
  path: '', component: FrontDeskModuleComponent,canActivate:[AuthguardGuard],
  children:[
    { path: 'OPD', component: OpdComponent,canActivate:[AuthguardGuard], },
    { path: 'OPD-Search', component: OpdSearchComponent ,canActivate:[AuthguardGuard],},
    { path: 'ABDM', component: AbdmHomeComponent ,canActivate:[AuthguardGuard],},
    { path: 'ABDM/ABHA-Status', component: ABHAStatusComponent ,canActivate:[AuthguardGuard],},
    { path: 'ABDM/ABDM-Profile', component: ABHAProfileComponent ,canActivate:[AuthguardGuard],},
    {path:'ABDM/Create-ABHA',component:CreateABHAComponent ,canActivate:[AuthguardGuard],},
    {path:'ABDM/Verify-Aadhaar',component:VerifyAadhaarComponent ,canActivate:[AuthguardGuard],},
    {path:'ABDM/Check-And-Generate-Mobile-otp',component:CheckAndGenerateMotpComponent ,canActivate:[AuthguardGuard],},
    {path:'ABDM/BHA-Input',component:ABHAInputComponent ,canActivate:[AuthguardGuard],},

    {path:'Scheduling',component:ScheduleTypeComponent ,  canActivate:[AuthguardGuard],},
    
    {path:'Search-Appointments',component:SearchAppointmentComponent ,  canActivate:[AuthguardGuard],},
    
    {path:'Edit-Appointments',component:EditAppointmentsComponent ,  canActivate:[AuthguardGuard],},
    {path:'create-Appointments',component:CreateAppointmentComponent ,  canActivate:[AuthguardGuard],},
   // {path:'transfer',component:TransferAppointmentComponent ,  canActivate:[AuthguardGuard],},
    
    
      ]
  
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontDeskModuleRoutingModule { }
