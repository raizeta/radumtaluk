<?php

use yii\helpers\Html;


/* @var $this yii\web\View */
/* @var $model backend\models\MasterBarang */

$this->title = 'Create Master Barang';
$this->params['breadcrumbs'][] = ['label' => 'Master Barangs', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="master-barang-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
