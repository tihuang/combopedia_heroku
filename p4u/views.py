from django.template import Context, loader, RequestContext
from django.contrib.auth import authenticate, login
from django.http import HttpResponse, Http404  
from django.shortcuts import render_to_response, get_object_or_404
import json
import os
from models import Combo, User
from django.db import IntegrityError

# Create your views here.
def menu(request):
    return render_to_response('menu.html',
                              context_instance=RequestContext(request))

def create(request):
    return render_to_response('comboInput.html',
                              context_instance=RequestContext(request))

def view(request, combo_id):
    combo = Combo.objects.get(id=combo_id)
    fields = Combo._meta.fields 
    combodata = [(field.name, getattr(combo, field.name)) for field in combo._meta.fields]
    return render_to_response('createTest.html',
                              {'combo': combo, 'combo_data': combodata},
                              context_instance=RequestContext(request))

def login_user(request):
    if request.is_ajax() and request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponse(status=200)
        else:
            return HttpResponse(status=403)


def signup(request):
    if request.is_ajax() and request.method == 'POST':
        user = request.POST['username']
        password = request.POST['password']
        try:
            u = User.objects.create_user(user, password)
            u.set_password(password)
            u.save()
            return HttpResponse(status=200)
        except IntegrityError:
            return HttpResponse(status=403)
        

