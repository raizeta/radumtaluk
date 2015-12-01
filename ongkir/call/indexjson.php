<html>
<head>
	<script src="../js/jquery.js"></script>
	<script>
		$(document).ready(function()
		{
			alert("Debug Satu");

		  	$.getJSON('../app/jsonprovinsi.php',function(json)
			{
				
				$.each(json, function(index, row) 
				{
					$('#propinsi').append('<option value='+row.PROVINCE_ID+'>'+row.PROVINCE+'</option>');
				});
			});

			$('#propinsi').change(function()
			{
				$.getJSON('../app/jsonkota.php',{action:'getKab', kode_prop:$(this).val()}, function(json)
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
	<select name="propinsi" id="propinsi">

	</select>

	<select name="kabupaten" id="kabupaten">

	</select>
</body>
</html>
