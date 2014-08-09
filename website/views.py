from website.models import Actividad, Participante
from django.http import HttpResponse
from django.core import serializers
from json import dumps
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render_to_response, get_object_or_404
from django.template import RequestContext

#vistas de la api
@csrf_exempt
def APICrearActividad(request):

	#creamos la actividad
    actividad = Actividad(nombre = request.POST['nombre'],
    	horarioInicio = request.POST['horarioInicio'],
    	horarioFin = request.POST['horarioFin'],
    	latitud = request.POST['latitud'],
    	longitud = request.POST['longitud'],
    	tipo = request.POST['tipo'])
    
    #la guardamos
    actividad.save()

    # devolvemos el status del la consulta
    response = {
        'status':'OK'
    }
    
    return HttpResponse(dumps(response), mimetype='application/json')


@csrf_exempt
def APIUnirse(request, id_actividad):

    actividad = get_object_or_404(Actividad, pk=id_actividad)
    participante = Participante(nombre = request.POST['nombre'],
        edad = request.POST['edad'])
    actividad.participante.add(participante)

    return HttpResponse(dumps(actividad), mimetype='application/json')


def APIActividadesAdentro(request):
    actividades = serializers.serialize(
        'python', Actividad.objects.filter(tipo='d'))

    return HttpResponse(dumps(actividades), mimetype='application/json')


def APIActividadesAfuera(request):
    actividades = serializers.serialize(
        'python', Actividad.objects.filter(tipo='a'))

    return HttpResponse(dumps(actividades), mimetype='application/json')


#vistas que devuelven templates
def Home(request):

	return render_to_response('index.html', {}, 
		context_instance=RequestContext(request))

