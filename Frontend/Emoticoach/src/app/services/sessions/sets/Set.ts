import { set } from "./Iset";

export class Set implements set{
    set_num: number;
    weight: number;
    reps: number;
    rpe: number;

   

    constructor(set_num?:number, weight?:number, reps?:number, rpe?:number) { 
        this.set_num = ((set_num) ? set_num : 0);
        this.weight = ((weight) ? weight : 0);
        this.reps =  ((reps) ? reps : 0);
        this.rpe =  ((rpe) ? rpe : 0);
    }


}

