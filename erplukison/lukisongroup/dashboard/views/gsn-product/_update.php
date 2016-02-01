<?php

use yii\helpers\Html;
use kartik\form\ActiveForm;
use yii\helpers\ArrayHelper;
use lukisongroup\master\models\Unitbarang;
use lukisongroup\master\models\Distributor;
use lukisongroup\master\models\Barangmaxi;

use lukisongroup\master\models\Kategori;
use lukisongroup\master\models\Tipebarang;

use kartik\widgets\FileInput;

/* @var $this yii\web\View */
/* @var $model lukisongroup\models\master\Barang */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="barang-form">

    <?php $form = ActiveForm::begin([
			'type' => ActiveForm::TYPE_HORIZONTAL,
			'options' => ['enctype' => 'multipart/form-data']
		]); ?>

    <?= $form->field($model, 'NM_BARANG')->textInput(['maxlength' => true]) ?>

	<?php $drop = ArrayHelper::map(Tipebarang::find()->where(['STATUS' => 1])->all(), 'KD_TYPE', 'NM_TYPE'); ?>
    <?= $form->field($model, 'KD_TYPE')->dropDownList($drop,['prompt'=>' -- Pilih Salah Satu --'])->label('Type Barang') ?>
	
	<?php $drop = ArrayHelper::map(Kategori::find()->where(['STATUS' => 1])->all(), 'KD_KATEGORI', 'NM_KATEGORI'); ?>
    <?= $form->field($model, 'KD_KATEGORI')->dropDownList($drop,['prompt'=>' -- Pilih Salah Satu --'])->label('Kategori') ?>
	
	<?php $drop = ArrayHelper::map(Unitbarang::find()->all(), 'ID', 'NM_UNIT'); ?>
    <?= $form->field($model, 'KD_UNIT')->dropDownList($drop,['prompt'=>' -- Pilih Salah Satu --']) ?>
	
	<?php
		/* $drop = ArrayHelper::map(Distributor::find()->all(), 'KD_DISTRIBUTOR', 'NM_DISTRIBUTOR'); */
	?>
    <?php /* $form->field($model, 'KD_DISTRIBUTOR')->dropDownList($drop,['prompt'=>' -- Pilih Salah Satu --']) */ ?>

	<?php echo $form->field($model, 'image')->widget(FileInput::classname(), [
	'options'=>['accept'=>'image/*'],
	'pluginOptions'=>['allowedFileExtensions'=>['jpg','gif','png']]
	]);
	?>

    <?= $form->field($model, 'HPP')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'HARGA')->textInput() ?>

    <?= $form->field($model, 'BARCODE')->textInput() ?>

    <?= $form->field($model, 'NOTE')->textInput() ?>

    <?= $form->field($model, 'STATUS')->dropDownList(['' => ' -- Silahkan Pilih --', '0' => 'Tidak Aktif', '1' => 'Aktif']) ?>

    <?=  $form->field($model, 'UPDATED_AT')->hiddenInput(['value'=>Yii::$app->user->identity->username])->label(false)  //= $form->field($model, 'updateAt')->textInput() ?>

	<div class="form-group">
		<div class="col-sm-offset-2 col-sm-10">
			<?= Html::submitButton($model->isNewRecord ? 'Create' : '<i class="fa fa-pencil"></i>&nbsp;&nbsp;Ubah Barang', ['class' => $model->isNewRecord ? 'btn btn-success' : 'btn btn-primary']) ?>
		</div>
    </div>
    <?php ActiveForm::end(); ?>

</div>
