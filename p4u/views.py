from django.template import Context, loader, RequestContext
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, Http404  
from django.shortcuts import render_to_response, get_object_or_404, redirect
import json
import os
from models import Combo, User, ComboType, Character
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
    combo_input = json.loads(combo.combo_input)
    return render_to_response('createTest.html',
            {'combo': combo, 'combo_data': combodata, 'combo_input': combo_input},
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
            user = authenticate(username=user, password=password)
            login(request, user)
            return HttpResponse(status=200)
        except IntegrityError:
            return HttpResponse(status=403)
        
def submit_combo(request):
    if request.is_ajax() and request.method == 'POST':
        if request.user.is_authenticated():


            name = request.POST['name']
            if name == '': name = 'Unnamed Combo'

            try:
                character = Character.objects.get(name=request.POST['character'])
            except Exception:
                return HttpResponse('Invalid character')

            try:
                combo_type = ComboType.objects.get(name=request.POST['combo_type'])
            except Exception:
                return HttpResponse('Invalid combo type')

            try:
                damage = int(request.POST['damage'])
            except ValueError:
                return HttpResponse('Invalid damage')

            try:
                meter_gain = int(request.POST['meter_gain'])
            except ValueError:
                return HttpResponse('Invalid meter gain')

            try:
                meter_drain = int(request.POST['meter_drain'])
            except ValueError:
                return HttpResponse('Invalid meter drain')

            try:
                difficulty = int(request.POST['difficulty'])
                if (difficulty < 1 or difficulty > 5):
                    raise ValueError
            except ValueError:
                return HttpResponse('Invalid difficulty')

            creator = request.user            

            try:
                print request.POST['combo_input']
                combo_input = json.loads(request.POST['combo_input'])
                if len(combo_input) == 0: raise ValueError
                combo_input_str = json.dumps(combo_input)
                #TODO: add combo input verification
            except ValueError:
                return HttpResponse('Not valid combo')

            new_combo = Combo(
                            name = name,
                            character = character,
                            combo_type = combo_type,
                            damage = damage,
                            meter_gain = meter_gain,
                            meter_drain = meter_drain,
                            difficulty = difficulty,
                            creator = creator,
                            combo_input = combo_input_str)
            new_combo.save();
            return HttpResponse(json.dumps({'redirect': '/p4u/view/'+str(new_combo.id)}))
        return HttpResponse('invalid method')

def logout_user(request):
    logout(request)
    return redirect('/p4u/')

def get_all_combos(request):
    comboData = []
    for c in Combo.objects.all():
        data = {}
        data['character'] = str(c.character)
        data['name'] = c.name
        data['combo'] = c.combo_input
        data['type'] = str(c.combo_type)
        data['damage'] = c.damage
        data['meterGain'] = c.meter_gain
        data['meterDrain'] = c.meter_drain
        data['difficulty'] = c.difficulty
        data['creator'] = c.creator.username
        data['favorite'] = False

        comboData.append(data)

    return HttpResponse(json.dumps(comboData))

