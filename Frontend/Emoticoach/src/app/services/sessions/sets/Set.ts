import { set } from "./Iset";

export class Set implements set{
    weight: number;
    reps: number;
    rpe: number;

   

    constructor(weight?:number, reps?:number, rpe?:number) { 
        
        this.weight = ((weight) ? weight : 0);
        this.reps =  ((reps) ? reps : 0);
        this.rpe =  ((rpe) ? rpe : 0);
    }


}

