function test()
{
	
	var conv = new MyConverter();
	
	var xjson =
	{
		"@root" : "Helden",
		"@needle" : "",
		"Held" :
		[
			{
				"@attributes" : { "name" : "James Bond" },
				"@id" : 1,
				"@filter" : false,
				"eigenschaften" : "brave",
				"view" : { "@screen" : true }
			},
			{
				"@attributes" : { "name" : "Siegfried" },
				"@id" : 2,
				"@filter" : true,
				"eigenschaften": "dead",
				"view" : null
			}
		],
		"Anti-Held" :
		[
			{
				"@name" : "Don Quixote"
			},
			{
				"@name" : "Golden Boy"
			},
			{
				"@name" : "Herr Lehmann",
				"eigenschaften" : "upright loyal"
			}
		]
	};
	
	var xml = conv.xjson2xml( xjson );
	
	var json  = conv.xml2xjson( xml );
	
	var text = document.createTextNode( conv.xjson2string(json, {pretty: true}) );

	var pre = document.createElement("pre");
	pre.appendChild( text );
	document.body.appendChild( pre );
	
}
