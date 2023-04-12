import { muscleOptions } from "src/app/pages/widgets/muscle-groups/muscle-svg/IOpacity-muscle";
import { activity } from "../activity/Iactivity";

export interface session {
    id: string;
    name: string;
    duration: number | undefined;
    datetime: string;
    muscleGroups: muscleOptions[];
    activities: activity[];
  }





