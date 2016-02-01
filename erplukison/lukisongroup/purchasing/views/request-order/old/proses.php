<?php
use yii\helpers\Html;
use kartik\grid\GridView;
use yii\helpers\ArrayHelper;
use lukisongroup\master\models\Unitbarang;
use lukisongroup\assets\AppAssetJqueryJSignature;
AppAssetJqueryJSignature::register($this); 
$this->sideCorp = 'ESM Request Order';                       /* Title Select Company pada header pasa sidemenu/menu samping kiri */
$this->sideMenu = 'esm_esm';                                 /* kd_menu untuk list menu pada sidemenu, get from table of database */
$this->title = Yii::t('app', 'Data Master');         /* title pada header page */
$this->params['breadcrumbs'][] = $this->title;                      /* belum di gunakan karena sudah ada list sidemenu, on plan next*/

 $this->registerJs('
		$(document).ready(function($) {
			/* Data Signature1 from DB */
			var ro_datadb1 =\''. $reqro->SIG1_SVGBASE64 . '\'
				var i = new Image();							
					i.src = ro_datadb1
					$(i).appendTo($("#signature1"));
			/* Data Signature2 from DB */
			var ro_datadb2 =\''. $reqro->SIG2_SVGBASE64 . '\'
				var j = new Image();							
					j.src = ro_datadb2
					$(j).appendTo($("#signature2"));				
		});		
 ',$this::POS_BEGIN);
 
 $arrayStt= [
	  ['STATUS' => '0', 'name' => 'PROCESS'],
	  ['STATUS' => '1', 'name' => 'APPROVED'],
	  ['STATUS' => '3', 'name' => 'REJECT'],
	  ['STATUS' => '4', 'name' => 'DELETE'],
 ];
 $valStt = ArrayHelper::map($arrayStt, 'id', 'name');

 /*
 * STATUS Prosess Request Order
 * 1. PROCESS	=0 		| Pertama RO di buat
 * 2. APPROVED	=101	| Ro Sudah Di Approved
 * 3. DELETE	=3 		| Ro Di hapus oleh pembuat petama, jika belum di Approved
 * 4. REJECT	=4		| Ro tidak di setujui oleh Atasan manager keatas
 * 5. UNKNOWN	<>		| Ro tidak valid
*/
function statusProcessRo($model){
	if($model->STATUS==0){
		return Html::a('<i class="glyphicon glyphicon-retweet"></i> PROCESS', '#',['class'=>'btn btn-warning btn-xs', 'style'=>['width'=>'100px'],'title'=>'Detail']);
	}elseif ($model->STATUS==101){
		return Html::a('<i class="glyphicon glyphicon-ok"></i> APPROVED', '#',['class'=>'btn btn-success btn-xs','style'=>['width'=>'100px'], 'title'=>'Detail']);
	}elseif ($model->STATUS==3){
		return Html::a('<i class="glyphicon glyphicon-remove"></i> DELETE', '#',['class'=>'btn btn-danger btn-xs','style'=>['width'=>'100px'], 'title'=>'Detail']);						
	}elseif ($model->STATUS==4){
		return Html::a('<i class="glyphicon glyphicon-thumbs-down"></i> REJECT', '#',['class'=>'btn btn-danger btn-xs','style'=>['width'=>'100px'], 'title'=>'Detail']);
	}else{
		return Html::a('<i class="glyphicon glyphicon-question-sign"></i> UNKNOWN', '#',['class'=>'btn btn-danger btn-xs','style'=>['width'=>'100px'], 'title'=>'Detail']);	
	};		
}

 
?>

<div class="container" style="font-family: verdana, arial, sans-serif ;font-size: 8pt;">
	<!-- HEADER !-->
	<div class="col-md-12">
		<div class="col-md-1" style="float:left;">
			<?php echo Html::img('@web/upload/lukison.png',  ['class' => 'pnjg', 'style'=>'width:100px;height:70px;']); ?>	
		</div>
		<div class="col-md-9" style="padding-top:15px;">
			<h3 class="text-center"><b>Form Permintaan Barang & Jasa</b></h3>				
		</div>
		<div class="col-md-11">
			<hr>
		</div>
	</div>
	<!-- Title Descript !-->
	<div class="col-md-11">
		<dl>
			  <dt style="width:100px; float:left;">Date</dt>
			  <dd>: <?php echo date('d-M-Y'); ?></dd>
			  <dt style="width:100px; float:left;">Nomor</dt>
			  <dd>: <?php echo $reqro->KD_RO; ?></dd>     	  
			  <dt style="width:100px; float:left;">Departement</dt>	 
			  <dd>: 
				<?php 
					if (count($dept)!=0){
						echo $dept->DEP_NM;
					}else{
						echo 'Dept Set';
					}
				?>
			</dd>
		</dl>
	</div>
	<!-- Table Grid List RO Detail !-->
	<div class="col-md-11">
		<?php 
			echo GridView::widget([
				'id'=>'ro-process',
				'dataProvider'=> $dataProvider,
				'filterModel' => '',
				'headerRowOptions'=>['style'=>'background-color:rgba(0, 95, 218, 0.3); align:center'],
				'filterRowOptions'=>['style'=>'background-color:rgba(0, 95, 218, 0.3); align:center'],
				 'beforeHeader'=>[
						[
							'columns'=>[
								['content'=>'', 'options'=>['colspan'=>2,'class'=>'text-center info',]], 
								['content'=>'Quantity', 'options'=>['colspan'=>3, 'class'=>'text-center info']], 
								['content'=>'Remark', 'options'=>['colspan'=>2, 'class'=>'text-center info']], 
								//['content'=>'Action Status ', 'options'=>['colspan'=>1,  'class'=>'text-center info']], 
							],

						]
					], 

					'columns' => [
					[
						'class'=>'kartik\grid\SerialColumn',
						'contentOptions'=>['class'=>'kartik-sheet-style'],
						'width'=>'20px',
						'header'=>'No.',
						'headerOptions'=>['class'=>'kartik-sheet-style']
					],	
					
					/* ['attribute'=>'ID',], */
					[				
						'label'=>'Items',
						'attribute'=>'NM_BARANG',
						'format' => 'raw',
						'mergeHeader'=>true,
						'vAlign'=>'middle',						
						//'options'=>['colspan'=>1,'mergeHeader'=>true,],
						'contentOptions'=>[ 
							'style'=>['width: 300px',],
						], 
					],
					[
						'class'=>'kartik\grid\EditableColumn',
						'label'=>'Request',
						//'filter'=>'Request',
						'attribute'=>'RQTY',
						'vAlign'=>'middle',
						'mergeHeader'=>true,
						'contentOptions'=>[ 
							//'colspan'=>2,
							'style'=>['width: 60px'],
						], 
					],
					[
						'class'=>'kartik\grid\EditableColumn',
						'attribute'=>'SQTY',
						//'label'=>'',
						//'filter'=>'Submmit',						
						//'vAlign'=>'middle',	
						'mergeHeader'=>true,						
						'readonly'=>function($model, $key, $index, $widget) {
							//return (!$model->STATUS); // do not allow editing of inactive records
							return (10 == $model->STATUS);
						},
						'editableOptions' => [
					    'header' => 'Employe name',
						'inputType' => \kartik\editable\Editable::INPUT_TEXT,
							//'options' => [
							//    'pluginOptions' => ['min'=>0, 'max'=>5000]
						   // ]
						],
						'width'=>'7%', 
						//'format'=>['decimal', 2],
						/* 'contentOptions'=>[ 							
							'style'=>['width: 60px'],
						], */	 			
					],
					[
						'label'=>'pcs',
						'filter'=>'Unit',
						'attribute'=>'UNIT',
						'vAlign'=>'middle',
						'mergeHeader'=>true,
						/* 'contentOptions'=>[ 
							'style'=>['width: 100px'],
						], */
						'value'=>function($model){
							$model=Unitbarang::find()->where('KD_UNIT="'.$model->UNIT. '"')->one();
							if (count($model)!=0){
								$UnitNm=$model->NM_UNIT;
							}else{
								$UnitNm='Not Set';
							}
							return $UnitNm;
						}
					],
					[
						'class'=>'kartik\grid\EditableColumn',
						'label'=>'Noted',
						'attribute'=>'NOTE',
						'mergeHeader'=>true,
						/* 'contentOptions'=>[ 'style'=>'width: 200px'], */
					], 
					[
						'label'=>'Status',
						'hAlign'=>'center',
						'vAlign'=>'middle',
						'mergeHeader'=>true,
						'attribute'=>'STATUS',
						'contentOptions'=>[ 
							'style'=>['width: 100px'],
						],
						'format' => 'html', 
						'value'=>function ($model, $key, $index, $widget) { 
									return statusProcessRo($model);
								}	
					],
				],
				'pjax'=>true,
				'pjaxSettings'=>[
				'options'=>[
					'enablePushState'=>false,
					'id'=>'ro-process',
				   ],						  
				],
				'hover'=>true, //cursor select
				'responsive'=>true,
				'responsiveWrap'=>true,
				'bordered'=>true,
				'striped'=>'4px',
				'autoXlFormat'=>true,
				'export' => false, 
			]);
		?>
	</div>
	
	<!-- Signature !-->
	<div  class="col-md-11">
		<?php 
			$tgl1 = explode(' ',$reqro->CREATED_AT);
			$awl1 = explode('-',$tgl1[0]); 
			$blnAwl1 = date("F", mktime(0, 0, 0, $awl1[1], 1));
			
			$tgl2 = explode(' ',$reqro->SIG2_TGL);
			$awl2 = explode('-',$tgl2[0]); 
			$blnAwl2 = date("F", mktime(0, 0, 0, $awl2[1], 1));		
			
		?>
		<div style="float:left;">
			<table id="tblRo" class="table table-bordered" style="width:550px;font-family: verdana, arial, sans-serif ;font-size: 8pt;">
				<!-- Tanggal!-->
				 <tr>
					<!-- Tanggal Pembuat RO!-->
					<th style="text-align: center; height:20px">
						<div style="margin-left:50px">
							<b>Tanggerang</b>, <?php echo ' '.$awl1[2].'-'.$blnAwl1.'-'.$awl1[0];  ?>
						</div> 
					
					</th>		
					<!-- Tanggal PO Approved!-->				
					<th style="text-align: center; height:20px">
						<div style="margin-left:50px">
							<b>Tanggerang</b>, <?php echo ' '.$awl2[2].'-'.$blnAwl2.'-'.$awl2[0];;  ?>
						</div> 				
					</th>	
				</tr>
				<!--Keterangan !-->
				 <tr>
					<th style="background-color:rgba(0, 95, 218, 0.3);text-align: center; height:20px">
						  Mengajukan,
					</th>								
					<th style="background-color:rgba(0, 95, 218, 0.3);text-align: center; height:20px">
						  Menyetujui,
					</th>	
				</tr>
				<!-- Signature !-->
				 <tr>
					<th style="text-align: center; vertical-align:middle;width:180; height:80px">
						<div id="ro-view-sig1"><div>
					</th>								
					<th style="text-align: center; vertical-align:middle;width:180; height:80px">
						<div id="ro-view-sig2">
					</th>
				</tr>
				<!--Nama !-->
				 <tr>
					<th style="text-align: center; vertical-align:middle;height:20">
						<div>		
							<b><?php  echo $reqro->EMP_NM; ?></b>
						</div>
					</th>								
					<th style="text-align: center; vertical-align:middle;height:20">
						<div>		
							<b><?php  echo $reqro->SIG2_NM; ?></b>
						</div>
					</th>
				</tr>
			</table>
		</div>
		<!-- Button Submit!-->
		<div style="text-align:right; margin-top:80px">
			<!-- Button Back!-->
			<a href="/purchasing/request-order" class="btn btn-info" role="button">Kembali</a>
			<!-- Button Cetak!-->
			<?php 
				echo Html::a('<i class="fa fa-print fa-fw"></i> Cetak', ['cetakpdf','kd'=>$reqro->KD_RO], ['target' => '_blank', 'class' => 'btn btn-success']);
			?>				
		</div>
	</div>	
</div>
