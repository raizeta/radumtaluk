<?php
use yii\helpers\Html;
use kartik\grid\GridView;
use yii\helpers\Url;
use yii\bootstrap\Modal;
use yii\helpers\ArrayHelper;
use lukisongroup\master\models\Unitbarang;
use lukisongroup\assets\AppAssetJqueryJSignature;
AppAssetJqueryJSignature::register($this); 
$this->sideCorp = 'ESM Request Order';                       /* Title Select Company pada header pasa sidemenu/menu samping kiri */
$this->sideMenu = 'esm_esm';                                 /* kd_menu untuk list menu pada sidemenu, get from table of database */
$this->title = Yii::t('app', 'Data Master');         		 /* title pada header page */
$this->params['breadcrumbs'][] = $this->title;               /* belum di gunakan karena sudah ada list sidemenu, on plan next*/
 
 /* LOCK STATUS TOMBOL */
 $a=$roHeader->STATUS;
//echo $a;

 $this->registerJs('
		$(document).ready(function($) {
			/* Data Signature1 from DB */
			var ro_datadb1 =\''. $roHeader->SIG1_SVGBASE64 . '\'
				var i = new Image();							
					i.src = ro_datadb1
					$(i).appendTo($("#ro-view-approval-sig1"));
			/* Data Signature2 from DB */
			var ro_datadb2 =\''. $roHeader->SIG2_SVGBASE64 . '\'
				var j = new Image();							
					j.src = ro_datadb2
					$(j).appendTo($("#ro-view-approval-sig2"));				
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
	 * Declaration Componen User Permission
	 * Function getPermission
	 * Modul Name[1=RO]
	*/
	function getPermission(){
		if (Yii::$app->getUserOpt->Modul_akses(1)){
			return Yii::$app->getUserOpt->Modul_akses(1)->mdlpermission;
		}else{		
			return false;
		}	 
	}
	function getPermissionEmployee(){
		if (Yii::$app->getUserOpt->Modul_akses(1)){
			return Yii::$app->getUserOpt->Modul_akses(1)->emp;
		}else{		
			return false;
		}	 
	}
	
 
	 /*
	 * STATUS Prosess Request Order
	 * 1. PROCESS	=0 		| Pertama RO di buat
	 * 2. APPROVED	=101	| Ro Sudah Di Approved
	 * 3. DELETE	=3 		| Ro Di hapus oleh pembuat petama, jika belum di Approved
	 * 4. REJECT	=4		| Ro tidak di setujui oleh Atasan manager keatas
	 * 5. CLOSED	=10		| Ro sudah di approved dan sudah di tarik sebagai PO (closed/lock All)
	 * 6. UNKNOWN	<>		| Ro tidak valid
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
 
	/*
	 * Status Value Signature1
	 * Permission Edit [BTN_SIGN1==1] & [Status 0=process 101=Approved]
	*/
	function SignApproved($kd_ro){
		$title = Yii::t('app', 'Sign Hire');
		$options = [ 'id'=>'emp-auth',	
					  'data-toggle'=>"modal",
					  'data-target'=>"#emp-auth-sign",											
					  'class'=>'btn btn-warning btn-xs', 
					  'style'=>['width'=>'150px'],
					  'title'=>'Detail'
		]; 
		$icon = '<span class="glyphicon glyphicon-retweet"></span>';
		$label = $icon . ' ' . $title;
		$url = Url::toRoute(['/purchasing/request-order/approved_authorize','kd'=>$kd_ro]);
		//$options1['tabindex'] = '-1';
		$content = Html::a($label,$url, $options);
		return $content;	
	} 
	
	/*
	 * Tombol Modul Approval -> Check By User login
	 * Permission Edit [BTN_SIGN1==1] & [Status 0=process 101=Approved]
	 * EMP_ID=UserLogin & BTN_SIGN1==1 &  Status 0 = Action Edit Show/bisa edit
	 * EMP_ID=UserLogin & BTN_SIGN1==1 &  Status 0 = Action Edit Hide/tidak bisa edit
	 * 1. Hanya User login dengan permission modul RO=1 dengan BTN_SIGN1==1 dan Permission Jabatan SVP keatas yang bisa melakukan Approval (Tanpa Kecuali)
	 * 2. Action APPROVAL Akan close atau tidak bisa di lakukan jika sudah Approved | status Approved =101 | Permission sign1
	*/
	function tombolApproval($url, $model){
		if(getPermission()){
			//Permission Jabatan
			$a=getPermissionEmployee()->JOBGRADE_ID;
			$b=getPermission()->BTN_SIGN1;
			if($a == 'SEVP' OR $a == 'EVP' OR $a == 'SVP' OR $a == 'VP' OR $a == 'AVP' OR $a == 'SM' OR $a == 'M' OR $a == 'AM' OR $a == 'S' AND $b==1 ){
				 if($model->STATUS == 0){ // 0=process 101=Approved
					$title = Yii::t('app', 'Approved');
					$options = [ 'id'=>'approved',
								 'data-pjax' => true,
								// 'data'=>['idc'=>$model->ID],
								 //'data-target'=>'#data-toggle-rodetail-approved',	
								 'data-toggle-approved'=>$model->ID,				
					]; 
					$icon = '<span class="glyphicon glyphicon-ok"></span>';
					$label = $icon . ' ' . $title;
					//$url = Url::toRoute(['/purchasing/request-order/approved_rodetail','kd'=>$model->KD_RO]);
					//$url = Url::toRoute(['/purchasing/request-order/approved']);
					//$url = Url::toRoute(['/purchasing/request-order/approved_rodetail']);
					//$options['tabindex'] = '-1';
					return '<li>' . Html::a($label, '' , $options) . '</li>' . PHP_EOL;
				}
			}
		}	
	}
 
	/*
	 * Tombol Modul Reject -> Check By User login
	 * Permission Edit [BTN_SIGN1==1] & [Status 4=Reject]
	 */
	 
	function tombolReject($url, $model) {
		if(getPermission()){
			//Permission Jabatan
			$a=getPermissionEmployee()->JOBGRADE_ID;
			$b=getPermission()->BTN_SIGN1;
			if($a == 'SEVP' OR $a == 'EVP' OR $a == 'SVP' OR $a == 'VP' OR $a == 'AVP' OR $a == 'SM' OR $a == 'M' OR $a == 'AM' OR $a == 'S' AND $b==1 ){
				 if($model->STATUS == 0){ // 0=process 4= Reject
					$title = Yii::t('app', 'Reject');
					$options = [ 'id'=>'reject',
								 'data-pjax'=>true,
								 'data-toggle-reject' => $model->ID							
					]; 
					$icon = '<span class="glyphicon glyphicon-ok"></span>';
					$label = $icon . ' ' . $title;
					//$url = Url::toRoute(['/purchasing/request-order/approved','kd'=>$model->KD_RO]);
					//$url = Url::toRoute(['/purchasing/request-order/approved']);
					//$url = Url::toRoute(['/purchasing/request-order/approved']);
					$options['tabindex'] = '-1';
					return '<li>' . Html::a($label, '' , $options) . '</li>' . PHP_EOL;
				}
			}
		}	
	}
	/*
	 * Tombol Modul Cancel -> Check By User login
	 * Permission Edit [BTN_SIGN1==1] & [Status 0=Process]
	 * Cancel Back To Process
	*/ 
	function tombolCancel($url, $model){
		if(getPermission()){
			//Permission Jabatan
			$a=getPermissionEmployee()->JOBGRADE_ID;
			$b=getPermission()->BTN_SIGN1;
			if($a == 'SEVP' OR $a == 'EVP' OR $a == 'SVP' OR $a == 'VP' OR $a == 'AVP' OR $a == 'SM' OR $a == 'M' OR $a == 'AM' OR $a == 'S' AND $b==1 ){
				 if($model->STATUS !== 101 or $model->STATUS !== 4 or $model->STATUS !== 3 or $model->STATUS !== 0){ // 0=process 4= Reject
					$title = Yii::t('app', 'Cancel');
					$options = [ 'id'=>'cancel',
								 'data-pjax'=>true,
								 'data-toggle-cancel' => $model->ID							
					]; 
					$icon = '<span class="glyphicon glyphicon-ok"></span>';
					$label = $icon . ' ' . $title;
					return '<li>' . Html::a($label, '' , $options) . '</li>' . PHP_EOL;
				}
			}
		}	
	}
	
	/*
	 * Tombol Modul Konci -> 
	 * Permission [Status 101=10]
	 * CLOSED 101 or 10
	*/ 
	function tombolKonci($url, $model){
		$title = Yii::t('app', 'LOCKED');
		$options = [ 'id'=>'closed']; 
		$icon = '<span class="glyphicon glyphicon-lock"></span>';
		$label = $icon . ' ' . $title;
		return '<li>' . Html::a($label, '' , $options) . '</li>' . PHP_EOL;	
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
			  <dd>: <?php echo $roHeader->KD_RO; ?></dd>     	  
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
							['content'=>'Remark', 'options'=>['colspan'=>3, 'class'=>'text-center info']], 
							//['content'=>'Action Status ', 'options'=>['colspan'=>1,  'class'=>'text-center info']], 
						],
					]
				], 
				'columns' => [
					[
						/* Attribute Serial No */
						'class'=>'kartik\grid\SerialColumn',
						'contentOptions'=>['class'=>'kartik-sheet-style'],
						'width'=>'10px',
						'header'=>'No.',
						'headerOptions'=>['class'=>'kartik-sheet-style']
					],						
					/* ['attribute'=>'ID',], */
					[		
						/* Attribute Items Barang */
						'label'=>'Items',
						'attribute'=>'NM_BARANG',
						'hAlign'=>'left',	
						'vAlign'=>'middle',
						'mergeHeader'=>true,
						'format' => 'raw',	
						'contentOptions'=>['style'=>'width: 200px'], 
					],
					[
						/* Attribute Request Quantity */
						'attribute'=>'RQTY',
						'label'=>'Qty.Request',						
						'vAlign'=>'middle',
						'hAlign'=>'center',	
						'mergeHeader'=>true,
						'contentOptions'=>['style'=>'width: 60px']									
					],
					[
						/* Attribute Submit Quantity */
						'class'=>'kartik\grid\EditableColumn',
						'attribute'=>'SQTY',	
						'label'=>'Qty.Submit',
						'mergeHeader'=>true,											
						'vAlign'=>'middle',	
						'hAlign'=>'center',
						'contentOptions'=>['style'=>'width: 60px'], 						
						'readonly'=>function($model, $key, $index, $widget) {
							return (101 == $model->STATUS);
						},
						'editableOptions' => [
							'header' => 'Update Quantity',
							'inputType' => \kartik\editable\Editable::INPUT_TEXT,
							'options' => [
							  'pluginOptions' => ['min'=>0, 'max'=>50000]
						    ]
						],
						//'width'=>'7%', 
						//'format'=>['decimal', 2],
							 			
					],
					[
						/* Attribute Unit Barang */
						'attribute'=>'UNIT',
						'label'=>'pcs',
						'hAlign'=>'left',						
						'vAlign'=>'middle',
						'mergeHeader'=>true,
						'contentOptions'=>['style'=>'width: 100px'], 
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
						/* Attribute Unit Barang */
						'class'=>'kartik\grid\EditableColumn',
						'attribute'=>'NOTE',
						'label'=>'Noted',
						'hAlign'=>'left',						
						'mergeHeader'=>true,
						'contentOptions'=>[ 'style'=>'width: 200px'], 
					], 
					[
						/* Attribute Status Detail RO */
						'attribute'=>'STATUS',
						'options'=>['id'=>'test-ro'],						
						'label'=>'Status',
						'hAlign'=>'center',
						'vAlign'=>'middle',
						'mergeHeader'=>true,
						'contentOptions'=>['style'=>'width: 100px'],
						'format' => 'html', 
						'value'=>function ($model, $key, $index, $widget) { 
									return statusProcessRo($model);
								}	
					],
					[
						'class'=>'kartik\grid\ActionColumn',
						'dropdown' => true,
						'template' => '{approved} {reject} {cancel} {closed}',
						'dropdownOptions'=>['class'=>'pull-right dropup'],									
						'headerOptions'=>['class'=>'kartik-sheet-style'],
						'buttons' => [						
							/* Approved RO | Permissian Status 101 | Dept = Dept login | GF >= M ($roHeader->STATUS!=101 or $roHeader->STATUS!=10)*/
							'approved' => function ($url, $model) use ($a) {
											if ($a!==101	 && $a!==10) {
												return tombolApproval($url, $model);
											}else{
											}
										},
							/* Reject RO | Permissian Status 4; | Dept = Dept login | GF >= M */
							'reject' => function ($url, $model) use ($a) {											
											if ($a!==101	 && $a!==10) {
												return tombolReject($url, $model);
											}
										},
							/* Cancel RO | Permissian Status 0; | Dept = Dept login | GF >= M */
							'cancel' => function ($url, $model) use ($a){
											if ($a!==101 && $a!==10) {
												return tombolCancel($url, $model);
											}
										},
							'closed' => function ($url, $model) use ($a){
											if ($a==101 OR $a==10) {
												//return Html::label('<i class="glyphicon glyphicon-lock dm"></i> LOCKED','',['class'=>'label label-danger','style'=>['align'=>'center']]);
												return  tombolKonci($url, $model);
											}
										},
						],
						
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
			$tgl1 = explode(' ',$roHeader->CREATED_AT);
			$awl1 = explode('-',$tgl1[0]); 
			$blnAwl1 = date("F", mktime(0, 0, 0, $awl1[1], 1));
			
			function tgl2signature($tgl){
				if($tgl<>0){
					$tgl2 = explode(' ',$tgl);
					$awl2 = explode('-',$tgl2[0]); 
					$blnAwl2 = date("F", mktime(0, 0, 0, $awl2[1], 1));
					$TglSign=' '.$awl2[2].'-'.$blnAwl2.'-'.$awl2[0];
					return $TglSign;
				}
				return '';				
			}
			
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
							<b>Tanggerang</b>, <?php echo tgl2signature($roHeader->SIG2_TGL);// $TglSign;//echo ' '.$awl2[2].'-'.$blnAwl2.'-'.$awl2[0];  ?>
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
						<div id="ro-view-approval-sig1"><div>
					</th>								
					<th style="text-align: center; vertical-align:middle;width:180; height:80px">
						<?php 
							if ($roHeader->STATUS==101 OR $roHeader->STATUS==10){
								echo '<div id="ro-view-approval-sig2">';
							}else{
								echo SignApproved($roHeader->KD_RO);
							}
						?>						
					</th>
				</tr>
				<!--Nama !-->
				 <tr>
					<th style="text-align: center; vertical-align:middle;height:20">
						<div>		
							<b><?php  echo $roHeader->EMP_NM; ?></b>
						</div>
					</th>								
					<th style="text-align: center; vertical-align:middle;height:20">
						<div>		
							<b><?php  echo $roHeader->SIG2_NM; ?></b>
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
				echo Html::a('<i class="fa fa-print fa-fw"></i> Cetak', ['cetakpdf','kd'=>$roHeader->KD_RO], ['target' => '_blank', 'class' => 'btn btn-success']);
			?>				
		</div>
	</div>	
</div>
<?php
	$this->registerJs("
		$(document).on('click', '[data-toggle-approved]', function(e){
			e.preventDefault();
			var idx = $(this).data('toggle-approved');
			$.ajax({
					//url: '/purchasing/request-order/approved_rodetail?id=' + idx,
					url: '/purchasing/request-order/approved_rodetail',
					type: 'POST',
					//contentType: 'application/json; charset=utf-8',
					data:'id='+idx,
					dataType: 'json',
					success: function(result) {
						if (result == 1){
							// Success
							$.pjax.reload({container:'#ro-process'});
						} else {
							// Fail
						}
					}
				});

		});
		$(document).on('click', '[data-toggle-reject]', function(e){
			e.preventDefault();
			var idx = $(this).data('toggle-reject');
			$.ajax({
					url: '/purchasing/request-order/reject_rodetail',
					type: 'POST',
					//contentType: 'application/json; charset=utf-8',
					data:'id='+idx,
					dataType: 'json',
					success: function(result) {
						if (result == 1){
							$.pjax.reload({container:'#ro-process'});
						} 
					}
				});
		});
		
		$(document).on('click', '[data-toggle-cancel]', function(e){
			e.preventDefault();
			var idx = $(this).data('toggle-cancel');
			$.ajax({
					url: '/purchasing/request-order/cancel_rodetail',
					type: 'POST',
					//contentType: 'application/json; charset=utf-8',
					data:'id='+idx,
					dataType: 'json',
					success: function(result) {
						if (result == 1){
							$.pjax.reload({container:'#ro-process'});
						} 
					}
				});
		});
		
	",$this::POS_READY);
	
	$this->registerJs("
			$.fn.modal.Constructor.prototype.enforceFocus = function() {};	
			$('#emp-auth-sign').on('show.bs.modal', function (event) {
				var button = $(event.relatedTarget)
				var modal = $(this)
				var title = button.data('title') 
				var href = button.attr('href') 
				modal.find('.modal-title').html(title)
				modal.find('.modal-body').html('<i class=\"fa fa-spinner fa-spin\"></i>')
				$.post(href)
					.done(function( data ) {
						modal.find('.modal-body').html(data)					
					});
				}),			
	",$this::POS_READY);
	Modal::begin([
			'id' => 'emp-auth-sign',
			//'header' => '<h4 class="modal-title">Signature Authorize</h4>',
			'header' => '<div style="float:left;margin-right:10px"><img src="http://lukisongroup.com/login_icon1.png" style="width:70px; height:50px"/></div><div style="margin-top:10px;"><h4><b>Signature Authorize</b></h4></div>',
			//'size' => 'modal-xs'
			'size' => Modal::SIZE_SMALL,
			'headerOptions'=>[
				'style'=> 'border-radius:5px; background-color:rgba(230, 251, 225, 1)'
			]
		]);
	Modal::end();
?>