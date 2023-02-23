import { session } from "./Isession";
import { Activity } from "../activity/Activity";

export class Session implements session{
    id: string;
    name: string;
    duration: number;
    datetime: string;
    muscleGroups: string[];
    activities: Activity[];

    constructor( id: string, name?: string,duration?: number, datetime?: string|undefined,muscleGroups?: string[],activities?: Activity[],){  
        this.id = id;
        this.name = ((name) ? name : "");
        this.duration = ((duration) ? duration : 0);
        this.datetime = ((datetime) ? datetime : "");
        this.muscleGroups = ((muscleGroups) ? muscleGroups : []);
        this.activities = ((activities) ? activities : [new Activity("0")]);
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

    updateActivity(index:number, activity:Activity): boolean{      
        if (!this.activities){
            console.log("undefined activity");
            return false;
        } 
        if(this.activities[index]){
            this.activities[index] = activity;
            return true;
        }
        return false;
    }
}