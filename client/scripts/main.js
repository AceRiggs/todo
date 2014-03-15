'use strict';

require.config({
	baseUrl: "./scripts",
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		backboneLocalstorage: {
			deps: ['backbone'],
			exports: 'Store'
		}
		
	},
	paths: {
		jquery: '../js/jquery/dist/jquery',
		underscore: '../js/underscore/underscore',
		backbone: '../js/backbone/backbone',
		text: '../js/requirejs-text/text'
//			backboneLocalStorage: '../lib/backbone.localStorage/backbone.localStorage'
	}
});

require(['backbone', 'Views/EditView', 'Routers/ViewRouter'], function(Backbone, EditView, ViewRouter){
	
		alert("działa? :P");
		
		var router = new ViewRouter();
		
		var eView = new EditView();
});