<?php

namespace lukisongroup\purchasing\controllers;

use yii;
use yii\web\Request;
use yii\db\Query;
//use yii\data\ActiveDataProvider;
use yii\data\ArrayDataProvider;
use yii\helpers\ArrayHelper;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;
use yii\helpers\Json;
use yii\helpers\Url;
use yii\widgets\Pjax;
use kartik\mpdf\Pdf;

use lukisongroup\purchasing\models\ro\Requestorder;
use lukisongroup\purchasing\models\ro\RequestorderSearch;
use lukisongroup\purchasing\models\ro\Rodetail;
use lukisongroup\purchasing\models\ro\RodetailSearch;
use lukisongroup\purchasing\models\ro\LoginForm;
use lukisongroup\purchasing\models\ro\AdditemValidation;

use lukisongroup\hrd\models\Employe;
use lukisongroup\esm\models\Barang;
use lukisongroup\master\models\Barangumum;
use lukisongroup\master\models\Kategori;


/**
 * RequestorderController implements the CRUD actions for Requestorder model.
 */
class RequestOrderController extends Controller
{
    public function behaviors()
    {
        return [
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'delete' => ['post'],
                ],
            ],
        ];
    }
	/**
     * Before Action Index
	 * @author ptrnov  <piter@lukison.com>
	 * @since 1.1
     */
	public function beforeAction(){
			if (Yii::$app->user->isGuest)  {
				 Yii::$app->user->logout();
                   $this->redirect(array('/site/login'));  //
			}
            // Check only when the user is logged in
            if (!Yii::$app->user->isGuest)  {
               if (Yii::$app->session['userSessionTimeout']< time() ) {
                   // timeout
                   Yii::$app->user->logout();
                   $this->redirect(array('/site/login'));  //
               } else {
                   //Yii::$app->user->setState('userSessionTimeout', time() + Yii::app()->params['sessionTimeoutSeconds']) ;
				   Yii::$app->session->set('userSessionTimeout', time() + Yii::$app->params['sessionTimeoutSeconds']);
                   return true; 
               }
            } else {
                return true;
            }
    }
	
   /**
     * Index 
     * @author ptrnov  <piter@lukison.com>
     * @since 1.1
     */
    public function actionIndex()
    {
		//Check componen generate kode RO
		//print_r(\Yii::$app->ambilkonci->getRoCode());
		
		
		//function getPermission(){
			//return Yii::$app->getUserOpt->Modul_akses(1); 
			
		//}
		//$getPermission=Yii::$app->getUserOpt->Modul_akses(1); 
		$searchModel = new RequestorderSearch();
		/*  if (isset($_GET['param'])){
			  $dataProvider = $searchModel->searchChildRo(Yii::$app->request->queryParams,$_GET['param']);
		}else{
			$dataProvider = $searchModel->searchChildRo(Yii::$app->request->queryParams);
		}  */
        
		//$searchModel->KD_RO ='2015.12.04.RO.0070';
		$dataProvider = $searchModel->searchRo(Yii::$app->request->queryParams);
		  return $this->render('index', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
			//'getPermission'=> $getPermission,
        ]);
		
		
    }	
	
    /**
     * Creates a new Requestorder model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @author ptrnov  <piter@lukison.com>
     * @since 1.1
     */   
    public function actionCreate()
    {
		$roDetail = new Rodetail();	
		$roHeader = new Requestorder();
            return $this->renderAjax('_form', [
                'roDetail' => $roDetail,
				'roHeader' => $roHeader,
            ]);	
		
    }
	
	/**
     * Edit Form - Add Item Barang | Tambah Barang
     * @author ptrnov  <piter@lukison.com>
     * @since 1.1
     */   
    public function actionAdditem($kd)
    {
			//$roDetail = new Rodetail();
			$roDetail = new AdditemValidation();
			$roHeader = Requestorder::find()->where(['KD_RO' => $kd])->one();		
			$detro = $roHeader->detro;
			$employ = $roHeader->employe;
			$dept = $roHeader->dept;
			
			/*
			 * Convert $roHeader->detro to ArrayDataProvider | Identity 'key' => 'ID',
			 * @author ptrnov  <piter@lukison.com>
			 * @since 1.1    
			**/
			 $detroProvider = new ArrayDataProvider([
				'key' => 'ID',
				'allModels'=>$detro,			
				'pagination' => [
					'pageSize' => 10,
				],
			]);
			
			return $this->renderAjax('additem', [         
				'roHeader' => $roHeader, 
				'roDetail' => $roDetail,			
				'dataProvider'=>$detroProvider,
			]); 
			
    }
	/**
     * Add Item Barang to SAVED | AJAX
     * @author ptrnov  <piter@lukison.com>
     * @since 1.1
     */
	public function actionAdditem_saved(){
		//$roDetail = new Rodetail();	
		$roDetail = new AdditemValidation();
		
		if(Yii::$app->request->isAjax){
			$roDetail->load(Yii::$app->request->post());
			return Json::encode(\yii\widgets\ActiveForm::validate($roDetail));
		}else{
			if($roDetail->load(Yii::$app->request->post())){
				if($roDetail->additem_saved()){
					$hsl = \Yii::$app->request->post();	
					$kdro = $hsl['AdditemValidation']['kD_RO'];					
					return $this->redirect(['/purchasing/request-order/edit?kd='.$kdro]);
				}
				//Request Result
			/*	$hsl = \Yii::$app->request->post();
				$kdRo = $hsl['Rodetail']['KD_RO'];
				$kdBarang = $hsl['Rodetail']['KD_BARANG'];
				$nmBarang = Barangumum::findOne(['KD_BARANG' => $kdBarang]);
				$kdUnit = $hsl['Rodetail']['UNIT'];
				$rqty = $hsl['Rodetail']['RQTY'];			
				$note = $hsl['Rodetail']['NOTE'];
				
					//Request Put
					$roDetail->CREATED_AT = date('Y-m-d H:i:s');
					$roDetail->KD_RO = $kdRo;
					$roDetail->KD_BARANG = $kdBarang;
					$roDetail->NM_BARANG = $nmBarang->NM_BARANG;
					$roDetail->UNIT = $kdUnit;			
					$roDetail->RQTY = $rqty;
					$roDetail->NOTE = $note;
					$roDetail->STATUS = 0;
					$roDetail->save();				
				return $this->redirect(['/purchasing/request-order/edit?kd='.$kdRo]);*/
			} 
		}
	}
   
	
	
	
	/**
     * actionBrgkat() select2 Kategori mendapatkan barang
     * @author ptrnov  <piter@lukison.com>
     * @since 1.1
     */
	public function actionBrgkat() {
		$out = [];
		if (isset($_POST['depdrop_parents'])) {
			$parents = $_POST['depdrop_parents'];
			if ($parents != null) {
				$kat_id = $parents[0];
				$model = Barangumum::find()->asArray()->where(['KD_KATEGORI'=>$kat_id])->all();
				foreach ($model as $key => $value) {
					   $out[] = ['id'=>$value['KD_BARANG'],'name'=> $value['NM_BARANG']];
				   }
	 
				   echo json_encode(['output'=>$out, 'selected'=>'']);
				   return;
			   }
		   }
		   echo Json::encode(['output'=>'', 'selected'=>'']);
	}		
	
	/**
     * actionBrgkat() select2 barang mendapatkan unit barang
     * @author ptrnov  <piter@lukison.com>
     * @since 1.1
     */
	public function actionBrgunit() {
		$out = [];
		if (isset($_POST['depdrop_parents'])) {
			    $ids = $_POST['depdrop_parents'];
				$kat_id = empty($ids[0]) ? null : $ids[0];
				$brg_id = empty($ids[1]) ? null : $ids[1];
				if ($brg_id != null) {
					$brgu = new Barangumum();
					$model = Barangumum::find()->where("KD_BARANG='". $brg_id. "'")->one();
					$brgUnit = $model->unit;
					//foreach ($brgUnit as $value) {
						   //$out[] = ['id'=>$value['UNIT'],'name'=> $value['NM_UNIT']];
						   $out[] = ['id'=>$brgUnit->KD_UNIT,'name'=> $brgUnit->NM_UNIT];
						   //$out[] = ['id'=>'E07','name'=> $value->NM_UNIT];
					 // }
		 
					   echo json_encode(['output'=>$out, 'selected'=>'']);
					   return;
				   }
		   }
		   echo Json::encode(['output'=>'', 'selected'=>'']);
	}	
	
	/*
	 * actionSimpanfirst() <- actionCreate()
	 * First Create RO |  Requestorder | Rodetail
	 * Add: component Yii::$app->getUserOpt->Profile_user()
	 * Add: component \Yii::$app->ambilkonci->getRoCode();
	 * @author ptrnov  <piter@lukison.com>
     * @since 1.1
	**/
	public function actionSimpanfirst(){				
						
				$cons = \Yii::$app->db_esm;				
				$roHeader = new Requestorder();				
				//$reqorder = new Roatribute();
				$roDetail = new Rodetail();
				$profile= Yii::$app->getUserOpt->Profile_user();
				
				//if($roDetail->load(Yii::$app->request->post()) && $roDetail->validate()){		
			if($roDetail->load(Yii::$app->request->post())){		
				$hsl = \Yii::$app->request->post();				
				$kdUnit = $hsl['Rodetail']['UNIT'];
				$kdBarang = $hsl['Rodetail']['KD_BARANG'];
				$nmBarang = Barangumum::findOne(['KD_BARANG' => $kdBarang]);
				$rqty = $hsl['Rodetail']['RQTY'];
				$note = $hsl['Rodetail']['NOTE'];
				
				/*
				 * Detail Request Order
				**/
				$roDetail->KD_RO = \Yii::$app->ambilkonci->getRoCode();
				$roDetail->UNIT = $kdUnit;
				$roDetail->CREATED_AT = date('Y-m-d H:i:s');
				$roDetail->NM_BARANG = $nmBarang->NM_BARANG;
				$roDetail->KD_BARANG = $kdBarang;
				$roDetail->RQTY = $rqty;
				$roDetail->NOTE = $note;
				$roDetail->STATUS = 0;
				
				/*
				 * Header Request Order
				**/
				$getkdro=\Yii::$app->ambilkonci->getRoCode();
				$roHeader->KD_RO =$getkdro;
				$roHeader->CREATED_AT = date('Y-m-d H:i:s');
				$roHeader->TGL = date('Y-m-d');
				$roHeader->ID_USER = $profile->emp->EMP_ID;
				$roHeader->EMP_NM = $profile->emp->EMP_NM .' ' .$profile->emp->EMP_NM_BLK;
				$roHeader->KD_CORP = $profile->emp->EMP_CORP_ID;
				$roHeader->KD_DEP = $profile->emp->DEP_ID;
				$roHeader->SIG1_SVGBASE64 = $profile->emp->SIGSVGBASE64;
				$roHeader->SIG1_SVGBASE30 = $profile->emp->SIGSVGBASE30;
				$roHeader->STATUS = 0;
					$transaction = $cons->beginTransaction();
					try {
						if (!$roDetail->save()) {
								$transaction->rollback();
								return false;
						}
						
						if (!$roHeader->save()) {
								$transaction->rollback();
								return false;
						}
						$transaction->commit();
					} catch (Exception $ex) {
						//print_r("error");
						$transaction->rollback();
						return false;						   
					}
					//return $this->redirect(['index','param'=>$getkdro]); 		
					//return $this->redirect(['index?RequestorderSearch[KD_RO]='.$getkdro]);
					return $this->redirect(['/purchasing/request-order/view?kd='.$getkdro]);
			}else{
				return $this->redirect(['index']);
		}
				
	}
		
	/**
     * Add Request Detail
     * @author ptrnov  <piter@lukison.com>
     * @since 1.1
     */
	public function actionTambah($kd)
    {		
		$searchModel = new RodetailSearch();
        $dataProvider = $searchModel->searchChildRo(Yii::$app->request->queryParams,$kd);
		$roHeader = Requestorder::find()->where(['KD_RO' => $kd])->one();
		$roDetail = new Rodetail();	
            return $this->renderAjax('_update', [                
						'roHeader' => $roHeader,
						'roDetail' => $roDetail,
						'detro' => $roHeader->detro,						
						'searchModel'=>$searchModel,
						'dataProvider'=>$dataProvider
					]);			
    }	
	
	/*
	 * actionSimpansecondt() <- actionTambah($kd)
	 * First Create RO |Rodetail
	 * Add: component Yii::$app->getUserOpt->Profile_user()
	 * Add: component \Yii::$app->ambilkonci->getRoCode();
	 * @author ptrnov  <piter@lukison.com>
     * @since 1.1
	**/
	public function actionSimpantambah(){
		$roDetail = new Rodetail();
		if($roDetail->load(Yii::$app->request->post()) && $roDetail->validate()){
			$hsl = \Yii::$app->request->post();	
			$kdro = $hsl['Rodetail']['KD_RO'];				
			$kdBarang = $hsl['Rodetail']['KD_BARANG'];
			$nmBarang = Barangumum::findOne(['KD_BARANG' => $kdBarang]);
			$kdUnit = $hsl['Rodetail']['UNIT'];
			$rqty = $hsl['Rodetail']['RQTY'];
			$note = $hsl['Rodetail']['NOTE'];
			
			/*
			 * Detail Request Order
			**/
			$roDetail->KD_RO = $kdro;
			$roDetail->CREATED_AT = date('Y-m-d H:i:s');				
			$roDetail->NM_BARANG = $nmBarang->NM_BARANG;
			$roDetail->KD_BARANG = $kdBarang;
			$roDetail->UNIT = $kdUnit;
			$roDetail->RQTY = $rqty;
			$roDetail->NOTE = $note;
			$roDetail->STATUS = 0;
			$roDetail->save();
			
			return $this->redirect(['index?RequestorderSearch[KD_RO]='.$kdro]);
		}else{
			return $this->redirect(['index']);
		}
	}
	
	 /**
     * View Requestorder & Detail
     * @param string $id
	 * @author ptrnov  <piter@lukison.com>
     * @since 1.1
     */
    public function actionView($kd)
    {
    	$ro = new Requestorder();
		$roHeader = Requestorder::find()->where(['KD_RO' => $kd])->one();
		if(count($roHeader['KD_RO'])<>0){
			$detro = $roHeader->detro;
			$employ = $roHeader->employe;
			$dept = $roHeader->dept;
			
			/*
			 * Convert $roHeader->detro to ArrayDataProvider | Identity 'key' => 'ID',
			 * @author ptrnov  <piter@lukison.com>
			 * @since 1.1    
			**/
			$detroProvider = new ArrayDataProvider([
				'key' => 'ID',
				'allModels'=>$detro,			
				'pagination' => [
					'pageSize' => 10,
				],
			]);
			
			return $this->render('view', [
				'roHeader' => $roHeader,
				'detro' => $detro,
				'employ' => $employ,
				'dept' => $dept,
				'dataProvider'=>$detroProvider,
			]);   
		}else{
			return $this->redirect('index');
		}
    }
	
	/**
     * Prosess Edit RO | Change Colomn Row | Tambah Row
     * @param string $id
     * @author ptrnov  <piter@lukison.com>
     * @since 1.1
     */
	public function actionEdit($kd)
    {
		/*
		 * Init Models
		 * @author ptrnov  <piter@lukison.com>
		 * @since 1.1    
		**/
		$roHeader = Requestorder::find()->where(['KD_RO' =>$kd])->one();
		if(count($roHeader['KD_RO'])<>0){
			$detro = $roHeader->detro;
			$employ = $roHeader->employe;
			$dept = $roHeader->dept;
			
			/*
			 * Convert $roHeader->detro to ArrayDataProvider | Identity 'key' => 'ID',
			 * @author ptrnov  <piter@lukison.com>
			 * @since 1.1    
			**/
			$detroProvider = new ArrayDataProvider([
				'key' => 'ID',
				'allModels'=>$detro,			
				'pagination' => [
					'pageSize' => 10,
				],
			]);
			
			/*
			 * Process Editable Row [Columm SQTY]
			 * @author ptrnov  <piter@lukison.com>
			 * @since 1.1    
			**/
			if (Yii::$app->request->post('hasEditable')) {
				$id = Yii::$app->request->post('editableKey');
				$model = Rodetail::findOne($id);
				$out = Json::encode(['output'=>'', 'message'=>'']);
				$post = [];
				$posted = current($_POST['Rodetail']);
				$post['Rodetail'] = $posted;
				if ($model->load($post)) {
					$model->save();
					$output = '';
					if (isset($posted['RQTY'])) {
						$output = $model->RQTY;
					}
					if (isset($posted['SQTY'])) {
						$output = $model->SQTY;
					}
					if (isset($posted['NOTE'])) {
					   // $output =  Yii::$app->formatter->asDecimal($model->EMP_NM, 2);
						$output = $model->NOTE;
					}
					$out = Json::encode(['output'=>$output, 'message'=>'']);
				}
				// return ajax json encoded response and exit
				echo $out;
				return;
			}
			
			/*
			 * Render Approved View
			 * @author ptrnov  <piter@lukison.com>
			 * @since 1.1    
			**/
			return $this->render('edit', [
				'roHeader' => $roHeader,
				'detro' => $detro,
				'employ' => $employ,
				'dept' => $dept,
				'dataProvider'=>$detroProvider,
			]);		
		}else{
			return $this->redirect('index');
		}
    }
	
	/**
     * Cetak PDF Approvad
     * @param string $id
     * @return mixed
	 * @author ptrnov  <piter@lukison.com>
     * @since 1.1
     */
	public function actionCetakpdf($kd,$v){
    	$roHeader = Requestorder::find()->where(['KD_RO' => $kd])->one(); /*Noted check by status approval =1 header table | chek error record jika kosong*/
		$detro = $roHeader->detro;
        $employ = $roHeader->employe;
		$dept = $roHeader->dept;
		if ($v==101){
			$filterPdf="KD_RO='".$kd."' AND (STATUS='101' OR STATUS='10')";
		}elseif($v!=101){
			$filterPdf="KD_RO='".$kd."' AND STATUS<>'3'";
		}
		$roDetail = Rodetail::find()->where($filterPdf)->all();
		
		/* PR Filter Status Output to Grid print*/
		$dataProvider = new ArrayDataProvider([
			'key' => 'ID',
			'allModels'=>$roDetail,//$detro,			
			'pagination' => [
				'pageSize' => 20,
			],
		]);
		
		//PR
		//$dataProviderFilter = $dataProvider->getModels();
		
		/* $StatusFilter = ["101","10"];
        $test1 = ArrayHelper::where($dataProviderFilter, function($key, $StatusFilter) {
             return is_string($value);
        });
		print_r($test1); */
		
		$content = $this->renderPartial( 'pdfview', [
            'roHeader' => $roHeader,
            'detro' => $detro,
            'employ' => $employ,
			'dept' => $dept,
			'dataProvider' => $dataProvider,
        ]);
		
		$pdf = new Pdf([
			// set to use core fonts only
			'mode' => Pdf::MODE_CORE, 
			// A4 paper format
			'format' => Pdf::FORMAT_A4, 
			// portrait orientation
			'orientation' => Pdf::ORIENT_PORTRAIT, 
			// stream to browser inline
			'destination' => Pdf::DEST_BROWSER, 
			// your html content input
			'content' => $content,  
			// format content from your own css file if needed or use the
			// enhanced bootstrap css built by Krajee for mPDF formatting 
			//D:\xampp\htdocs\advanced\lukisongroup\web\widget\pdf-asset
			'cssFile' => '@lukisongroup/web/widget/pdf-asset/kv-mpdf-bootstrap.min.css',
			// any css to be embedded if required
			'cssInline' => '.kv-heading-1{font-size:12px}', 
			 // set mPDF properties on the fly
			'options' => ['title' => 'Form Request Order','subject'=>'ro'],
			 // call mPDF methods on the fly
			'methods' => [ 
				'SetHeader'=>['Copyright@LukisonGroup '.date("r")], 
				'SetFooter'=>['{PAGENO}'],
			]
		]);		
		return $pdf->render(); 		
	}
	
	/**
	 * On Approval View
	 * Approved_rodetail | Rodetail->ID |  $roDetail->STATUS = 101;
	 * Approved = 101
	 * @author ptrnov  <piter@lukison.com>
     * @since 1.1
     */
	public function actionApproved_rodetail()
    {
		if (Yii::$app->request->isAjax) {
			$request= Yii::$app->request;
			$id=$request->post('id');
			//\Yii::$app->response->format = Response::FORMAT_JSON;
			$roDetail = Rodetail::findOne($id);
			$roDetail->STATUS = 101;
			//$ro->NM_BARANG=''
			$roDetail->save();
			return true;
		}
   }
	
	/**
	 * On Approval View
	 * Reject_rodetail | Rodetail->ID |  $roDetail->STATUS = 4;
	 * Reject = 4
	 * @author ptrnov  <piter@lukison.com>
     * @since 1.1
     */
	public function actionReject_rodetail()
    {
		if (Yii::$app->request->isAjax) {
			$request= Yii::$app->request;
			$id=$request->post('id');
			$roDetail = Rodetail::findOne($id);
			$roDetail->STATUS = 4;
			$roDetail->save();
			return true;
		}
     }
	
	/**
	 * On Approval View
	 * Canclet_rodetail | Rodetail->ID |  $roDetail->STATUS = 4;
	 * Cancel = 0
	 * @author ptrnov  <piter@lukison.com>
     * @since 1.1
     */
	public function actionCancel_rodetail()
    {
		if (Yii::$app->request->isAjax) {
			$request= Yii::$app->request;
			$id=$request->post('id');
			$roDetail = Rodetail::findOne($id);
			$roDetail->STATUS = 0;
			$roDetail->save();
			return true;
		}
     }
	/**
     * Hapus Ro
     * @param string $id
     * @return mixed
	 * @author ptrnov  <piter@lukison.com>
     * @since 1.1
     */
	public function actionHapus_item($kode,$id)
    {
		new Rodetail();
		$ro = Rodetail::findOne($id);
		$ro->STATUS = 3;
		$ro->save();

       //$this->findModel($id)->delete();
		return $this->redirect(['buatro','id'=>$kode]);
    }
	
	/**
     * Action Prosess Approval Colomn Row
     * @param string $id
     * @author ptrnov  <piter@lukison.com>
     * @since 1.1
     */
	public function actionApproved($kd)
    {
		/*
		 * Init Models
		 * @author ptrnov  <piter@lukison.com>
		 * @since 1.1    
		**/
		//$ro = new Requestorder();
		$roHeader = Requestorder::find()->where(['KD_RO' =>$kd])->one();
		$detro = $roHeader->detro;
		$employ = $roHeader->employe;
		$dept = $roHeader->dept;
		
		/*
		 * Convert $roHeader->detro to ArrayDataProvider | Identity 'key' => 'ID',
		 * @author ptrnov  <piter@lukison.com>
		 * @since 1.1    
		**/
		$detroProvider = new ArrayDataProvider([
			'key' => 'ID',
			'allModels'=>$detro,			
			'pagination' => [
				'pageSize' => 10,
			],
		]);
		
		/*
		 * Process Editable Row [Columm SQTY]
		 * @author ptrnov  <piter@lukison.com>
		 * @since 1.1    
		**/
		if (Yii::$app->request->post('hasEditable')) {
            $id = Yii::$app->request->post('editableKey');
            $model = Rodetail::findOne($id);
			$out = Json::encode(['output'=>'', 'message'=>'']);
            $post = [];
            $posted = current($_POST['Rodetail']);
            $post['Rodetail'] = $posted;
            if ($model->load($post)) {
                $model->save();
				$output = '';
                if (isset($posted['RQTY'])) {
                    $output = $model->RQTY;
                }
				if (isset($posted['SQTY'])) {
					$output = $model->SQTY;
                }
				if (isset($posted['NOTE'])) {
                   // $output =  Yii::$app->formatter->asDecimal($model->EMP_NM, 2);
					$output = $model->NOTE;
                }
                $out = Json::encode(['output'=>$output, 'message'=>'']);
            }
            // return ajax json encoded response and exit
            echo $out;
            return;
        }
		
		/*
		 * Render Approved View
		 * @author ptrnov  <piter@lukison.com>
		 * @since 1.1    
		**/
		return $this->render('approved', [
            'roHeader' => $roHeader,
            'detro' => $detro,
            'employ' => $employ,
			'dept' => $dept,
			'dataProvider'=>$detroProvider,
        ]);		
		
    }
	
	public function actionApproved_authorize($kd){		
		$loginform = new LoginForm();					
		$roHeader = Requestorder::find()->where(['KD_RO' =>$kd])->one();
		$employe = $roHeader->employe;			
			return $this->renderAjax('login_signature', [
				'roHeader' => $roHeader,
				'employe' => $employe,
				'loginform' => $loginform,
			]);
	}
	
	/*
	 * Sign Approval Status = 101
	 * Class Model Requestorder->Status = 101 [Approvad]
	 * Class Model Rodetail->Status 	= 101 [Approvad]
	 * @author ptrnov  <piter@lukison.com>
	 * @since 1.1    
	**/
	//public function actionApproved_sign(){
	public function actionApprovedAuthorizeSave(){
		$loginform = new LoginForm();		
		/*Ajax Load*/
		if(Yii::$app->request->isAjax){
			$loginform->load(Yii::$app->request->post());
			return Json::encode(\yii\widgets\ActiveForm::validate($loginform));
		}else{	/*Normal Load*/	
			if($loginform->load(Yii::$app->request->post())){
				if ($loginform->loginform_saved()){
					$hsl = \Yii::$app->request->post();
					$kdro = $hsl['LoginForm']['kdro'];
					return $this->redirect(['/purchasing/request-order/approved','kd'=>$kdro]);
				}														
			}
		}
	}
	
	/**
     * Updates an existing Requestorder model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param string $id
     * @return mixed
     */
    public function actionUpdate($id)
    {
        $model = $this->findModel($id);

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            return $this->redirect(['view', 'id' => $model->ID]);
        } else {
            return $this->render('update', [
                'model' => $model,
            ]);
        }
    }
	
	/*
	 * Hapus RO |Header|Detail|
	 * STATUS =3 [DELETE]
	 * @author ptrnov  <piter@lukison.com>
	 * @since 1.1    
	**/
    public function actionHapusro($kd)
    {
		$model =Requestorder::find()->where(['KD_RO' =>$kd])->one();
		$model->STATUS=3;
		$model->save();
		
		$model =Rodetail::find()->where(['KD_RO' =>$kd])->one();
		$model->STATUS=3;
		$model->save();
		return Yii::$app->getResponse()->redirect(['/purchasing/request-order/index']);
    }

    /**
     * Deletes an existing Requestorder model.
     * If deletion is successful, the browser will be redirected to the 'index' page.
     * @param string $id
     * @return mixed
     */
    public function actionDelete($id)
    {
        $this->findModel($id)->delete();

        return $this->redirect(['index']);
    }

	
    public function actionCreatepo()
    {
        return $this->render('createpo');
    }

	
	
	
	
    /**
     * Finds the Requestorder model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param string $id
     * @return Requestorder the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($id)
    {
        if (($model = Requestorder::findOne($id)) !== null) {
            return $model;
        } else {
            throw new NotFoundHttpException('The requested page does not exist.');
        }
    }
}
