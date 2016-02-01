<?php
use kartik\icons\Icon;
use kartik\tabs\TabsX;
use kartik\grid\GridView;
use yii\helpers\ArrayHelper;
use kartik\rating\StarRating;
use kartik\builder\Form;
use lukisongroup\widget\models\Pilotproject;
use kartik\helpers\Html;
use lukisongroup\assets\AppAssetChart;  	/* CLASS ASSET CSS/JS/THEME Author: -ptr.nov-*/
AppAssetChart::register($this);

/* AUTHOR -ptr.nov- GANTT VS API AJAX Request */
$this->registerJs('FusionCharts.ready(function () {
		var  jsonData= $.ajax({
          //url: "http://api.lukisongroup.int/chart/pilotps?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa",
		  url: "http://api.lukisongroup.com/chart/pilotps?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa",
		  type: "GET",
          dataType:"json",
		  //data:"id_user='. Yii::$app->user->identity->id . '",
          data:"id_user=0",
          async: false
          }).responseText;		  
		  var myData = jsonData;
		  
		var chart = new FusionCharts({
			type: "gantt",
			renderAt: "chart-container",
			width: "100%",
			height: "600",
			dataFormat: "json",
			dataSource: myData
		})
		.render();
	});
',$this::POS_READY);
	
	/* AUTHOR -ptr.nov- GRIDVIEW PILOT*/
	$gv_pilot= GridView::widget([
		'id'=>'gv-pilot',
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,		
	    'columns' => [
            ['class' => 'yii\grid\SerialColumn'],
            [
				 'label'=>'Header',
				 'attribute'=>'SORT',
				 'value'=>function ($model, $key, $index, $widget) { 
					$Proj_sort = Pilotproject::find()->where(['ID'=>$model->SORT])->one();
					return $Proj_sort->PILOT_NM;
				},
				'filter'=>ArrayHelper::map(Pilotproject::find()->where('ID=SORT')->asArray()->all(), 'ID', 'PILOT_NM'),
				'group'=>true,
			],
			[
				'label'=>'Sechedule',
				'attribute'=>'PILOT_NM',
			],
		    [
				'attribute'=>'PLAN_DATE1',
				'filterType'=> GridView::FILTER_DATE,
			],
		    [
				'attribute'=>'PLAN_DATE2',
				'filterType'=> GridView::FILTER_DATE,
			],
			[
				'attribute'=>'BOBOT',
				'format' => 'Html',
				'value'=>function ($model, $key, $index, $widget) {
							return StarRating::widget([ 'name' => 'rating_1',]);
						},
						
				
			],
		    [
				'attribute'=>'ACTUAL_DATE1',
				'filterType'=> GridView::FILTER_DATE,
			],
		    [
				'attribute'=>'ACTUAL_DATE2',
				'filterType'=> GridView::FILTER_DATE,
			],
		    [
				'label'=>'Discription',
				'attribute'=>'DSCRP',
				'mergeHeader'=>true,
				'value'=>function ($model, $key, $index, $widget) {
					if ($model->DSCRP <>'') {
						return substr($model->DSCRP , 0, 30) . ' ...'; //Author -ptr.nov- limit disply text 
					} else {
						return '';
					}
				}			
			],
			[
				'label'=>'Status',
				'attribute'=>'STATUS',	
				'format' => 'html', 
				'hAlign'=>'center',
				'value'=>function($model){
                           if ($model->STATUS == 0) {
								return Html::a('<i class="fa fa-edit"></i> &nbsp;&nbsp;&nbsp;&nbsp;Open', '',['class'=>'btn btn-success btn-sm', 'title'=>'Open']);
							} else if ($model->STATUS == 1) {
								return Html::a('<i class="fa fa-close"></i> &nbsp;&nbsp;&nbsp;&nbsp;Close', '',['class'=>'btn btn-danger btn-sm', 'title'=>'Closing']);
							} 
                        },
				'filter'=>['0'=>'Open','1'=>'Close'],	 //Author -ptr.nov Manual Filter value			
			],
            [
				'class' => 'yii\grid\ActionColumn',
				'header'=>'Action',			
			],
        ],
		/*
		'beforeHeader'=>[
			[
				'columns'=>[
					['content'=>'Header Before 1', 'options'=>['colspan'=>5, 'class'=>'text-center warning']], 
					['content'=>'Header Before 2', 'options'=>['colspan'=>3, 'class'=>'text-center warning']], 
					['content'=>'Header Before 3', 'options'=>['colspan'=>3, 'class'=>'text-center warning']], 
				],
				'options'=>['class'=>'skip-export'] // remove this row from export
			]
		],
		*/
		//'floatHeaderOptions'=>50,
		'pjax'=>true,
        'pjaxSettings'=>[
            'options'=>[
                'enablePushState'=>false,
                'id'=>'gv-pilot',                
               ],
        ],
		'toolbar'=> [
			['content'=>
				Html::button('<i class="glyphicon glyphicon-plus"></i>', ['type'=>'button', '', 'class'=>'btn btn-success', 'onclick'=>'alert("This will launch the book creation form.\n\nDisabled for this demo!");']) .' ' .
				Html::a('<i class="glyphicon glyphicon-repeat"></i>', ['grid-demo'], ['data-pjax'=>0, 'class'=>'btn btn-default', ''])
			],
			'{export}',
			'{toggleData}',
		],
		'panel'=>['type'=>'info', 'heading'=>'Pilot Project'],
		'hover'=>true, //cursor select
		'responsive'=>true,
		//'responsiveWrap'=>true,
		'bordered'=>true,
		'striped'=>true,
		'autoXlFormat'=>true,
		'export'=>[//export like view grid --ptr.nov-
			'fontAwesome'=>true,
			'showConfirmAlert'=>false,
			//'target'=>GridView::TARGET_BLANK
		],
    ]); 
	
	
	/* AUTHOR -ptr.nov- Render ID GANTT PILOT PROJECT*/
	$dsp='
	<div class="row">
	<div class="col-sm-12" id="chart-container">FusionCharts will render here</div>
	
	</div>
	';
	
	
	/* AUTHOR -ptr.nov- ITEM TABs */
	$items=[
		[
			'label'=>'<i class="glyphicon glyphicon-home"></i> Pilot Schedule Data','content'=>$gv_pilot,
			//'active'=>true,

		],		
		[
			'label'=>'<i class="glyphicon glyphicon-home"></i> Pilot Schedule Preview','content'=>$dsp,
		],		
	];

	/* AUTHOR -ptr.nov- TAB Widget*/
	echo TabsX::widget([
		'items'=>$items,
		'position'=>TabsX::POS_ABOVE,
		//'height'=>'tab-height-xs',
		'bordered'=>true,
		'encodeLabels'=>false,
		//'align'=>TabsX::ALIGN_LEFT,

	]);
	

?>

