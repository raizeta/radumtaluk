<?php
use yii\helpers\Html;
use yii\widgets\ActiveForm;
use yii\db\ActiveQuery;

use lukisongroup\purchasing\models\Podetail;
use lukisongroup\purchasing\models\Purchasedetail;
?>

<?php 
$form = ActiveForm::begin([
    'method' => 'post',
    'action' => ['/purchasing/purchase-order/simpan'],
]);
?>

 <!-- ?= GridView::widget([
        'dataProvider' => $dataProvider,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            'NM_BARANG',
            'QTY',
            'UNIT',

			[
				'class' => 'yii\grid\CheckboxColumn',
				'checkboxOptions' => function ($model, $key, $index, $column) {
					return ['value' => $model->KD_BARANG.'_'.$model->ID];
				}
			],
        ],	
    ]); 
	? -->

<table class="table table-striped">
  <thead>
    <tr>
      <th>#</th>
      <th>Nama Barang</th>
      <th>Quantity</th>
      <th>Satuan Barang</th>
      <th></th>
    </tr>
  </thead>

  <tbody>

	<?php $a=0; foreach ($po as $npo => $isipo) { $a=$a+1; ?>

	    <tr>
	    	<td><?php echo $a; ?></td>
	      	<td><?php echo $isipo->NM_BARANG; ?></td>
	      	<td><?php echo $isipo->QTY; ?></td>
	      	<td>
		      	<?php 
		      		$ckUnit = preg_replace("/[^A-Z\']/", '', $isipo->UNIT);
		      		if($ckUnit == 'U'){
						$brg = lukisongroup\master\models\Unitbarang::find('NM_UNIT')->where(['KD_UNIT'=>$isipo->UNIT])->one();
		      		} else {
						$brg = lukisongroup\esm\models\Unitbarang::find('NM_UNIT')->where(['KD_UNIT'=>$isipo->UNIT])->one();
		      		}
		      		echo $brg->NM_UNIT; 
		      	?>
	      	</td>
	      	<td>
		      	<?php 
		      	//	$isidet = Purchasedetail::find('ID')->where(['KD_PO'=>$kdpo, 'KD_BARANG'=>$isipo->KD_BARANG,'UNIT'=>$isipo->UNIT])->one(); 

		     // 		$hsl = Podetail::find()->where(['KD_PO'=>$kdpo, 'ID_DET_PO'=>$isidet->ID])->one(); 

		      	//	if($hsl->QTY >= $isipo->QTY){ } else{
		      	?>
	      		<input type="checkbox" name="selection[]" value="<?php echo $isipo->KD_BARANG.'_'.$isipo->ID ?>">
	      		<?php //} ?>
	      	</td>
	    </tr>

	<?php }  ?>
  </tbody>
</table>



	<input type="hidden" name="kdpo" value="<?php echo $kdpo; ?>" />
	<input type="hidden" name="kdro" value="<?php echo $kd_ro; ?>" />
	<!-- input type="hidden" name="_csrf" value="< ?=Yii::$app->request->getCsrfToken()?>" / -->
	<div class="modal-footer">
		<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
		<button type="submit" class="btn btn-primary">Pilih Barang</button>
	</div>

<?php
 ActiveForm::end(); 
 ?>
