/*function Main()
{
	var MyHelden = new Object();

	MyHelden.eigenschaftmanager = EigenschaftManager;
	MyHelden.heldmanager = HeldManager;
	
	MyHelden.eigenschaftmanager.build();
	MyHelden.heldmanager.build();

	MyHelden.modules = new Object();
	MyHelden.modules.matrix = Modules.__Matrix;
	
	//MyHelden.modules.matrix.build();
	
	MyHelden.modules.io = Modules.__IO;
	MyHelden.modules.io.xml2xjson( "Helden.xml" );

	MyHelden.modules.converters = Modules.__Converter;
	var helden = MyHelden.modules.converters.xjson2mhm( MyHelden.modules.io.getResult(), "Held", "name" );

	console.log( "<pre>"+JSON.stringify( helden, null, ' \t ' )+"</pre>" );
	
	var helden2 = MyHelden.modules.converters.mhm2xjson( helden, "Held", "name" );
	
	console.log( "<pre>"+JSON.stringify( helden2, null, ' \t ' )+"</pre>" );
	
	var eigenschaften = MyHelden.modules.converters.xjson2mhm( MyHelden.modules.converters.mhm2xjson( MyHelden.eigenschaftmanager.getEigenschaften(), "Eigenschaft", "label" ), "Eigenschaft", "label" );
	MyHelden.modules.filters = Modules.__Filter;
	MyHelden.modules.filters.addFilter( { name : "Ute", type : 1, helden : [ "Beowulf", "Siegfried" ], eigenschaften : [ "dead", "sociallyChallenged" ] } );
	var filtered = MyHelden.modules.filters.applyFilter( "Ute", { helden: helden, eigenschaften: eigenschaften });

	console.log( "<pre>"+JSON.stringify( filtered, null, ' \t ' )+"</pre>" );

	
}

Modules = new Object();

Modules.__Matrix = new Object();

Modules.__Matrix.build = function()
{
	var helden = HeldManager.getHelden();
	var eigenschaften = EigenschaftManager.getEigenschaften();
	
	var matrix = new MyMatrix( helden.getSize(), eigenschaften.getSize() );
	
	matrix.setRowNames( HeldManager.getNames() );
	console.log( "Matrix Zeilen Namen: "+matrix.getRowNames() );
	
	matrix.setColNames( EigenschaftManager.getLabels() );
	

	for( var r=helden.getSize(); r>=1; r-- )
	{
		var held = helden.getValueByPosition( r-1 );
			
		for( var c=eigenschaften.getSize(); c>=1; c-- )
		{
			var label = eigenschaften.getKey( c-1 );
			var value =
				( held.hasEigenschaft( label ) )
				? 1
				: 0;
			console.log( "Setze Matrixposition "+[r,c]+" auf "+value );	
			matrix.set( [r,c], value )
		}
	}
	
	Modules.__Matrix.data = matrix;
	
}

Modules.__Matrix.get = function( index )
{
	return Modules.__Matrix.data
}

Modules.__IO = new Object();

Modules.__IO.xjson2xml = function( file, data, node )
{
	if( !file || !file.length )	throw new Error( "[Modules][IO][xjson2xml] : Dateiname ungültig" );
	
	if( !node || !node.length ) throw new Error("[Modules][IO][xjson2xml] : Knotenname ungültig oder nicht vorhanden")
		
	data["@file"] = file;
	data["@node"] = node;
	
	$.post
	(
		"./php/JS2XML.php",
		data
	)
	
}

Modules.__IO.xml2xjson = function ( file )
{
	if( !file || !file.length )	throw new Error( "[Modules][IO][xml2xjson] : Dateiname ungültig" );
	
	console.log( "[Modules][IO][xml2xjson] Lade "+file );
	
	$.ajax
	(
		{
			url     : "./php/XML2JS.php",
			type    : "post",
			data    : { file : file },
			async   : false,
			success : Modules.__IO.parse
		}
	)
}

Modules.__IO.parse = function( data )
{
	Modules.__IO.result = $.parseJSON( data );
}

Modules.__IO.getResult = function()
{
	return Modules.__IO.result
}

Modules.__Converter = new Object();

Modules.__Converter.xjson2mhm = function( haystack, needle, key )
{
	if( !haystack[ needle ] ) throw new Error( "[Modules][Converter][xjson2mhm] needle not found in haystack" );
	if( !haystack[ needle ] instanceof Array ) throw new Error( "[Modules][Converter][xjson2mhm] needle must be an array" );
	
	var source = haystack[ needle ];
	var size = source.length;
	var clipboard = new MyHashMap();
	
	for( var i=0; i<size; i++ )
	{
		var result = source[ i ];
		if( !result['@attributes'][key] ) throw new Error( "[Modules][Converter][xjson2mhm] key not found" );
		
		clipboard.add( result['@attributes'][key], result );
	}
	
	return clipboard
}

Modules.__Converter.mhm2xjson = function( haystack, needle, key )
{
	var clipboard = {};
	clipboard[ needle ] = [];
	
	haystack.foreach
	(
		function( k, v, i )
		{
			clipboard[ needle ].push( v );
			if( !clipboard[ needle ][ i ]["@attributes"] )
			{
				clipboard[ needle ][ i ]["@attributes"] = {};
				clipboard[ needle ][ i ]["@attributes"][key] = k;
			} 
		}
	);
	
	return clipboard
}

Modules.__Filter = new Object();

Modules.__Filter.filters = new MyHashMap();

Modules.__Filter.addFilter = function( filterdata )
{
	if( !filterdata.name ) throw new Error( "[Modules][Filter][addFilter] name missing" );
	if( !filterdata.type ) throw new Error( "[Modules][Filter][addFilter] type missing" );
	if( !filterdata.helden ) throw new Error( "[Modules][Filter][addFilter] helden missing" );
	if( !filterdata.eigenschaften ) throw new Error( "[Modules][Filter][addFilter] eigenschaften missing" );
	
	if( !(filterdata.helden instanceof Array) ) throw new Error( "[Modules][Filter][addFilter] helden must be of type Array" );
	if( !(filterdata.eigenschaften instanceof Array) ) throw new Error( "[Modules][Filter][addFilter] eigenschaften must be of type Array" );
	
	Modules.__Filter.filters.push( filterdata.name, { type: filterdata.type, helden : filterdata.helden, eigenschaften: filterdata.eigenschaften } );
}

Modules.__Filter.applyFilter = function( filtername, data )
{
	if( !(Modules.__Filter.filters.hasKey( filtername ) ) ) throw new Error( "[Modules][Filter][applyFilter] unknown filter "+filtername );
	if( !data.helden && !data.eigenschaften ) throw new Error( "[Modules][Filter][applyFilter] neither Helden nor Eigenschaften are found" );
	
	var filter = Modules.__Filter.filters.get( filtername );
	console.log("[Modules][Filter][applyFilter] applying filter "+filtername);
	var filteredHelden = new MyHashMap();
	
	if( data.helden )
	{
		if( !(data.helden instanceof MyHashMap ) ) throw new Error("[Modules][Filter][applyFilter] Helden must be of type MyHashMap") ;
		data.helden.foreach
		(
			function( k, v, i )
			{
				if( filter.helden.indexOf( k ) >= 0 ) filteredHelden.push( k, v )
			}
		)
	};
	
	var filteredEigenschaften = new MyHashMap();
	
	if( data.eigenschaften )
	{
		if( !(data.eigenschaften instanceof MyHashMap ) ) throw new Error("[Modules][Filter][applyFilter] Eigenschaften must be of type MyHashMap") ;
		data.eigenschaften.foreach
		(
			function( k, v, i )
			{
				if( filter.eigenschaften.indexOf( k ) >= 0 ) filteredEigenschaften.push( k, v )
			}
		)
	};
	
	return { helden: filteredHelden, eigenschaften: filteredEigenschaften }
}
*/

function test()
{
	
	var conv = new MyConverter();
	
	var xjson =
	{
		"@root" : "Wurzel",
		"@node" : "Knoten",
		"Knoten" :
		[
			"Hallo",
			"Welt",
			{
				"ein" : "Objekt"
			}
		]
	};
	
	var xml = conv.xjson2xml( xjson );
	
	var pre = document.createElement("pre");
	var text = document.createTextNode( JSON.stringify( xml, null, ' \t ' ) );
	pre.appendChild( text );
	document.body.appendChild( pre );
	
}
