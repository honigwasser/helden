function MyTable( o )
{
	this.head = null;
	this.body = null;
	this.foot = null;
	
	this.size = { cols: 0, rows: 0 }
	
	this.__construct( o )
}

MyTable.prototype.__construct = function( o )
{
	this.e = $("<table></table>");
	this.e
		.append( $("<thead></thead>") )
		.append( $("<tfoot></tfoot>") )
		.append( $("<tbody></tbody>") );
}

MyTable.prototype.setHead = function( thead )
{
	this.thead = thead;
	this.e.children("thead").replaceWith( thead.e );
		
	return this
}

MyTable.prototype.setFoot = function( tfoot )
{
	this.tfoot = tfoot;
	this.e.children("tfoot").replaceWith( tfoot.e );
	
	return this
}

MyTable.prototype.setBody = function( tbody )
{
	this.tbody = tbody;
	this.e.children("tbody").replaceWith( tbody.e );
	
	return this
}

MyTable.THead = function( o )
{
	this.size = { cols: 0, rows: 0 };
	this.__construct( o );
}

MyTable.THead.prototype.__construct = function( o )
{
	this.e = $("<thead></thead>");
}

MyTable.THead.prototype.appendRow = function( o )
{
	var row =
		( o )
		? o
		: new MyTable.Row();
	
	this.rows.push( row );
	this.size.rows++;
	
	this.e.append( $row.e )
}

MyTable.THead.prototype.prependRow = function( o )
{
	var row =
		( o )
		? o
		: new MyTable.Row();
	
	this.rows.unshift( row );
	this.size.rows++;
	
	this.e.prepend( $row.e )
}

MyTable.THead.prototype.removeRow = function( i )
{
	var row = this.rows.splice( i, 1 );
	
	row.e.empty().remove();
	this.size.rows--;
	
	//this.e.children("tr").eq( i ).empty().remove();
	
	return this
}
