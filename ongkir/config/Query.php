<?php
include "Connection.php";
class Query extends Connection
{
	private $tablename;
	private $id;

	public function findAll($tablename)
	{
		$qr = mysql_query("SELECT * FROM $tablename") or die('Your Query Error');
		while($row = mysql_fetch_array($qr))
		{
			$data[] = $row;
		}
		return $data;
	}

	public function findById($tablename, $id)
	{
		$qr = mysql_query("SELECT * FROM $tablename WHERE id=$id") or die('Your Query Error');
		$row = mysql_fetch_array($qr);
		return $row;
	}

}