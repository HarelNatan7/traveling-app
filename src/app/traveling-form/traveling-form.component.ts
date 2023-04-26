import { Component, EventEmitter, Output, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { State } from '../interfaces/state.interface';
import { Trip } from '../interfaces/trip.interface';
import { TripService } from '../services/trip.service';
import { ToastrService } from 'ngx-toastr';
import { ApiCountry } from '../interfaces/api-country.interface';

@Component({
  selector: 'app-traveling-form',
  templateUrl: './traveling-form.component.html',
  styleUrls: ['./traveling-form.component.scss'],
})
export class TravelingFormComponent {

  // @Output() tripToAdd = new EventEmitter<Trip>();

  selectedState!: State;
  startDate!: Date | null;
  endDate!: Date | null;
  notes!: string;
  stateCtrl = new FormControl('');
  filteredStates: Observable<State[]>;
  
  constructor(
    private tripService: TripService,
    private toastr: ToastrService
    ) {
    this.tripService.getCountriesData().subscribe(data => {
      this.states = data.map((c: any) => {
        c.flag = c.flags.svg
        c.name = c.name.official
        return c
      })
      console.log('this.states:', this.states)
    })
    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map(state => (state ? this._filterStates(state) : this.states?.slice())),
    );
  }

  states!: State[]

  private _filterStates(countryName: string): State[] {
    const filterValue = countryName.toLowerCase();
    return this.states.filter(state => state.name.toLowerCase().includes(filterValue));
  }

  onSelectState(state: State) {
    console.log('state:', state)
    this.selectedState = state
  }

  onStartDateChange(event: MatDatepickerInputEvent<Date>) {
    this.startDate = event.value;
  }

  onEndDateChange(event: MatDatepickerInputEvent<Date>) {
    this.endDate = event.value;
  }

  onAddTrip() {

    const newTripToAdd: Trip = {
      flag: this.selectedState.flag,
      name: this.selectedState.name,
      startDate: this.startDate,
      endDate: this.endDate,
      notes: this.notes
    }
    console.log('newTripToAdd:', newTripToAdd)
    // this.tripToAdd.emit(newTripToAdd)
    this.tripService.setTrip(newTripToAdd)
    this.toastr.success('Trip added successfully');
  }
}
