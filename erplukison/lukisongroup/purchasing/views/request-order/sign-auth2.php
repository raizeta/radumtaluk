<?php
use yii\helpers\Html;
use yii\bootstrap\ActiveForm;
use yii\helpers\ArrayHelper;
$profile=Yii::$app->getUserOpt->Profile_user();

//echo $roHeader->KD_RO;
//echo $roEmpe->EMP_ID;
//echo $profile->emp->EMP_NM;
	$arrayStt= [
		  ['status' => 4, 'DESCRIP' => 'REJECT'],
		  ['status' => 1, 'DESCRIP' => 'PENDING'],		  
		  ['status' => 0, 'DESCRIP' => 'REPROCESS'],
		  ['status' => 101, 'DESCRIP' => 'APPROVED'],
	];	
	$valStt = ArrayHelper::map($arrayStt, 'status', 'DESCRIP');
?>

	<?php
		$form = ActiveForm::begin([
				'id'=>'auth2Mdl-ro',
				'enableClientValidation' => true,
				'enableAjaxValidation' => true,
				'method' => 'post',
				'action' => ['/purchasing/request-order/sign-auth2-save'],
		]);
	?>	
	
		<?php echo  $form->field($auth2Mdl, 'empNm')->textInput(['value' => $profile->emp->EMP_NM .' '. $profile->emp->EMP_NM_BLK ,'maxlength' => true, 'readonly' => true])->label('Employee Name')->label(false); ?>
		<?php echo  $form->field($auth2Mdl, 'kdro')->hiddenInput(['value' => $roHeader->KD_RO,'maxlength' => true, 'readonly' => true])->label(false); ?>
		<?php //echo  $form->field($auth2Mdl, 'status')->dropDownList($valStt); ?>
		<?php echo  $form->field($auth2Mdl, 'status')->hiddenInput(['value'=>102])->label(false); ?>
		<?php echo  $form->field($auth2Mdl, 'password')->textInput(['type'=>'password','maxlength' => true])->label('Password'); ?>
		<div style="text-align: right;"">
			<?php echo Html::submitButton('login',['class' => 'btn btn-primary']); ?>
		</div>

    
	<?php ActiveForm::end(); ?>	

	





