function warning( text )
{
	this.text    = new String();
	this.boundTo = null;
	this.visibility = false;
	this.placed = false;
	this.built = false;
	this.e = this.__construct( text );
	console.log( "new alert msg added: "+text );
}

warning.prototype.__construct = function( text )
{
	var jqobj = $("<div></div>");
	jqobj.addClass( "alert" );
	jqobj.html( text );
	
	var arrow = $( '<img src="/css/arrow.png" />');
	arrow.prependTo( jqobj );
	
	this.built = true;
	
	console.log( "alert: new DOM element created" );
	return jqobj
}

warning.prototype.place = function()
{
	var positionTop  = parseInt( this.boundTo.offset().top );
	var positionLeft = parseInt( this.boundTo.parents().filter("section:first").offset().left+this.boundTo.parents().filter("section:first").width()+10 );
	this.e.css( { top : positionTop, left : positionLeft } );
	this.e.appendTo( $("body") );
	this.placed = true;
	console.log( "alert: DOM element placed at position "+positionTop+", "+positionLeft );

	return this
}

warning.prototype.bind = function( obj )
{
	this.boundTo = obj;
	console.log( "alert: alert msg bound to DOM element" );

	return this
}

warning.prototype.show = function()
{
	this.e.fadeIn( 200 );
	this.visibility = true;
}

warning.prototype.hide = function()
{
	this.e.fadeOut( 400 );
	this.visibility = false; 
}

warning.prototype.destroy = function()
{
	this.e.hide().empty().remove();
	this.built = false;
}

warning.prototype.rebuild = function()
{
	this.__construct( this.text )
}


function inputfield( jqobj ) 
{
	this.name = jqobj.attr("name");
	console.log( "inputfield added: "+this.name );

	// Der Typ des Eingabefelds 
	this.type     = new String;
	
	// Die Eingabe ist unzureichend
	this.faulty   = false;
	
	// Die Eingabe ist erforderlich
	this.required = false;
	
	// Eine Warnung wurde ausgegeben
	this.warning  = null;
	
	// Die Eingabe ist getätigt worden
	this.isComplete = false;
	
	// Die Einabe ist gesperrt
	this.readonly = false;

	// Das zugeordnete DOM Element
	this.e = jqobj;
	
	// ergänzender Konstruktor
	this.__construct( jqobj )
}

inputfield.prototype.__construct = function( e )
{
	this.type   =
		e.attr("type")
		? e.attr("type").toLowerCase()
		: "text";

	if( this.e.hasClass("float") ) this.type = "float";
	
	this.required = 
		e.hasClass( "required" )
		? true
		: false;
		
	this.readonly =
		( e.attr("readonly") == "readonly" )
		? true
		: false;
		
	if( this.required )
	{
		this.fieldNumber = FormHandler.addRequiredField( this );
		this.addExclamationMark();
	}

	this.borderColor = e.css('border-top-color');
	this.focusColor  = '#444';
	this.requiredColor = 'darkorange';
	
	// Animations
	var self = this;
	
	if( this.readonly )
		e.on( 'change keyup click', function() { self.check() } ); else
		e
		.on( 'mouseenter', function() { self.mouseenter() } )
		.on( 'mouseleave', function() { self.mouseleave() } )
		.on( 'change keyup click', function() { self.check() } );
}

inputfield.prototype.addExclamationMark = function()
{
	//this.e.after( '<span class="exclamation">!</span>' );
}

inputfield.prototype.mouseleave = function()
{
	this.e.animate
	(
		{
			borderLeftColor  : this.borderColor,
			borderRightColor : this.borderColor,
			borderTopColor   : this.borderColor,
			borderBottomColor: this.borderColor
		}, 400 );
}


inputfield.prototype.mouseenter = function()
{
	this.e.animate
	(
		{
			borderLeftColor  : this.focusColor,
			borderRightColor : this.focusColor,
			borderTopColor   : this.focusColor,
			borderBottomColor: this.focusColor
		}, 200
	); 
}

inputfield.prototype.getName = function()
{
	return this.name
}

