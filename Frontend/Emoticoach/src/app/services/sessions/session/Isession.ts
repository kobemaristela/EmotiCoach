import { activity } from "../activity/Iactivity";

export interface session {
    id: string;
    name: string;
    duration: number;
    //yyyy-
    datetime: string;
    muscleGroups: string[];
    activities: activity[];
  }





