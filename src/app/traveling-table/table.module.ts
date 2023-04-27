import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { TravelingTableComponent } from 'src/app/traveling-table/traveling-table.component';
import { TableRoutingModule } from './table-routing.module';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    TravelingTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    TableRoutingModule,
  ],
  exports: [
    TravelingTableComponent
  ]
})
export class TableModule { }
