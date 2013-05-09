ErrorHandler = new Object();

ErrorHandler.errors =
{
	NOPROP : 'Die Eigenschaft "%s" gibt es nicht.',
	TVUNDF : 'Der Eigenschaftswert muss angegeben werden.'
}

ErrorHandler.print = function( err, s )
{
	if( ErrorHandler.errors[ err ] == undefined ) return '';
	
	var msg = ErrorHandler.errors[ err ];
	
	if( s )	msg = msg.replace( /%s/, s );
	
	return msg
}
