from django.template import Context, loader, RequestContext
from django.http import HttpResponse, Http404  
from django.shortcuts import render_to_response, get_object_or_404
import json
import os

# Create your views here.
def menu(request):
    print os.getcwd()
    return render_to_response('menu.html',
                              context_instance=RequestContext(request))
