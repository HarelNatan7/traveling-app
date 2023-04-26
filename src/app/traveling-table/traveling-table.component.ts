import { Component, Input, OnInit } from '@angular/core';
import { TableRow } from '../interfaces/table-row.interface';
import { Trip } from '../interfaces/trip.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from '../services/trip.service';

const ELEMENT_DATA: TableRow[] = [
  { flag: 'httt', name: 'C1', startDate: new Date, endDate: new Date, notes: 'This is note' },
  { flag: 'httt', name: 'C2', startDate: new Date, endDate: new Date, notes: 'This is note' },
  { flag: 'httt', name: 'C3', startDate: new Date, endDate: new Date, notes: 'This is note' },
];

@Component({
  selector: 'app-traveling-table',
  templateUrl: './traveling-table.component.html',
  styleUrls: ['./traveling-table.component.scss']
})
export class TravelingTableComponent implements OnInit {

  constructor(private tripService: TripService) { }

  // @Input() tripToAdd: any;
  tripToAdd!: Trip;
  displayedColumns: string[] = ['flag', 'name', 'startDate', 'endDate', 'notes', 'action'];
  dataSource = ELEMENT_DATA;

  ngOnInit(): void {
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
    ELEMENT_DATA.push(newRow)
  }

  deleteTrip(stateName: string) {
    console.log('trip:', stateName)
    // const tripToDeleteIdx = ELEMENT_DATA.findIndex(e => e.name === stateName)
    this.dataSource = ELEMENT_DATA.filter(e => e.name !== stateName)
  }
}
