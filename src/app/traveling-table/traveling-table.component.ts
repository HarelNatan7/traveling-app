import { Component } from '@angular/core';
import { TableRow } from '../interfaces/table-row.interface';

const ELEMENT_DATA: TableRow[] = [
  {flag: 'httt', name: 'C1', startDate: new Date, endDate: new Date, notes: 'This is note'},
  {flag: 'httt', name: 'C2', startDate: new Date, endDate: new Date, notes: 'This is note'},
  {flag: 'httt', name: 'C3', startDate: new Date, endDate: new Date, notes: 'This is note'},
];

@Component({
  selector: 'app-traveling-table',
  templateUrl: './traveling-table.component.html',
  styleUrls: ['./traveling-table.component.scss']
})
export class TravelingTableComponent {
  displayedColumns: string[] = ['flag', 'name', 'startDate', 'endDate', 'notes'];
  dataSource = ELEMENT_DATA;
}
