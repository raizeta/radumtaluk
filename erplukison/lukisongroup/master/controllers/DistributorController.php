<?php

namespace lukisongroup\master\controllers;

use Yii;
use lukisongroup\master\models\Distributor;
use lukisongroup\master\models\DistributorSearch;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;

/**
 * DistributorController implements the CRUD actions for Distributor model.
 */
class DistributorController extends Controller
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
     * Lists all Distributor models.
     * @return mixed
     */
    public function actionIndex()
    {
        $searchModel = new DistributorSearch();
        $dataProvider = $searchModel->search(Yii::$app->request->queryParams);

        return $this->render('index', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
        ]);
    }

    /**
     * Displays a single Distributor model.
     * @param string $id
     * @return mixed
     */
    public function actionView($id)
    {
        return $this->renderAjax('view', [
            'model' => $this->findModel($id),
        ]);
    }

    /**
     * Creates a new Distributor model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return mixed
     */
    public function actioncreatea()
    {
        $model = new Distributor();	
		
        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            if (! Yii::$app->user->isGuest) {
            return $this->redirect(['view', 'id' => $model->ID]);
            }
        } else {
            return $this->render('create', [
                'model' => $model,
            ]);
        }
		
    }
	
	  public function actionCreate()
    {
        $model = new Distributor();	
		
        if ($model->load(Yii::$app->request->post()))
			{
			
		
				$kd = Yii::$app->esmcode->kdDbtr();
        
				$model->KD_DISTRIBUTOR = $kd;
				if($model->validate())
				{
				$model->CREATED_BY = Yii::$app->user->identity->username;
				$model->CREATED_AT =  date('Y-m-d H:i:s');
				$model->save();
					}
				
		
            return $this->redirect(['index']);
		}
		else {
            return $this->renderAjax('create', [
                'model' => $model,
            ]);
        }
	}
		
	
	

    public function actionSimpan()
    {
        $model = new Distributor();
		$model->load(Yii::$app->request->post());
		
        $kd = Yii::$app->esmcode->kdDbtr();
        
		$model->KD_DISTRIBUTOR = $kd;
		$model->save();
		return $this->redirect(['view', 'id' => $model->ID]);
    }
	
    /**
     * Updates an existing Distributor model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param string $id
     * @return mixed
     */

	  public function actionUpdate($id)
    {
        $model = $this->findModel($id);

        if ($model->load(Yii::$app->request->post()) ) {
			  
			if($model->validate())
			{
				$model->UPDATED_AT = Yii::$app->user->identity->username;
					$model->save();
			}
		
            return $this->redirect(['index']);
        } else {
            return $this->renderAjax('update', [
                'model' => $model,
            ]);
        }
    }
	
	
    public function actionapdate($id)
    {
        $model = $this->findModel($id);

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            if (! Yii::$app->user->isGuest) {
            return $this->redirect(['view', 'id' => $model->ID]);
            } 
        } else {
            return $this->renderAjax('update', [
                'model' => $model,
            ]);
        }
    }

    /**
     * Deletes an existing Distributor model.
     * If deletion is successful, the browser will be redirected to the 'index' page.
     * @param string $id
     * @return mixed
     */
    public function actionDelete($id)
    {
		$model = Distributor::find()->where(['ID'=>$id])->one();
		$model->STATUS = '3';
		$model->UPDATED_BY = Yii::$app->user->identity->username;
		$model->save();

        return $this->redirect(['index']);
    }

    /**
     * Finds the Distributor model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param string $id
     * @return Distributor the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($id)
    {
        if (($model = Distributor::findOne($id)) !== null) {
            return $model;
        } else {
            throw new NotFoundHttpException('The requested page does not exist.');
        }
    }
}
