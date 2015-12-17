<?php

namespace BelajarBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        $radumta=array("Radumta Sitepu","Sedang Makan","Tidak Kerja");
        for($i=0; $i < count($radumta); $i++)
        {
        	echo $radumta[$i]." ";#akan mencetak Radumta Sitepu Sedang Makan Tidak Kerja
        }
        echo "<br/>###########################<br/>";

		$nama = array(1=>"Andri",6=>"Joko",12=>"Sukma",45=>"Rina",55=>"Sari");
		foreach($nama as $key => $value)
		{
			echo $key.",  ";#akan mencetak 1, 6, 12, 45, 55
			echo $value.", ";#akan mencetak Andri, Joko, Sukma, Rina, Sari 
		}
        echo "<br/> ###########################<br/>";

		$nama = array(1=>"Andri",6=>"Joko",12=>"Sukma",45=>"Rina",55=>"Sari");
		foreach($nama as $key )
		{
			echo $key.",  ";#akan mencetak Andri, Joko, Sukma, Rina, Sari
			echo $value.", ";#akan mencetak Sari, Sari, Sari, Sari, Sari 
		}
        echo "<br/> ###########################<br/>";

		$nama = array(1=>"Andri",6=>"Joko",12=>"Sukma",45=>"Rina",55=>"Sari");
		foreach($nama as $value )
		{
			echo $key.",  ";#akan mencetak Sari, Sari, Sari, Sari, Sari 
			echo $value.", ";#akan mencetak Andri,Joko,Sukma,Rina,Sari 
		}
        echo "<br/> ###########################<br/>";

		$nama = array(1=>"Andri",6=>"Joko",12=>"Sukma",45=>"Rina",55=>"Sari");
		foreach($nama as $v => $k )
		{
			echo $v.", ";#akan mencetak 1, 6, 12, 45,55
			echo $k.",  ";#akan mencetak Andri,Joko,Sukma,Rina,Sari 
			 
		}
		echo count($nama); //5 Menghitung banyaknya data yang terdapat pada array
        echo "<br/> ###########################<br/>";
    }

    //Multiple Dimension Array
    public function pusharrayAction()
    {
		$cars = array(array("Volvo",22,18),array("BMW",15,13),array("Saab",5,2),array("Land Rover",17,15));
    	echo $cars[0][0].": In stock: ".$cars[0][1].", sold: ".$cars[0][2].".<br>";
		echo $cars[1][0].": In stock: ".$cars[1][1].", sold: ".$cars[1][2].".<br>";
		echo $cars[2][0].": In stock: ".$cars[2][1].", sold: ".$cars[2][2].".<br>";
		echo $cars[3][0].": In stock: ".$cars[3][1].", sold: ".$cars[3][2].".<br>";

		for ($row = 0; $row < 4; $row++) 
		{
  			echo "<p><b>Row number $row</b></p>";
  			echo "<ul>";
  				for ($col = 0; $col < 3; $col++) 
  				{
    				echo "<li>".$cars[$row][$col]."</li>";
  				}
				echo "</ul>";
		}
}
    }
}
