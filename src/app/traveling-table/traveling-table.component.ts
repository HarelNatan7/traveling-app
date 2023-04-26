import { Component, Input, OnInit } from '@angular/core';
import { Trip } from '../interfaces/trip.interface';
import { TripService } from '../services/trip.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-traveling-table',
  templateUrl: './traveling-table.component.html',
  styleUrls: ['./traveling-table.component.scss']
})
export class TravelingTableComponent implements OnInit {

  constructor(
    private tripService: TripService,
    private toastr: ToastrService
    ) { }

  tripToAdd!: Trip;
  displayedColumns: string[] = ['flag', 'name', 'startDate', 'endDate', 'notes', 'action'];
  dataSource!: Trip[];

  ngOnInit(): void {
    this.dataSource = this.tripService.getTrips()
    this.tripService.getTrip().subscribe(trip => {
      this.tripToAdd = trip
      this.addTrip()
    });
  }

  addTrip() {
    const newRow = {
      flag: this.tripToAdd.flag,
      name: this.tripToAdd.name,
      startDate: this.tripToAdd.startDate,
      endDate: this.tripToAdd.endDate,
      notes: this.tripToAdd.notes,
    }
    this.dataSource.push(newRow)
  }

  deleteTrip(stateName: string) {
    console.log('trip:', stateName)
    this.dataSource = this.dataSource.filter(e => e.name !== stateName)
    this.toastr.success('Trip deleted successfully');

  }
}
