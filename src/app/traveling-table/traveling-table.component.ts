import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TripService } from '../services/trip.service';
import { Trip } from '../interfaces/trip.interface';
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
  dataSource!: Observable<Trip[]>;

  ngOnInit(): void {
    this.initTripes()
  }

  initTripes(): void {
    this.dataSource = this.tripService.getTrips()
  }

  deleteTrip(stateName: string): void {
    this.tripService.deleteTrip(stateName)
    this.toastr.success('Trip deleted successfully');
  }
}
