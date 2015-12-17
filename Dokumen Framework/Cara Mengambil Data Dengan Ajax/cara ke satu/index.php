<?php
#koneksi
$conn = mysqli_connect("localhost", "root", "", "ajax");
#akhir-koneksi

#ambil data propinsi
$query = "SELECT PROVINCE_ID, PROVINCE FROM provinsi ORDER BY PROVINCE";
$sql = mysqli_query($conn, $query);
$arrpropinsi = array();
while ($row = mysqli_fetch_assoc($sql)) 
{
	$arrpropinsi [ $row['PROVINCE_ID'] ] = $row['PROVINCE']; //
}

#action get Kabupaten
if(isset($_GET['action']) && $_GET['action'] == "getKab") 
{
	$kode_prop = $_GET['kode_prop'];
	
	//ambil data kabupaten
	$query = "SELECT CITY_ID, CITY_NAME FROM kota WHERE PROVINCE_ID='$kode_prop' ORDER BY CITY_NAME";
	$sql = mysqli_query($conn, $query);
	$arrkab = array();
	while ($row = mysqli_fetch_assoc($sql)) 
	{
		array_push($arrkab, $row);
	}
	echo json_encode($arrkab);
	exit;
}
?>
<html>
	<head>
		<title></title>
		<style type="text/css">
		span.inputan { display:block; margin-bottom:5px; }
		span.inputan label { float:left; display:block; width:200px;}
		</style>
		<script type="text/javascript" src="jquery.min.js"></script>
		<script type="text/javascript">
			$(document).ready(function()
			{
				$('#propinsi').change(function()
				{
					$.getJSON('index.php',{action:'getKab', kode_prop:$(this).val()}, function(json)
					{
						$('#kabupaten').html('');

						$.each(json, function(index, row) 
						{
							$('#kabupaten').append('<option value='+row.CITY_ID+'>'+row.CITY_NAME+'</option>');
						});
					});
				});
			});
		</script>
	</head>
	<body>

		<form action="" method="post">
		<span class="inputan">
		<label for="propinsi">Propinsi</label>
		: <select id="propinsi" name="propinsi">
			<option value="">-Pilih-</option>
			<?php
			foreach ($arrpropinsi as $kode=>$nama) 
			{
				echo "<option value='$kode'>$nama</option>";
			}
			?>
		</select>
		</span>
		<span class="inputan">
		<label for="kabupaten">Kabupaten</label>
		: <select id="kabupaten" name="kabupaten">
		</select>
		</span>
		</form>
	</body>
</html>