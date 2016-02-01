<?php

namespace lukisongroup\master\models;

use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;
use lukisongroup\master\models\Customers;

/**
 * CustomersSearch represents the model behind the search form about `lukisongroup\esm\models\Customers`.
 */
class CustomersSearch extends Customers
{
    /**
     * @inheritdoc
     */

        public function attributes()
    {
        /*Author -ptr.nov- add related fields to searchable attributes */
        return array_merge(parent::attributes(), ['cus.CUST_KTG_NM']);
    }
    

    public $CUST_KTG;
    public $CUST_KTG_PARENT;
    public $cus;
  
    public function rules()
    {
        return [
            [['CUST_KD','CUST_KD_ALIAS','cus.CUST_KTG_NM', 'CUST_NM', 'CUST_GRP', 'JOIN_DATE', 'MAP_LAT', 'MAP_LNG', 'KD_DISTRIBUTOR', 'PIC', 'ALAMAT', 'EMAIL', 'WEBSITE', 'NOTE', 'NPWP', 'DATA_ALL', 'CAB_ID', 'CORP_ID', 'CREATED_BY', 'CREATED_AT', 'UPDATED_BY', 'UPDATED_AT'], 'safe'],
            [['CUST_KTG', 'TLP1', 'TLP2', 'FAX', 'STT_TOKO', 'STATUS'], 'integer'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function scenarios()
    {
        // bypass scenarios() implementation in the parent class
        return Model::scenarios();
    }

    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    //    public function search_parent($params)
    // {
        
    //     $query3 = Kategoricus::find()->where('STATUS <> 0')->andwhere('CUST_KTG_PARENT = 0');
    //     $dataProviderparent= new ActiveDataProvider([
    //         'query' => $query3,
    //     ]);

    //     $this->load($params);

    //     if (!$this->validate()) {
    //         // uncomment the following line if you do not want to return any records when validation fails
    //         // $query->where('0=1');
    //         return $dataProviderparent;
    //     }

    //        $query3->andFilterWhere([
    //         'CUST_KTG' => $this->CUST_KTG,
    //         'CUST_KTG_PARENT' => $this->CUST_KTG_PARENT,
    //         // 'CREATED_AT' => $this->CREATED_AT,
    //         // 'UPDATED_AT' => $this->UPDATED_AT,
    //         'STATUS' => $this->STATUS,
    //     ]);

    //     $query3->andFilterWhere(['like', 'CUST_KTG_NM', $this->CUST_KTG_NM]);
    //         // ->andFilterWhere(['like', 'CREATED_BY', $this->CREATED_BY])
    //         // ->andFilterWhere(['like', 'UPDATED_BY', $this->UPDATED_BY]);

    //     return $dataProviderparent;
    // }

    public function search($params)
    {
        $query = Customers::find()->joinWith('cus',true,'JOIN')
                                    ->where('c0001.STATUS <> 3');
									// ->orderBy(['CUST_KD'=>SORT_ASC]);

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
			'pagination' => [
				'pageSize' => 5,
			],
        ]);


            $dataProvider->sort->attributes['cus.CUST_KTG_NM'] = [
                'asc' => ['c0001k.CUST_KTG_NM' => SORT_ASC],
                'desc' => ['c0001k.CUST_KTG_NM' => SORT_DESC],
            ];

        $this->load($params);

        if (!$this->validate()) {
            // uncomment the following line if you do not want to return any records when validation fails
            // $query->where('0=1');
            return $dataProvider;
        }

        // $querya->andFilterWhere([
        //     'CUST_KTG' => $this->CUST_KTG,
        //     'JOIN_DATE' => $this->JOIN_DATE,
        //     'TLP1' => $this->TLP1,
        //     'TLP2' => $this->TLP2,
        //     'FAX' => $this->FAX,
        //     'STT_TOKO' => $this->STT_TOKO,
        //     'CREATED_AT' => $this->CREATED_AT,
        //     'UPDATED_AT' => $this->UPDATED_AT,
        //     'STATUS' => $this->STATUS,
        // ]);

        $query->andFilterWhere(['like', 'CUST_KD', $this->CUST_KD])
            ->andFilterWhere(['like', 'CUST_KD_ALIAS', $this->CUST_KD_ALIAS])
            ->andFilterWhere(['like', 'TLP1', $this->TLP1])
            ->andFilterWhere(['like', 'TLP2', $this->TLP2])
            ->andFilterWhere(['like', 'FAX', $this->FAX])
            ->andFilterWhere(['like', 'c0001k.CUST_KTG_NM', $this->getAttribute('cus.CUST_KTG_NM')])
            ->andFilterWhere(['like', 'CUST_NM', $this->CUST_NM])
            ->andFilterWhere(['like', 'CUST_GRP', $this->CUST_GRP])
            ->andFilterWhere(['like', 'MAP_LAT', $this->MAP_LAT])
            ->andFilterWhere(['like', 'MAP_LNG', $this->MAP_LNG])
            ->andFilterWhere(['like', 'PIC', $this->PIC])
            ->andFilterWhere(['like', 'ALAMAT', $this->ALAMAT])
            ->andFilterWhere(['like', 'EMAIL', $this->EMAIL])
            ->andFilterWhere(['like', 'WEBSITE', $this->WEBSITE])
            ->andFilterWhere(['like', 'NOTE', $this->NOTE])
            ->andFilterWhere(['like', 'NPWP', $this->NPWP])
            ->andFilterWhere(['like', 'DATA_ALL', $this->DATA_ALL])
            ->andFilterWhere(['like', 'JOIN_DATE', $this->JOIN_DATE]);
            // ->andFilterWhere(['like', 'CORP_ID', $this->CORP_ID])
            // ->andFilterWhere(['like', 'CREATED_BY', $this->CREATED_BY])
            // ->andFilterWhere(['like', 'UPDATED_BY', $this->UPDATED_BY]);

        return $dataProvider;
    }
}
