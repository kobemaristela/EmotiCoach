from .models import MuscleGroup, Set

def filterMuscleGroups(muscleGroup):
    allGroups = [f.name for f in MuscleGroup._meta.get_fields()]
    allGroups.remove("activity")
    allGroups.remove("id")
    returnList = list()
    
    for group in allGroups:
        if muscleGroup._meta.get_field(group).value_from_object(muscleGroup) == True:
            returnList.append(group)
    return returnList

def parseActivity(activity):
    activityDict = dict()
    activityDict["id"] = activity[0]
    activityDict["name"] = activity[1]

    muscleGroup = MuscleGroup.objects.get(activity_id=activity[0])
    activityDict["muscleGroups"] = filterMuscleGroups(muscleGroup)

    activityDict["sets"] = list(Set.objects.filter(activity_id = activity[0]).values("id", "set_num", "weight", "reps", "rpe"))
    
    return activityDict
