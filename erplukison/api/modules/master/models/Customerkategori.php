<?php

namespace api\modules\master\models;

use Yii;

/**
 * This is the model class for table "provinsi".
 *
 * @property integer $province_id
 * @property string $province
 */
class Customerkategori extends \yii\db\ActiveRecord
{


	public static function getDb()
    {
        /* Author -ptr.nov- :UMUM */
        return \Yii::$app->db3;
    }
    public static function tableName()
    {
        return 'c0001k';
    }

//     public static function primaryKey()
//     {
//       return ['CUST_KD'];
//     }
//     public function rules()
//     {
//         return [
//             [['CUST_KD','CUST_NM','STT_TOKO','KD_DISTRIBUTOR'], 'required'],
//             [['CUST_NM','CUST_KTG','JOIN_DATE','KD_DISTRIBUTOR','PROVINCE_ID','CITY_ID','NPWP', 'TLP1','STT_TOKO'], 'required'],
//             [['CUST_KTG', 'TLP1', 'TLP2', 'FAX', 'STT_TOKO', 'STATUS'], 'integer'],
//             [['JOIN_DATE', 'CREATED_AT', 'UPDATED_AT'], 'safe'],
//             [['ALAMAT', 'NOTE'], 'string'],
//             [['CUST_KD', 'CUST_KD_ALIAS', 'CUST_GRP', 'MAP_LAT', 'MAP_LNG', 'NPWP','KD_DISTRIBUTOR','PROVINCE_ID','CITY_ID'], 'string', 'max' => 50],
//             [['CUST_NM', 'PIC', 'EMAIL', 'WEBSITE', 'DATA_ALL'], 'string', 'max' => 255],
//             [['CAB_ID', 'CORP_ID'], 'string', 'max' => 6],
//             [['CREATED_BY', 'UPDATED_BY'], 'string', 'max' => 100]
//         ];
//     }
    
//     // public function getCus()
//     // {
//     //     return $this->hasOne(Kategoricus::className(), ['CUST_KTG' => 'CUST_KTG']);
      
//     // }
}
