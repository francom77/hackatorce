
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
		"map/:type": "map"
	},

	home: function(){
		var view = new App.Views.HomeView();
		$('#main').html(view.render().$el);
	},

	questions: function(){
		var view = new App.Views.QuestionsView();
		$('#main').html(view.render().$el);
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

	render: function(){

		this.$el.html(this.template());

		return this;
	}
});


App.Views.QuestionsView = Backbone.View.extend({

	template: _.template($("#questionsTemplate").html()),

	render: function(){

		this.$el.html(this.template());

		return this;
	}
});


App.Views.MapView = Backbone.View.extend({

	template: _.template($("#mapTemplate").html()),

	render: function(){

		console.log(this.collection);

		this.$el.html(this.template());

		return this;
	}
});


// Models
// ======

App.Models.Activity = Backbone.Model.extend({});


// Collections
// ===========

App.Collections.Activities = Backbone.Collection.extend({
	url: '/api/actividades/adentro'
});


// Bootstrap App
function main(){
	var router = new App.Router();
	Backbone.history.start();
}

main();

