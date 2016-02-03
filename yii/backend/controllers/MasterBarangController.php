<?php

namespace backend\controllers;

use Yii;
use backend\models\MasterBarang;
use backend\models\MasterBarangSearch;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;

/**
 * MasterBarangController implements the CRUD actions for MasterBarang model.
 */
class MasterBarangController extends Controller
{
    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        return [
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'delete' => ['POST'],
                ],
            ],
        ];
    }

    /**
     * Lists all MasterBarang models.
     * @return mixed
     */
    public function actionIndex()
    {
        $searchModel = new MasterBarangSearch();
        $dataProvider = $searchModel->search(Yii::$app->request->queryParams);

        return $this->render('index', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
        ]);
    }

    /**
     * Displays a single MasterBarang model.
     * @param string $ID
     * @param string $KD_BARANG
     * @return mixed
     */
    public function actionView($ID=null, $KD_BARANG=null)
    {
        return $this->render('view', [
            'model' => $this->findModel($ID, $KD_BARANG),
        ]);
    }

    /**
     * Creates a new MasterBarang model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return mixed
     */
    public function actionCreate()
    {
        $model = new MasterBarang();

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            return $this->redirect(['view', 'ID' => $model->ID, 'KD_BARANG' => $model->KD_BARANG]);
        } else {
            return $this->render('create', [
                'model' => $model,
            ]);
        }
    }

    /**
     * Updates an existing MasterBarang model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param string $ID
     * @param string $KD_BARANG
     * @return mixed
     */
    public function actionUpdate($ID, $KD_BARANG)
    {
        $model = $this->findModel($ID, $KD_BARANG);

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            return $this->redirect(['view', 'ID' => $model->ID, 'KD_BARANG' => $model->KD_BARANG]);
        } else {
            return $this->render('update', [
                'model' => $model,
            ]);
        }
    }

    /**
     * Deletes an existing MasterBarang model.
     * If deletion is successful, the browser will be redirected to the 'index' page.
     * @param string $ID
     * @param string $KD_BARANG
     * @return mixed
     */
    public function actionDelete($ID, $KD_BARANG)
    {
        $this->findModel($ID, $KD_BARANG)->delete();

        return $this->redirect(['index']);
    }

    /**
     * Finds the MasterBarang model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param string $ID
     * @param string $KD_BARANG
     * @return MasterBarang the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($ID, $KD_BARANG)
    {
        if (($model = MasterBarang::findOne(['ID' => $ID, 'KD_BARANG' => $KD_BARANG])) !== null) {
            return $model;
        } else {
            throw new NotFoundHttpException('The requested page does not exist.');
        }
    }
}
