<?php
include "../config/Query.php";

$tablename='provinsi';



$qr 	= new Query();
$qr 	= mysql_query("SELECT * FROM $tablename") or die('Your Query Error');
$dataprovinsi = array();
while($row = mysql_fetch_array($qr))
{
	array_push($dataprovinsi, $row);
}

echo json_encode($dataprovinsi);
exit;


