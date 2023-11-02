import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from 'src/app/Shared/authguard.guard';
import { NursingstationComponent } from './nursingstation/nursingstation.component';
import { OPNursingStationComponent } from './opnursing-station/opnursing-station.component';

const routes: Routes = [
  {path:'',component:NursingstationComponent ,  canActivate:[AuthguardGuard],},
  {path:'OP-Nursing',component:OPNursingStationComponent ,  canActivate:[AuthguardGuard],},

   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NursingstationRoutingModule { }
