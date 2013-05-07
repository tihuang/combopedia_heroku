from django.template import Context, loader, RequestContext
from django.http import HttpResponse, Http404  
from django.shortcuts import render_to_response, get_object_or_404
import json
import os
from models import Combo

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
