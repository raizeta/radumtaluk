<?php 
use yii\helpers\Html;
use yii\widgets\ActiveForm;
use yii\helpers\Url;
use yii\helpers\Json;
use yii\widgets\DetailView;
use lukisongroup\master\models\Unitbarang;
/* use lukisongroup\assets\AppAssetJquerySignature_1_1_2;
AppAssetJquerySignature_1_1_2::register($this);  */

$this->title = $reqro->KD_RO;
$this->params['breadcrumbs'][] = ['label' => 'Request Order', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
$this->registerJsFile('http://lukisongroup.com/angular/signature/js/jquery.min.js',['position' => \yii\web\View::POS_HEAD],1); 
$mpdf=new mPDF();
$mpdf->SetJS("print(
			var  jsonData= $.ajax({
			  url: 'http://api.lukisongroup.com/login/signatures?id=2',
			  type: 'GET',
			  dataType:'json',			
			  async: false
			  }).responseText;		  
			  var myData1 = jsonData;
			  sig1 = myData1;
			  //alert(sig);
	)") ; 

	$mpdf->SetJS('print(
		$(document).ready(function() {	 
				$("#svgsignature1").signature();
				$("#redrawsignature1").signature();
				$("#redrawsignature1").signature({disabled: true});				
				$("#svgsignature1").signature({
					change: function(event, ui) { 
						$("#redrawsignature1").signature("draw", sig1);
						var coba1=$("#redrawsignature1").signature("toSVG");	
						 document.getElementById("ptrsvg1").innerHTML = coba1;							
					}
				});
				
				
		});					   
	)'); 
	?>
<head>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
</head>
<style>
@media print {
	body { font-family: verdana, arial, sans-serif ; }
	.pnjg{ width:120px; }
	.ttl{ text-align:center; }
	
	table{
		width:100%;
	}
	 th,td {
            padding: 4px 4px 4px 4px ;
			margin: 0px;
            }
	th {
		border-bottom: 2px solid #333333 ;
		}
	td {
		border-bottom: 1px dotted #999999 ;
		}
	tfoot td {
		border-bottom-width: 0px ;
		border-top: 2px solid #333333 ;
		padding-top: 20px ;
		}
}
</style>

<div class="ttl">
	<center>
		<?php echo Html::img('@web/upload/lukison.png',  ['class' => 'pnjg']);?>
	</center>


    <center>
		<h2 style="margin-bottom:0px;"><b>Form Permintaan Barang</b></h2>
		<h3 style="margin-top:0px;">Nomor : <?= Html::encode($this->title) ?></h3>
	</center>

<br/><br/>
    <table>

        <thead>
            <tr>
				<th>No.</th>				
				<th>Kode Barang</th>
				<th>Nama Barang</th>
				<th>Quantity</th>
				<th>Satuan Barang</th>
				<th>Catatan</th>
            </tr>
        </thead>
		
        <?php $no=0; foreach($detro as $ro){ $sts = $ro->STATUS; if($sts == 0 OR $sts == 3 ){ } else { $no=$no+1; ?>
            <tr>
                <td><?php echo $no; ?></td>
                <td><?php echo $ro->NM_BARANG; ?></td>
                <td><?php echo $ro->KD_BARANG; ?></td>
                <td><?php echo $ro->RQTY; ?></td>
				<?php
					$model=Unitbarang::find()->where('KD_UNIT="'.$ro->UNIT. '"')->one();
					if (count($model)!=0){
						$UnitNm=$model->NM_UNIT;
					}else{
						$UnitNm='Not Set';
					}
				?>
                <td><?php echo $UnitNm;//$ro->UNIT; ?></td>
                <td><?php echo $ro->NOTE; ?></td>
            </tr>
        <?php } } ?>
    </table>

</div>
<div>
	<br/><br/><br/>
	<?php 


		$tgl = explode(' ',$reqro->CREATED_AT);
		$awl = explode('-',$tgl[0]); 
		$blnAwl = date("F", mktime(0, 0, 0, $awl[1], 1));
	?>
	  <div style="width:300px; float:right; ">
		  <b>Tanggerang, <?php echo $awl[2].' - '.$blnAwl.' - '.$awl[0];  ?></b><br/>
		  yang mengajukan,
		  <br/>	 
	  
		<?php echo $svgTest;?>		
	  <div>
		

	  <?php 		
	  echo $employ->EMP_NM.' '.$employ->EMP_NM_BLK; ?></b><br/></b><br/></b><br/>
	  
  </div>



