from django.test import TestCase
from django.test import Client

class ParticipanteTest(TestCase):

	def agregar_participate(self):
		c = Client()
		response = c.post('api/actividades/1/unirse', {'nombre':'lagarto', 'edad':'48'})
		self.asertEqual(response.status_code, 302)