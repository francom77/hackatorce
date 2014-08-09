
// Global Scope
var App = {
	Views: {},
	Models: {},
	Collections: {}
};


// Router
// ======

App.Router = Backbone.Router.extend({

	routes: {
		"": "home",
		"questions": "questions",
		"map/:type/:name/:lat/:long": "map",
		"activity/new": "newActivity"
	},

	home: function(){

		var view = new App.Views.HomeView();
		$('#main').html(view.render().$el);

		view.on('button:ready', _.bind(function(){
			this.navigate('questions', {
				trigger: true
			});
		}, this));

	},

	questions: function(){
		var view = new App.Views.QuestionsView();
		$('#main').html(view.render().$el);

		view.on('questions:ready', _.bind(function(data){
			this.navigate(
				'map/' + data.activityType + "/" + data.name + "/" + data.lat + "/" + data.long, {
				trigger: true
			});
		}, this));
	},

	map: function(activityType, name, lat, long){

		var Activities = new Backbone.Collection({});

		Activities.fetch({
			url: "/api/actividades/" + activityType,
			success: function(){
				var view = new App.Views.MapView({
					collection: Activities,
					name: name,
					lat: lat,
					long: long
				});
				$('#main').html(view.render().$el);
			}
		});

	},
	newActivity: function(){
		var view = new App.Views.NewActivityView();
		$('#main').html(view.render().$el);
	}
});


// Views
// =====

App.Views.HomeView = Backbone.View.extend({

	template: _.template($("#homeTemplate").html()),

	events: {
		"click button": "_buttonClicked"
	},

	render: function(){

		this.$el.html(this.template());

		return this;
	},

	_buttonClicked: function(){
		this.trigger('button:ready');
	}
});


App.Views.QuestionsView = Backbone.View.extend({

	template: _.template($("#questionsTemplate").html()),

	events: {
		"click button": "_handleButton",
	},

	initialize: function(){
		this._getGeoPosition();
	},

	render: function(){

		this.$el.html(this.template());

		return this;
	},

	_handleButton: function(event){

		var activityType = event.target.id;
		var name = this.$('input[name="nombre"]').val();

		if(name !== ''){
			this.trigger('questions:ready', {
				name: name,
				activityType: activityType,
				lat: this.lat,
				long: this.long
			});
		}else{
			alert('El campo nombre es requerido');
		}
	},

	_getGeoPosition: function(){
		try {
			navigator.geolocation.getCurrentPosition(_.bind(function(position){
				this.lat = position.coords.latitude;
				this.long = position.coords.longitude;
			}, this));
		}catch (e){
			alert("La geolocalización debe estar activada");
		}
	}
});


App.Views.MapView = Backbone.View.extend({

	template: _.template($("#mapTemplate").html()),

	initialize: function(options){

		this.lat = options.lat;
		this.long = options.long;
		this.name = options.name;

		this.mapOptions = {
			zoom: 14,
			center: new google.maps.LatLng(this.lat, this.long),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
	},

	render: function(){

		this.$el.html(this.template());

		this.map = new google.maps.Map(this.$('.sectionMap')[0], this.mapOptions);
		this.$('.sectionMap').css('height', window.innerHeight);

		this._addMarkers();

		return this;
	},
	_addMarkers: function(){

		this.collection.each(function(activity){

			var fields = activity.get('fields');

			var contentString = fields.nombre;

			var infowindow = new google.maps.InfoWindow({
				content: contentString
			});

			var myLatlng = new google.maps.LatLng(fields.latitud, fields.longitud);

			var marker = new google.maps.Marker({
				position: myLatlng,
				title: fields.nombre
			});

			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map,marker);
			});

			marker.setMap(this.map);
		});
	}
});



App.Views.NewActivityView = Backbone.View.extend({

	template: _.template($("#actividadTemplate").html()),

	render: function(){

		this.$el.html(this.template());

		return this;
	}
});


// Models
// ======


// Collections
// ===========


// Bootstrap App
function main(){
	var router = new App.Router();
	Backbone.history.start();
}

main();

