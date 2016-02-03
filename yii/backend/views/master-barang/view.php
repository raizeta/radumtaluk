<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/* @var $this yii\web\View */
/* @var $model backend\models\MasterBarang */

$this->title = $model->ID;
$this->params['breadcrumbs'][] = ['label' => 'Master Barangs', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="master-barang-view">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Update', ['update', 'ID' => $model->ID, 'KD_BARANG' => $model->KD_BARANG], ['class' => 'btn btn-primary']) ?>
        <?= Html::a('Delete', ['delete', 'ID' => $model->ID, 'KD_BARANG' => $model->KD_BARANG], [
            'class' => 'btn btn-danger',
            'data' => [
                'confirm' => 'Are you sure you want to delete this item?',
                'method' => 'post',
            ],
        ]) ?>
    </p>

    <?= DetailView::widget([
        'model' => $model,
        'attributes' => [
            'ID',
            'KD_BARANG',
            'NM_BARANG',
            'KD_TYPE',
            'KD_KATEGORI',
            'KD_UNIT',
            'KD_SUPPLIER',
            'KD_DISTRIBUTOR',
            'PARENT',
            'HPP',
            'HARGA',
            'BARCODE',
            'IMAGE',
            'NOTE:ntext',
            'KD_CORP',
            'KD_CAB',
            'KD_DEP',
            'STATUS',
            'CREATED_BY',
            'CREATED_AT',
            'UPDATED_BY',
            'UPDATED_AT',
            'DATA_ALL:ntext',
            'CORP_ID',
        ],
    ]) ?>

</div>
