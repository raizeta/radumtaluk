<?php

use yii\helpers\Html;
use kartik\grid\GridView;
use yii\bootstrap\Modal;
use yii\helpers\Url;

/* @var $this yii\web\View */
/* @var $searchModel lukisongroup\backs\models\PostingSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->sideMenu = 'umum_adminweb'; 
$this->title = 'Postings';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="posting-index">

 <?php
            $gridColumns = [


            ['class' => 'yii\grid\SerialColumn'],
            'ParentsName',
            'JUDUL', 
            
             [
            'class' => 'yii\grid\ActionColumn',
                'template' => '{update}{delete}',
                        'header'=>'Action',
                        'buttons' => [
                         
                            'update' =>function($url, $model, $key){
                                    return  Html::a('<button type="button" class="btn btn-primary btn-xs" style="width:50px; margin-left:25px">update </button>',
                                                                ['update','ID'=>$model->ID],[
                                                                'data-toggle'=>"modal",
                                                                'data-target'=>"#modal-update-posting",
                                                                'data-title'=> $model->ID,
                                                                ]);
                            },
                            'delete' =>function($url, $model, $key){
                                    return  Html::a('<button type="button" class="btn btn-danger btn-xs" style="width:50px; margin-left:25px">delete </button>',
                                                                ['delete','ID'=>$model->ID],[
                                                                'data-toggle'=>"modal",
                                                                'data-target'=>"#delete-posting",
                                                                'data-title'=> $model->ID,
                                                                ]);
                            },
                ],
                      
                
            ],
            ];


            ?>
            <?= $grid = GridView::widget([
            'dataProvider'=> $dataProvider,
            'filterModel' => $searchModel,
            'columns' => $gridColumns,
            'pjax'=>true,
            'pjaxSettings'=>[
				'options'=>[
					'enablePushState'=>false,
					'id'=>'activekat',
				],
            ],
            'toolbar' => [
				'{export}',
            ],
            'panel' => [
				'heading'=>'<h3 class="panel-title">'. Html::encode($this->title).'</h3>',
				'type'=>'warning',
				'before'=> Html::a('<i class="glyphicon glyphicon-plus"></i> '.Yii::t('app', 'Tambah Posting ',
				['modelClass' => 'posting',]),'/front/back-posting/create',[
					'data-toggle'=>"modal",
					'data-target'=>"#modal-create-posting",                            
					'class' => 'btn btn-success'                        
				]),
				'showFooter'=>false,
            ],      

            'export' =>['target' => GridView::TARGET_BLANK],
            'exportConfig' => [
            GridView::PDF => [ 'filename' => 'kategori'.'-'.date('ymdHis') ],
            GridView::EXCEL => [ 'filename' => 'kategori'.'-'.date('ymdHis') ],
            ],
            ]);
            ?>
<?php
$this->registerJs("
         $('#modal-create-posting').on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget)
            var modal = $(this)
            var title = button.data('title') 
            var href = button.attr('href') 
            //modal.find('.modal-title').html(title)
            modal.find('.modal-body').html('<i class=\"fa fa-spinner fa-spin\"></i>')
            $.post(href)
                .done(function( data ) {
                    modal.find('.modal-body').html(data)
                });
            })
    ",$this::POS_READY);
$this->registerJs("
         $('#modal-view-posting').on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget)
            var modal = $(this)
            var title = button.data('title') 
            var href = button.attr('href') 
            //modal.find('.modal-title').html(title)
            modal.find('.modal-body').html('<i class=\"fa fa-spinner fa-spin\"></i>')
            $.post(href)
                .done(function( data ) {
                    modal.find('.modal-body').html(data)
                });
            })
    ",$this::POS_READY);   
    $this->registerJs("
         $('#modal-update-posting').on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget)
            var modal = $(this)
            var title = button.data('title') 
            var href = button.attr('href') 
            //modal.find('.modal-title').html(title)
            modal.find('.modal-body').html('<i class=\"fa fa-spinner fa-spin\"></i>')
            $.post(href)
                .done(function( data ) {
                    modal.find('.modal-body').html(data)
                });
            })
    ",$this::POS_READY);  
    $this->registerJs("
        $('#delete-posting').on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget)
            var modal = $(this)
            var title = button.data('title') 
            var href = button.attr('href') 
            //modal.find('.modal-title').html(title)
            modal.find('.modal-body').html('<i class=\"fa fa-spinner fa-spin\"></i>')
            $.post(href)
                .done(function( data ) {
                    modal.find('.modal-body').html(data)
                });
            })
    ",$this::POS_READY);
    Modal::begin([
        'id' => 'modal-create-posting',
        'header' => '<h4 class="modal-title">LukisonGroup</h4>',
    ]);
    Modal::end();
   Modal::begin([
        'id' => 'modal-view-posting',
        'header' => '<h4 class="modal-title">LukisonGroup</h4>',
    ]);
    Modal::end();
    Modal::begin([
        'id' => 'modal-update-posting',
        'header' => '<h4 class="modal-title">LukisonGroup</h4>',
    ]);
    Modal::end();
     Modal::begin([
        'id' => 'delete-posting',
        
    ]);
    Modal::end();
    
      
     
?>





</div>

</div>
