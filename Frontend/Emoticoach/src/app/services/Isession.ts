interface session {
    name: string;
    date: Date | null;
    exercises: activity[];
  }

interface activity {
    name: string
    sets: set[];
}

interface set {
    reps: number;
    weight: number;
    rpe: number;
}

export {session, activity, set}
