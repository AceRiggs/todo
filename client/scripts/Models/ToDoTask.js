(function(){
define(['jquery', 'underscore', 'backbone'], function($, _, Backbone){
	'use strict';
	
	var ToDoTask = Backbone.Model.extend({
		initialize: function(taskName){
			this.set({title: taskName});
			
			
			console.log("Nowe zadanie : " + this.get('title'));
		},
		
		defaults:{
			id: 0,
			title: '',
			completed: false,
			visible: true
		},
		
		showMe: function(vis){
			if(vis !== this.get('visible')){
				this.set({visible: vis}); 
			}
		}
		
		});
		
		return ToDoTask;
})
})()