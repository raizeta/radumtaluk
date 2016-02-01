<?php

namespace lukisongroup\master\models;

use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;
use lukisongroup\master\models\Tipebarang;

/**
 * TipebarangSearch represents the model behind the search form about `app\models\master\Tipebarang`.
 */
class TipebarangSearch extends Tipebarang
{
	
	public function attributes()
	{
		/*Author -ptr.nov- add related fields to searchable attributes */
		return array_merge(parent::attributes(), ['corp.CORP_NM']);
	}
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['ID', 'STATUS','PARENT'], 'integer'],
            [['corp.CORP_NM','KD_TYPE', 'NM_TYPE', 'NOTE', 'CREATED_BY', 'CREATED_AT', 'UPDATED_BY', 'UPDATED_AT'], 'safe'],
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
        $query = Tipebarang::find()->where('STATUS <> 3')->groupBy(['PARENT','CORP_ID','KD_TYPE']);;

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
			'pagination' => [
				'pageSize' => 20,
			],
        ]);

        $this->load($params);

        if (!$this->validate()) {
            // uncomment the following line if you do not want to return any records when validation fails
            // $query->where('0=1');
            return $dataProvider;
        }

        $query->andFilterWhere([
//            'id' => $this->id,
            'CREATED_AT' => $this->CREATED_AT,
            'UPDATED_AT' => $this->UPDATED_AT,
			'STATUS' => $this->STATUS,
			'PARENT' => $this->PARENT,
			'CORP_ID' => $this->getAttribute('corp.CORP_NM'),
        ]);

        $query->andFilterWhere(['like', 'KD_TYPE', $this->KD_TYPE])
            ->andFilterWhere(['like', 'NM_TYPE', $this->NM_TYPE])
            ->andFilterWhere(['like', 'NOTE', $this->NOTE]);
 //           ->andFilterWhere(['like', 'CREATED_BY', $this->created_by])
 //           ->andFilterWhere(['like', 'UPDATED_BY', $this->updated_by]);

        return $dataProvider;
    }
}
