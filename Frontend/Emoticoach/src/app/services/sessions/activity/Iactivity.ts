import { set } from "../sets/Iset";

export interface activity {
    id: string;
    name: string;
    muscleGroups: string[];
    sets: set[];
}