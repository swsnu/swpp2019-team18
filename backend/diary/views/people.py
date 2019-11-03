"""Summary of this file

func people_names
"""
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth import get_user_model
from ..models import People

User = get_user_model()

@csrf_exempt
def people(request):
    """Summary or Description of the Function

    Parameters:
    argument : empty

    Returns :
    HttpResponse: list of {'id', 'name'} object

   """
    if request.method == "GET":
        # TODO : user = request.user
        user_id = 1
        user = User.objects.get(id=user_id)
        my_people = People.objects.filter(user=user)
        people_objs = [{"id" : person.id, "name" : person.name} for person in my_people]
        return JsonResponse(people_objs, status=201, safe=False)

    if request.method == "POST":
        # TODO : user = request.user
        user_id = 1
        user = User.objects.get(id=user_id)
        req_data = json.loads(request.body.decode())
        info = req_data['information']
        name = req_data['name']
        person = People.objects.create(
            user=user,
            name=name,
            information=info
        )
        return HttpResponse(status=201)
    return HttpResponse(status=405)
