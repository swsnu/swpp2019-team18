"""Summary of this file

func people_names
"""
import json
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
from ..models import People
from ..decorator import is_logged_in

User = get_user_model()

@is_logged_in
def people(request):
    """Summary or Description of the Function

    Parameters:
    argument : empty

    Returns :
    HttpResponse: list of {'id', 'name'} object

   """
    if request.method == "GET":
        user = request.user
        my_people = People.objects.filter(user=user)
        people_objs = [{"id" : person.id, "name" : person.name, "information" : person.information} for person in my_people]
        return JsonResponse(people_objs, status=200, safe=False)

    if request.method == "POST":
        user = request.user
        req_data = json.loads(request.body.decode())
        info = req_data['information']
        name = req_data['name']
        People.objects.create(
            user=user,
            name=name,
            information=info
        )
        return HttpResponse(status=201)
    return HttpResponse(status=405)
