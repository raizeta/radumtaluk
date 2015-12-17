<?php
//cara satu
$from = 0;
$to = 30;
$query = "SELECT CompanyName, ContactName, ContactTitle, Address, City FROM customers LIMIT ?,?";
$result = $mysqli->prepare($query);
$result->bind_param('ii', $from, $to);
$result->execute();
/* bind result variables */
$result->bind_result($CompanyName, $ContactName, $ContactTitle, $Address, $City);
while ($result->fetch())
	{
		$customers[] = array('CompanyName' => $CompanyName,
							 'ContactName' => $ContactName,
							 'ContactTitle' => $ContactTitle,
							 'Address' => $Address,
							 'City' => $City);
	}
echo json_encode($customers);

//cara dua
$idpropinsi = $_GET['kode_prop'];

$qr 	= new Query();
$qr 	= mysql_query("SELECT * FROM $tablename where PROVINCE_ID=$idpropinsi ") or die('Your Query Error');
$datakota = array();

while($row = mysql_fetch_array($qr))
	{
		array_push($datakota, $row);
	}
echo json_encode($datakota);