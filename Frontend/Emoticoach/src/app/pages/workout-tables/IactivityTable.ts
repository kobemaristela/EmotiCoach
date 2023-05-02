
export interface IactivityRow {
    date: string;
    activity: string;
    heaviest_weight: number;
    highest_rpe: number;
    total_sets: number;
    total_volume: number;
}

export interface IactivityTable{
    table: IactivityRow[];
    daterange: string;
}

