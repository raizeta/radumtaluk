<script type="text/javascript" language="javascript">
   $(document).ready(function() {
      $("#driver").click(function(event)
      {
         $.getJSON('result.json', function(jd) {
            $('#stage').html('<p> Name: ' + jd.name + '</p>');
            $('#stage').append('<p>Age : ' + jd.age+ '</p>');
            $('#stage').append('<p> Sex: ' + jd.sex+ '</p>');
         });
      });
   });
</script>

<script type="text/javascript" language="javascript">
   $(document).ready(function() {
      $("#driver").click(function(event)
      {
         var name = $("#name").val();
         $("#stage").load('result.php', {"name":name} );
      });
   });
</script>