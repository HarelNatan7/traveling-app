import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TravelingFormComponent } from 'src/app/traveling-form/traveling-form.component';
import { FormRoutingModule } from './form-routing.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    TravelingFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    FormRoutingModule,

  ],
  exports: [
    TravelingFormComponent
  ]
})
export class FormModule { }
