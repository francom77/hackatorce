
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
		"map/:type/:name/:lat/:long": "map"
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

	map: function(activityType){

		var Activities = new Backbone.Collection({
			url: "/api/actividades/" + activityType
		});

		var view = new App.Views.MapView({
			collection: Activities
		});

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
		}
	},

	_getGeoPosition: function(){
		try {
			navigator.geolocation.getCurrentPosition(_.bind(function(position){
				this.lat = position.coords.latitude;
				this.long = position.coords.longitude;
			}, this));
		}catch (e){
			alert("Geolocation should be enabled");
		}
	}
});


App.Views.MapView = Backbone.View.extend({

	template: _.template($("#mapTemplate").html()),

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

