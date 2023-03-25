import { activity } from "../activity/Iactivity";

export interface session {
    id: string;
    name: string;
    duration: number | undefined;
    datetime: string;
    muscleGroups: string[];
    activities: activity[];
  }





