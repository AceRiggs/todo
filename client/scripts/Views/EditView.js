(function(){
define(['jquery', 'underscore', 'backbone', '../Collections/Tasks', 'Views/TasksView', 'text!Templates/stats.html',], function($, _, Backbone, Tasks, TasksView, Stats){
	'use strict'
	
	var EditView = Backbone.View.extend({
		initialize: function(){
			console.log("EditView");
			this.listenTo(Tasks, 'all', this.render);
			this.listenTo(Tasks, 'add', this.createTaskView);
		},
		
		el: '#todoapp',
		toggled: false,
		template: _.template(Stats),
		
		events:{
			'keypress #new-todo': 'processKey',
			'click #toggle-all':  'toggleAll',
			'click #clear-completed': "removeCompleted",
			'click #show-completed': "renderCompleted"
		},
		
		rednerCompleted: function()
		{
			console.log("brak compl");
		},
		
		render: function(){
			console.log("renderEdit " + Tasks.length);
			if(Tasks.length > 0){
				this.$('#footer').show();
				var completed = Tasks.getCompletedCount();
				console.log(completed + " " + Tasks.length + " " + (Tasks.length - completed));
				this.$('#footer').html(this.template({completed: completed, remaining: (Tasks.length - completed)}));
				
				this.$('#filters li a').removeClass('selected').filter('[href="#/' + Tasks.actualVisible + '"]').addClass('selected');
			}
			else{
				this.$('#footer').hide();
			}
		},
		
		myEnterHit: function(){
			console.log("Enter");
			if(this.$('#new-todo').val().trim()){
				console.log(this.$('#new-todo').val().trim());
				this.createToDoTask(this.$('#new-todo').val())
				this.$('#new-todo').val('');
			}
		},
		
		createToDoTask: function(taskName){
			Tasks.createTask(taskName);
		},
		
		processKey: function(e){
			if(e.keyCode === 13){
				this.myEnterHit();
		}},
		
		toggleAll: function(){
			this.toggled = !this.toggled;
			var _len = Tasks.length;
			
			for(var i = 0; i < _len; ++i){
				Tasks.at(i).set({completed: this.toggled});
			}
		},
		
		removeCompleted: function(){
			this.toggled = !this.toggled;
			var _len = Tasks.length;
			
			for(var i = 0; i < _len; ++i){
				if(Tasks.at(i).get('completed') === true){
					console.log(Tasks + " " + Tasks.at(i) + " " + i);
					Tasks.at(i).destroy();
				}
			}
		},
		
		createTaskView: function(task){
			var taskView = new TasksView({model: task});
		}
		});
		
		
		
		return EditView;
})
})();