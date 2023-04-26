import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TravelingFormComponent } from './traveling-form/traveling-form.component';
import { TravelingTableComponent } from './traveling-table/traveling-table.component';

const routes: Routes = [
  {
    path: '',
    component: TravelingFormComponent,
  },
  {
    path: 'form',
    component: TravelingFormComponent,
  },
  {
    path: 'table',
    component: TravelingTableComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
