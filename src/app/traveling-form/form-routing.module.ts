import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { TravelingFormComponent } from './traveling-form.component';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '', component: TravelingFormComponent
        },
    ])],
})
export class FormRoutingModule {
}