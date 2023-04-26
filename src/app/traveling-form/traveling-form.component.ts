import { Component, EventEmitter, Output } from '@angular/core';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { State } from '../interfaces/state.interface';
import { Trip } from '../interfaces/trip.interface';
import { TripService } from '../services/trip.service';

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
    private tripService: TripService
  ) {
    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map(state => (state ? this._filterStates(state) : this.states.slice())),
    );
  }

  states: State[] = [
    {
      name: 'Arkansas',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg',
    },
    {
      name: 'California',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg',
    },
    {
      name: 'Florida',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg',
    },
    {
      name: 'Texas',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg',
    },
  ];

  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

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
  }
}
