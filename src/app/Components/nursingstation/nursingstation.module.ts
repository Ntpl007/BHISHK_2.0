import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NursingstationRoutingModule } from './nursingstation-routing.module';
import { OPNursingComponent } from './op-nursing/op-nursing.component';
import { NursingstationComponent } from './nursingstation/nursingstation.component';


@NgModule({
  declarations: [
    OPNursingComponent,
    NursingstationComponent
  ],
  imports: [
    CommonModule,
    NursingstationRoutingModule
  ]
})
export class NursingstationModule { }
