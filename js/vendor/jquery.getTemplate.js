/**
 * jQuery plugin to get single piece of html template.
 */

(function( $ ) {
  $.getTemplate = function (path) {
    // First create a div container to hold the template.
    var d = document.createElement('div');
    // Actually load the template.
    $(d).load(path);
    // Return the object.
    return $(d);
  };
} (jQuery));
