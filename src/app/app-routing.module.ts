import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { AuthguardGuard } from './Shared/authguard.guard';
import { AppComponent } from './app.component';
import { AddUserComponent } from './Components/admin-module/add-user/add-user.component';
import { SuperadminComponent } from './Components/superadmin/superadmin/superadmin.component';
import { SearchOrganizationComponent } from './Components/superadmin/search-organization/search-organization.component';

const routes: Routes = [
   
  {path:"", 
  component:LoginComponent

  },
  
    { path: 'Admin',
     loadChildren: () => import('./Components/admin-module/admin-module.module').then(m => m.AdminModuleModule),
     data:{
      role:'Admin'

    },
    
  
 },

  {  path: 'FrontDesk',
   loadChildren: () => import('./Components/front-desk-module/front-desk-module.module').then(m => m.FrontDeskModuleModule) ,
   data:{
     role:'Front Desk',
   },

  },
  { path: 'NursingStation',
  loadChildren: () => import('./Components/nursingstation/nursingstation.module').then(m => m.NursingstationModule),
  data:{
  // role:'Admin'

 },
 },
 
 { path: 'SuperAdmin',
 loadChildren: () => import('./Components/superadmin/superadmin.module').then(m => m.SuperadminModule),
 data:{
  role:'Super Admin'

},
},


{ path: 'Doctor',
loadChildren: () => import('./Components/doctor-module/doctor-module.module').then(m => m.DoctorModuleModule),
data:{
 role:'Doctor'

},
},
    
  
//   {
//     path:"front-desk",component:FrontdeskLayoutComponent,canActivate:[AuthguardGuard],
  
//       data:{
//               role:'Front Desk',
//            },
   
//     children:[
      
//              {
//          path:"op",component:OpComponent,canActivate:[AuthguardGuard],
//         data:{
//           role:'Front Desk'
//         },
//       },
      
//       {
//         path:"IP",component:IPComponent,canActivate:[AuthguardGuard],
//         data:{
//           role:'Front Desk'
    
//         },
//       }
//       ,
//       {
//         path:"Abdm-Home",component:ABDMHomeComponent,canActivate:[AuthguardGuard],
//         data:{
//           role:'Front Desk'
    
//         },
//       },
//       {
//         path:"Abha-status",component:CheckAbhaStatusComponent,canActivate:[AuthguardGuard],
//         data:{
//           role:'Front Desk'
    
//         },
//       }
//       ,
//       {
//         path:"Know-Abha-Number",component:KnowAbhaNumberComponent,canActivate:[AuthguardGuard],
//         data:{
//           role:'Front Desk'
    
//         },
//       },
//       {
//         path:"Verify-Mobile-otp",component:ForgotVerifyMobileotpComponent,canActivate:[AuthguardGuard],
//         data:{
//           role:'Front Desk'
    
//         },
//       },
//         {
//           path:"Create-Abha",component:CreateabhaComponent,canActivate:[AuthguardGuard],
//           data:{
//             role:'Front Desk'
      
//           },
//       },
//       {
//         path:"Verify-Aadhaar",component:VerifyAadhaarotpforabhacreationComponent,canActivate:[AuthguardGuard],
//         data:{
//           role:'Front Desk'
    
//         },
//       },
//         {
//           path:"Check-And-Generate-MobileOtp",component:CheckandgenerateMobileotpComponent,canActivate:[AuthguardGuard],
//           data:{
//             role:'Front Desk'
      
//           },
//     },
//     {
//       path:"Abha-Input",component:AbhaInputComponent,canActivate:[AuthguardGuard],
//       data:{
//         role:'Front Desk'
  
//       },
// },
// {
//   path:"Op-Registration",component:OpdComponent,canActivate:[AuthguardGuard],
//   data:{
//     role:'Front Desk'

//   },
// },
// {
//   path:"OPD-Search",component:OPDSearchComponent,canActivate:[AuthguardGuard],
//   data:{
//     role:'Front Desk'

//   },
// },
// {
//   path:"Abha-Profile",component:AbhaProfileComponent,canActivate:[AuthguardGuard],
//   data:{
//     role:'Front Desk'

//   },
// },

// {
//   path:"Doctor-Scheduler",component:DoctorSchedulerComponent,canActivate:[AuthguardGuard],
//   data:{
//     role:'Front Desk'

//   },
// }
//     ]
//   }

  
 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
