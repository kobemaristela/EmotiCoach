interface workOut {
    name: string;
    date: Date | null;
    exercises: exercise[];
  }

interface exercise {
    name: string
    sets: set[];
}

interface set {
    reps: number;
    weight: number;
    rpe: number;
    time: number | null;
}

export {workOut, exercise, set}
