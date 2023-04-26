import { State } from "./state.interface";

export interface Trip {
    state: State;
    startDate: Date;
    endDate: Date;
    notes: string;
}