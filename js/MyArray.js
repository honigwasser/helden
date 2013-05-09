/**
 * Some methods to enhance the native Array prototype
 * @author Sven Sommerfeld
 * @date 2011-09
 */

/**
 * returns the (first) position of <needle> in <this>
 * works only if <this> is an array of strings and/or numbers
 * will only be implemented, if there is no native indexOf method 
 * @return {Number}
 * @param {String} needle
 * @extends Array
 */
if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function( needle )
  {
  	for( var i = this.length-1; i >= 0; i-- )
  	{
		if( this[ i ] === needle )
			return i 
	};
    return -1
  };
}


/**
 * returns a new array that is identical with <this> plus all elements from <b>, that weren't already elements of <this>
 * if <b> is not an array, <b> will be added to <this>, unless it's already an element of <this>
 * @return {Array}
 * @param {*} b
 */
Array.prototype.addOnce =  function( b )
{
	var a = this;

	if( b instanceof Array )
	{
		for( var i = b.length - 1; i >=0 ; i-- )
	  	{
	  		var e = b[i];
			if( this.join().indexOf( e ) == -1 ) a.push( e )
		}
	} else	
		if( this.join().indexOf( b ) == -1 ) a.push( b );

	return a
}

/**
 * returns the intersection of <this> and <b>, that is an array that only contains those elements,
 * that were already elements of both <this> an <b>.
 * if <b>'s not an array, a new array with <b> as its only element is returned, if it has already been an element of <this>
 * @return {Array}
 * @param {*} b
 */
Array.prototype.intersect =  function( b )
{
	var a = new Array();
	
	if( b instanceof Array )
	{
		for( var i = this.length - 1; i >= 0; i-- )
		{
			var e = this[i];
			if( b[e] ) a.push( e );
		};
	} else
		if( this[b] ) a.push( b );
		
	return a
}

/**
 * Remove all duplicates from <this>
 * @return void
 */
Array.prototype.unique = function()
{
	for( var i=0; i < this.length; i++ )
	{
		var first = this.splice( i, 1 );
		var duplicate =  this.join().indexOf( first )
		if ( duplicate >= 0 ) this.splice( duplicate, 1 );
		this.splice( i, 0, first );
	};
}
