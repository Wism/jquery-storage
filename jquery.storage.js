/*!
 * jQuery Storage plugin v1.0
 * 
 * Copyright 2012, Thyago Quintas (dev@thyagoquintas.com.br)
 * 
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0 
 */

;(function($){

  var methods = {
    init : function(content) {
	    var objects = [];
	    
	    // Return the values in stored
    	this.each(function(){
	    	var contents = $.extend({
				    'name' : $(this).attr("id"),
				    'location' : $(this).storage('support') ? 'localStorage':'cookies'
			}, content);
			
			if(contents['location'] == 'localStorage'){
		    	objects.push(localStorage[contents['name']]);
	        }else if(contents['location'] == 'cookie') {
		        objects.push($.cookie(contents['name']));
	        }else {
		        $.error('Location not accepted.');
	        }
		});
		return objects;	
    },//Close return
    
    // Remove the values in stored
    remove : function(content) {
	    this.each(function(){
		    var contents = $.extend({
			    'name' : $(this).attr("id"),
			    'location' : $(this).storage('support') ? 'localStorage':'cookies'
			}, content);

		    if(contents['location'] == 'localStorage'){
		    	localStorage.removeItem(contents['name']);
	        }else if(contents['location'] == 'cookie') {
		        $.removeCookie((contents['name']));
	        }else {
		        $.error('Location not accepted.');
	        }
	    });
    },//Close remove
    
    // Update the values in stored
    update : function(content) {
    	this.each(function(){
	    	var contents = $.extend( {
	          'value' : $(this).val(), 
	          'name' : $(this).attr("id"),
	          'location' : $(this).storage('support') ? 'localStorage':'cookies'
	        }, content);
	        
	        if(contents['location'] == 'localStorage'){
		        localStorage[contents['name']] = contents['value'];
	        }else if(contents['location'] == 'cookie') {
		        $.cookie(contents['name'], contents['value']);
	        }else {
		        $.error('Location not accepted.');
	        }
	    });
    },//Close update
    
    // Verify the compatibility with localStorage
    support : function(){
	    return ('localStorage' in window) && window['localStorage'] !== null;
    }
  };

  $.fn.storage = function(method) {
    if (methods[method]) {
      return methods[method].apply( this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || ! method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' +  method + ' does not exist on jQuery.storage');
    }
  };
})(jQuery);