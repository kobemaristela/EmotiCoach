from rest_framework import status

def SetSessionDataGood(userId):
    setData = [
            {
                "set_num": 1,
                "weight": 135,
                "reps": 1,
                "rpe": 1
            }
        ]
    activityData = [
        {
            "name": "activity1",
            "muscleGroups": ["chest","tricep"],
            "sets": setData
        }
    ]
    sessionData = {
        "name": "session1",
        "duration": "1",
        "datetime": "2000-1-1 1:00:00",
        "auth_user_id": userId,
        "activities": activityData
    }

    return sessionData

def SetSessionDataMissingFields(userId):
    sessionList = list()

    for sessionColumn in ["set_num", "weight", "reps", "rpe"]:
        if sessionColumn == "set_num":
            setData = [
                {
                    "set_num": None,
                    "weight": 135,
                    "reps": 1,
                    "rpe": 1
                }
            ]
        elif sessionColumn == "weight":
            setData = [
                {
                    "set_num": 1,
                    "weight": None,
                    "reps": 1,
                    "rpe": 1
                }
            ]
        elif sessionColumn == "reps":
            setData = [
                {
                    "set_num": 1,
                    "weight": 135,
                    "reps": None,
                    "rpe": 1
                }
            ]
        elif sessionColumn == "set_num":
            setData = [
                {
                    "set_num": 1,
                    "weight": 135,
                    "reps": 1,
                    "rpe": None
                }
            ]
        activityData = [
            {
                "name": "activity1",
                "muscleGroups": ["chest","tricep"],
                "sets": setData
            }
        ]
        sessionData = {
            "name": "session1",
            "duration": "1",
            "datetime": "2000-1-1 1:00:00",
            "auth_user_id": userId,
            "activities": activityData
        }

        sessionList.append((sessionData, status.HTTP_400_BAD_REQUEST))

    # No set data in activities
    activityData = [
            {
                "name": "activity1",
                "muscleGroups": ["chest","tricep"],
                "sets": []
            }
        ]
    sessionData = {
        "name": "session1",
        "duration": "1",
        "datetime": "2000-1-1 1:00:00",
        "auth_user_id": userId,
        "activities": activityData
    }
    sessionList.append((sessionData, status.HTTP_200_OK))

    # No activities in data
    sessionData = {
        "name": "session1",
        "duration": "1",
        "datetime": "2000-1-1 1:00:00",
        "auth_user_id": userId,
        "activities": []
    }
    sessionList.append((sessionData, status.HTTP_200_OK))

    return sessionList