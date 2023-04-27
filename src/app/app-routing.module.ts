import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { TravelingFormComponent } from './traveling-form/traveling-form.component';
// import { TravelingTableComponent } from './traveling-table/traveling-table.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./traveling-form/form.module').then(m => m.FormModule) },
  { path: 'form', loadChildren: () => import('./traveling-form/form.module').then(m => m.FormModule) },
  { path: 'table', loadChildren: () => import('./traveling-table/table.module').then(m => m.TableModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
