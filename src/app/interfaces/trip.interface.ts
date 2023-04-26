import { State } from "./state.interface";

export interface Trip {
    flag: string;
    name: string;
    startDate: Date | null;
    endDate: Date | null;
    notes: string;
}