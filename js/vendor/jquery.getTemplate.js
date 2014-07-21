/**
 * author: github:  javisr
 *         twitter: @javisr
 *         web:     http://javisr.net
 *
 * jQuery plugin for use simple templates in jQuery
 */

(function ($) {

    var templateCache = {}; // object to cache the templates

    /**
     * This function does a request to get the raw template
     * @param path
     * @returns {*}
     */
    function templateRequest(path){
        var promise = $.Deferred(); // The promise that will be returned
        $.ajax(path,{
            success : function(response){
                promise.resolve(response);
            },
            error : function(){
                var error = 'The provided path doesn\'t exist';
                promise.reject(error);
            }
        });

        return promise;
    }

    /**
     * This functions returns a promise of a processed html template
     * @param _path
     * @param _data
     * @param _cache
     * @returns {*}
     */
    $.getTemplate = function (_path, _data, _cache) {

        var templatePromise = $.Deferred(); // The promise that will be returned

        var path = ''; //Default value for path
        if(typeof _path === 'string'){
            path =   _path;
        }

        var data = {}; //Default value for data
        if(typeof _data !== 'undefined'){
            data = _data;
        }

        var cache = true; //Default value for cache
        if (typeof _cache === 'boolean') {
            cache =  _cache;
        }

        var templateTempPromise; //this var will be a new or cached promise
        if(cache){
            if(typeof templateCache[path] !== 'undefined'){
                templateTempPromise = templateCache[path];
            }else{
                templateCache[path] = templateRequest(path);
                templateTempPromise = templateCache[path];
            }
        }else{
            templateTempPromise = templateRequest(path);
        }

        var processedTemplate = ''; //this var will contain the processed html
        templateTempPromise.done(function(template){
            processedTemplate = template;
            $.each(data, function(key, value){
                var expReg = new RegExp('{{@@' + key + '@@}}','g');
                processedTemplate = processedTemplate.replace(expReg , value);
            });
            templatePromise.resolve(processedTemplate);
        });

        return templatePromise;
    };

}(jQuery));
