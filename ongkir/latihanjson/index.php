<?php
$myArray = array();
$myArray =array(
					array("id"=>"1","nama"=>"Radumta"),
					array("id"=>"2","nama"=>"Wawan"),
					array("id"=>"3","nama"=>"Ridwan")
				);

print_r($myArray);
/*
Array ( [0] => Array ( [id] => 1 [nama] => Radumta ) 
		[1] => Array ( [id] => 2 [nama] => Wawan ) 
		[2] => Array ( [id] => 3 [nama] => Ridwan ) 
	  );
*/

echo "<br/> ########################################</br>";
$arrayjson = json_encode($myArray);
echo $arrayjson;


echo "</br>########################################</br>";
$jsontoarray = json_decode($arrayjson,true);
print_r($jsontoarray);