import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize, first, map, startWith, tap } from 'rxjs/operators';

import { TripService } from '../services/trip.service';
import { State } from '../interfaces/state.interface';
import { Trip } from '../interfaces/trip.interface';

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
  tripForm!: FormGroup;

  constructor(
    private tripService: TripService,
    private toastr: ToastrService
  ) { }

  private _filterStates(countryName: string): State[] {
    const filterValue = countryName.toLowerCase();
    return this.states.filter(state => state.name.toLowerCase().includes(filterValue));
  }

  ngOnInit(): void {
    this.initStates()
    this.setForm()
  }

  private initStates(): void {
    this.tripService.getStates().pipe(
      first(),
      tap(states => this.states = states),
      finalize(() => this.initFilteredStates())
    ).subscribe()
  }

  private setForm(): void {
    this.tripForm = new FormGroup({
      // 'state': new FormControl(null),
      'startDate': new FormControl(null),
      'endDate': new FormControl(null),
      'notes': new FormControl(null),
    })
  }

  private initFilteredStates(): void {
    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map(state => (state ? this._filterStates(state) : this.states?.slice())),
    );
  }

  onSelectState(event: MatAutocompleteSelectedEvent): void {
    const selectedState: any = this.states.find(state => state.name === event.option.value)
    this.selectedState = selectedState
  }

  onAddTrip(): void {
    if (!this.selectedState) {
      this.toastr.error('Please select State')
      return
    }

    this.tripForm.value.name = this.selectedState.name
    this.tripForm.value.flag = this.selectedState.flag

    this.tripService.addTrip(this.tripForm.value)
    this.toastr.success('Trip added successfully');
  }
}
