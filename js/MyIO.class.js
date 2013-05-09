function MyIO()
{
	this.type = 'xml';
	this.path = '';
	this.file = '';
}

/**
 * Sets the content type for reading. Defaults to 'xml'
 * @param {String} contentType
 */
MyIO.prototype.setContentType =  function( contentType )
{
	this.type = contentType
}

/** 
 * Sets the file path for reading or writing
 * @param {String} path
 */
MyIO.prototype.setPath = function( path )
{
	this.path = path 
}

/**
 * Sets the file name for reading or writing
 * @param {String} file
 */
MyIO.prototype.setFile = function( file )
{
	this.file = file
}

/**
 * Opens a file and saves the file contents to the local response property
 */
MyIO.prototype.read =  function( )
{
	var type = this.type;
	var path = this.path+this.file;
		
	var xhr = new MyXhr
	(
		{
			type : type,
			path : path
		}
	);

	this.response = xhr.open().send().getResult();
}

/** 
 * Fetches the response data from a file opening action
 * @return {String|XMLDocument}
 */
MyIO.prototype.getResponse = function()
{
	return this.response
}

/**
 * Posts the content to the writing script. Requires the content and the filepath to be already set.
 */
MyIO.prototype.write = function()
{
	if( !this.content ) throw new Error( "[MyIO][write] nothing to write" );
	if( !this.file ) throw new Error( "[MyIO][write] no file selected" );
	
	var self = this;
	
	$.post
	(
		this.writingScript,
		{ data : this.content, file : this.path+this.file },
		function( response )
		{
			self.response = response
		}
	)
}

/**
 * Sets the content data to write. <data> will be stringified.
 * @param {*} data 
 */
MyIO.prototype.setContent = function( data )
{
	if( data instanceof String )
		this.content = data; else
		this.content = JSON.stringify( data, null, ' \t ');
}

/**
 * Sets the filepath for the server side script used for writing files on the server
 * @param {String} path
 */
MyIO.prototype.setWritingScript = function( path )
{
	this.writingScript = path
}
