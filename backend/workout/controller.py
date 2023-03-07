from .models import MuscleGroup, Set, Activity
from rest_framework.exceptions import ParseError

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

def getMuscleGroups(sessionId):
    activities = Activity.objects.filter(session_id=sessionId).values("id")

    muscleGroups = list()
    for activity in activities:
        muscleGroup = MuscleGroup.objects.get(activity_id=activity["id"])
        muscleGroup = filterMuscleGroups(muscleGroup)
        muscleGroups += muscleGroup
    return [*set(muscleGroups)]

def checkIfInt(data):
    if isinstance(data, int):
        return data
    else:
        raise ParseError()
    
def checkIfParameter(request, parameter):
    if parameter in request.POST:
        return request.POST[parameter]
    else:
        return None

