<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "http://pro.rajaongkir.com/api/city",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_HTTPHEADER => array("key:55e4b7cc4d7a2ddfd46c9a96dc221abf"),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) 
{
  #echo "cURL Error #:" . $err;
} 
else 
{
  echo $response;
}

$result = (json_decode($response)->rajaongkir->results);
?>
<html>
<head>
</head>
<body>

<select name="provinsi">
  <option>Pilih Provinsi</option>
  <?php
    foreach ($result as $key=>$value) 
    {
        
      //print_r($value);
      //echo '<br>';
      #echo $value->province.'<br>';
      echo '<option value="'; echo $value->province_id; echo '">';
      echo$value->province;
      echo  '</option>'; 
    }
  ?>
</select>

<select name="kabupaten">
  <option>Pilih Kabupaten</option>
  <?php
    foreach ($result as $key=>$value) 
    {
        
      //print_r($value);
      //echo '<br>';
      #echo $value->province.'<br>';
      echo '<option value="'; echo $value->city_id; echo '">';
      echo$value->city_name;
      echo  '</option>'; 
    }
  ?>
</select>

<select name="postalocode">
  <option>Postal Code</option>
  <?php
    foreach ($result as $key=>$value) 
    {
        
      //print_r($value);
      //echo '<br>';
      #echo $value->province.'<br>';
      echo '<option value="'; echo $value->postal_code; echo '">';
      echo $value->postal_code;
      echo  '</option>'; 
    }
  ?>
</select>

</body>
</html>