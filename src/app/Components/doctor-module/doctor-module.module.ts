import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorModuleRoutingModule } from './doctor-module-routing.module';
import { DoctorTempleteComponent } from './doctor-templete.component';


@NgModule({
  declarations: [
    DoctorTempleteComponent
  ],
  imports: [
    CommonModule,
    DoctorModuleRoutingModule
  ]
})
export class DoctorModuleModule { }