inputfield.prototype.check = function()
{
	if( this.required )
	{
		var check;

		if( this.type == "number" )
		{
			check = parseInt( this.e.val() );
			if( check == NaN )
				this.faulty = true; else
				this.faulty = false;
		} else 
		if( this.type == "float" )
		{
			check = parseFloat( this.e.val() );
			if( check == NaN )
				this.faulty = true; else
				this.faulty = false;
		} else
		if( this.type == "email" )
		{
			check = this.e.val();
			var re = /^([A-Za-z0-9_\-\.+])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			if( re.test( check ) == false )
				this.faulty = true; else
				this.faulty = false;
		} else
		if( this.type == "date" )
		{
			check = this.e.val();
			var re = /^([0-9]{4}-[0-9]{2}-[0-9]{2})|([0-9]{1,2}\.[0-9]{1,2}\.[0-9]{4})/;
			if( re.test( check ) == false )
				this.faulty = true; else
				this.faulty = false;
		} else
		{
			check =  this.e.val();
			if( check.length < 2 )
				this.faulty = true; else
				this.faulty = false;
		}
		
		if( this.faulty )
			this.markAsFaulty(); else
			this.release();
	}
}

inputfield.prototype.showWarning = function()
{
	if( !this.warning )
	{
		console.log( "no alert msg found. creating new one" );
		this.warning = new warning( this.getWarningMsg() );
		this.warning.bind( this.e );
		this.warning.place();
	} else
	if( !this.warning.built )
		this.warning.rebuild();
	
	this.warning.show();
}

inputfield.prototype.getWarningMsg = function()
{
	switch( this.type )
	{
		case "email" : return "Bitte geben Sie eine gültige E-Mail-Adresse an."; break;
		case "nummer" : return "Bitte geben Sie ausschließlich Ziffern in dieses Feld ein."; break;
		case "date" : return "Bitte geben Sie gültiges Datum in dieses Feld ein."; break;
		default : return "Bitte vervollständigen Sie Ihre Angaben in diesem Feld."; break;
	}
}

inputfield.prototype.dealert = function()
{
	if( this.warning ) this.warning.hide();
	return this
}

inputfield.prototype.markAsFaulty = function()
{
	this.e.animate( { borderLeftColor: 'red', borderRightColor: 'red', borderTopColor: 'red', borderBottomColor: 'red' }, 200 );
	this.e.css( { backgroundImage: 'url(/css/warning.png)' } );
	//this.showWarning();
	this.e.off( 'mouseenter mouseleave' );
}

inputfield.prototype.release = function()
{
	this.e.animate( { borderLeftColor: 'green', borderRightColor: 'green', borderTopColor: 'green', borderBottomColor: 'green' }, 200 );
	this.e.css( { backgroundImage: 'url(/css/right.png)' } );
	FormHandler.releaseRequiredField( this.name );
	this.completed( true ).dealert();
	this.e.on( 'mouseenter mouseleave' );
}

inputfield.prototype.completed = function( flag )
{
	this.isComplete = flag;
	return this
}



function button( jqobj )
{
	this.name = jqobj.attr("name");
	FormHandler.addButton( this );
	console.log( "button added: "+this.name );

	this.type   = "button";
	this.active = false;
	this.state  = "incomplete";

	this.e = jqobj;
	this.__construct( jqobj )
}

button.prototype.__construct = function( e )
{
	var self = this;
	
	if( this.name == "but_check" )
		this.active = true;
		
	this.borderColor     = e.css( 'border-top-color' );
	this.textColor       = e.css( 'color' );
	this.backgroundColor = e.css( 'background-color' );
	this.focusColor      = '#444';
	this.inactiveColor   = '#ccc';
	
	this.adjustColors( this.active );
	
	e
		.on( 'mouseenter', function() { self.mouseenter() } )
		.on( 'mouseleave', function() { self.mouseleave() } )
		.on( 'click', function() { self.click() } );
}

button.prototype.getName = function()
{
	return this.name
}

button.prototype.setState = function( state )
{
	this.state = state
}

button.prototype.adjustColors = function( active )
{
	if( active )
		this.e.css( "color", this.textColor ); else
		this.e.css( "color", this.inactiveColor );
}

