
function tile( jqobj )
{
	this.id       = jqobj.attr("id");
	console.log( "tile added: "+this.id );
	this.header   = null;
	this.contents = new Array();
	this.link     = null

	this.e = jqobj;
	this.__construct( jqobj )
}

tile.prototype.__construct = function( e )
{
	this.header   = e.children("header");
	this.contents = e.children("p");
	this.link     = e.find("a:last");
	
	e.children("header").css( "opacity", 0.8 );
	
	e.mouseenter
	(
		function()
		{
			e.children("header").stop().animate( { opacity: 1 }, 300 )
		}
	)
	e.mouseleave
	(
		function()
		{
			e.children("header").stop().animate( { opacity: 0.7 }, 500 )
		}
	)
	
	if( this.link )
		this.changeEvent( { href : this.link.filter(':first').attr("href") } );
}

tile.prototype.getHeader = function()
{
	return this.header
}

tile.prototype.getContents = function()
{
	return this.contents
}

tile.prototype.getLink = function()
{
	return this.link
}

tile.prototype.setHeaderText = function( text )
{
	this.header.find("h1").html = text
}

tile.prototype.setLinkTarget = function( href )
{
	this.link.attr("href") = href;
	this.changeEvent( { href: href } );
}

tile.prototype.changeEvent = function( eventdata )
{
	if( eventdata.href )
	{
		this.e.click(
			function()
			{
				window.location.href = eventdata.href
			}
		);
		this.e.css( "cursor", "pointer" );
	}
}


function nav( jqobj )
{
	this.id = jqobj.attr("id");
	this.type = jqobj.attr("class");
	this.e = jqobj;
	
	this.e.css
	(
		{
			cursor: "pointer",
			height: parseInt( $(window).height()*0.66 ),
			marginTop: -( parseInt( $(window).height()*0.33 ) ),
			lineHeight: parseInt( $(window).height()*0.66 )+"px"
		}
	)
	
	this.e.click
	(
		function()
		{
			window.location.href = $(this).find("a").attr("href")
		}
	)
	
	this.e.mouseenter
	(
		function()
		{
			$(this).animate( { alpha: 1 }, 200 );
		}
	)
	
	this.e.mouseleave
	(
		function()
		{
			$(this).animate( { alpha: 0.8 }, 400 )
		}
	)
}

function fieldset( jqobj )
{
	this.id       = jqobj.attr("id");
	console.log( "fieldset added: "+this.id );
	this.header   = null;
	this.contents = new Array();
	this.link     = null

	this.e = jqobj;
	this.__construct( jqobj )
}

fieldset.prototype.__construct = function( e )
{
	this.header   = e.children("header");
	this.contents = e.children("p");
	this.link     = e.find("a:last");
	
	e.children("header").css( "opacity", 0.8 );
	
	e.mouseenter
	(
		function()
		{
			e.children("header").stop().animate( { opacity: 1 }, 300 )
		}
	)
	e.mouseleave
	(
		function()
		{
			e.children("header").stop().animate( { opacity: 0.7 }, 500 )
		}
	)
	
	if( this.link )
		this.link.click
		(
			function(event)
			{
				event.preventDefault();
				var target = $(this).attr("href");
				if( $(target).offset() )
				{
					var newPosition = parseInt( $(target).offset().top );
					//alert( parseInt( $(target).offset().top ));
					$("html").animate( { scrollTop: newPosition }, 2000 );
					$("body").animate( { scrollTop: newPosition }, 2000 );
				}
			}
		)

}

fieldset.prototype.getHeader = function()
{
	return this.header
}

fieldset.prototype.getContents = function()
{
	return this.contents
}

fieldset.prototype.getLink = function()
{
	return this.link
}

fieldset.prototype.setHeaderText = function( text )
{
	this.header.find("h1").html = text
}

fieldset.prototype.setLinkTarget = function( href )
{
	this.link.attr("href") = href;
	this.changeEvent( { href: href } );
}
