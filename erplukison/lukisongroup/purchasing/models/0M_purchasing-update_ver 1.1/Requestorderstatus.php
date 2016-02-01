<?php

namespace lukisongroup\purchasing\models;

use Yii;

/**
 * This is the model class for table "r0002".
 *
 * @property string $ID
 * @property string $KD_RO
 * @property string $ID_USER
 * @property string $TYPE
 * @property integer $STATUS
 * @property string $UPDATED_AT
 * @property string $tes
 */
class Requestorderstatus extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'r0002';
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
            [['KD_RO', 'ID_USER', 'TYPE', 'STATUS', 'UPDATED_AT'], 'safe'],
            [['STATUS'], 'integer'],
            [['UPDATED_AT'], 'safe'],
            [['KD_RO', 'ID_USER'], 'string', 'max' => 50],
            [['TYPE'], 'string', 'max' => 255],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'ID' => 'ID',
            'KD_RO' => 'Kd  Ro',
            'ID_USER' => 'Id  User',
            'TYPE' => 'Type',
            'STATUS' => 'Status',
            'UPDATED_AT' => 'Updated  At',
        ];
    }
}
