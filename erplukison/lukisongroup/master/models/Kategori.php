<?php

namespace lukisongroup\master\models;

use Yii;
use lukisongroup\hrd\models\Corp;
use lukisongroup\master\models\Tipebarang;
/**
 * This is the model class for table "b1002".
 *
 * @property string $id
 * @property string $kd_kategori
 * @property string $NM_KATEGORI
 * @property string $NOTE
 * @property string $created_by
 * @property string $created_at
 * @property string $updated_by
 * @property string $updated_at
 * @property integer $status
 */
class Kategori extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'dbc002.b1002';
    }

    /**
     * @return \yii\db\Connection the database connection used by this AR class.
     */
    public static function getDb()
    {
        return Yii::$app->get('db_esm');
    }

	public function getCorp()
    {
       return $this->hasOne(Corp::className(), ['CORP_ID' => 'CORP_ID']);
    }
	
	public function getTypebrg()
    {
       return $this->hasOne(Tipebarang::className(), ['KD_TYPE' => 'KD_TYPE']);
    }
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['KD_KATEGORI', 'NM_KATEGORI','PARENT','STATUS'], 'required'],
            [['NM_KATEGORI'],'match','pattern'=> '/^[A-Za-z0-9_ ]+$/u','message'=> 'only [a-zA-Z0-9_].'],
            [['NOTE'], 'string'],
            [['CREATED_AT', 'UPDATED_AT','KD_TYPE','CORP_ID'], 'safe'],
            [['STATUS'], 'integer'],
            [['KD_KATEGORI'], 'string', 'max' => 5],
            [['NM_KATEGORI'], 'string', 'max' => 200],
            [['CREATED_BY', 'UPDATED_BY'], 'string', 'max' => 100]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'ID' => 'ID',
            'KD_KATEGORI' => 'Kode Kategori',
            'NM_KATEGORI' => 'Category',
			'PARENT'=>'PARENT',
            'NOTE' => 'Catatan',
            'CREATED_BY' => 'Created By',
            'CREATED_AT' => 'Created At',
            'UPDATED_BY' => 'Updated By',
            'UPDATED_AT' => 'Updated At',
            'STATUS' => 'Status',
        ];
    }
}
