<?php
$xmlDoc = $_REQUEST['file'];
$base = "/home/sommerfs/public_html/helden/data/";

$path = $base.$xmlDoc; 

if( file_exists( $path ) )
{
	$xml = simplexml_load_file( $path );
	$json = json_encode( $xml );
	echo $json;
} else {
	echo "Datei nicht gefunden: ".$path;
}
?>