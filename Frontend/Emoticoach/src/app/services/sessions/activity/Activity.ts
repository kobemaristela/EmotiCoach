import { activity } from "./Iactivity";
import { Set } from "../sets/Set";

export class Activity implements activity{
    id: string;
    name: string;
    muscleGroups: string[];
    sets: Set[];

    constructor(id:string, name?:string, muscleGroups?:string[], sets?: Set[]) { 
        this.id = id;
        this.name = ((name) ? name : "");
        this.muscleGroups = ((muscleGroups) ? muscleGroups : []);
        this.sets = ((sets) ? sets : [new Set()]);
    }

    updateId(id:string){
        this.id = id;
    }

    updateName(name:string) {
        this.name = name;
    }

    updateMuscleGroups(muscleGroups: string[]){
        this.muscleGroups = muscleGroups;
    }

    updateSet(index:number, set:Set): boolean{      
        if (!this.sets){
            console.log("undefined set");
            return false;
        } 
        if(this.sets[index]){
            this.sets[index] = set;
            return true;
        }
        console.log("index doesnt exist");
        return false;
    }
}

