EigenschaftManager = new Object()

EigenschaftManager.built = false;
EigenschaftManager.source  =
{
	file: "Eigenschaften.xml",
	type: "xml",
	path: "data/"
}
EigenschaftManager.eigenschaften = new MyHashMap(); 


EigenschaftManager.build = function( rebuild )
{
	if( !rebuild && EigenschaftManager.built )
		throw new Error( 'Eigenschaften bereits erzeugt' );
	
	EigenschaftManager.parse( EigenschaftManager.readFile() )
	
	EigenschaftManager.built = true 
}

EigenschaftManager.getEigenschaften = function()
{
	return EigenschaftManager.eigenschaften
}

EigenschaftManager.getEigenschaft = function( label )
{
	return EigenschaftManager.eigenschaften.getValue( label )
}

EigenschaftManager.getLabels = function()
{
	return EigenschaftManager.eigenschaften.getKeys();
}

EigenschaftManager.existEigenschaft = function( label )
{
	return EigenschaftManager.eigenschaften.hasKey( label ) 
}

EigenschaftManager.addEigenschaft = function( eigenschaft )
{
	EigenschaftManager.eigenschaften.push( eigenschaft.getLabel(), eigenschaft );
	
	console.log( 'Eigenschaft "'+(eigenschaft.getLabel())+'" hinzugefügt.')
	
	return this
}

EigenschaftManager.readFile = function()
{
	FileHandler.open
	(
		{
			type : EigenschaftManager.source.type,
			path : EigenschaftManager.source.path + EigenschaftManager.source.file
		}
	)

	return FileHandler.getResponse()
}


EigenschaftManager.parse =  function( data )
{

	$( data ).find("Eigenschaft").each
	(
		function ()
		{
			var eigenschaft = new Eigenschaft( $(this).attr( "label" ) );
			
			eigenschaft.setTitle( $(this).find( "title" ).text() );
			eigenschaft.setText( $(this).find( "text" ).text() );
			eigenschaft.setWeight( $(this).find( "weight" ).text() );
			eigenschaft.setAuth( { ref: $(this).find( "ref" ).text(), quot: $(this).find( "quot" ).text() } );
		}
	)

}