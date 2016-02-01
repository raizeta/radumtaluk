<?php
use yii\helpers\Html;
use yii\bootstrap\ActiveForm;

$profile=Yii::$app->getUserOpt->Profile_user();
//echo  $profile->emp->EMP_ID;
?>
	<?php
		$form = ActiveForm::begin([
				'id'=>'password-utama-login',
				'enableClientValidation' => true,
				'enableAjaxValidation' => true,
				'method' => 'post',
				'action' => ['/sistem/user-profile/password-utama-save'],
		]);
	?>	
		<?php //echo  $form->field($model, 'EMP_NM')->textInput(['value' => $profile->emp->EMP_NM .' '. $profile->emp->EMP_NM_BLK ,'maxlength' => true, 'readonly' => true])->label('Employee Name'); ?>
		<?php echo  $form->field($validationFormLogin, 'oldpassword')->textInput(['type'=>'password','maxlength' => true])->label('Old Password'); ?>
		<?php echo  $form->field($validationFormLogin, 'password')->textInput(['type'=>'password','maxlength' => true])->label('Password'); ?>
		<?php echo  $form->field($validationFormLogin, 'repassword')->textInput(['type'=>'password','maxlength' => true])->label('Re-Password'); ?>
		<div style="text-align: right;"">
			<?php echo Html::submitButton('Saved',['class' => 'btn btn-primary']); ?>
		</div>   

	<?php ActiveForm::end(); ?>	
