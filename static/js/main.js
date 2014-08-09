
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
		"map/:type/:name/:point": "map"
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
				'map/' + data.activityType + "/" + data.name + "/" + data.point, {
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
				point: "23234.293423,234239.2394234"
			});
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

