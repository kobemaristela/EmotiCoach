import { session } from "./Isession";
import { Activity } from "../activity/Activity";
import { muscleOptions } from "src/app/pages/widgets/muscle-groups/muscle-svg/IOpacity-muscle";

export class Session implements session{
    id: string;
    name: string;
    duration: number;
    datetime: string;
    muscleGroups: muscleOptions[];
    activities: Activity[];
    
    
    constructor( id: string, name?: string,duration?: number, datetime?: string|undefined,muscleGroups?: muscleOptions[],activities?: Activity[],){  
        this.id = id;
        this.name = ((name) ? name : "");
        this.duration = ((duration) ? duration : 0);
        this.datetime = ((datetime) ? datetime : "");
        this.muscleGroups = ((muscleGroups) ? muscleGroups : []);
        this.activities = ((activities) ? activities : [new Activity("0")]);
    }

    createCopy(oldSession: session){
        this.id = oldSession.id;
        this.name = oldSession.name;
        if (oldSession.duration){
            this.duration = oldSession.duration;
        }
        this.datetime = oldSession.datetime;
        this.muscleGroups = oldSession.muscleGroups;
        // this.activities = new Activity oldSession.activities;
    }

    updateId(id:string){
        this.id = id;
    }

    updateName(name:string) {
        this.name = name;
    }

    updateMuscleGroups(muscleGroups: muscleOptions[]){
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