function MyMatrix( m, n )
{
	this.size = [0,0];
	this.cols = [];
	this.rows = [];
	this.data = [];
	
	this.__construct( m, n )
}

MyMatrix.prototype.__construct = function( m, n )
{
	for( r=1; r<=m; r++ )
	{
		this.data.push( [] );
		
		for( c=1; c<=n; c++ )
		{
			this.set( [r,c], null )
		}
	}
}

MyMatrix.prototype.__resize = function()
{
	var m = this.data.length;
	var n = this.data[0].length;
	
	this.size = [ m, n ];
}

MyMatrix.prototype.getSize = function()
{
	return this.size
}

MyMatrix.prototype.getColNames = function()
{
	return this.cols
}

MyMatrix.prototype.getColName = function( j )
{
	return this.cols[ j-1 ]
}

MyMatrix.prototype.getRowNames = function()
{
	return this.rows
}

MyMatrix.prototype.getRowName = function( i )
{
	return this.rows[ i-1 ]
}

MyMatrix.prototype.addRowVector = function( v, n )
{
	if( n )
		this.rows.push( n ); else
		this.rows.push( "N.N." );
	
	if( this.getCompatibility( v, 1 ) )
		this.data.push( v ); else
		{
			this.data.push( [] );
			for( var c=1; c<=this.size[ 1 ]; c++ )
			{
				this.set( [ this.data.length, c ], null )
			}
		}

	this.__resize();
	
	return this
}

MyMatrix.prototype.addColVector = function( v, n )
{
	if( n )
		this.cols.push( n ); else
		this.cols.push( "N.N." );
		
	var rows = this.size[0];
	
	for( var i=rows-1; i>=0; i-- )
	{
		if( v && v[ i ] )
			this.data[ i ].push( v[ i ] ); else
			this.data[ i ].push( null );
	}
	
	this.__resize();
	
	return this
}

MyMatrix.prototype.getCompatibility = function( v, mn )
{
	if( mn == 1 && v.hasOwnProperty( "length" ) )
	{
		return this.size[0] == v.length
	} else
	
	if( mn == -1 && v.hasOwnProperty( "length" ) )
	{
		return this.size[1] == v.length
	} else
	
	return false
}

MyMatrix.prototype.get  = function( p )
{
	return this.data[p[0]-1][p[1]-1]
}

MyMatrix.prototype.set = function( p, o )
{
	this.data[p[0]-1][p[1]-1] = o;
	
	this.__resize();

	return this.get( p )
}

MyMatrix.prototype.setRowName = function( m, name )
{
	this.rows[m-1] = name;
	
	return this
}

MyMatrix.prototype.setColName = function( n, name )
{
	this.cols[n-1] = name;
	
	return this
}

MyMatrix.prototype.setRowNames = function( m )
{
	if( m instanceof Array )
		this.rows = m; else
		throw new Error( "Row names must be an instance of Array" )
}

MyMatrix.prototype.setColNames = function( n )
{
	if( n instanceof Array )
		this.cols = n; else
		throw new Error( "Column names must be an instance of Array" )
}

MyMatrix.prototype.newRow = function()
{
	this.data.push( new Array() );
	
	this.__resize();
	
	return this
}
