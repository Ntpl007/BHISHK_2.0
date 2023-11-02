import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';

import { NursingstationRoutingModule } from './nursingstation-routing.module';
import { NursingstationComponent } from './nursingstation/nursingstation.component';
import { OPNursingStationComponent } from './opnursing-station/opnursing-station.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbDatepickerModule, NgbModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    OPNursingStationComponent,
    NursingstationComponent
  ],
  imports: [
    CommonModule,
    NursingstationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgbModule,
    MatIconModule,
    NgbTimepickerModule,
     JsonPipe,
     NgbDatepickerModule
  ]
})
export class NursingstationModule { }
