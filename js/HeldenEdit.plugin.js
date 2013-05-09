/*
	ViewHelden v0.1
	by Sven Sommerfeld
*/

(function($) {
	$.fn.editHelden = function( options )
	{
		var defaults =
		{

		}
		
		var Eigenschaften = EigenschaftManager.getEigenschaften();
		var Labels = EigenschaftManager.getLabels();
		
		var $HTML_Output = $("<table></table>");
		
		var $tr1 = $("<tr></tr>");
		$tr1.append("<th>Held</th>");
		
		for( var i=Labels.length-1; i>=0; i-- )
		{
			var label = Labels[ i ];
			var $th = $("<th></th>");
			var title = EigenschaftManager.getEigenschaft( label ).getTitle();
			$th.html( '<abbr title="'+label+': '+title+'">'+(label.substr(0,3))+'</abbr>' );
			$tr1.append( $th )
		}
		
		$tr1.append( "<th></th>" );
		
		$HTML_Output.append( $tr1 );
		
		var $tr2  = $("<tr></tr>");
		
		$tr2.append('<th><input type="text" name="name" /></th>');
		
		for( var i=Labels.length-1; i>=0; i-- )
		{
			var label = Labels[ i ];
			var $td = $('<td><input type="checkbox" name="'+label+'" /></td>');
			$tr2.append( $td );
		}

		$tr2.append( '<th><input type="submit" value="Hinzufügen" /></th>' );
			
		$HTML_Output.append( $tr2 );

		$(this).append( $HTML_Output )
	}
})(jQuery);