<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;
use yii\helpers\ArrayHelper;

/* @var $this yii\web\View */
/* @var $model lukisongroup\master\models\Kategoricus */
/* @var $form yii\widgets\ActiveForm */


?>





<div class="kategoricus-form">

    <?php $form = ActiveForm::begin([
	  'id'=>'createform',
      'enableClientValidation' => true,
	
	]); ?>

  

    <?= $form->field($model, 'CUST_KTG_NM')->textInput(['maxlength' => true])->label('Nama Parent') ?>
	
	
	  <?= $form->field($model, 'STATUS')->dropDownList(['' => ' -- Silahkan Pilih --', '0' => 'Tidak Aktif', '1' => 'Aktif']) ?>

    <div class="form-group">
        <?= Html::submitButton($model->isNewRecord ? 'Create' : 'Update', ['class' => $model->isNewRecord ? 'btn btn-success' : 'btn btn-primary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>





