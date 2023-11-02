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
import { AbhastatusComponent } from './ABDM/Level1/abhastatus/abhastatus.component';
import { FindABHANoComponent } from './ABDM/Level1/find-abha-no/find-abha-no.component';
import { FindAbhaComponent } from './ABDM/Level1/Forgot-Abha/find-abha/find-abha.component';
import { ForgotAbhaVerifyAadhaarOtpComponent } from './ABDM/Level1/Forgot-Abha/forgot-abha-verify-aadhaar-otp/forgot-abha-verify-aadhaar-otp.component';
import { OPNursingStationComponent } from '../nursingstation/opnursing-station/opnursing-station.component';
import { DoctorDashboardComponent } from '../DashBoards/doctor-dashboard/doctor-dashboard.component';
import { CalendarscheduleComponent } from './calendar-schedule/calendar-schedule.component';
import { FrontdeskDashboardComponent } from '../DashBoards/frontdesk-dashboard/frontdesk-dashboard.component';

const routes: Routes = [{ path: '', component: FrontDeskModuleComponent },
{
  path: '', component: FrontDeskModuleComponent,canActivate:[AuthguardGuard],
  children:[
    { path:'OPD', component: OpdComponent,canActivate:[AuthguardGuard], },
    { path:'OPD-Search', component: OpdSearchComponent ,canActivate:[AuthguardGuard],},
    { path:'ABDM', component: AbdmHomeComponent ,canActivate:[AuthguardGuard],},
    { path:'ABDM/ABHA-Status', component: AbhastatusComponent ,canActivate:[AuthguardGuard],},
    { path:'ABDM/ABDM-Profile', component: ABHAProfileComponent ,canActivate:[AuthguardGuard],},
    {path:'ABDM/Create-ABHA',component:CreateABHAComponent ,canActivate:[AuthguardGuard],},
    {path:'ABDM/Verify-Aadhaar',component:VerifyAadhaarComponent ,canActivate:[AuthguardGuard],},
    {path:'ABDM/Check-And-Generate-Mobile-otp',component:CheckAndGenerateMotpComponent ,canActivate:[AuthguardGuard],},
    {path:'ABDM/BHA-Input',component:ABHAInputComponent ,canActivate:[AuthguardGuard],},
    {path:'ABDM/Find-Abha-number',component:FindAbhaComponent ,  canActivate:[AuthguardGuard],},
    {path:'ABDM/Verify-Aadhaar-OTP',component:ForgotAbhaVerifyAadhaarOtpComponent ,  canActivate:[AuthguardGuard],},
   
    {path:'Scheduling',component:ScheduleTypeComponent ,  canActivate:[AuthguardGuard],},
    
    {path:'Search-Appointments',component:SearchAppointmentComponent ,  canActivate:[AuthguardGuard],},
    
    {path:'Edit-Appointments',component:EditAppointmentsComponent ,  canActivate:[AuthguardGuard],},
    {path:'create-Appointments',component:CreateAppointmentComponent ,  canActivate:[AuthguardGuard],},
   // {path:'transfer',component:TransferAppointmentComponent ,  canActivate:[AuthguardGuard],},
   {path:'Op-Nursing',component:OPNursingStationComponent ,  canActivate:[AuthguardGuard],},
   {path:'DashBoard',component:FrontdeskDashboardComponent ,  canActivate:[AuthguardGuard],},
   { path: 'CalendarSchedule', component: CalendarscheduleComponent,canActivate:[AuthguardGuard], },
   
    
      ]
  
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontDeskModuleRoutingModule { }
