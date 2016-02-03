<?php

namespace backend\models;

use Yii;

/**
 * This is the model class for table "b1000".
 *
 * @property string $ID
 * @property string $KD_BARANG
 * @property string $NM_BARANG
 * @property string $KD_TYPE
 * @property string $KD_KATEGORI
 * @property string $KD_UNIT
 * @property string $KD_SUPPLIER
 * @property string $KD_DISTRIBUTOR
 * @property string $PARENT
 * @property double $HPP
 * @property double $HARGA
 * @property string $BARCODE
 * @property string $IMAGE
 * @property string $NOTE
 * @property string $KD_CORP
 * @property string $KD_CAB
 * @property string $KD_DEP
 * @property integer $STATUS
 * @property string $CREATED_BY
 * @property string $CREATED_AT
 * @property string $UPDATED_BY
 * @property string $UPDATED_AT
 * @property string $DATA_ALL
 * @property string $CORP_ID
 */
class MasterBarang extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'b1000';
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
            [['KD_BARANG', 'NM_BARANG'], 'required'],
            [['HPP', 'HARGA'], 'number'],
            [['NOTE', 'DATA_ALL'], 'string'],
            [['STATUS'], 'integer'],
            [['CREATED_AT', 'UPDATED_AT'], 'safe'],
            [['KD_BARANG'], 'string', 'max' => 30],
            [['NM_BARANG', 'IMAGE'], 'string', 'max' => 200],
            [['KD_TYPE', 'KD_KATEGORI', 'KD_UNIT', 'KD_SUPPLIER', 'KD_DISTRIBUTOR', 'KD_CORP', 'KD_CAB', 'KD_DEP'], 'string', 'max' => 50],
            [['PARENT'], 'string', 'max' => 20],
            [['BARCODE'], 'string', 'max' => 15],
            [['CREATED_BY', 'UPDATED_BY'], 'string', 'max' => 100],
            [['CORP_ID'], 'string', 'max' => 6],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'ID' => 'ID',
            'KD_BARANG' => 'Kd  Barang',
            'NM_BARANG' => 'Nm  Barang',
            'KD_TYPE' => 'Kd  Type',
            'KD_KATEGORI' => 'Kd  Kategori',
            'KD_UNIT' => 'Kd  Unit',
            'KD_SUPPLIER' => 'Kd  Supplier',
            'KD_DISTRIBUTOR' => 'Kd  Distributor',
            'PARENT' => 'Parent',
            'HPP' => 'Hpp',
            'HARGA' => 'Harga',
            'BARCODE' => 'Barcode',
            'IMAGE' => 'Image',
            'NOTE' => 'Note',
            'KD_CORP' => 'Kd  Corp',
            'KD_CAB' => 'Kd  Cab',
            'KD_DEP' => 'Kd  Dep',
            'STATUS' => 'Status',
            'CREATED_BY' => 'Created  By',
            'CREATED_AT' => 'Created  At',
            'UPDATED_BY' => 'Updated  By',
            'UPDATED_AT' => 'Updated  At',
            'DATA_ALL' => 'Data  All',
            'CORP_ID' => 'Corp  ID',
        ];
    }
}
