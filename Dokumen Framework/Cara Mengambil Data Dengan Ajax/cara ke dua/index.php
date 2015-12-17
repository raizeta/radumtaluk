<?php
	include "../app/provinsi.php";

?>

<html>
<head>
	<script src="../js/jquery.js"></script>
	<script>
		$(document).ready(function()
		{
			$("#propinsi").change(function()
			{
				var propinsi = $("#propinsi").val();
				
				$.ajax({
					url:"../app/ajaxkota.php",
					type:"GET",
					data:"propinsi=" + propinsi,
					success:function(response)
					{
						$("#kabupaten").html(response);
					}

				});
			});
		});
		</script>
</head>
<body>
	<select name="propinsi" id="propinsi">
		<option value="">--Pilih Propinsi--</option>
			<?php
			
			foreach ($data as $key => $value) 
			{
				echo '<option value="';echo $value['PROVINCE_ID'];echo '">';
				echo $value['PROVINCE'];
				echo'</option>';
			}
			
			?>
	</select>

	<select name="kabupaten" id="kabupaten">
		<option value="">--Pilih Kab/Kota--</option>
			<?php
			
			foreach ($datakota as $key => $value) 
			{
				echo '<option value="';echo $value['CITY_ID'];echo '">';
				echo $value['CITY_NAME'];
				echo'</option>';
			}
			
			?>
	</select>



	

</body>
</html>
