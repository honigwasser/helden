/**
 * @class MyHashMap prototype object A very basic hash map prototype for JS
 * @author Sven Sommerfeld
 * @date 2012-02-10
 * @requires JSON for printing only
 * @requires JQuery for printing only
 * @version 1.2.20120210
 */
 
/**
 * @constructor
 * @requires Array
 * @property {Array} keys
 * @property {Array} values
 * @property {Number} length
 */
function MyHashMap ()
{
	this.keys   =  new Array();
	this.values =  new Array();
	this.length =  this.keys.length;
}


/**
 * adds <value> to the value list at the position of <key> in the keylist.
 * if <key> is not element of the list of keys, <key> is added to the end of the keylist.
 * @return {MyHashMap}
 * @param {String} key
 * @param {*} value
 * @param {Boolean} forceArray
 */
MyHashMap.prototype.add = function ( key, value, forceArray )
{
	if( forceArray )
	{
		if( !this.hasKey( key ) )
			this.push( key, [ value ] ); else
			this.values[ this.indexOf( key ) ].push( value );
	} else
	{
		if( !this.hasKey( key ) )
			this.push( key, value ); else
			if( this.values[ this.indexOf( key ) ] instanceof Array ) 
				this.values[ this.indexOf( key ) ].push( value ); else
				this.values[ this.indexOf( key ) ] = value;
	}

	return this
}

/**
 * adds <key> to the keylist and adds <value> to the valuelist.
 * if <key> is already element of the list of keys, nothing is done
 * @return {MyHashMap}
 * @param {String} key
 * @param {*} value
 */
MyHashMap.prototype.push = function ( key, value )
{
	if( !this.hasKey( key ) )
	{
		this.keys.push( key );
		this.values.push( value );
		this.length++;
	}

	return this
}

/**
 * the last elements of the keylist and the valuelist are deleted 
 * @return {MyHashMap}
 */
MyHashMap.prototype.pop = function ()
{
	this.keys.pop();
	this.values.pop();
	this.length--;

	return this
}

/**
 * removes the key-value-pair identified by <needle> from the map
 * @return {MyHashMap}
 * @param {String} needle The key to remove
 */
MyHashMap.prototype.remove = function( needle )
{
	var index = this.indexOf( needle );
	if( index > -1 )
	{
		this.keys.splice( index, 1 );
		this.values.splice( index, 1)
	}
	
	this.length = this.keys.length;

	return this
}

/**
 * returns true if <needle> is in the keylist
 * @return {Boolean}
 * @param {String} needle
 */
MyHashMap.prototype.hasKey = function ( needle )
{
	return this.keys.join().indexOf( needle ) > -1;
}

/**
 * An indexOf method for Arrays, analogous to that for Strings
 * @return {Number}
 * @param {String|Number} needle
 * @requires MyArray.js if indexOf method for arrays is not implemented in the user's browser's JS version
 */
MyHashMap.prototype.indexOf = function ( needle )
{
	return this.keys.indexOf( needle )
}

/**
 * returns the value at the position of <needle> in the keylist
 * @return {*}
 * @param {String} needle 
 */
MyHashMap.prototype.getValue = function( needle )
{
	if( this.indexOf( needle ) >= 0 )
		return this.values[ this.indexOf( needle ) ]; else
		return false
}

MyHashMap.prototype.get = MyHashMap.prototype.getValue;

/**
 * returns the value at the position <index>
 * @return {*}
 * @param {Number} index
 */
MyHashMap.prototype.getValueByPosition = function( index )
{
	return this.values[ index ]
}

/**
 * returns the keylist
 * @return {Array}
 */
MyHashMap.prototype.getKeys = function()
{
	return this.keys
}

/**
 * returns a key by index
 * @return {String}
 * @param {Number} index
 */
MyHashMap.prototype.getKey = function( index )
{
	return this.keys[ index ]
}

/**
 * returns the size of the HashMap (number of keys)
 * @return {Number}
 */
MyHashMap.prototype.getSize = function()
{
	return this.keys.length
}

/**
 * prints the values of the map
 * @requires JSON
 * @requires JQuery
 */
MyHashMap.prototype.print = function()
{
	// clone the values
	var toPrint = $.extend( {}, this.values );
	return JSON.stringify( toPrint, null, ' \t ')
}

/**
 * prints the keys of the map
 * @requires JSON
 * @requires JQuery
 */
MyHashMap.prototype.printKeys = function()
{
	// clone the keys
	var toPrint = $.extend( {}, this.keys );
	return JSON.stringify( toPrint, null, ' \t ')
}

/**
 * loops the hash map
 * @param {Function} callback
 */
MyHashMap.prototype.foreach = function( callback )
{
	for( var i=0; i<this.length; i++ )
	{
		callback( this.keys[ i ], this.values[ i ], i )
	}
}
