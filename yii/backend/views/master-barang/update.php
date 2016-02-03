<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model backend\models\MasterBarang */

$this->title = 'Update Master Barang: ' . ' ' . $model->ID;
$this->params['breadcrumbs'][] = ['label' => 'Master Barangs', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->ID, 'url' => ['view', 'ID' => $model->ID, 'KD_BARANG' => $model->KD_BARANG]];
$this->params['breadcrumbs'][] = 'Update';
?>
<div class="master-barang-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
