<?php
	include "../app/provinsi.php";
?>
<html>
<head>
	<script src="../js/jquery.js"></script>
	<script>
		$(document).ready(function()
		{
			$.ajax({
					url:"../app/ajaxprovinsi.php",
					type:"GET",
					success:function(response)
					{
						$("#propinsi").html(response);
					}

				});

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

	</select>

	<select name="kabupaten" id="kabupaten">
		<option value="">--Pilih Kab/Kota--</option>
	</select>
</body>
</html>
