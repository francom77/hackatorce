from django.shortcuts import render_to_response


def Home(request):

	return render_to_response('index.html', {})

