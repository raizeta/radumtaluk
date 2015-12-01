<?php
include "../config/Query.php";

$tableprov='provinsi';
$tablekota='kota';

$qr 	= new Query();
$data = $qr->findAll($tableprov);
$datakota = $qr->findAll($tablekota);

#foreach ($data as $key => $value) 
#{
	#echo $value['PROVINCE_ID']. " ". $value['PROVINCE']. "<br/>";
#}




