(function(){
define(['jquery', 'underscore', 'backbone', '../models/ToDoTask'], function($, _, Backbone, ToDoTask){
	'use strict'
	
	var Tasks = Backbone.Collection.extend({
		initialize: function(){
			console.log("Tasks");
			this.bind('change : model.completed', this.onCompletedChange); 
		},
		
		
		actualVisible: null,
		actualId: 0,
		model: ToDoTask,
		
		createTask: function(taskName){
			var taskToDo = new ToDoTask(taskName);
			taskToDo.set({id: this.actualId});
			
			if(this.actualVisible === 'completed'){
				taskToDo.set({visible: false});
			}
			
			console.log(taskToDo.get('id'));
			this.actualId += 1;
			console.log(taskToDo.get('title'));
			this.add(taskToDo);
		},
		
		onCompletedChange: function(changedModel){
			var completed = changedModel.get('completed');
			if(this.actualVisible === 'all'){
				return;
			}
			
			var visible = true;
			if(this.actualVisible !== 'completed'){
				visible = false;
			}
			if(completed === visible){
				changedModel.showMe(true);
				return;
			}
			changedModel.showMe(false);
		},
		
		getCompletedCount: function(){
			var counter = 0;
			
			for(var i = 0; i < this.length; ++i){
				if(this.at(i).get('completed') === true){
					++counter;
				}
			}
			return counter;
		},
		
		showTasks: function(showCompleted){
			this.actualVisible = showCompleted;
			this.trigger("all", {});
			console.log(showCompleted);
			if(showCompleted === 'completed'){
				this.showCompleted(true);
			}
			else if(showCompleted === 'active'){
				this.showCompleted(false);
			}
			else{
				this.showAll();
			}
		},
		
		showCompleted: function(isCompleted)
		{
			for(var i = 0; i < this.length; ++i){
				if(this.at(i).get('completed') === isCompleted){
					this.at(i).showMe(true);
				}
				else{
					this.at(i).showMe(false);
				}
			}
		},
		
		showAll: function(){
			for(var i = 0; i < this.length; ++i){
				this.at(i).showMe(true);
			}
		},
		
		getCompleted: function(isCompletedB){
			var arrC = new Array();
			for(var i = 0; i < this.length; ++i){
				if(this.at(i).get('completed') === isCompletedB){
					arrC.push(this.at(i));
				}
			}
			return arrC;
		}
		
		});
		
		return new Tasks;
})
})();