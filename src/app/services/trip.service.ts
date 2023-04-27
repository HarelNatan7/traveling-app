import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Trip } from '../interfaces/trip.interface';

@Injectable({
  providedIn: 'root'
})

export class TripService {
  constructor(private http: HttpClient) { }

  private subject = new ReplaySubject<Trip[]>(1);
  private trips?: Trip[]

  getTrips(): Observable<Trip[]> {
    if (!this.trips) this.init();
    return this.subject.asObservable();
  }

  addTrip(tripToAdd: Trip): void {
    this.trips!.unshift(tripToAdd)
    this.subject.next(this.trips!)
  }

  deleteTrip(tripName: string): void {
    this.trips = this.trips!.filter(e => e.name !== tripName)
    this.subject.next(this.trips!)
  }

  init(): void {
    const arr = [
      { flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg', name: 'C1', startDate: new Date, endDate: new Date, notes: 'This is note' },
      { flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg', name: 'C2', startDate: new Date, endDate: new Date, notes: 'This is note' },
      { flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg', name: 'C3', startDate: new Date, endDate: new Date, notes: 'This is note' },
    ]
    this.subject.next(arr)
    this.trips = arr
  }

  getStates(): Observable<any[]> {
    return this.http.get<any[]>(`https://restcountries.com/v3.1/all?fields=name,flags`).pipe(
      map(data => {
        return data.map((c: any) => {
          return {
            flag: c.flags.svg,
            name: c.name.official
          }
        })
      }))
  }
}

