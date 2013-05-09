<?php
$file = $_REQUEST['file'];
$data = $_REQUEST['data'];
$mode = $_REQUEST['mode'];

if (!$mode)
	$mode = 'wb';

$fh = @fopen($file, $mode);

if ($fh) {
	fwrite($fh, $data);
	if (fclose($fh)) {
		echo("1");
	} else {
		echo("0");
	}
} else {
	echo("-1");
}
?>