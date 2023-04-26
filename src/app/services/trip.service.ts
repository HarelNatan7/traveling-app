import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Trip } from '../interfaces/trip.interface';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private data = new Subject<Trip>();
  private trips = [
    { flag: 'f1', name: 'C1', startDate: new Date, endDate: new Date, notes: 'This is note' },
    { flag: 'f2', name: 'C2', startDate: new Date, endDate: new Date, notes: 'This is note' },
    { flag: 'f3', name: 'C3', startDate: new Date, endDate: new Date, notes: 'This is note' },
  ]

  setTrip(trip: Trip) {
    this.data.next(trip);
  }

  getTrip() {
    return this.data.asObservable();
  }

  getTrips() {
    return this.trips
  }
}

