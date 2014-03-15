(function(){
define(['jquery', 'underscore', 'backbone', '../Collections/Tasks', '../models/ToDoTask', 'text!Templates/todos.html'], function($, _, Backbone, Tasks, ToDoTask, todos){
	'use strict';
	
	var TasksView = Backbone.View.extend({
		initialize: function(){
			//this.listenTo(this.model, 'destroy', this.remove);
			this.listenTo(this.model, 'change', this.render);
			$('#todo-list').append(this.render().el);
		},
		
		events:{
			'click .toggle':	'toggleMe'
		},
		
		counter: 0,
		template: _.template(todos),
		
		render: function(){
			this.$el.html(this.template(this.model.toJSON()));
			this.$el.toggleClass('completed', this.model.get('completed'));

			this.toggleVisible();
			this.$input = this.$('.edit');
			return this;
		},
		
		toggleVisible: function () {
			this.$el.toggleClass('hidden',  !this.visible());
		},
		
		toggleMe: function() {
			var completed = this.model.get('completed');
			this.model.set({completed: !completed});
			this.render();
		},
		
		toggle: function(completed){
			this.$el.toggleClass('completed', completed);
		},
		
		visible: function () {
			return this.model.get('visible');
		},
		
		//model: ToDoTask
		});
		
		return TasksView;
})
})();