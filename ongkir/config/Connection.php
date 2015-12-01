<?php

class Connection
{
	private $conn;
	private $dbhost="localhost";
	private $dbuser="root";
	private $dbname="ajax";
	private $dbpassword="";

	public function __construct()
	{
		$conn=mysql_connect($this->dbhost,$this->dbuser,$this->dbpassword);
		mysql_select_db($this->dbname);

	}

	public function MatikanKoneksi()
	{
		mysql_close();
	}

}
