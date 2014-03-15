
define([
	'jquery',
	'backbone',
	'Collections/Tasks'
], function ($, Backbone, Tasks) {
	'use strict';

	var ViewRouter = Backbone.Router.extend({
		initialize: function(){
			console.log("initialize Router");
			Backbone.history.start();
		},
		
		routes: {
			':filter': 'readParam'
		},

		readParam: function (param) {
				Tasks.showTasks(param);
		}
	});

	return ViewRouter;
});