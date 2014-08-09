from django.test import TestCase
from django.test import Client
from models import Actividad





class ParticipanteTest(TestCase):

	def get_actividad_airelibre(self):
		actividad = Actividad.objects.create(nombre="futbl", horario_inicio=23, horario_fin=25, latitud=50, longitud=66, tipo='a')
		response = self.client.get('/api/actividades/airelibre')
		self.assertEqual(response.status_code, 200)

	
	
	def get_actividad_adentro(self):
		actividad = Actividad.objects.create(nombre="basquet", horario_inicio=13, horario_fin=15, latitud=50, longitud=66, tipo='d')
		response = self.client.get('/api/actividades/adentro')
		self.assertEqual(response.status_code, 200)
		
	

