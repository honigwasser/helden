function Eigenschaft( label ) 
{
	this.label  = label;
	this.text   = '';
	this.title  = '';
	this.weight = 1;
	this.auth =
	{
		ref : '',
		quot: ''
	}
	
	EigenschaftManager.addEigenschaft( this );
}

Eigenschaft.prototype.setLabel = function( label )
{
	this.label = label;
	return this
}

Eigenschaft.prototype.setTitle = function( title )
{
	this.title = title;
	return this
}

Eigenschaft.prototype.setText = function( text )
{
	this.text = text;
	return this
}

Eigenschaft.prototype.setWeight = function( weight )
{
	if( weight )
		this.weight = weight;
	return this
}

Eigenschaft.prototype.setAuth = function( auth )
{
	if( auth )
	{
		if( auth.ref ) this.auth.ref = auth.ref;
		if( auth.quot ) this.auth.quot = auth.quot;
	}
		
	return this
}

Eigenschaft.prototype.getLabel = function()
{
	return this.label
}

Eigenschaft.prototype.getTitle = function()
{
	return this.title
}

Eigenschaft.prototype.getText = function()
{
	return this.text
}

Eigenschaft.prototype.getWeight = function()
{
	return this.weight
}

Eigenschaft.prototype.getAuth = function()
{
	return this.auth
}
