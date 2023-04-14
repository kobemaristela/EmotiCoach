import { muscleOptions } from "src/app/pages/widgets/muscle-groups/muscle-svg/IOpacity-muscle";
import { set } from "../sets/Iset";

export interface activity {
    id: string;
    name: string;
    muscleGroups: muscleOptions[];
    sets: set[];
}