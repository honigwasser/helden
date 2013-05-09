/**
 * Class Held
 * @version 0.1.20120208
 * @encondig UTF-8
 * @author Sven Sommerfeld
 */
function Held( name, eigenschaften )
{
	this.name = name;
	this.eigenschaften = {};
	
	this.__construct( eigenschaften );
	
	return this
}

Held.prototype.__construct = function( eigenschaften )
{
	if( eigenschaften instanceof Array )
		for( var i=eigenschaften.length-1; i>=0; i-- )
		{
			var eigenschaft = eigenschaften[ i ];
			this.eigenschaften[ eigenschaft.getLabel() ] = eigenschaft;
		}
}

Held.prototype.setName = function( name )
{
	this.name = name;
	return this
}

Held.prototype.getName = function()
{
	return this.name
}


Held.prototype.getEigenschaften =  function()
{
	return this.eigenschaften
}

Held.prototype.setEigenschaft = function( eigenschaft, tvalue )
{
	if( tvalue == undefined )
		throw new Error( ErrorHandler.print( 'TVUNDF' ) );
		
	if( !(eigenschaft instanceof Eigenschaft) )
		throw new Error( ErrorHandler.print( 'NOPROP', property ) );
	
	if( tvalue )
		this.__has( eigenschaft ); else
		this.__not( eigenschaft );
	
	return this
}

Held.prototype.hasEigenschaft =  function( eigenschaft )
{
	return this.eigenschaften[ eigenschaft ] instanceof Eigenschaft
}

Held.prototype.__has = function( eigenschaft )
{
	var label = eigenschaft.getLabel()
	if( this.eigenschaften[ label ] == undefined )
		this.eigenschaften[ label ] = eigenschaft;
		
	return this
}

Held.prototype.__not = function( eigenschaft )
{
	var label = eigenschaft.getLabel()
	if( this.eigenschaften[ label ] )
		this.eigenschaften[ label ] = undefined;

	return this
}
