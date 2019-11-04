from django.http import HttpResponse

def is_loggedin(origin_func):
    def wrapper(*args, **kwargs):
        request = args[0]
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        return origin_func(*args, **kwargs)
    return wrapper