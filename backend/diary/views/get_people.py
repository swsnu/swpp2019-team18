"""Summary of this file

func people_names
"""
from django.http import HttpResponse, JsonResponse
# from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
from ..models import People

User = get_user_model()
def people_names(request):
    """Summary or Description of the Function

    Parameters:
    argument (): 

    Returns:
    HttpResponse: list of people object, [{"id": _, "name": _}, ...{}]

   """
    if request.method == "GET":
        # user = request.user
        user_id = 1
        user = User.objects.get(id=user_id)
        people = People.objects.filter(user=user)
        people_objs = [{"id" : person.id, "name" : person.name} for person in people]
        return JsonResponse(people_objs, status=201)
    return HttpResponse(status=405)
