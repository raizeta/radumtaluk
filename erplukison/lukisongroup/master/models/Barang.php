<?php

namespace lukisongroup\master\models;

use Yii;
use yii\web\UploadedFile;
use lukisongroup\hrd\models\Corp;
use lukisongroup\master\models\Tipebarang;
use lukisongroup\master\models\Kategori;
use lukisongroup\master\models\Suplier ;
/**
 * This is the model class for table "b0001".
 *
 * @property string $ID
 * @property string $KD_BARANG
 * @property string $NM_BARANG
 * @property string $KD_SUPPLIER
 * @property string $KD_DISTRIBUTOR
 * @property string $HPP
 * @property integer $harga
 * @property integer $barcode
 * @property integer $note
 * @property integer $status
 * @property integer $createdBy
 * @property integer $createdAt
 * @property integer $updateAt
 * @property string $data_all
 */
 
Yii::$app->params['uploadPath'] = Yii::$app->basePath . '/web/upload/barang/';
Yii::$app->params['uploadUrl'] = Yii::$app->urlManager->baseUrl . '/web/upload/barang/';
 
class Barang extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */

	public $image;

    public static function tableName()
    {
        return 'b0001';
    }

    /**
     * @return \yii\db\Connection the database connection used by this AR class.
     */
    public static function getDb()
    {
        return Yii::$app->get('db_esm');
    }
	
    public function getUnitb()
    {
        return $this->hasOne(Unitbarang::className(), ['KD_UNIT' => 'KD_UNIT']);
    }
    public function getUnitbrg()
    {
        return $this->unitb->NM_UNIT;
    }



    public function getTipebg()
    {
        return $this->hasOne(Tipebarang::className(), ['KD_TYPE' => 'KD_TYPE']);
    }
    public function getTipebrg()
    {
        return $this->tipebg->NM_TYPE;
    }
    

	public function getKategori()
    {
        return $this->hasOne(Kategori::className(), ['KD_KATEGORI' => 'KD_KATEGORI']);
    }
	public function getNmkategori()
    {
        return $this->kategori->NM_KATEGORI;
    }
	


	 public function getSup()
    {
        return $this->hasOne(Suplier::className(), ['KD_SUPPLIER' => 'KD_SUPPLIER']);
    } 
	 public function getNmsuplier()
    {
        return $this->sup->NM_SUPPLIER;
    } 
	
	public function getBrg()
    {
        return $this->hasOne(Barangmaxi::className(), ['KD_BARANG' => 'NM_BARANG']);
    }
	
	public function getTbesm()
    {
        return $this->hasMany(Barang::className(), ['KD_BARANG' => 'KD_TYPE']);
    }
	
	
	public function getCorp()
    {
       return $this->hasOne(Corp::className(), ['CORP_ID' => 'KD_CORP']);
    }
	
	public function getNmcorp()
    {
        return $this->corp->CORP_NM;
    }
	
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['KD_CORP','KD_SUPPLIER', 'KD_TYPE', 'KD_KATEGORI','KD_BARANG', 'NM_BARANG', 'KD_UNIT','STATUS'], 'required'],
            [['HARGA_SPL','HARGA_PABRIK', 'HARGA_LG','HARGA_DIST','HARGA_SALES'], 'safe'],
			[['PARENT', 'STATUS'], 'integer'],
			[['nmcorp','BARCODE64BASE','KD_CAB','KD_DEP','DATA_ALL'], 'safe'],
            [['CREATED_BY','CREATED_AT','UPDATED_BY','UPDATED_AT'], 'safe'],
			[['image'], 'file', 'extensions'=>'jpg, gif, png'],
        ];
    }

    public function getImageFile() 
    {
        return isset($this->IMAGE) ? Yii::$app->params['uploadPath'] . $this->IMAGE : null;
    }
	
    public function getImageUrl() 
    {
        // return a default image placeholder if your source IMAGE is not found
        $IMAGE = isset($this->IMAGE) ? $this->IMAGE : 'default_user.jpg';
        return Yii::$app->params['uploadUrl'] . $IMAGE;
    }
	
	public function uploadImage() {
        // get the uploaded file instance. for multiple file uploads
        // the following data will return an array (you may need to use
        // getInstances method)
        $image = UploadedFile::getInstance($this, 'image');
 
        // if no image was uploaded abort the upload
        if (empty($image)) {
            return false;
        }
 
        // store the source file name
        //$this->filename = $image->name;
        $ext = end((explode(".", $image->name)));
 
        // generate a unique file name
        $this->IMAGE = 'lukison-'.date('ymdHis').".{$ext}"; //$image->name;//Yii::$app->security->generateRandomString().".{$ext}";
 
        // the uploaded image instance
        return $image;
    }
 
    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'ID' => 'ID',
            'KD_TYPE' => 'Type',
            'KD_BARANG' => 'SKU',
            'KD_SUPPLIER' => 'Nama Supplier',
            'KD_KATEGORI' => 'Category',
            'NM_BARANG' => 'Nama Barang',
            'KD_UNIT' => 'Unit',
            'NOTE' => 'Note',
            'STATUS' => 'Status',
			'HARGA_PABRIK'=>'Factory Price',
			'HARGA_LG'=>'LG Price',
			'HARGA_DIST'=>'Distributor Price',
			'HARGA_SALES'=>'Sales Price',
            'BARCODE64BASE' => 'Barcode',
            'CREATED_BY' => 'Created By',
            'CREATED_AT' => 'Created At',
            'UPDATED_AT' => 'Update At',
            'DATA_ALL' => 'Data All',
            'nmsuplier' => Yii::t('app', 'Supplier'),
            'unitbrg' => Yii::t('app', 'Unit'),
            'tipebrg' => Yii::t('app', 'Tipe Barang'),
            'nmkategori' => Yii::t('app', 'Kategori'),
        ];
    }
}
