    <script type="text/javascript">
      $(function () {
        $("#example1").dataTable();
        $('#example2').dataTable({
          "bPaginate": true,
          "iDisplayLength": 5,
          "aLengthMenu": [[5,10,50,100,-1], [5,10,50,100,"All"]],
          "bLengthChange": true,
          "bFilter": true,
          "bSort": true,
          "bInfo": true,
          "bAutoWidth": true,
          "oLanguage":
          {
            "sZeroRecords": "No data available in table",
            "sInfoEmpty":   "No data"
          }
        });
      });
    </script>