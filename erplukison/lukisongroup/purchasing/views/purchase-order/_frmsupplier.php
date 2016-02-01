<?php
use yii\helpers\Html;
use kartik\widgets\ActiveForm;
use kartik\widgets\DatePicker;
use yii\helpers\ArrayHelper;
use kartik\widgets\Select2;
use lukisongroup\master\models\Suplier;
$addressCorp = ArrayHelper::map(Suplier::find()->orderBy('NM_SUPPLIER')->all(), 'KD_SUPPLIER', 'NM_SUPPLIER');
?>

	<?php
		$form = ActiveForm::begin([
				'id'=>'frm-spl-proccess',
				'enableClientValidation' => true,
				'enableAjaxValidation' => true,
				'method' => 'post',
				'action' => ['/purchasing/purchase-order/supplier-save'],
		]);
	?>	
		<?php //echo  $form->field($poHeaderVal, 'kD_SUPPLIER')->textInput()->label('Supplier'); 
			  echo $form->field($poHeaderVal, 'kD_SUPPLIER')->widget(Select2::classname(), [
					'data' => $addressCorp,
					'options' => ['placeholder' => 'Select Address for Supplier ...'],
					'pluginOptions' => [
						'allowClear' => true
					],
			  ]);
		?>
		<?php echo  $form->field($poHeaderVal, 'kD_PO')->hiddenInput(['value'=>$poHeader->KD_PO,'maxlength' => true, 'readonly' => true])->label(false); ?>		
		<div style="text-align: right;"">
			<?php echo Html::submitButton('simpan',['class' => 'btn btn-primary']); ?>
		</div>

    
	<?php ActiveForm::end(); ?>	

	





