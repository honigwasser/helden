function MyConverter()
{
	
}

/**
 * converts XJSON toMyHashMap 
 */
MyConverter.prototype.xjson2mhm = function( haystack, needle, key )
{
	if( !haystack[ needle ] ) throw new Error( "[MyConverter][xjson2mhm] needle not found in haystack" );
	if( !haystack[ needle ] instanceof Array ) throw new Error( "[MyConverter][xjson2mhm] needle must be an array" );
	
	var source = haystack[ needle ];
	var size = source.length;
	var clipboard = new MyHashMap();
	
	for( var i=0; i<size; i++ )
	{
		var result = source[ i ];
		if( !result['@attributes'][key] ) throw new Error( "[MyConverter][xjson2mhm] key not found" );
		
		clipboard.add( result['@attributes'][key], result );
	}
	
	return clipboard
}

/**
 * converts MyHashMap to XJSON
 */
MyConverter.prototype.mhm2xjson = function( haystack, needle, key )
{
	var clipboard = {};
	clipboard[ needle ] = [];
	clipboard["@needle"] = needle;
	
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

/**
 * converts XJSON to a string (JSON stringifier)
 * @return {String}
 */
MyConverter.prototype.xjson2string = function( xjson, opt )
{
	if( opt && opt.pretty )
		return JSON.stringify( xjson, null, ' \t ' ); else
		return JSON.stringify( xjson )
}

/**
 * converts XJSON to XML
 * @return {XMLdocument}
 * @param {Object} data
 */
MyConverter.prototype.xjson2xml = function( data )
{
	var root = 
		( data["@root"] )
		? data["@root"]
		: '';
		
	var needle =
		( data["@needle"] )
		? data["@needle"]
		: '';
	
	var __traverse =
		function( doc, node, data )
		{
			if( typeof data === "string" )
				__convertString( doc, node, data ); else
				if( typeof data === "number" )
					__convertNumber( doc, node, data ); else
					if( data instanceof Array )
						__convertArray( doc, node, data ); else
						if( typeof data === "boolean" )
							__convertBoolean( doc, node, data ); else
							if( typeof data === null )
								__convertNull( doc, node, data ); else
								__convertObject( doc, node, data );
									
		}
	
	var __convertArray =
		function( doc, node, data )
		{
			// traverse the first element of the array
			__traverse( doc, node, data.shift() );

			// if there are no elements left, exit;
			if( data.length == 0 ) return;
			
			// create a sister node
			var sibling = doc.createElement( node.nodeName );
			node.parentNode.appendChild( sibling );

			// traverse the rest of the array
			__traverse( doc, sibling, data );
		}
	
	var __convertObject =
		function( doc, parent, data )
		{
			for( tag in data )
			{
				if( tag[0] == "@" )
				{
					if( tag == "@attributes" )
					{
						for( att in data[tag] )
						{
							parent.setAttribute( att, data[tag][att].toString() );
						} 
					} else
						parent.setAttribute( tag.substr( 1 ), data[tag].toString() );
				} else
				{
					var node = doc.createElement( tag );
					parent.appendChild( node );
					__traverse( doc, node, data[tag] );
				}
			}
		}
	
	var __convertString =
		function( doc, parent, data )
		{
			var node = doc.createTextNode( data );
			parent.appendChild( node );
		}
	
	var __convertNumber =
		function( doc, parent, data )
		{
			var node = doc.createTextNode( data );
			parent.appendChild( node );
		}
	
	var __convertNull =
		function() {}
	
	var __convertBoolean =
		function( doc, parent, data )
		{
			var node = doc.createTextNode( data.toString() );
			parent.appendChild( node );
		}	
	
	var doc        = document.implementation.createDocument("", "", null);
	var rootnode   = doc.createElement( root );

	doc.appendChild( rootnode );
	
	if( needle )
	{
		var onlyChild = doc.createElement( needle );
		console.log("[MyConverter][xjson2xml] ignoring all nodes but: "+onlyChild.nodeName );
		rootnode.appendChild( onlyChild );
		__traverse( doc, onlyChild, data[ needle ] );
	} else
		__traverse( doc, rootnode, data );

	return doc
}

/**
 * converts XML to a string (XML serializer)
 * @return {String}
 */
MyConverter.prototype.xml2string = function( xml )
{
	if( window.XML )
		return (new XML((new XMLSerializer()).serializeToString(xml))).toXMLString(); else
		return (new XMLSerializer()).serializeToString(xml)
}

/**
 * converts a xml like string to XML (DOM parser)
 * @return {XMLdocument}
 */
MyConverter.prototype.string2xml = function ( string )
{
	return (new DOMParser()).parseFromString( string, "text/xml" )
}

/**
 * converts a json like string to a JS object (JSON parser)
 * @return {Object}
 */
MyConverter.prototype.string2xjson = function( string )
{
	return $.parseJSON( string )
}

MyConverter.prototype.xml2xjson = function( xml )
{
	var $xml = $(xml);

	var __typify = function( data )
	{
		if( data.toLowerCase() == "true" || data.toLowerCase() == "false" )
			return Boolean( data ); else
			if( data.toLowerCase() == "null" )
				return null; else
				if( $.isNumeric( data ) )
					return parseFloat( data ); else
					return data.toString();
	}
	
	var __multiple = function( xjson, node )
	{
		if( !( xjson instanceof Array) )
			xjson = [ xjson ];
		
		
	}

	var __terminate = function( xjson, text )
	{
		xjson = text
	}
	
	var __traverse = function( xjson, node )
	{
		var attributes = node.attributes;
		$(attributes).each
		(
			function()
			{
				xjson["@"+$(this).context.name] = __typify( $(this).context.value );
			}
		);
		
		
		if( node.ChildElementCount == 0 )
			__terminate( xjson, node.firstChild.nodeValue ); else
		{
			
			var children = node.childNodes;
			
			$(children).each
			(
				function()
				{
					var tagname = $(this).context.tagName;
					if( xjson[ tagname ] )
						__multiple( xjson[ tagname ], $(this).context); else
						__traverse( xjson[ tagname ], $(this).context); 
				}
			)
		}
	}

	var xjson = {};
	var root = $xml.context.firstChild;	

	var children = root.childNodes;
	var attributes = root.attributes;
	
	console.log( root.tagName );
	$(attributes).each( function() { console.log( "@"+$(this).context.name+"="+$(this).context.value ) } );
	$(children).each( function() { console.log( $(this).context.tagName ) } );

	console.log( root )
	
	//return __traverse( xjson, root );
	
}
