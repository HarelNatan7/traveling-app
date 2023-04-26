import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Trip } from '../interfaces/trip.interface';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private data = new Subject<Trip>();

  setTrip(trip: Trip) {
    this.data.next(trip);
  }

  getTrip() {
    return this.data.asObservable();
  }
}

