#Method Satu
<script>
	$("button").click(function()
	{
	    $.ajax(
	    	{
	    		url: "demo_test.txt", 
	    		success: function(result)
	    		{
	        		$("#div1").html(result);
	    		}
	    	});
	});
</script>

#Method Dua
<script>
	$("button").click(function()
	{
	    $.ajaxSetup(
	    	{
	    		url: "demo_ajax_load.txt", 
	    		success: function(result)
	    		{
	        		$("div").html(result);
	        	}
	        });
	    $.ajax();
	});
</script>


#Method Tiga
<script>
$("button").click(function()
{
    $.get(
    		"demo_test.asp", 
    		function(data, status)
    		{
        		alert("Data: " + data + "\nStatus: " + status);
    		}
		);
});
</script>

#Method Empat
<script>
	$("button").click(function()
	{
	    $.getJSON("demo_ajax_json.js", function(result)
	    {
	        $.each(result, function(i, field)
	        {
	            $("div").append(field + " ");
	        });
	    });
	});
</script>