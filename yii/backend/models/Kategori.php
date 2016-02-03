<?php

namespace backend\models;

use Yii;

/**
 * This is the model class for table "b1002".
 *
 * @property string $ID
 * @property string $KD_KATEGORI
 * @property string $NM_KATEGORI
 * @property string $KD_TYPE
 * @property integer $PARENT
 * @property string $NOTE
 * @property string $CREATED_BY
 * @property string $CREATED_AT
 * @property string $UPDATED_BY
 * @property string $UPDATED_AT
 * @property integer $STATUS
 * @property string $CORP_ID
 */
class Kategori extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'b1002';
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
            [['KD_KATEGORI', 'NM_KATEGORI', 'KD_TYPE'], 'required'],
            [['PARENT', 'STATUS'], 'integer'],
            [['NOTE'], 'string'],
            [['CREATED_AT', 'UPDATED_AT'], 'safe'],
            [['KD_KATEGORI', 'KD_TYPE'], 'string', 'max' => 5],
            [['NM_KATEGORI'], 'string', 'max' => 200],
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
            'KD_KATEGORI' => 'Kd  Kategori',
            'NM_KATEGORI' => 'Nm  Kategori',
            'KD_TYPE' => 'Kd  Type',
            'PARENT' => 'Parent',
            'NOTE' => 'Note',
            'CREATED_BY' => 'Created  By',
            'CREATED_AT' => 'Created  At',
            'UPDATED_BY' => 'Updated  By',
            'UPDATED_AT' => 'Updated  At',
            'STATUS' => 'Status',
            'CORP_ID' => 'Corp  ID',
        ];
    }
}
