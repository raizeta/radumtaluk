<?php
include "../config/Query.php";

$tablename='provinsi';



$qr 	= new Query();
$qr 	= mysql_query("SELECT * FROM $tablename") or die('Your Query Error');
while($row = mysql_fetch_array($qr))
{
	$datakota[] = $row;
}
//print_r($datakota);

echo '<select name="propinsi" id="propinsi">
		<option value="">--Pilih Propinsi--</option>';

foreach ($datakota as $key => $value) 
{
	echo '<option value="';echo $value['PROVINCE_ID'];echo '">';echo $value['PROVINCE'];echo'</option>';
}
echo '</select>';



