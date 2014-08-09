# encoding:utf-8
from django.db import models

class Participante(models.Model):
	nombre = models.CharField(max_length=30)
	edad = models.IntegerField()

	def __unicode__(self):
		return self.nombre



class Actividad(models.Model):
	nombre = models.CharField(max_length=30)
	horarioInicio = models.DateTimeField()
	horarioFin = models.DateTimeField()
	participante = models.ManyToManyField(Participante, blank=True)
	#localizacion
	latitud = models.CharField(max_length=30)
	longitud = models.CharField(max_length=30)
	airelibre = 'a'
	adentro = 'd'
	tipo_choices = (
			(airelibre, 'airelibre'),
			(adentro, 'adentro'),


		)
	tipo = models.CharField(max_length=30,choices=tipo_choices)

	def __unicode__(self):
		return self.nombre
		







		