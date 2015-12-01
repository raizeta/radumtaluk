<?php
include "../config/Query.php";

$tablename='kota';

$idpropinsi= $_GET['propinsi']

$qr 	= new Query();
$datakota = $qr->findAll($tablename);

foreach ($datakota as $key => $value) 
{
	echo $value['CITY_ID']. " ". $value['CITY_NAME']. "<br/>";
}




