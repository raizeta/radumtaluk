<?php
use yii\helpers\Html;
use yii\bootstrap\ActiveForm;
use yii\helpers\ArrayHelper;
/* $profile=Yii::$app->getUserOpt->Profile_user();

//echo $roHeader->KD_RO;
//echo $roEmpe->EMP_ID;
//echo $profile->emp->EMP_NM;
	$arrayStt= [
		  ['status' => 4, 'DESCRIP' => 'REJECT'],
		  ['status' => 1, 'DESCRIP' => 'PENDING'],		  
		  ['status' => 0, 'DESCRIP' => 'REPROCESS'],
		  ['status' => 101, 'DESCRIP' => 'APPROVED'],
	];	
	$valStt = ArrayHelper::map($arrayStt, 'status', 'DESCRIP'); */
?>

	<?php
		$form = ActiveForm::begin([
				'id'=>'frm-discont-proccess',
				'enableClientValidation' => true,
				'enableAjaxValidation' => true,
				'method' => 'post',
				'action' => ['/purchasing/purchase-order/discount-save'],
		]);
	?>	
		<?php echo  $form->field($poHeaderVal, 'dISC')->textInput(['placeholder' => 'Entry Presentase Discount ...'])->label('Discount    [ ex: 2.2% ]'); ?>
		<?php echo  $form->field($poHeaderVal, 'kD_PO')->hiddenInput(['value'=>$poHeader->KD_PO,'maxlength' => true, 'readonly' => true])->label(false); ?>		
		<div style="text-align: right;"">
			<?php echo Html::submitButton('simpan',['class' => 'btn btn-primary']); ?>
		</div>

    
	<?php ActiveForm::end(); ?>	

	





