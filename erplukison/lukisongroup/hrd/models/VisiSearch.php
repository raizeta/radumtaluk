<?php

namespace lukisongroup\hrd\models;

use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;
use lukisongroup\hrd\models\Visi;

/**
 * VisiSearch represents the model behind the search form about `lukisongroup\hrd\models\Visi`.
 */
class VisiSearch extends Visi
{
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['ID', 'SET_ACTIVE', 'GF_ID', 'SEQ_ID', 'STATUS'], 'integer'],
            [['VISIMISI_TITEL', 'TGL', 'VISIMISI_ISI', 'VISIMISI_DCRPT', 'VISIMISI_IMG', 'CORP_ID', 'DEP_ID', 'DEP_SUB_ID', 'JOBGRADE_ID', 'CREATED_BY', 'UPDATED_BY', 'UPDATED_TIME'], 'safe'],
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
       $query = Visi::find()->where('STATUS <>3');
	

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

        $this->load($params);

        if (!$this->validate()) {
            // uncomment the following line if you do not want to return any records when validation fails
            // $query->where('0=1');
            return $dataProvider;
        }

        $query->andFilterWhere([
            'ID' => $this->ID,
            'TGL' => $this->TGL,
            'SET_ACTIVE' => $this->SET_ACTIVE,
            'GF_ID' => $this->GF_ID,
            'SEQ_ID' => $this->SEQ_ID,
            'UPDATED_TIME' => $this->UPDATED_TIME,
            'STATUS' => $this->STATUS,
        ]);

        $query->andFilterWhere(['like', 'VISIMISI_TITEL', $this->VISIMISI_TITEL])
            ->andFilterWhere(['like', 'VISIMISI_ISI', $this->VISIMISI_ISI])
            ->andFilterWhere(['like', 'VISIMISI_DCRPT', $this->VISIMISI_DCRPT])
            ->andFilterWhere(['like', 'VISIMISI_IMG', $this->VISIMISI_IMG])
            ->andFilterWhere(['like', 'CORP_ID', $this->CORP_ID])
            ->andFilterWhere(['like', 'DEP_ID', $this->DEP_ID])
            ->andFilterWhere(['like', 'DEP_SUB_ID', $this->DEP_SUB_ID])
            ->andFilterWhere(['like', 'JOBGRADE_ID', $this->JOBGRADE_ID])
            ->andFilterWhere(['like', 'CREATED_BY', $this->CREATED_BY])
            ->andFilterWhere(['like', 'UPDATED_BY', $this->UPDATED_BY]);

        return $dataProvider;
    }
}
