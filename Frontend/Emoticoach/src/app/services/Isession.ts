interface session {
    id: string;
    name: string;
    datetime: string;
    muscleGroups: string[];
    activities: activity[];
  }

interface activity {
    id: string;
    name: string;
    numberOfSets: number;
    muscleGroups: string[];
    sets: set[];
}

interface set {
    weight: number;
    reps: number;
    rpe: number;
}

export {session, activity, set}
