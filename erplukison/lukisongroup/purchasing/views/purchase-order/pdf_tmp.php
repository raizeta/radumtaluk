<?php 
use yii\helpers\Html;
use yii\widgets\DetailView;
use kartik\grid\GridView;

use lukisongroup\master\models\Suplier;
use lukisongroup\master\models\Barangumum;
use lukisongroup\master\models\Nmperusahaan;
use lukisongroup\purchasing\models\Purchasedetail;
use lukisongroup\esm\models\Barang;
/* @var $this yii\web\View */
/* @var $poHeader lukisongroup\poHeaders\esm\po\Purchaseorder */

$this->title = 'Detail PO';
$this->params['breadcrumbs'][] = ['label' => 'Purchaseorders', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;

$y=4;
?>

 <?php 
        $sup = Suplier::find()->where(['KD_SUPPLIER'=>$poHeader->KD_SUPPLIER])->one(); 
        $pod = Purchasedetail::find()->where(['KD_PO'=>$poHeader->KD_PO])->all(); 

        $ship = Nmperusahaan::find()->where(['ID' => $poHeader->SHIPPING])->one(); 
        $bill = Nmperusahaan::find()->where(['ID' => $poHeader->BILLING])->one(); 
		
		/* $x=10;
		function ax(){
			return '10';
		}
		 */
		/* function formulaAmount($summary, $data, $widget){
				//$calculate = dataCell($model, $key, $index);
				//$p = compact('model', 'key', 'index');
				return '<div>'.$summary * $this->model().',</div>
						<div>'.min($data).'</div>
						<div>'.$summary.'</div>
						<div>100,0</div>
						<div><b>10000,0</b></div>'; 
		}; */

 ?>

<div class="container" style="font-family: tahoma ;font-size: 8pt;">
	<!-- Header !-->
	<div>
		<div style="width:240px; float:left;">
			<?php echo Html::img('@web/img_setting/kop/lukison.png',  ['class' => 'pnjg', 'style'=>'width:100px;height:70px;']); ?>	
		</div>
		<div style="padding-top:40px;">
			<!-- <h5 class="text-left"><b>FORM PERMINTAAN BARANG & JASA</b></h5> !-->				
			<h4 class="text-left"><b>PURCHASE ORDER</b></h4>				
		</div>
		<hr style="height:10px;margin-top: 1px; margin-bottom: 1px;color:#94cdf0">
		<hr style="height:1px;margin-top: 1px; margin-bottom: 10px;">
		
	</div>
	<!-- Title HEADER Descript !-->	
	<div>
		<div style="width:250px; float:left">
			<dl>
				<dt><b><?= $sup->NM_SUPPLIER; ?></b></dt>				
				<dt><?= $sup->ALAMAT; ?></dt>				
				<dt><?= $sup->KOTA; ?></dt>
				<dt style="width:80px; float:left;">Telp / Fax</dt>
				<dd>: <?= $sup->TLP; ?> / <?= $sup->FAX; ?></dd>     	  
				
				<dt style="width:80px; float:left;">Email</dt>
				<dd>: <?= $sup->EMAIL; ?></dd>     	  
				
			</dl>
		</div>
		<div style="float:left; margin-left:160px">
			<dl>
				<!-- Date !-->
				<dt style="width:80px; float:left;">Date</dt>
				<dd>: <?php echo date('d-M-Y'); ?></dd>
				<!-- PO NO !-->
				<dt style="width:80px; float:left;">No. Order</dt>
				<dd>: <?= $poHeader->KD_PO; ?></dd>  
				<!-- Purchese Order Created !-->
				<dt style="width:80px; float:left;">Order By</dt>
				<dd>: <?php echo "alam@lukison.com"; ?></dd>     
				<!-- Estimasi Time Arrival!-->
				<dt style="width:80px; float:left;">ETA</dt>
				<dd>: <?= $poHeader->ETD; ?></dd>   
				<!-- Estimasi Time Delevery !-->
				<dt style="width:80px; float:left;">ETD</dt>
				<dd>: <?= $poHeader->ETA; ?></dd> 				
			</dl>
		</div>
	</div>
	<!-- Title GRID PO Detail !-->	
	<div>
		<?php 
		$gridColumnsX= [
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
			//'class'=>'kartik\grid\EditableColumn',
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
			/* 'editableOptions' => [
				'header' => 'Update Quantity',
				'inputType' => \kartik\editable\Editable::INPUT_TEXT,
				'size' => 'sm',	
				'options' => [
				  'pluginOptions' => ['min'=>0, 'max'=>50000]
				]
			],	 */
		],					
		[/* Attribute Unit Barang */
			'attribute'=>'NM_UNIT',
			'mergeHeader'=>true,
			'label'=>'UoM',										
			'vAlign'=>'middle',	
			'hAlign'=>'right',	
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
			//'class'=>'kartik\grid\EditableColumn',
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
			/* 'editableOptions' => [
				'header' => 'Update Price',
				'inputType' => \kartik\editable\Editable::INPUT_TEXT,
				'size' => 'sm',	
				 'options' => [
				  'pluginOptions' => ['min'=>0, 'max'=>10000000000]
				] 
			],	 */
			'format'=>['decimal', 2],
			'pageSummary'=>function ($summary, $data, $widget) use ($poHeader){ 
							$discountModal=$poHeader->DISCOUNT!=0 ? $poHeader->DISCOUNT:'0.00';
							$pajakModal=$poHeader->PAJAK!=0 ? $poHeader->PAJAK:'0.00';							
							return '<div>IDR</div >
									<div>  
									'.$discountModal.'
									%</div >
									<div>  
									'.$pajakModal.'
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
				return $widget->col(3, $p) != 0 ? $widget->col(3, $p) * $model->UNIT_QTY * $widget->col(5, $p) : 0;
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
						<div>'.$ttlDeliveryF.'</div>	
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
			
			
	echo GridView::widget([
		'id'=>'po-process',
		'dataProvider'=> $dataProvider,				
		/* 'footerRowOptions'=>[
			['style'=>['class'=>'text-left info',]], 
		], */
		//'footerRowOptions'=>['style'=>'background-color:rgba(0, 95, 218, 0.3); align:center;border:0.1px solid'],
			'showPageSummary' => true,
			//'pageSummaryRowOptions'=>[
		//],
		//'summary' => "{begin} - {end} {count} {totalCount} {page} {pageCount}",
		/*  'afterFooter'=>[
			[
				'columns'=>[
					['content'=>'Quantity', 'options'=>['colspan'=>2, 'class'=>'text-center info']], 
					['content'=>'Remark', 'options'=>['colspan'=>2, 'class'=>'text-center info']], 
					//['content'=>'Action Status ', 'options'=>['colspan'=>1,  'class'=>'text-center info']], 
				],
			]
		],   */
		/* 'pageSummaryRowOptions'=>[
			['attribute'=>'HARGA',],
			['attribute'=>'QTY',],
		], */
		//'filterModel' => ['STATUS'=>'10'],
		//'headerRowOptions'=>['style'=>'background-color:rgba(0, 95, 218, 0.3); align:center;border:0.1px solid'],
		//	'filterRowOptions'=>['style'=>'background-color:rgba(0, 95, 218, 0.3); align:center;border:0.1px solid'],
		/* 'beforeHeader'=>[
			[
				'columns'=>[
					['content'=>'Quantity', 'options'=>[
							'colspan'=>3, 
							'class'=>'text-center info',
							'style'=>[
								'width'=>'10px',
								'font-family'=>'tahoma',
								'font-size'=>'8pt',																	
							]
						]
					], 
					['content'=>'Remark', 'options'=>[
							'colspan'=>2, 
							'class'=>'text-center info',
							'style'=>[
								'width'=>'10px',
								'font-family'=>'tahoma',
								'font-size'=>'8pt',							
							]
						]
					], 
					//['content'=>'Action Status ', 'options'=>['colspan'=>1,  'class'=>'text-center info']], 
				],
			]
		],  */
		'columns' => $gridColumnsX,
		'pjax'=>true,
		'pjaxSettings'=>[
		'options'=>[
			'enablePushState'=>false,
			'id'=>'ro-process',
		   ],						  
		],
		'panel' => [
			'footer'=>false,
			'heading'=>false,						
		],
		'toolbar'=> [
			//'{items}',
		],
		'hover'=>true, //cursor select
		'responsive'=>true,
		'responsiveWrap'=>true,
		'bordered'=>true,
		'striped'=>'4px',
		'autoXlFormat'=>true,
		'export' => false, 
	]);				
	
?>
	</div>
	<!-- Title BOTTEM Descript !-->	
	<div>
		<div style="width:290px;float:left;">
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
		<div style="float:left; margin-left:60px">
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
	<div style="font-family: tahoma ;font-size: 8pt;">
		<dt><b>General Notes :</b></dt>
		<hr style="height:1px;margin-top: 1px; margin-bottom: 1px;">	
		<dd><?php echo $poHeader->NOTE; ?></dd><br/>
		<hr style="height:1px;margin-top: 1px;">
	</div>
	<!-- Signature PO !-->	
	<div>
		<table id="tblRo" class="table table-bordered" style="width:360px;font-family: tahoma ;font-size: 8pt;">
			<!-- Tanggal!-->
			 <tr>
				<!-- Tanggal Pembuat RO!-->
				<th style="text-align: left; height:20px">
					<div style="text-align:center;">
						Tanggerang,
					</div> 
				
				</th>		
				<!-- Tanggal Pembuat RO!-->
				<th style="text-align: left; height:20px">
						Tanggerang,
				</th>		
				<!-- Tanggal PO Approved!-->				
				<th style="text-align: left; height:20px">
						Tanggerang,			
				</th>	
				
			</tr>
			<!-- Signature !-->
			 <tr>
				<th style="text-align: center; vertical-align:middle;width:180; height:60px">	
								
				</th>								
				<th style="text-align: center; vertical-align:middle;width:180">
						
				</th>
				<th style="text-align: center; vertical-align:middle;width:180">
					
				</th>
			</tr>
			<!--Nama !-->
			 <tr>
				<th style="text-align: center; vertical-align:middle;height:20; background-color:rgba(0, 95, 218, 0.3);text-align: center;">
					<div>		
						
					</div>
				</th>								
				<th style="text-align: center; vertical-align:middle;height:20; background-color:rgba(0, 95, 218, 0.3);text-align: center;">
					<div>		
						
					</div>
				</th>
				<th style="text-align: center; vertical-align:middle;height:20; background-color:rgba(0, 95, 218, 0.3);text-align: center;">
					<div>		
						
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



