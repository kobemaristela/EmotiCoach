import { muscleOptions } from "src/app/pages/widgets/muscle-groups/muscle-svg/IOpacity-muscle";

export interface sessionRequest {
    id: number;
    datetime: string;
    duration: number;
    name: string;
    muscleGroups: muscleOptions[];
  }





