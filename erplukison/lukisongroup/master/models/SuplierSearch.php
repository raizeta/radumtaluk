<?php

namespace lukisongroup\master\models;

use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;
use lukisongroup\master\models\Suplier;
use lukisongroup\models\hrd\Corp;

/**
 * SuplierSearch represents the model behind the search form about `app\models\esm\Suplier`.
 */
class SuplierSearch extends Suplier
{
	public $nmgroup;
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['ID', 'STATUS'], 'integer'],
            [['nmgroup', 'KD_SUPPLIER', 'NM_SUPPLIER','PIC', 'ALAMAT', 'KOTA', 'TLP', 'MOBILE', 'FAX', 'EMAIL', 'WEBSITE', 'IMAGE', 'NOTE', 'KD_CORP', 'KD_CAB', 'KD_DEP', 'CREATED_BY', 'CREATED_AT', 'UPDATED_BY', 'UPDATED_AT', 'DATA_ALL'], 'safe'],
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
    public function search($params)
    {
        $query = Suplier::find()->where('STATUS <> 3');
		$query->joinWith(['corp' => function ($q) {
			$q->where('u0001.CORP_NM LIKE "%' . $this->nmgroup . '%"');
		}]);
		
        $dataProvider = new ActiveDataProvider([
            'query' => $query,
			'pagination' => [
				'pageSize' => 20,
			],
        ]);

		 $dataProvider->setSort([
			'attributes' => [
				'KD_SUPPLIER',
				'NM_SUPPLIER',
				'ALAMAT',
				'KOTA',
				'nmgroup' => [
					'asc' => ['u0001.CORP_NM' => SORT_ASC],
					'desc' => ['u0001.CORP_NM' => SORT_DESC],
					'label' => 'Group Perusahaan'
				]
			]
		]);
		
    if (!($this->load($params) && $this->validate())) {
        /**
         * The following line will allow eager loading with country data 
         * to enable sorting by country on initial loading of the grid.
         */ 
        $query->joinWith(['corp']);
        return $dataProvider;
    }
 
        $query->andFilterWhere(['like', 'KD_SUPPLIER', $this->KD_SUPPLIER])
            ->andFilterWhere(['like', 'NM_SUPPLIER', $this->NM_SUPPLIER])
            ->andFilterWhere(['like', 'ALAMAT', $this->ALAMAT])
            ->andFilterWhere(['like', 'KOTA', $this->KOTA]);
			
        return $dataProvider;
    }
}
