HeldManager = new Object() 

HeldManager.source =
{
	file : "Helden.xml",
	path : "data/",
	type : "xml"
}

HeldManager.helden = new MyHashMap();

HeldManager.addHeld = function( held )
{
	HeldManager.helden.push( held.getName(), held );
	console.log( 'Held "'+(held.getName())+'" hinzugefügt.')
}

HeldManager.getHelden = function()
{
	return HeldManager.helden
}

HeldManager.built = false;

HeldManager.build = function( rebuild )
{
	if( !rebuild && HeldManager.built )
		throw new Error( 'Helden bereits erzeugt' );
	
	HeldManager.parse( HeldManager.readFile() )
	
	HeldManager.built = true 
}


HeldManager.getNames = function()
{
	return HeldManager.helden.getKeys();
}

HeldManager.existHeld = function( held )
{
	return HeldManager.helden.hasKey( held )
}

HeldManager.readFile = function()
{
	FileHandler.open
	(
		{
			type : HeldManager.source.type,
			path : HeldManager.source.path + HeldManager.source.file
		}
	)

	return FileHandler.getResponse()
}


HeldManager.parse =  function( data )
{

	$( data ).find("Held").each
	(
		function ()
		{
			var held = new Held( $(this).attr( "name" ) );
			
			var eigenschaften = $(this).find("eigenschaften").text().split(" ");
			
			if( eigenschaften.length > 0 )
			{
				for( var i=eigenschaften.length-1; i>=0; i-- )
				{
					var eigenschaft = EigenschaftManager.getEigenschaft( $.trim( eigenschaften[ i ] ) );
					if( eigenschaft )
						held.setEigenschaft( eigenschaft, true );
				}
			}
			
			HeldManager.addHeld( held );
		}
	)
}

