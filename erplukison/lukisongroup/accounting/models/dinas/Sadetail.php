<?php

namespace lukisongroup\accounting\models\dinas;

use Yii;
use lukisongroup\accounting\models\dinas\Salesorder;
use lukisongroup\master\models\Unitbarang;
/**
 * This is the model class for table "r0003".
 *
 * @property string $ID
 * @property string $KD_RO
 * @property string $KD_BARANG
 * @property string $NM_BARANG
 * @property integer $QTY
 * @property string $NO_URUT
 * @property string $NOTE
 * @property integer $STATUS
 * @property string $CREATED_AT
 * @property string $UPDATED_AT
 */
class Sadetail extends \yii\db\ActiveRecord
{
	public $KD_KATEGORI;
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'sa0002';
    }

    /**
     * @return \yii\db\Connection the database connection used by this AR class.
     */
    public static function getDb()
    {
        return Yii::$app->get('db_esm');
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
 			[['KD_SA','RQTY','UNIT','KD_BARANG'], 'required'],
		    [['STATUS'], 'integer'],
            [['NOTE','UNIT','KD_BARANG'], 'string'],
            [['RQTY','SQTY','CREATED_AT', 'UPDATED_AT'], 'safe'],
            [['KD_SA', 'KD_BARANG'], 'string', 'max' => 50],
            [['NM_BARANG', 'NO_URUT'], 'string', 'max' => 255]
        ];
    }
	
/* 	public static function primaryKey()
    {
      return ['ID'];
    } */
	
	public function getParentsa()
    {
        return $this->hasOne(Salesorder::className(), ['KD_SA' => 'KD_SA']);
    }
	
	public function getCunit()
    {
        return $this->hasOne(Unitbarang::className(), ['KD_UNIT' => 'UNIT']);
    }
	
    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'UNIT' => 'Satuan Barang',
            'KD_SA' => 'Kode.SA',
            'KD_BARANG' => 'Kode Barang',
            'NM_BARANG' => 'Nama  Barang',
            'RQTY' => 'Request Quantity',
            'SQTY' => 'Submit Quantity',
            'NO_URUT' => 'No  Urut',
            'NOTE' => 'Catatan',
            'STATUS' => 'Status',
            'CREATED_AT' => 'Created  At',
            'UPDATED_AT' => 'Updated  At',
        ];
    }
}
