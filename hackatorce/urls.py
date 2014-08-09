from django.conf.urls import patterns, include, url
from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns('',

	#administrador
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    url(r'^admin/', include(admin.site.urls)),

    #API urls
    url(r'^api/actividades/actividades$', 'website.views.APIActividades'),
    url(r'^api/actividades/airelibre$', 'website.views.APIActividadesLibre'),
    url(r'^api/actividades/adentro$', 'website.views.APIActividadesAdentro'),
    url(r'^api/actividades$', 'website.views.APICrearActividad'),
    url(r'^api/actividades/(?P<id_actividad>\d+)/unirse$', 'website.views.APIUnirse'),

    #website urls
	url(r'^$', 'website.views.Home'),

	)
