import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Trip } from '../interfaces/trip.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TripService {
  constructor(private http: HttpClient) { }

  private data = new Subject<Trip>();
  private trips = [
    { flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg', name: 'C1', startDate: new Date, endDate: new Date, notes: 'This is note' },
    { flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg', name: 'C2', startDate: new Date, endDate: new Date, notes: 'This is note' },
    { flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg', name: 'C3', startDate: new Date, endDate: new Date, notes: 'This is note' },
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

  getCountriesData(): Observable<any> {
    return this.http.get(`https://restcountries.com/v3.1/all?fields=name,flags`);
  }
  
}

