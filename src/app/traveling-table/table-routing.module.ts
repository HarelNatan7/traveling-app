import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { TravelingTableComponent } from './traveling-table.component';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '', component: TravelingTableComponent
        },
    ])],
})
export class TableRoutingModule {
}