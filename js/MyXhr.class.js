/**
 * @class MyXhr
 * @author Sven Sommerfeld
 * @date 2011-08
 * @requires XMLHttpRequest
 * @requires JQuery for object cloning
 */

/**
 * @constructor
 * @param {Object.<String, String>} myOptions
 * @property {?DOMString|?Document} result
 * @property {Object.<String, String>} options
 * @property {XMLHttpRequest} request
 */
function MyXhr( myOptions )
{
	var defaults = 
	{
		method : 'get',
		type   : 'html',
		path   : './'
	}
	
	this.result  = null;
	this.options = $.extend( {}, defaults, myOptions );
	this.request = new XMLHttpRequest();
}

/**
 * @return {MyXhr}
 */
MyXhr.prototype.open = function()
{
	this.request.open ( this.options.method, this.options.path, false );
	return this;
}

/**
 * @return {MyXhr}
 */
MyXhr.prototype.send = function ()
{
	this.request.send ( null );
	return this;	
}

/**
 * @return {String|Document}
 */
MyXhr.prototype.getResult = function()
{
	if( this.getStatus() == 200 )
	{
		if ( this.options.type == "xml" ) return this.request.responseXML;
		return this.request.responseText;
	}
	return null
}

/**
 * @return {String}
 */
MyXhr.prototype.getStatus =  function()
{
	return this.request.status;
}
