import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { first, map, startWith } from 'rxjs/operators';

import { TripService } from '../services/trip.service';
import { State } from '../interfaces/state.interface';
import { Trip } from '../interfaces/trip.interface';

import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ToastrService } from 'ngx-toastr';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-traveling-form',
  templateUrl: './traveling-form.component.html',
  styleUrls: ['./traveling-form.component.scss'],
})
export class TravelingFormComponent implements OnInit {

  states!: State[]
  selectedState!: State;
  startDate!: Date | null;
  endDate!: Date | null;
  notes!: string;
  stateCtrl = new FormControl('');
  filteredStates!: Observable<State[]>;

  constructor(
    private tripService: TripService,
    private toastr: ToastrService
  ) { }

  private _filterStates(countryName: string): State[] {
    const filterValue = countryName.toLowerCase();
    return this.states.filter(state => state.name.toLowerCase().includes(filterValue));
  }

  ngOnInit(): void {
    this.tripService.getStates().pipe(
      first(),
      map(data => this.states = data)).subscribe()

    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map(state => (state ? this._filterStates(state) : this.states?.slice())),
    );

  }

  onSelectState(event: MatAutocompleteSelectedEvent): void {
    const selectedState: any = this.states.find(state => state.name === event.option.value)
    this.selectedState = selectedState
    console.log('this.selectedState:', this.selectedState)
  }

  onStartDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.startDate = event.value;
  }

  onEndDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.endDate = event.value;
  }

  onAddTrip(): void {
    const newTripToAdd: Trip = {
      flag: this.selectedState.flag,
      name: this.selectedState.name,
      startDate: this.startDate,
      endDate: this.endDate,
      notes: this.notes
    }
    console.log('newTripToAdd:', newTripToAdd)
    this.tripService.addTrip(newTripToAdd)
    this.toastr.success('Trip added successfully');
  }
}