button.prototype.adjustListeners =  function( active )
{
	if( active )
		this.e.on(); else
		this.e.off();
}

button.prototype.mouseenter = function()
{
	if( this.active )
	{
		this.e.animate( { borderLeftColor: this.focusColor,  borderRightColor: this.focusColor,  borderTopColor: this.focusColor, borderBottomColor: this.focusColor, backgroundColor: '#fff' }, 200 ); 
	}
}

button.prototype.mouseleave = function()
{
	this.e.animate(
		 {
		 	borderLeftColor  : this.borderColor,
		 	borderRightColor : this.borderColor,
		 	borderTopColor   : this.borderColor,
		 	borderBottomColor: this.borderColor,
		 	backgroundColor  : this.backgroundColor
		 }, 400 )
}

button.prototype.getActivity = function()
{
	return this.active
}

button.prototype.setActivity = function( activity )
{
	this.active = activity;
	this.adjustColors( activity );
	this.adjustListeners( activity );
}

button.prototype.click = function()
{
	if( this.active )
	{
		if( this.name == "but_check" )
		{
			FormHandler.triggerUnfilled();
			var firstUnfilled =  FormHandler.getFirstUnfilled();
			if( firstUnfilled )
			{
				$("html").animate( { scrollTop: firstUnfilled.e.parents().filter("section:first").offset().top }, 1000 ); 
				$("body").animate( { scrollTop: firstUnfilled.e.parents().filter("section:first").offset().top }, 1000 ); 
			} else
			{
				FormHandler.formIsChecked = true;
				this.setState( 'filled' );
				//FormHandler.toggleButtonActivity( "but_check" );
				FormHandler.toggleButtonActivity( "but_pdf" );
			}
		} else
		
		if( this.name == "but_pdf" )
		{
			alert( "pdf button" )
			
		} else
		
		if( this.name == "but_dl" )
		{
			alert( "view button" )
			
		} else
		
		if( this.name == "but_submit" )
		{
			alert( "submit button" )
			
		}
	}
}


function form( jqobj )
{
	
}

FormHandler = function() {}

FormHandler.buttons = new MyHashMap();
FormHandler.requiredFields = new MyHashMap();
FormHandler.numberUnfilled = 0;
FormHandler.formIsChecked =  false;

FormHandler.addButton = function( button )
{
	FormHandler.buttons.push( button.getName(), button );
}

FormHandler.toggleButtonActivity = function( buttonname )
{
	var button = FormHandler.buttons.getValue( buttonname );
	console.log( "toggling button"+button.getName() ); 

	var buttonIsActive = button.getActivity();
	if( buttonIsActive )
		button.setActivity( false ); else
		button.setActivity( true );
}

FormHandler.addRequiredField = function( field )
{
	FormHandler.requiredFields.push( field.getName(), field );
	FormHandler.numberUnfilled = FormHandler.requiredFields.length;
	return FormHandler.requiredFields.length
}

FormHandler.releaseRequiredField = function( field )
{
	FormHandler.requiredFields.remove( field );
	FormHandler.numberUnfilled = FormHandler.requiredFields.length;
	return FormHandler.requiredFields.length
}

FormHandler.getNumberUnfilled = function()
{
	return FormHandler.numberUnfilled
}

FormHandler.getFirstUnfilled = function()
{
	return FormHandler.requiredFields.values[ 0 ] || false
}

FormHandler.triggerUnfilled = function()
{
	for( var i=FormHandler.requiredFields.length-1; i>=0; i-- )
	{
		var unfilled = FormHandler.requiredFields.values[ i ];
		console.log( "triggering incomplete field "+unfilled.getName() );
		unfilled.e.trigger( 'keyup');
	}
}

function readQuery()
{
	var query = window.location.search;
	console.log( query );
	var _GET = {};
   	query.split("?").pop().split("&").forEach
   	(
   		function( prop )
   		{  
     		console.log( item )
     		var item = prop.split( "=" );
     		_GET[item.shift()] = item.shift();
   		}
   	);

   return _GET
}
