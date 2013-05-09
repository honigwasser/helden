/*
	ViewHelden v0.1
	by Sven Sommerfeld
*/

(function($) {
	$.fn.viewHelden = function( options )
	{
		var defaults =
		{

		}
		
		var Helden = HeldManager.getHelden();
		var Eigenschaften = EigenschaftManager.getEigenschaften();
		var Labels = EigenschaftManager.getLabels();
		var Abbr = [];
		var ColCounter = {};
		
		var $HTML_Output = $("<table class='tablesorter'></table>");
		
		var $thead = $("<thead></thead>");
		var $tbody = $("<tbody></tbody>");
		var $tfoot = $("<tfoot></tfoot>");
		
		var $firstRow = $("<tr></tr>");

		$firstRow.append("<th>Held</th>");
		
		for( var i=Labels.length-1; i>=0; i-- )
		{
			var label = Labels[ i ];
			var title = EigenschaftManager.getEigenschaft( label ).getTitle();
			var auth  = EigenschaftManager.getEigenschaft( label ).getAuth();
			var ref   =
				( auth.ref )
				? ", vgl. "+auth.ref
				: "";
			
			var s = label[0].toUpperCase();
			var c = 0;
			while( Abbr.indexOf((s+c)) != -1 )
			{
				c++;
			}
			
			Abbr.push((s+c));
			
			$("<th></th>")
				.html( '<abbr title="'+label+': '+title+ref+'">'+s+c+'</abbr>' )
				.appendTo( $firstRow )
		}
		
		$firstRow
			.append( "<th></th>" )
			.appendTo( $thead );
		



		
		for( var held in Helden )
		{
			var Held = Helden[ held ];
			var $tr = $("<tr></tr>");
			$tr.count = 0;
			
			$tr.append("<th>"+(Held.getName())+"</th>");
			
			for( var i=Labels.length-1; i>=0; i-- )
			{
				var label = Labels[ i ];
				var $td = $("<td></td>");
				if( !ColCounter[ label ] ) ColCounter[ label ] = 0;
				if( Held.hasEigenschaft( label ) )
				{
					$td.html( "&#10004" );
					$tr.count++; ColCounter[ label ]++; 
				} else
					$td.html( "&#10008" );
				$tr.append( $td );
			}
			
			$tr
				.append( "<th>"+($tr.count)+"</th>" )
				.appendTo( $tbody );
		}
	
		var $lastRow = $("<tr></tr>");
		$lastRow.append("<th></th>");
		
		for( var i=Labels.length-1; i>=0; i-- )
		{
			$("<th></th>").html( ColCounter[ Labels[ i ] ] ).appendTo( $lastRow );
		}
		
		$lastRow
			.append( "<th></th>" )
			.appendTo( $tfoot );
		
		$HTML_Output
			.append( $thead )
			.append( $tfoot )
			.append( $tbody );		
	
		$(this).append( $HTML_Output )
	}
})(jQuery);