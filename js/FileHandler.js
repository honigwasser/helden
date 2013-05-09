/**
 * Global FileHandler
 * @requires MyXhr
 */
FileHandler =  new Object();
FileHandler.type  = 'xml';

FileHandler.setContentType =  function( contentType )
{
	FileHandler.type = contentType
}

FileHandler.setPath = function( path )
{
	FileHandler.path = path 
}

FileHandler.open =  function( ressource )
{
	var type =
		( ressource && ressource.type )
		? ressource.type
		: FileHandler.type;
		
	var path = 
		( ressource && ressource.path )
		? ressource.path
		: FileHandler.path;
		
	var xhr = new MyXhr
	(
		{
			type : type,
			path : path
		}
	);

	FileHandler.response = xhr.open().send().getResult();
}

FileHandler.getResponse = function()
{
	return FileHandler.response
}