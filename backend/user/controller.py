def checkIfParameter(request, parameter):
    if parameter in request.POST:
        return request.POST[parameter]
    else:
        return None