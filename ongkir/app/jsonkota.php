<?php
include "../config/Query.php";

$tablename='kota';

if(isset($_GET['action']) && $_GET['action'] == "getKab") 
{
	$idpropinsi = $_GET['kode_prop'];

	$qr 	= new Query();
	$qr 	= mysql_query("SELECT * FROM $tablename where PROVINCE_ID=$idpropinsi ") or die('Your Query Error');
	$datakota = array();
	while($row = mysql_fetch_array($qr))
	{
		array_push($datakota, $row);
	}
	echo json_encode($datakota);
	exit;
}



