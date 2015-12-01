<?php
include "../config/Query.php";

$tablename='kota';

if(isset($_GET['propinsi']))
{
	$idpropinsi= $_GET['propinsi'];
}

$qr 	= new Query();
$qr 	= mysql_query("SELECT * FROM $tablename where PROVINCE_ID=$idpropinsi ") or die('Your Query Error');
while($row = mysql_fetch_array($qr))
{
	$datakota[] = $row;
}

echo '<select name="kabupaten" id="kabupaten">
		<option value="">--Pilih Kab/Kota--</option>';
foreach ($datakota as $key => $value) 
{
	echo '<option value="';echo $value['CITY_ID'];echo '">';echo $value['CITY_NAME'];echo'</option>';
}
echo '</select>';



