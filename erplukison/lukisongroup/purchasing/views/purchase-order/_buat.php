<?php

use yii\helpers\Html;
use yii\bootstrap\Modal;
use yii\widgets\ActiveForm;
use kartik\detail\DetailView;
use yii\helpers\Url;
use yii\helpers\ArrayHelper;
//use kartik\editable\Editable;
use kartik\grid\GridView;
use kartik\tabs\TabsX;
use kartik\money\MaskMoney;

use lukisongroup\purchasing\models\ro\Requestorder;
use lukisongroup\purchasing\models\ro\Rodetail;
use lukisongroup\purchasing\models\ro\RodetailSearch;
use lukisongroup\master\models\Unitbarang;

/*  $this->registerJs('
		$(document).ready(function($) {
			// Data Signature1 from DB 
			var po_datadb1 =\''. $poHeader->SIG1_SVGBASE64 . '\'
				var h = new Image();							
					h.src = ro_datadb1
					$(h).appendTo($("#po-process-sig1"));
			// Data Signature2 from DB 
			var po_datadb2 =\''. $poHeader->SIG2_SVGBASE64 . '\'
				var j = new Image();							
					j.src = ro_datadb2
					$(j).appendTo($("#po-process-sig2"));	
			var po_datadb3 =\''. $poHeader->SIG2_SVGBASE64 . '\'
				var j = new Image();							
					j.src = ro_datadb3
					$(j).appendTo($("#po-process-sig3"));
		});		
 ',$this::POS_BEGIN);		 */
	
	/*
	 * LINK ETD
	 * _Buat = GET permission ETD
	 * @author ptrnov  <piter@lukison.com>
     * @since 1.2
	*/
	function link_etd($poHeader){
		$ttlEtd=$poHeader->ETD!=0? $poHeader->ETD:'---- -- --';
		$title = Yii::t('app',$ttlEtd);
		$options = [ 'id'=>'po-etd',	
					  'data-toggle'=>'modal',
					  'data-target'=>'#frm-etd',				 
					  'title'=>'Estimate Time Delivery'
		]; 
		$url = Url::toRoute(['/purchasing/purchase-order/etd-view','kdpo'=>$poHeader->KD_PO]);
		//$options1['tabindex'] = '-1';
		$content = Html::a($title,$url, $options);
		return $content;	
	} 
	
	/*
	 * LINK ETA
	 * _Buat = GET permission ETA
	 * @author ptrnov  <piter@lukison.com>
     * @since 1.2
	*/
	function link_eta($poHeader){
		$ttlEta=$poHeader->ETA!=0? $poHeader->ETA:'---- -- --';
		$title = Yii::t('app',$ttlEta);
		$options = [ 'id'=>'po-eta',	
					  'data-toggle'=>'modal',
					  'data-target'=>'#frm-eta',				 
					  'title'=>'Estimate Time Arriver'
		]; 
		$url = Url::toRoute(['/purchasing/purchase-order/eta-view','kdpo'=>$poHeader->KD_PO]);
		//$options1['tabindex'] = '-1';
		$content = Html::a($title,$url, $options);
		return $content;	
	} 
	
	/*
	 * LINK BUTTON SELECT SUPPLIER
	 * @author ptrnov  <piter@lukison.com>
     * @since 1.2
	*/
	function SupplierSearch($poHeader){
		$title = Yii::t('app','');
		$options = [ 'id'=>'select-spl-id',	
					  'data-toggle'=>"modal",
					  'data-target'=>"#search-spl",											
					  'class'=>'btn btn-warning btn-xs', 
					  //'style'=>['width'=>'150px'],
					  'title'=>'Set Supplier'
		]; 
		$icon = '<span class="glyphicon glyphicon-open"></span>';
		$label = $icon . ' ' . $title;
		$url = Url::toRoute(['/purchasing/purchase-order/supplier-view','kdpo'=>$poHeader->KD_PO]);
		$content = Html::a($label,$url, $options);
		return $content;	
	} 
	
	/*
	 * LINK BUTTON SELECT SHIPPLING
	 * @author ptrnov  <piter@lukison.com>
     * @since 1.2
	*/
	function ShippingSearch($poHeader){
		$title = Yii::t('app','');
		$options = [ 'id'=>'select-shp-id',	
					  'data-toggle'=>"modal",
					  'data-target'=>"#search-shp",											
					  'class'=>'btn btn-info btn-xs', 
					  //'style'=>['width'=>'150px'],
					  'title'=>'Set Shipping'
		]; 
		$icon = '<span class="glyphicon glyphicon-save"></span>';
		$label = $icon . ' ' . $title;
		$url = Url::toRoute(['/purchasing/purchase-order/shipping-view','kdpo'=>$poHeader->KD_PO]);
		$content = Html::a($label,$url, $options);
		return $content;	
	} 
	
	/*
	 * LINK BUTTON SELECT BILLING
	 * @author ptrnov  <piter@lukison.com>
     * @since 1.2
	*/
	function BillingSearch($poHeader){
		$title = Yii::t('app','');
		$options = [ 'id'=>'select-bil-id',	
					  'data-toggle'=>"modal",
					  'data-target'=>"#search-bil",											
					  'class'=>'btn btn-info btn-xs', 
					  //'style'=>['width'=>'150px'],
					  'title'=>'Set Billing'
		]; 
		$icon = '<span class="glyphicon glyphicon-import"></span>';
		$label = $icon . ' ' . $title;
		$url = Url::toRoute(['/purchasing/purchase-order/billing-view','kdpo'=>$poHeader->KD_PO]);
		$content = Html::a($label,$url, $options);
		return $content;	
	} 
	
	
	/*
	 * LINK PO PLUS
	 * @author ptrnov  <piter@lukison.com>
     * @since 1.2
	*/
	function PoPlus($poHeader){
		$kdPo = explode('.',$poHeader->KD_PO);
		if($kdPo[0]=='POA'){
			$title = Yii::t('app','');
			$options = [ 'id'=>'po-plus-id',	
						  'data-toggle'=>"modal",
						  'data-target'=>"#po-plus",											
						  'class'=>'btn btn-info btn-xs', 
						  //'style'=>['width'=>'150px'],
						  'title'=>'PO PLUS'
			]; 
			$icon = '<span class="fa fa-plus fa-lg"></span>';
			$label = $icon . ' ' . $title;
			$url = Url::toRoute(['/purchasing/purchase-order/po-plus-additem-view','kdpo'=>$poHeader->KD_PO]);
			$content = Html::a($label,$url, $options);
			return $content;
		}else{
			$content = '';
			return $content;
		}
	} 
	
	/*
	 * LINK VIEW PO
	 * @author ptrnov  <piter@lukison.com>
     * @since 1.2
	*/
	function PoView($poHeader){
			$title = Yii::t('app','View');
			$options = [ 'id'=>'po-view-id',	
						  'class'=>'btn btn-default btn-xs', 
						  'title'=>'View PO'
			]; 
			$icon = '<span class="glyphicon glyphicon-zoom-in"></span>';
			$label = $icon . ' ' . $title;
			$url = Url::toRoute(['/purchasing/purchase-order/view','kd'=>$poHeader->KD_PO]);
			$content = Html::a($label,$url, $options);
			return $content;
	} 
	
	/*
	 * LINK PRINT PDF
	 * @author ptrnov  <piter@lukison.com>
     * @since 1.2
	*/
	function PrintPdf($poHeader){
			$title = Yii::t('app','Print');
			$options = [ 'id'=>'pdf-print-id',	
						  'class'=>'btn btn-default btn-xs', 
						  'title'=>'Print PDF'
			]; 
			$icon = '<span class="fa fa-print fa-fw"></span>';
			$label = $icon . ' ' . $title;
			$url = Url::toRoute(['/purchasing/purchase-order/cetakpdf','kdpo'=>$poHeader->KD_PO]);
			$content = Html::a($label,$url, $options);
			return $content;
	} 
	
	/*
	 * LINK PRINT PDF
	 * @author ptrnov  <piter@lukison.com>
     * @since 1.2
	*/
	function PrintPdf_TMP($poHeader){
			$title = Yii::t('app','Temp Print');
			$options = [ 'id'=>'pdf-print-id',	
						  'class'=>'btn btn-default btn-xs', 
						  'title'=>'Print PDF'
			]; 
			$icon = '<span class="fa fa-print fa-fw"></span>';
			$label = $icon . ' ' . $title;
			$url = Url::toRoute(['/purchasing/purchase-order/temp-cetakpdf','kdpo'=>$poHeader->KD_PO]);
			$content = Html::a($label,$url, $options);
			return $content;
	} 
	/*
	 * LINK PO Note
	 * @author ptrnov  <piter@lukison.com>
     * @since 1.2
	*/
	function PoNote($poHeader){
			$title = Yii::t('app','');
			$options = [ 'id'=>'po-note-id',	
						  'data-toggle'=>"modal",
						  'data-target'=>"#po-note",											
						  'class'=>'btn btn-info btn-xs', 
						  //'style'=>['width'=>'150px'],
						  'title'=>'PO PLUS'
			]; 
			$icon = '<span class="fa fa-plus fa-lg"></span>';
			$label = $icon . ' ' . $title;
			$url = Url::toRoute(['/purchasing/purchase-order/po-note','kdpo'=>$poHeader->KD_PO]);
			$content = Html::a($label,$url, $options);
			return $content;
	} 
	
	/*
	 * COLUMN GRID VIEW CREATE PO
	 * @author ptrnov  <piter@lukison.com>
     * @since 1.1
     */
	$gridColumns = [
		[/* Attribute Serial No */
			'class'=>'kartik\grid\SerialColumn',
			'width'=>'10px',
			'header'=>'No.',
			'hAlign'=>'center',
			'headerOptions'=>[
				'style'=>[
					'text-align'=>'center',
					'width'=>'10px',
					'font-family'=>'tahoma',
					'font-size'=>'8pt',
					'background-color'=>'rgba(0, 95, 218, 0.3)',							
				]
			],
			'contentOptions'=>[
				'style'=>[
					'text-align'=>'center',
					'width'=>'10px',
					'font-family'=>'tahoma',
					'font-size'=>'8pt',								
				]
			], 
			'pageSummaryOptions' => [
				'style'=>[
						'border-right'=>'0px',									
				]
			]
		],	
		/* [
			'attribute'=>'KD_PO',
			'hidden'=>true,
			'group'=>false,
			'groupFooter'=>function ($model, $key, $index, $widget) {
				$subttl=[
					 'mergeColumns'=>[[1,5]],
					  'content'=>[             // content to show in each summary cell
                        1=>'Summary',
                        6=>GridView::F_SUM,
                    ],
				 ];
				return $subttl;
			},

		], */
		
		[/* Attribute Items Barang */
			'attribute'=>'KD_BARANG',
			'label'=>'SKU',						
			'hAlign'=>'left',	
			'vAlign'=>'middle',
			'mergeHeader'=>true,
			'format' => 'raw',	
			'headerOptions'=>[
				//'class'=>'kartik-sheet-style'							
				'style'=>[
					'text-align'=>'center',
					'width'=>'150px',
					'font-family'=>'tahoma',
					'font-size'=>'8pt',
					'background-color'=>'rgba(0, 95, 218, 0.3)',								
				]
			],
			'contentOptions'=>[
				'style'=>[
					'width'=>'150px',
					'font-family'=>'tahoma',
					'font-size'=>'8pt',								
				]
			], 
			'pageSummaryOptions' => [
				'style'=>[
						'border-left'=>'0px',
						'border-right'=>'0px',									
				]
			]
		],
		[/* Attribute Items Barang */
			'label'=>'Items Name',
			'attribute'=>'NM_BARANG',
			'hAlign'=>'left',	
			'vAlign'=>'middle',
			'mergeHeader'=>true,
			'format' => 'raw',	
			'headerOptions'=>[
				//'class'=>'kartik-sheet-style'							
				'style'=>[
					'text-align'=>'center',
					'width'=>'200px',
					'font-family'=>'tahoma',
					'font-size'=>'8pt',
					'background-color'=>'rgba(0, 95, 218, 0.3)',								
				]
			],
			'contentOptions'=>[
				'style'=>[
					'width'=>'200px',
					'font-family'=>'tahoma',
					'font-size'=>'8pt',								
				]
			], 
			'pageSummaryOptions' => [
				'style'=>[
						'border-left'=>'0px',
						'border-right'=>'0px',									
				]
			]
		],
		[/* Attribute Request Quantity */
			'class'=>'kartik\grid\EditableColumn',
			'attribute'=>'QTY',
			'label'=>'Qty',						
			'vAlign'=>'middle',
			'hAlign'=>'center',	
			'mergeHeader'=>true,
			'headerOptions'=>[
				'style'=>[
					'text-align'=>'center',
					'width'=>'60px',
					'font-family'=>'tahoma',
					'font-size'=>'8pt',
					'background-color'=>'rgba(0, 95, 218, 0.3)',								
				]
			],
			'contentOptions'=>[
				'style'=>[
						'text-align'=>'right',
						'width'=>'60px',
						'font-family'=>'tahoma',
						'font-size'=>'8pt',
						//'border-right'=>'0px',
				]
			],
			'pageSummaryOptions' => [
				'style'=>[
						'border-left'=>'0px',
						'border-right'=>'0px',									
				]
			],
			'editableOptions' => [
				'header' => 'Update Quantity',
				'inputType' => \kartik\editable\Editable::INPUT_TEXT,
				'size' => 'sm',	
				'options' => [
				  'pluginOptions' => ['min'=>0, 'max'=>50000]
				]
			],	
		],					
		[/* Attribute Unit Barang */
			'class'=>'kartik\grid\EditableColumn',
			'attribute'=>'UNIT',
			'mergeHeader'=>true,
			'label'=>'UoM',											
			'vAlign'=>'middle',	
			'hAlign'=>'right',	
			'readonly'=>function($model, $key, $index, $widget) use ($poHeader) {
				//return (102=$model->STATUS || 0<> $headerStatus); // Allow Status Process = 0;
				return (102==$poHeader->STATUS); // Allow Status Process = 0;
			},
			'value'=>function($model){
								$model=Unitbarang::find()->where('KD_UNIT="'.$model->UNIT. '"')->one();
								if (count($model)!=0){
									$UnitNm=$model->NM_UNIT;
								}else{
									$UnitNm='Not Set';
								}
								return $UnitNm;
							},
			'editableOptions' => [
				'header' => 'Update Unit',
				'inputType' => \kartik\editable\Editable::INPUT_SELECT2,		
				'size' => 'md',								
				'options' => [			
					'data' => ArrayHelper::map(Unitbarang::find()->orderBy('NM_UNIT')->all(), 'KD_UNIT', 'NM_UNIT'),								
					'pluginOptions' => [
						//'min'=>0, 
						//'max'=>5000,
						'allowClear' => true,
						'class'=>'pull-top dropup'
					],
				],
				//Refresh Display 
				'displayValueConfig' =>ArrayHelper::map(Unitbarang::find()->orderBy('NM_UNIT')->all(), 'KD_UNIT', 'NM_UNIT'),
			],	
			'headerOptions'=>[
				'style'=>[
					'text-align'=>'center',
					'width'=>'150px',
					'font-family'=>'tahoma',
					'font-size'=>'8pt',
					'background-color'=>'rgba(0, 95, 218, 0.3)',								
				]
			],						
			'contentOptions'=>[
				'style'=>[
						'text-align'=>'left',		
						'width'=>'150px',
						'font-family'=>'tahoma',
						'font-size'=>'8pt',	
						'border-left'=>'0px',									
				]
			],	
			'pageSummaryOptions' => [
				'style'=>[
						'border-left'=>'0px',
						'border-right'=>'0px',									
				]
			],
			'pageSummary'=>function ($summary, $data, $widget){ 
							return 	'<div>Sub Total :</div>								
									<div>Discount :</div>
									<div>TAX :</div>
									<div>Delevery.Cost :</div>
									<div><b>GRAND TOTAL :</b></div>'; 
						},
			'pageSummaryOptions' => [
				'style'=>[
						'font-family'=>'tahoma',
						'font-size'=>'8pt',	
						'text-align'=>'right',
						'border-left'=>'0px',
						'border-right'=>'0px',						
				]
			],			
		],
		[	/* Attribute Unit Barang */
			'class'=>'kartik\grid\EditableColumn',
			'attribute'=>'HARGA',
			'mergeHeader'=>true,
			'label'=>'Price',										
			'vAlign'=>'middle',	
			'hAlign'=>'right',	
			'headerOptions'=>[
				//'class'=>'kartik-sheet-style'							
				'style'=>[
					'text-align'=>'center',
					'width'=>'100px',
					'font-family'=>'tahoma',
					'font-size'=>'8pt',
					'background-color'=>'rgba(0, 95, 218, 0.3)',								
				]
			],						
			'contentOptions'=>[
				'style'=>[
						'text-align'=>'right',		
						'width'=>'100px',
						'font-family'=>'tahoma',
						'font-size'=>'8pt',									
				]
			],
			'editableOptions' => [
				'header' => 'Update Price',
				'inputType' => \kartik\editable\Editable::INPUT_TEXT,
				'size' => 'sm',	
				 'options' => [
				  'pluginOptions' => ['min'=>0, 'max'=>10000000000]
				] 
			],	
			'format'=>['decimal', 2],
			'pageSummary'=>function ($summary, $data, $widget) use ($poHeader){ 
							$discountModal=$poHeader->DISCOUNT!=0 ? $poHeader->DISCOUNT:'0.00';
							$pajakModal=$poHeader->PAJAK!=0 ? $poHeader->PAJAK:'0.00';							
							return '<div>IDR</div >
									<div>  
									'.Html::a($discountModal,Url::toRoute(['/purchasing/purchase-order/discount-view','kdpo'=>$poHeader->KD_PO]),['id'=>'discount','data-toggle'=>'modal','data-target'=>'#frm-discount']).'
									%</div >
									<div>  
									'.Html::a($pajakModal,Url::toRoute(['/purchasing/purchase-order/pajak-view','kdpo'=>$poHeader->KD_PO]),['id'=>'pajak','data-toggle'=>'modal','data-target'=>'#frm-pajak']).'
									%</div >
									<div>IDR</div >									
									<div>IDR</div >';								
									
						},
			'pageSummaryOptions' => [
				'style'=>[
						'font-family'=>'tahoma',
						'font-size'=>'8pt',	
						'text-align'=>'right',
						'border-left'=>'0px',																
				]
			],
		],
		[
			'class'=>'kartik\grid\FormulaColumn', 
			'header'=>'Amount', 
			'mergeHeader'=>true,
			'vAlign'=>'middle',
			'hAlign'=>'right', 
			//'width'=>'7%',					
			'value'=>function ($model, $key, $index, $widget) { 
				$p = compact('model', 'key', 'index');
				return $widget->col(3, $p) != 0 ? $widget->col(3, $p) * $model->UNIT_QTY  * $widget->col(5, $p) : 0;
				//return $widget->col(3, $p) != 0 ? $widget->col(5 ,$p) * 100 / $widget->col(3, $p) : 0;
			},						
			'headerOptions'=>[
				//'class'=>'kartik-sheet-style'							
				'style'=>[
					'text-align'=>'center',
					'width'=>'150px',
					'font-family'=>'tahoma',
					'font-size'=>'8pt',
					'background-color'=>'rgba(0, 95, 218, 0.3)',								
				]
			],	
			'contentOptions'=>[
				'style'=>[
						'text-align'=>'right',		
						'width'=>'150px',
						'font-family'=>'tahoma',
						'font-size'=>'8pt',									
				]
			],	
			'pageSummaryFunc'=>GridView::F_SUM,
			'pageSummary'=>true,
			'format'=>['decimal', 2],
			'pageSummary'=>function ($summary, $data, $widget) use ($poHeader)	{	
					/*
					 * Calculate SUMMARY TOTAL
					 * @author ptrnov  <piter@lukison.com>
					 * @since 1.1
					 */
					$subTotal=$summary!=''? $summary : 0.00; 
					
					$ttlDiscount=$poHeader->DISCOUNT!=0 ? ($poHeader->DISCOUNT/100) * $subTotal:0.00;
					$ttlTax = $poHeader->PAJAK!=0 ? ($poHeader->PAJAK / 100) * $subTotal  :0.00;
					$ttlDelivery=$poHeader->DELIVERY_COST!=0 ? $poHeader->DELIVERY_COST:0.00;
					$grandTotal=($subTotal + $ttlTax + $ttlDelivery) - $ttlDiscount;
					
					/*SEND TO DECIMAL*/
					$ttlSubtotal=number_format($subTotal,2);
					$ttlDiscountF=number_format($ttlDiscount,2);
					$ttlTaxF=number_format($ttlTax,2);
					$ttlDeliveryF=number_format($ttlDelivery,2);
					$grandTotalF=number_format($grandTotal,2);
					/*
					 * DISPLAY SUMMARY TOTAL
					 * LINK Modal Editing Discount | tax
					 * @author ptrnov  <piter@lukison.com>
					 * @since 1.1
					 */
					return '<div>'.$ttlSubtotal.'</div>
						<div>'.$ttlDiscountF.'</div>
						<div>'.$ttlTaxF.'</div>
						<div>'.Html::a($ttlDeliveryF,Url::toRoute(['/purchasing/purchase-order/delivery-view','kdpo'=>$poHeader->KD_PO]),['id'=>'delivery','data-toggle'=>'modal','data-target'=>'#frm-delivery']).'</div>	
						<div><b>'.$grandTotalF.'</b></div>';  
			},
			'pageSummaryOptions' => [
				'style'=>[
						'text-align'=>'right',		
						'width'=>'100px',
						'font-family'=>'tahoma',
						'font-size'=>'8pt',	
						//'text-decoration'=>'underline',
						//'font-weight'=>'bold',
						//'border-left-color'=>'transparant',		
						'border-left'=>'0px',									
				]
			],											
			'footer'=>true,						
		],				
	];
	
	
	/*
	 * GRID VIEW CREATE PO
	 * @author ptrnov  <piter@lukison.com>
     * @since 1.1
     */
	$gvPoDetail= GridView::widget([
		'id'=>'gv-po-detail',
		'dataProvider'=> $poDetailProvider,				
		'showPageSummary' => true,
		'columns' => $gridColumns,
		'pjax'=>true,
		'pjaxSettings'=>[
		 'options'=>[
			'enablePushState'=>false,
			'id'=>'gv-po-detail',
		   ],						  
		],
		/* 'panel' => [
			//'footer'=>false,
			'heading'=>false,						
		], */
		/* 'toolbar'=> [
			//'{items}',
		],  */				
		'hover'=>true, //cursor select
		'responsive'=>true,
		'responsiveWrap'=>true,
		'bordered'=>true,
		'striped'=>'4px',
		'autoXlFormat'=>true,
		'export' => false, 
	]);	

	
	
	
	/*
	 * Tombol Modul View
	 * permission View [BTN_VIEW==1]
	 * Check By User login
	*/
	function tombolView($url, $model){
		//if(getPermission()){	
			//if(getPermission()->BTN_VIEW==1){
				$title = Yii::t('app', 'View');
				$options = [ 'id'=>'ro-view']; 
				$icon = '<span class="glyphicon glyphicon-zoom-in"></span>';
				$label = $icon . ' ' . $title;
				$url = Url::toRoute(['/purchasing/request-order/view','kd'=>$model->KD_RO]);
				$options['tabindex'] = '-1';
				return '<li>' . Html::a($label, $url, $options) . '</li>' . PHP_EOL;	
			//}
		//}
	} 
	
	/*
	 * Tombol Modul View
	 * permission View [BTN_VIEW==1]
	 * Check By User login
	*/
	function tombolSendPo($url, $model,$poHeader) {
		$kdPo = explode('.',$poHeader->KD_PO);
		if($kdPo[0]!='POA'){
				$title = Yii::t('app', 'SendPo');
				$options = [ 'id'=>'ro-sendpo-id',
							 'data-toggle'=>'modal',
							 'data-target'=>"#ro-sendpo",
							 'data-title'=> $model->KD_RO,
				]; 
				$icon = '<span class="glyphicon glyphicon-zoom-in"></span>';
				$label = $icon . ' ' . $title;
				$url = Url::toRoute(['/purchasing/purchase-order/detail','kd_ro'=>$model->KD_RO,'kdpo'=>$_GET['kdpo']]);
				$options['tabindex'] = '-1';
				return '<li>' . Html::a($label, $url, $options) . '</li>' . PHP_EOL;	
			}
	} 
	
	/*
	 * GRID VIEW CREATE PO -> BY SALES ORDER
	 * @author ptrnov  <piter@lukison.com>
     * @since 1.1
     */
	$gvSOSendPO=GridView::widget([
		'id'=>'gv-so-detail',
		'dataProvider' =>$dataProviderSo,
		'filterModel' => $searchModel,
		'columns' => [
			[/* Attribute KD RO */
				'attribute'=>'KD_RO',
				'label'=>'Kode RO',						
				'hAlign'=>'left',	
				'vAlign'=>'middle',
				//'mergeHeader'=>true,
				'format' => 'raw',	
				'headerOptions'=>[
					//'class'=>'kartik-sheet-style'							
					'style'=>[
						'text-align'=>'center',
						'width'=>'150px',
						'font-family'=>'tahoma',
						'font-size'=>'8pt',
						'background-color'=>'rgba(0, 95, 218, 0.3)',								
					]
				],
				'contentOptions'=>[
					'style'=>[
						'width'=>'150px',
						'font-family'=>'tahoma',
						'font-size'=>'8pt',								
					]
				], 
				'pageSummaryOptions' => [
					'style'=>[
							'border-left'=>'0px',
							'border-right'=>'0px',									
					]
				]
			],
			[
				'class'=>'kartik\grid\ActionColumn',
				'dropdown' => true,
				'template' => '{view}{sendPo}',
				'dropdownOptions'=>['class'=>'pull-right dropup'],									
				//'headerOptions'=>['class'=>'kartik-sheet-style'],											
				'buttons' => [
					// View RO | Permissian All
					'view' => function ($url, $model) {
									return tombolView($url, $model);
							  },
							
					// SEND RO TO PO | Permissian Status 0; 0=process | User created = user login  
					'sendPo' => function ($url, $model) use ($poHeader) {
									return tombolSendPo($url, $model,$poHeader);
								},				
				],				
			],	 
		],
		'pjax'=>true,
		'pjaxSettings'=>[
		 'options'=>[
			'enablePushState'=>false,
			'id'=>'gv-so-detail',
		   ],	
			'refreshGrid' => true,
			'neverTimeout'=>true,
		],
		'panel' => [
			//'footer'=>false,
			'heading'=>false,						
		],
		/* 'toolbar'=> [
			//'{items}',
		],  */				
		'hover'=>true, //cursor select
		'responsive'=>true,
		'responsiveWrap'=>true,
		'bordered'=>true,
		'striped'=>'4px',
		'autoXlFormat'=>true,
		'export' => false, 
	]); 
	
	/*
	 * GRID VIEW CREATE PO -> BY REQUEST ORDER
	 * @author ptrnov  <piter@lukison.com>
     * @since 1.1
     */
	$gvROSendPO=GridView::widget([
		'id'=>'gv-ro-detail',
		'dataProvider' => $dataProviderRo,
		'filterModel' => $searchModel,
		'columns' => [
			[/* Attribute KD RO */
				'attribute'=>'KD_RO',
				'label'=>'Kode RO',						
				'hAlign'=>'left',	
				'vAlign'=>'middle',
				//'mergeHeader'=>true,
				'format' => 'raw',	
				'headerOptions'=>[
					//'class'=>'kartik-sheet-style'							
					'style'=>[
						'text-align'=>'center',
						'width'=>'150px',
						'font-family'=>'tahoma',
						'font-size'=>'8pt',
						'background-color'=>'rgba(0, 95, 218, 0.3)',								
					]
				],
				'contentOptions'=>[
					'style'=>[
						'width'=>'150px',
						'font-family'=>'tahoma',
						'font-size'=>'8pt',								
					]
				], 
				'pageSummaryOptions' => [
					'style'=>[
							'border-left'=>'0px',
							'border-right'=>'0px',									
					]
				]
			],
			[
				'class'=>'kartik\grid\ActionColumn',
				'dropdown' => true,
				'template' => '{view}{sendPo}',
				'dropdownOptions'=>['class'=>'pull-right dropup'],									
				//'headerOptions'=>['class'=>'kartik-sheet-style'],											
				'buttons' => [
					// View RO | Permissian All
					'view' => function ($url, $model) {
									return tombolView($url, $model);
							  },
							
					// SEND RO TO PO | Permissian Status 0; 0=process | User created = user login  
					'sendPo' => function ($url, $model) use ($poHeader) {
									return tombolSendPo($url, $model,$poHeader);
								},				
				],				
			],	 
		],
		'pjax'=>true,
		'pjaxSettings'=>[
		 'options'=>[
			'enablePushState'=>false,
			'id'=>'gv-ro-detail',
		   ],	
			'refreshGrid' => true,
			'neverTimeout'=>true,
		],
		'panel' => [
			//'footer'=>false,
			'heading'=>false,						
		],
		/* 'toolbar'=> [
			//'{items}',
		],  */				
		'hover'=>true, //cursor select
		'responsive'=>true,
		'responsiveWrap'=>true,
		'bordered'=>true,
		'striped'=>'4px',
		'autoXlFormat'=>true,
		'export' => false, 
	]); 	
	//echo $gvROSendPO; 
	$items=[
		[
			'label'=>'<div style="font-family: tahoma ;font-size:8pt;">Request Order</div>','content'=>$gvROSendPO,
			'active'=>true,
		],		
		[
			'label'=>'<div style="font-family: tahoma ;font-size:8pt;">Seles Order</div>','content'=>$gvSOSendPO,
			
		],
	];
	
	
	$tabRoSo= TabsX::widget([
		'id'=>'tab-emp',
		'items'=>$items,
		'position'=>TabsX::POS_ABOVE,
		//'height'=>'tab-height-xs',
		'bordered'=>true,
		'encodeLabels'=>false,
		//'align'=>TabsX::ALIGN_LEFT,
	]);	
		
		
	/*
	 * MODAL SELECT REQUEST ORDER 
	 * @author ptrnov  <piter@lukison.com>
     * @since 1.1
     */
	$this->registerJs("
		$.fn.modal.Constructor.prototype.enforceFocus = function() {};
		$('#ro-sendpo').on('show.bs.modal', function (event) {
			var button = $(event.relatedTarget)
			var modal = $(this)
			var title = button.data('title') 
			var href = button.attr('href') 
			modal.find('.modal-title').html(title)
			modal.find('.modal-body').html('<i class=\"fa fa-spinner fa-spin\"></i>')
			$.post(href)
				.done(function( data ) {
					modal.find('.modal-body').html(data)
				});
			});
	",$this::POS_READY);
	Modal::begin([
		'id' => 'ro-sendpo',
		'header' => '<h4 class="modal-title">...</h4>',
		'size' => Modal::SIZE_LARGE,
	]);	 
		//echo '...';	 
	Modal::end();
	
	
	/*
	 * SIGNATURE AUTH1 | CREATED
	 * Status Value Signature1 | PurchaseOrder
	 * Permission Edit [BTN_SIGN1==1] & [Status 0=process 1=CREATED]
	*/
	function SignCreated($poHeader){
		$title = Yii::t('app', 'Sign Hire');
		$options = [ 'id'=>'po-auth1',	
					  'data-toggle'=>"modal",
					  'data-target'=>"#po-auth1-sign",											
					  'class'=>'btn btn-warning btn-xs', 
					  'style'=>['width'=>'100px'],
					  'title'=>'Detail'
		]; 
		$icon = '<span class="glyphicon glyphicon-retweet"></span>';
		$label = $icon . ' ' . $title;
		$url = Url::toRoute(['/purchasing/purchase-order/sign-auth1-view','kdpo'=>$poHeader->KD_PO]);
		//$options1['tabindex'] = '-1';
		$content = Html::a($label,$url, $options);
		return $content;	
	}
	
	/*
	 * SIGNATURE AUTH2 | CHECKED
	 * Status Value Signature1 | PurchaseOrder
	 * Permission Edit [BTN_SIGN1==1] & [Status 0=process 1=CREATED]
	*/
	function SignChecked($poHeader){
		$title = Yii::t('app', 'Sign Hire');
		$options = [ 'id'=>'po-auth2',	
					  'data-toggle'=>"modal",
					  'data-target'=>"#po-auth2-sign",											
					  'class'=>'btn btn-warning btn-xs', 
					  'style'=>['width'=>'100px'],
					  'title'=>'Detail'
		]; 
		$icon = '<span class="glyphicon glyphicon-retweet"></span>';
		$label = $icon . ' ' . $title;
		$url = Url::toRoute(['/purchasing/purchase-order/sign-auth2-view','kdpo'=>$poHeader->KD_PO]);
		//$options1['tabindex'] = '-1';
		$content = Html::a($label,$url, $options);
		return $content;	
	}
	
	/*
	 * SIGNATURE AUTH3 | APPROVED
	 * Status Value Signature1 | PurchaseOrder
	 * Permission Edit [BTN_SIGN1==1] & [Status 0=process 1=CREATED]
	*/
	function SignApproved($poHeader){
		$title = Yii::t('app', 'Sign Hire');
		$options = [ 'id'=>'po-auth3',	
					  'data-toggle'=>"modal",
					  'data-target'=>"#po-auth3-sign",											
					  'class'=>'btn btn-warning btn-xs', 
					  'style'=>['width'=>'100px'],
					  'title'=>'Detail'
		]; 
		$icon = '<span class="glyphicon glyphicon-retweet"></span>';
		$label = $icon . ' ' . $title;
		$url = Url::toRoute(['/purchasing/purchase-order/sign-auth3-view','kdpo'=>$poHeader->KD_PO]);
		//$options1['tabindex'] = '-1';
		$content = Html::a($label,$url, $options);
		return $content;	
	}
	
	
	/*
	 * Signature Waiting Approval
	 * Signature Automaticly Show If ACTION APPROVAL
	 * @author ptrnov  <piter@lukison.com>
	 * @since 1.1
	*/
	//function SignApprovedStt(){
	//	return Html::a('<i class="glyphicon glyphicon-retweet"></i> Waiting for approval', '#',['class'=>'btn btn-warning btn-xs', 'style'=>['width'=>'160px'],'title'=>'Detail']);
	// } 

	/*
	 * Signature Waiting sign
	 * Signature Automaticly Show If ACTION APPROVAL
	 * @author ptrnov  <piter@lukison.com>
	 * @since 1.1
	*/
	// function SignStt(){
		// return Html::a('<i class="glyphicon glyphicon-retweet"></i> Waiting for Sign', '#',['class'=>'btn btn-warning btn-xs', 'style'=>['width'=>'160px'],'title'=>'Detail']);
	// } 

?>

<!-- Stack the columns on mobile by making one full-width and the other half-width -->
<div class="row">
	<!-- SIDE LEFT | REQUEST ORDER | SALES ORDER !-->
	<div class="col-xs-12 col-md-3">
		<?php echo $tabRoSo;?>
	</div>	
	<div class="col-xs-12 col-md-9">
		<div class="row">
			<!-- Title Left Side Descript Supplier !-->
			<div class="col-xs-6 col-sm-6 col-md-6" style="font-family: tahoma ;font-size: 9pt;">
				<dl>
					<?php
						$splName = $supplier!='' ? $supplier->NM_SUPPLIER : 'Supplier No Set';
						$splAlamat = $supplier!='' ? $supplier->ALAMAT : 'Address No Set';
						$splKota = $supplier!='' ? $supplier->KOTA : 'City No Set';
						$splTlp = $supplier!='' ? $supplier->TLP : 'Phone No Set';
						$splFax = $supplier!='' ? $supplier->FAX : 'FAX No Set';
						$splEmail= $supplier!='' ? $supplier->EMAIL : 'Email No Set';
					?>
					<dt><?=$splName; ?></dt>
					<dt><?=$splAlamat; ?></dt>
					<dt><?=$splKota; ?></dt>					
					<dt style="width:80px; float:left;">Telp / Fax</dt>
					<dd>:	<?=$splTlp; ?> / <?=$splFax; ?></dd>				
					<dt style="width:80px; float:left;">Email</dt>
					<dd>:	<?=$splEmail; ?></dd>    					
				</dl>			
			</div>			
			<!-- Title Right Side Descript Purchase !-->	
			<div class="col-xs-5 col-sm-5 col-md-5" style="font-family: tahoma ;font-size: 9pt;">
				<dl>
					<?php
						$poID = $poHeader!='' ? $poHeader->KD_PO: 'PO Not Set';
						$tglCreate=$poHeader!='' ? \Yii::$app->formatter->asDate($poHeader->CREATE_AT,'Y-M-d') :'';
					?>
					<dt style="width:80px; float:left;">Date</dt>
					<dd>:	<?=$tglCreate; ?></dd>     	  
					
					<dt style="width:80px; float:left;">No.Order</dt>
					<dd>:	<?=$poID; ?></dd>     	  
					
					<dt style="width:80px; float:left;">Order By</dt>
					<dd>:	<?= Yii::$app->user->identity->username; ?></dd> 
					
					<dt style="width:80px; float:left;">ETD</dt>
					<dd>:	<?php echo link_etd($poHeader); ?></dd> 
					
					<dt style="width:80px; float:left;">ETA</dt>
					<dd>:	<?php echo link_eta($poHeader); ?></dd> 
				</dl>				
			</div>
			<!-- Button Select |Supplier|Shipping|Billing !-->
			<div class="col-xs-1 col-sm-1 col-md-1" style="font-family: tahoma ;font-size: 9pt;">
				<div>
					<?php echo SupplierSearch($poHeader); ?>
				</div>
				<div  Style="margin-top:2px">
					<?php echo ShippingSearch($poHeader); ?>
				</div>
				<div Style="margin-top:2px">
					<?php echo BillingSearch($poHeader); ?>
				</div>				
			</div>
		</div>
		<hr style="margin-top:0;margin-bottom:5px"></hr>
		<div style="text-align:right;margin-bottom:5px">
			<div style="text-align:right;float:right">
				<?php echo PoPlus($poHeader); ?>			
			</div>
			<div style="text-align:right;float:right">
				<?php echo PoView($poHeader); ?>
			</div>
			<div style="text-align:right;float:right"">
				<?php echo PrintPdf($poHeader); ?>
			</div>
			<div style="text-align:right;">
				<?php echo PrintPdf_TMP($poHeader); ?>
			</div>				
			
		</div>		
		<!-- GRID PO Detail !-->			
		<div>			
			<?php  echo $gvPoDetail; ?>
		</div>
		<!-- Title BOTTEM Descript !-->	
		<div  class="row">
				<div class="col-md-5" style="font-family: tahoma ;font-size: 9pt;float:left;">
					<dl>
						<?php
							$shipNm= $ship !='' ? $ship->NM_ALAMAT : 'Shipping Not Set';
							$shipAddress= $ship!='' ? $ship->ALAMAT_LENGKAP :'Address Not Set';
							$shipCity= $ship!='' ? $ship->KOTA : 'City Not Set';
							$shipPhone= $ship!='' ? $ship->TLP : 'Phone Not Set';
							$shipFax= $ship!='' ? $ship->FAX : 'Fax Not Set';
							$shipPic= $ship!='' ? $ship->CP : 'PIC not Set';
						?>
						<dt><h6><u><b>Shipping Address :</b></u></h6></dt>
						<dt><?=$shipNm; ?></dt> 				
						<dt><?=$shipAddress;?></dt>				
						<dt><?=$shipCity?></dt>
						<dt style="width:80px; float:left;">Tlp</dt>
						<dd>:	<?=$shipPhone;?></dd> 					
						<dt style="width:80px; float:left;">FAX</dt>
						<dd>:	<?=$shipFax; ?></dd>  					
						<dt style="width:80px; float:left;">CP</dt>
						<dd>:	<?=$shipPic; ?></dd> 
					</dl>
				</div>
				<div class="col-md-2"></div>
				<div class="col-md-5" style="font-family: tahoma ;font-size: 9pt;float:left;">
					<dl>
						<?php
							$billNm= $bill !='' ? $bill->NM_ALAMAT : 'Billing Not Set';
							$billAddress= $bill!='' ? $bill->ALAMAT_LENGKAP :'Address Not Set';
							$billCity= $bill!='' ? $bill->KOTA : 'City Not Set';
							$billPhone= $bill!='' ? $bill->TLP : 'Phone Not Set';
							$billFax= $bill!='' ? $bill->FAX : 'Fax Not Set';
							$billPic= $bill!='' ? $bill->CP : 'PIC not Set';
						?>
						<dt><h6><u><b>Billing Address :</b></u></h6></dt>
						<dt><?=$billNm;?></dt>				
						<dt><?=$billAddress;?></dt>				
						<dt><?=$billCity;?></dt>

						<dt style="width:80px; float:left;">Tlp</dt>
						<dd>:	<?=$billPhone;?></dd>     	  
						
						<dt style="width:80px; float:left;">FAX</dt>
						<dd>:	<?=$billFax;?></dd>     	  
						
						<dt style="width:80px; float:left;">CP</dt>
						<dd>:	<?=$billPic;?></dd> 
					</dl>
				</div>			
		</div>	
		<!-- PO Note !-->
		<div  class="row">			
			<div  class="col-md-12" style="font-family: tahoma ;font-size: 9pt;">	
				<dt><b>General Notes :</b></dt>
				<hr style="height:1px;margin-top: 1px; margin-bottom: 1px;font-family: tahoma ;font-size:8pt;">	
				<div>
					<div style="float:right;text-align:right;">
						<?php echo PoNote($poHeader); ?>
					</div>
					<div style="margin-left:5px">
						<dd><?php echo $poHeader->NOTE; ?></dd><br/><br/>
					</div>				
				</div>
				<hr style="height:1px;margin-top: 1px;">		
			</div>
		</div>
		<div  class="row">
			<div class="col-md-9">
				<table id="tblRo" class="table table-bordered" style="width:500px;font-family: tahoma ;font-size: 8pt;">
					<!-- Tanggal!-->
					 <tr>
						<!-- Tanggal Pembuat RO!-->
						<th style="text-align: center; height:20px">
							<div style="text-align:center;">
								<?php
									$placeTgl1=$poHeader->SIG1_TGL!=0 ? Yii::$app->ambilKonvesi->convert($poHeader->SIG1_TGL,'date') :'';
									echo '<b>Tanggerang</b>,' . $placeTgl1;  
								?>
							</div> 
						
						</th>		
						<!-- Tanggal Pembuat RO!-->
						<th style="text-align: center; height:20px">
							<div style="text-align:center;">
								<?php
									$placeTgl2=$poHeader->SIG2_TGL!=0 ? Yii::$app->ambilKonvesi->convert($poHeader->SIG2_TGL,'date') :'';
									echo '<b>Tanggerang</b>,' . $placeTgl2;  
								?>
							</div> 
						
						</th>		
						<!-- Tanggal PO Approved!-->				
						<th style="text-align: center; height:20px">
							<div style="text-align:center;">
								<?php
									$placeTgl3=$poHeader->SIG3_TGL!=0 ? Yii::$app->ambilKonvesi->convert($poHeader->SIG3_TGL,'date') :'';
									echo '<b>Tanggerang</b>,' . $placeTgl3;  
								?>
							</div> 				
						</th>	
						
					</tr>
					<!-- Signature !-->
					 <tr>
						<th style="text-align: center; vertical-align:middle;width:100; height:40px">
							<?php 
								$ttd1 = $poHeader->SIG1_SVGBASE64!='' ?  '<img style="width:100; height:40px" src='.$poHeader->SIG1_SVGBASE64.'></img>' : SignCreated($poHeader);
								echo $ttd1;
							?> 
						</th>								
						<th style="text-align: center; vertical-align:middle;width:100">
							<?php 
								$ttd2 = $poHeader->SIG2_SVGBASE64!='' ?  '<img style="width:100; height:40px" src='.$poHeader->SIG2_SVGBASE64.'></img>' : SignChecked($poHeader);
								echo $ttd2;
							?> 
						</th>
						<th style="text-align: center; vertical-align:middle;width:100">
							<?php 
								$ttd3 = $poHeader->SIG3_SVGBASE64!='' ?  '<img style="width:100; height:40px" src='.$poHeader->SIG3_SVGBASE64.'></img>' : SignApproved($poHeader);
								echo $ttd3;
							?> 
						</th>
					</tr>
					<!--Nama !-->
					 <tr>
						<th style="text-align: center; vertical-align:middle;height:20; background-color:rgba(0, 95, 218, 0.3);text-align: center;">
							<div>		
								<?php
									$sigNm1=$poHeader->SIG1_NM!='none' ? '<b>'.$poHeader->SIG1_NM.'</b>' : 'none';
									echo $sigNm1;
								?>
							</div>
						</th>								
						<th style="text-align: center; vertical-align:middle;height:20; background-color:rgba(0, 95, 218, 0.3);text-align: center;">
							<div>		
								<?php
									$sigNm2=$poHeader->SIG2_NM!='none' ? '<b>'.$poHeader->SIG2_NM.'</b>' : 'none';
									echo $sigNm2;
								?>
							</div>
						</th>
						<th style="text-align: center; vertical-align:middle;height:20; background-color:rgba(0, 95, 218, 0.3);text-align: center;">
							<div>		
								<?php
									$sigNm3=$poHeader->SIG3_NM!='none' ? '<b>'.$poHeader->SIG3_NM.'</b>' : 'none';
									echo $sigNm3;
								?>
							</div>
						</th>
					</tr>
					<!-- Department|Jbatan !-->
					 <tr>
						<th style="text-align: center; vertical-align:middle;height:20">
							<div>		
								<b><?php  echo 'Purchaser'; ?></b>
							</div>
						</th>								
						<th style="text-align: center; vertical-align:middle;height:20">
							<div>		
								<b><?php  echo 'F & A'; ?></b>
							</div>
						</th>
						<th style="text-align: center; vertical-align:middle;height:20">
							<div>		
								<b><?php  echo 'Director'; ?></b>
							</div>
						</th>
					</tr>
				</table>				
			</div>
		</div>		
	</div>
</div>



<?php
	$this->registerJs("
		/* $(document).on('click', '[data-toggle-discount]', function(e){
			e.preventDefault();
			var idx = $(this).data('toggle-discount');
			var disc = $('#discount1').attr('DISCOUNT');
			$.ajax({
					url: '/purchasing/purchase-order/discount',
					type: 'POST',
					//contentType: 'application/json; charset=utf-8',
					data:'id='+idx  + '&disc='+ disc,
					dataType: 'json',
					success: function(result) {
						if (result == 1){
							$.pjax.reload({container:'#gv-po-detail'});
						} 
					}
				});
		}); */
		
		/* $(document).on('click', '[data-toggle-tax]', function(e){
			e.preventDefault();
			var idtax = $(this).data('toggle-tax);
			var tax = $('#tax').attr('PAJAX');
			$.ajax({
					url: '/purchasing/purchase-order/tax',
					type: 'POST',
					//contentType: 'application/json; charset=utf-8',
					data:'id='+idx + '&tax='+ tax,
					dataType: 'json',
					success: function(result) {
						if (result == 1){
							$.pjax.reload({container:'#gv-po-detail'});
						} 
					}
				});
		}); */
		
	",$this::POS_READY);
	
	/*
	 * JS MODAL Discount
	 * @author ptrnov <piter@lukison.com>
	 * @since 1.2
	*/
	$this->registerJs("
			//$.fn.modal.Constructor.prototype.enforceFocus = function() {};	
			$('#frm-discount').on('show.bs.modal', function (event) {
				var button = $(event.relatedTarget)
				var modal = $(this)
				var title = button.data('title') 
				var href = button.attr('href') 
				modal.find('.modal-title').html(title)
				modal.find('.modal-body').html('<i class=\"fa fa-spinner fa-spin\"></i>')
				$.post(href)
					.done(function( data ) {
						modal.find('.modal-body').html(data)					
					});
				}),			
	",$this::POS_READY);
	Modal::begin([
			'id' => 'frm-discount',
			'header' => '<h4 class="modal-title">PERSEN DISCOUNT</h4>',
			//'header' => '<div style="float:left;margin-right:10px">'. Html::img('@web/img_setting/login/login1.png',  ['class' => 'pnjg', 'style'=>'width:100px;height:70px;']).'</div><div style="margin-top:10px;"><h4><b>Signature Authorize</b></h4></div>',
			//'size' => 'modal-xs'
			'size' => Modal::SIZE_SMALL,
			/* 'headerOptions'=>[
				'style'=> 'border-radius:5px; background-color:rgba(230, 251, 225, 1)'
			] */
		]);
	Modal::end();
	
	/*
	 * JS MODAL Pajak
	 * @author ptrnov <piter@lukison.com>
	 * @since 1.2
	*/
	$this->registerJs("
			//$.fn.modal.Constructor.prototype.enforceFocus = function() {};	
			$('#frm-pajak').on('show.bs.modal', function (event) {
				var button = $(event.relatedTarget)
				var modal = $(this)
				var title = button.data('title') 
				var href = button.attr('href') 
				modal.find('.modal-title').html(title)
				modal.find('.modal-body').html('<i class=\"fa fa-spinner fa-spin\"></i>')
				$.post(href)
					.done(function( data ) {
						modal.find('.modal-body').html(data)					
					});
				}),			
	",$this::POS_READY);
	Modal::begin([
			'id' => 'frm-pajak',
			'header' => '<h4 class="modal-title">PERSEN PAJAK</h4>',
			'size' => Modal::SIZE_SMALL,
			/* 'headerOptions'=>[
				'style'=> 'border-radius:5px; background-color:rgba(230, 251, 225, 1)'
			] */
		]);
	Modal::end();
	
	/*
	 * JS MODAL Delivery Cost
	 * @author ptrnov <piter@lukison.com>
	 * @since 1.2
	*/
	$this->registerJs("
			//$.fn.modal.Constructor.prototype.enforceFocus = function() {};	
			$('#frm-delivery').on('show.bs.modal', function (event) {
				var button = $(event.relatedTarget)
				var modal = $(this)
				var title = button.data('title') 
				var href = button.attr('href') 
				modal.find('.modal-title').html(title)
				modal.find('.modal-body').html('<i class=\"fa fa-spinner fa-spin\"></i>')
				$.post(href)
					.done(function( data ) {
						modal.find('.modal-body').html(data)					
					});
				}),			
	",$this::POS_READY);
	Modal::begin([
			'id' => 'frm-delivery',
			'header' => '<h4 class="modal-title">DELIVERY COST</h4>',
			'size' => Modal::SIZE_SMALL,
			/* 'headerOptions'=>[
				'style'=> 'border-radius:5px; background-color:rgba(230, 251, 225, 1)'
			] */
		]);
	Modal::end();
	
	/*
	 * JS MODAL ETD
	 * @author ptrnov <piter@lukison.com>
	 * @since 1.2
	*/
	$this->registerJs("
			$.fn.modal.Constructor.prototype.enforceFocus = function() {};	
			$('#frm-etd').on('show.bs.modal', function (event) {
				var button = $(event.relatedTarget)
				var modal = $(this)
				var title = button.data('title') 
				var href = button.attr('href') 
				modal.find('.modal-title').html(title)
				modal.find('.modal-body').html('<i class=\"fa fa-spinner fa-spin\"></i>')
				$.post(href)
					.done(function( data ) {
						modal.find('.modal-body').html(data)					
					});
				}),			
	",$this::POS_READY);
	Modal::begin([
			'id' => 'frm-etd',
			'header' => '<h4 class="modal-title">Estimate Time Delivery</h4>',
			'size' => Modal::SIZE_SMALL,
			/* 'headerOptions'=>[
				'style'=> 'border-radius:5px; background-color:rgba(230, 251, 225, 1)'
			] */
		]);
	Modal::end();
	
	/*
	 * JS MODAL ETA
	 * @author ptrnov <piter@lukison.com>
	 * @since 1.2
	*/
	$this->registerJs("
			$.fn.modal.Constructor.prototype.enforceFocus = function() {};	
			$('#frm-eta').on('show.bs.modal', function (event) {
				var button = $(event.relatedTarget)
				var modal = $(this)
				var title = button.data('title') 
				var href = button.attr('href') 
				modal.find('.modal-title').html(title)
				modal.find('.modal-body').html('<i class=\"fa fa-spinner fa-spin\"></i>')
				$.post(href)
					.done(function( data ) {
						modal.find('.modal-body').html(data)					
					});
				}),			
	",$this::POS_READY);
	Modal::begin([
			'id' => 'frm-eta',
			'header' => '<h4 class="modal-title">Estimate Time Arrival</h4>',
			'size' => Modal::SIZE_SMALL,
			/* 'headerOptions'=>[
				'style'=> 'border-radius:5px; background-color:rgba(230, 251, 225, 1)'
			] */
		]);
	Modal::end();
	
	/*
	 * JS MODAL SHEEPING
	 * @author ptrnov <piter@lukison.com>
	 * @since 1.2
	*/
	$this->registerJs("
			$.fn.modal.Constructor.prototype.enforceFocus = function() {};	
			$('#search-shp').on('show.bs.modal', function (event) {
				var button = $(event.relatedTarget)
				var modal = $(this)
				var title = button.data('title') 
				var href = button.attr('href') 
				modal.find('.modal-title').html(title)
				modal.find('.modal-body').html('<i class=\"fa fa-spinner fa-spin\"></i>')
				$.post(href)
					.done(function( data ) {
						modal.find('.modal-body').html(data)					
					});
				}),			
	",$this::POS_READY);
	Modal::begin([
			'id' => 'search-shp',
			'header' => '<h4 class="modal-title">Shipping Address</h4>',
			'size' => Modal::SIZE_SMALL,
		]);
	Modal::end();
	
	/*
	 * JS MODAL SUPPLIER
	 * @author ptrnov <piter@lukison.com>
	 * @since 1.2
	*/
	$this->registerJs("
			$.fn.modal.Constructor.prototype.enforceFocus = function() {};	
			$('#search-spl').on('show.bs.modal', function (event) {
				var button = $(event.relatedTarget)
				var modal = $(this)
				var title = button.data('title') 
				var href = button.attr('href') 
				modal.find('.modal-title').html(title)
				modal.find('.modal-body').html('<i class=\"fa fa-spinner fa-spin\"></i>')
				$.post(href)
					.done(function( data ) {
						modal.find('.modal-body').html(data)					
					});
				}),			
	",$this::POS_READY);
	Modal::begin([
			'id' => 'search-spl',
			'header' => '<h4 class="modal-title">Supplier Address</h4>',
			'size' => Modal::SIZE_SMALL,
		]);
	Modal::end();
	
	/*
	 * JS MODAL BILLING
	 * @author ptrnov <piter@lukison.com>
	 * @since 1.2
	*/
	$this->registerJs("
			$.fn.modal.Constructor.prototype.enforceFocus = function() {};	
			$('#search-bil').on('show.bs.modal', function (event) {
				var button = $(event.relatedTarget)
				var modal = $(this)
				var title = button.data('title') 
				var href = button.attr('href') 
				modal.find('.modal-title').html(title)
				modal.find('.modal-body').html('<i class=\"fa fa-spinner fa-spin\"></i>')
				$.post(href)
					.done(function( data ) {
						modal.find('.modal-body').html(data)					
					});
				}),			
	",$this::POS_READY);
	Modal::begin([
			'id' => 'search-bil',
			'header' => '<h4 class="modal-title">Billing Address</h4>',
			'size' => Modal::SIZE_SMALL,
		]);
	Modal::end();
	
	/*
	 * PO PLUS MODAL AJAX | ADD Items
	 * @author ptrnov <piter@lukison.com>
	 * @since 1.2
	*/
	$this->registerJs("
			$.fn.modal.Constructor.prototype.enforceFocus = function() {};	
			$('#po-plus').on('show.bs.modal', function (event) {
				var button = $(event.relatedTarget)
				var modal = $(this)
				var title = button.data('title') 
				var href = button.attr('href') 
				modal.find('.modal-title').html(title)
				modal.find('.modal-body').html('<i class=\"fa fa-spinner fa-spin\"></i>')
				$.post(href)
					.done(function( data ) {
						modal.find('.modal-body').html(data)					
					});
				}),			
	",$this::POS_READY);
	Modal::begin([
			'id' => 'po-plus',
			'header' => '<h4 class="modal-title">PO PLUS - Add Items</h4>',
			'size' => 'modal-md',
		]);
	Modal::end();
	
	/*
	 * PO Note MODAL AJAX | ADD Items
	 * @author ptrnov <piter@lukison.com>
	 * @since 1.2
	*/
	$this->registerJs("
			$.fn.modal.Constructor.prototype.enforceFocus = function() {};	
			$('#po-note').on('show.bs.modal', function (event) {
				var button = $(event.relatedTarget)
				var modal = $(this)
				var title = button.data('title') 
				var href = button.attr('href') 
				modal.find('.modal-title').html(title)
				modal.find('.modal-body').html('<i class=\"fa fa-spinner fa-spin\"></i>')
				$.post(href)
					.done(function( data ) {
						modal.find('.modal-body').html(data)					
					});
				}),			
	",$this::POS_READY);
	Modal::begin([
			'id' => 'po-note',
			'header' => '<h4 class="modal-title">General Note</h4>',
			'size' => 'modal-md',
		]);
	Modal::end();
	
	/*
	 * JS AUTH1 | CREATED
	 * @author ptrnov <piter@lukison.com>
	 * @since 1.2
	*/
	$this->registerJs("
			$.fn.modal.Constructor.prototype.enforceFocus = function() {};	
			$('#po-auth1-sign').on('show.bs.modal', function (event) {
				var button = $(event.relatedTarget)
				var modal = $(this)
				var title = button.data('title') 
				var href = button.attr('href') 
				modal.find('.modal-title').html(title)
				modal.find('.modal-body').html('<i class=\"fa fa-spinner fa-spin\"></i>')
				$.post(href)
					.done(function( data ) {
						modal.find('.modal-body').html(data)					
					});
				}),			
	",$this::POS_READY);
	Modal::begin([
			'id' => 'po-auth1-sign',
			//'header' => '<h4 class="modal-title">Signature Authorize</h4>',
			'header' => '<div style="float:left;margin-right:10px">'. Html::img('@web/img_setting/login/login1.png',  ['class' => 'pnjg', 'style'=>'width:100px;height:70px;']).'</div><div style="margin-top:10px;"><h4><b>Signature Authorize</b></h4></div>',
			//'size' => 'modal-xs'
			'size' => Modal::SIZE_SMALL,
			'headerOptions'=>[
				'style'=> 'border-radius:5px; background-color:rgba(230, 251, 225, 1)'
			]
		]);
	Modal::end();
	
	/*
	 * JS AUTH2 | CHECKED
	 * @author ptrnov <piter@lukison.com>
	 * @since 1.2
	*/
	$this->registerJs("
			$.fn.modal.Constructor.prototype.enforceFocus = function() {};	
			$('#po-auth2-sign').on('show.bs.modal', function (event) {
				var button = $(event.relatedTarget)
				var modal = $(this)
				var title = button.data('title') 
				var href = button.attr('href') 
				modal.find('.modal-title').html(title)
				modal.find('.modal-body').html('<i class=\"fa fa-spinner fa-spin\"></i>')
				$.post(href)
					.done(function( data ) {
						modal.find('.modal-body').html(data)					
					});
				}),			
	",$this::POS_READY);
	Modal::begin([
			'id' => 'po-auth2-sign',
			//'header' => '<h4 class="modal-title">Signature Authorize</h4>',
			'header' => '<div style="float:left;margin-right:10px">'. Html::img('@web/img_setting/login/login1.png',  ['class' => 'pnjg', 'style'=>'width:100px;height:70px;']).'</div><div style="margin-top:10px;"><h4><b>Signature Authorize</b></h4></div>',
			//'size' => 'modal-xs'
			'size' => Modal::SIZE_SMALL,
			'headerOptions'=>[
				'style'=> 'border-radius:5px; background-color:rgba(230, 251, 225, 1)'
			]
		]);
	Modal::end();
	
	/*
	 * JS AUTH3 | APPROVED
	 * @author ptrnov <piter@lukison.com>
	 * @since 1.2
	*/
	$this->registerJs("
			$.fn.modal.Constructor.prototype.enforceFocus = function() {};	
			$('#po-auth3-sign').on('show.bs.modal', function (event) {
				var button = $(event.relatedTarget)
				var modal = $(this)
				var title = button.data('title') 
				var href = button.attr('href') 
				modal.find('.modal-title').html(title)
				modal.find('.modal-body').html('<i class=\"fa fa-spinner fa-spin\"></i>')
				$.post(href)
					.done(function( data ) {
						modal.find('.modal-body').html(data)					
					});
				}),			
	",$this::POS_READY);
	Modal::begin([
			'id' => 'po-auth3-sign',
			//'header' => '<h4 class="modal-title">Signature Authorize</h4>',
			'header' => '<div style="float:left;margin-right:10px">'. Html::img('@web/img_setting/login/login1.png',  ['class' => 'pnjg', 'style'=>'width:100px;height:70px;']).'</div><div style="margin-top:10px;"><h4><b>Signature Authorize</b></h4></div>',
			//'size' => 'modal-xs'
			'size' => Modal::SIZE_SMALL,
			'headerOptions'=>[
				'style'=> 'border-radius:5px; background-color:rgba(230, 251, 225, 1)'
			]
		]);
	Modal::end();
	
	/*
	 * Button Modal Confirm PERMISION DENAID
	 * @author ptrnov [piter@lukison]
	 * @since 1.2
	*/
	$this->registerJs("
			$.fn.modal.Constructor.prototype.enforceFocus = function() {};	
			$('#confirm-permission-alert').on('show.bs.modal', function (event) {
				//var button = $(event.relatedTarget)
				//var modal = $(this)
				//var title = button.data('title') 
				//var href = button.attr('href') 
				//modal.find('.modal-title').html(title)
				//modal.find('.modal-body').html('')
				/* $.post(href)
					.done(function( data ) {
						modal.find('.modal-body').html(data)					
					}); */
				}),			
	",$this::POS_READY);
	Modal::begin([
			'id' => 'confirm-permission-alert',
			'header' => '<div style="float:left;margin-right:10px">'. Html::img('@web/img_setting/warning/denied.png',  ['class' => 'pnjg', 'style'=>'width:40px;height:40px;']).'</div><div style="margin-top:10px;"><h4><b>Permmission Confirm !</b></h4></div>',
			'size' => Modal::SIZE_SMALL,
			'headerOptions'=>[
				'style'=> 'border-radius:5px; background-color:rgba(142, 202, 223, 0.9)'
			]
		]);
		echo "<div>You do not have permission for this module.
				<dl>				
					<dt>Contact : itdept@lukison.com</dt>
				</dl>
			</div>";
	Modal::end();
?>

