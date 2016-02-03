<?php

use yii\helpers\Html;
use yii\grid\GridView;
use yii\widgets\Pjax;
/* @var $this yii\web\View */
/* @var $searchModel backend\models\MasterBarangSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Master Barangs';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="master-barang-index">

    <h1><?= Html::encode($this->title) ?></h1>
    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <p>
        <?= Html::a('Create Master Barang', ['create'], ['class' => 'btn btn-success']) ?>
    </p>
<?php Pjax::begin(); ?>    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            'ID',
            'KD_BARANG',
            'NM_BARANG',
            'KD_TYPE',
            'KD_KATEGORI',
            // 'KD_UNIT',
            // 'KD_SUPPLIER',
            // 'KD_DISTRIBUTOR',
            // 'PARENT',
            // 'HPP',
            // 'HARGA',
            // 'BARCODE',
            // 'IMAGE',
            // 'NOTE:ntext',
            // 'KD_CORP',
            // 'KD_CAB',
            // 'KD_DEP',
            // 'STATUS',
            // 'CREATED_BY',
            // 'CREATED_AT',
            // 'UPDATED_BY',
            // 'UPDATED_AT',
            // 'DATA_ALL:ntext',
            // 'CORP_ID',

            ['class' => 'yii\grid\ActionColumn'],
        ],
    ]); ?>
<?php Pjax::end(); ?></div>
