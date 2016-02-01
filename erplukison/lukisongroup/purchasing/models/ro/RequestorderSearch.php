<?php

namespace lukisongroup\purchasing\models\ro;
use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;

class RequestorderSearch extends Requestorder
{
	
	public $nmemp;
	//public $detro=[];
	
	public function attributes()
	{
		/*Author -ptr.nov- add related fields to searchable attributes */
		return array_merge(parent::attributes(), ['detro.KD_RO','detro.NM_BARANG','detro.QTY','dept.DEP_NM','corp.CORP_NM']);
		//return array_merge(parent::attributes(), ['detro.KD_RO','detro.NM_BARANG','detro.QTY']);
	}
	
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['STATUS','PARENT_ROSO'], 'integer'],
            [['KD_RO', 'NOTE', 'ID_USER', 'KD_CORP', 'KD_CAB', 'KD_DEP', 'CREATED_AT', 'UPDATED_ALL', 'DATA_ALL'], 'safe'],
            [['detro'], 'safe'],
			[['detro.KD_RO','detro.NM_BARANG','detro.QTY','dept.DEP_NM','EMP_NM','corp.CORP_NM'], 'safe'],
			[['SIG1_ID','SIG2_ID','SIG3_ID'], 'string'],
			[['SIG1_NM','SIG2_NM','SIG3_NM'], 'string'],
			[['SIG1_TGL','SIG2_TGL', 'SIG3_TGL','USER_CC'], 'safe'],
			[['SIG1_SVGBASE64','SIG2_SVGBASE64', 'SIG3_SVGBASE64'], 'safe'],
			[['SIG1_SVGBASE30','SIG2_SVGBASE30', 'SIG3_SVGBASE30'], 'safe'],
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

	/*
	 * OUTBOX RO
	 * ACTION CREATE
	 * @author ptrnov [piter@lukison]
	 * @since 1.2
	*/
	public function searchRoOutbox($params)
    {
		$profile=Yii::$app->getUserOpt->Profile_user();
       
		$query = Requestorder::find()
				->JoinWith('dept',true,'left JOIN')	
				->where("r0001.PARENT_ROSO=0 AND r0001.status <> 3 AND r0001.ID_USER = '".$profile->emp->EMP_ID."'");
		
		$dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

		$this->load($params);
		if (!$this->validate()) {
			//return $dataProvider;
			//$dataProvider->query->where('0=1');
			return $dataProvider;
		} 
			
		$query->andFilterWhere(['like', 'KD_RO', $this->KD_RO])
				->andFilterWhere(['like', 'r0001.KD_CORP', $this->getAttribute('corp.CORP_NM')])		
				->andFilterWhere(['like', 'EMP_NM', $this->EMP_NM])
				->andFilterWhere(['like', 'u0002a.DEP_NM', $this->getAttribute('dept.DEP_NM')]);
			  
			
		if($this->CREATED_AT!=''){
            $date_explode = explode(" - ", $this->CREATED_AT);
            $date1 = trim($date_explode[0]);
            $date2= trim($date_explode[1]);
            $query->andFilterWhere(['between','CREATED_AT', $date1,$date2]);
        } 
		
		return $dataProvider;
    }
	
	/*
	 * INBOX RO
	 * ACTION CHECKED | APPROVAL
	 * @author ptrnov [piter@lukison]
	 * @since 1.2
	*/
	public function searchRoInbox($params)
    {
		$profile=Yii::$app->getUserOpt->Profile_user();
		if($profile->emp->GF_ID<=4){
			$query = Requestorder::find()
						->JoinWith('dept',true,'left JOIN')	
						->where("(r0001.status <> 3 and
									r0001.PARENT_ROSO=0 AND 
									r0001.SIG2_NM<>'none' AND									
									r0001.KD_DEP = '".$profile->emp->DEP_ID."') OR 
								 (r0001.status <> 3 and 
									r0001.PARENT_ROSO=0 AND 
									r0001.SIG1_NM<>'none' AND
									r0001.USER_CC='".$profile->emp->EMP_ID."')"
							);
        }else{
			$query = Requestorder::find()
					->JoinWith('dept',true,'left JOIN')	
					->where("r0001.PARENT_ROSO=0 AND 
							r0001.SIG1_NM<>'none' AND
							r0001.USER_CC='".$profile->emp->EMP_ID."' AND 
							r0001.status <> 3 ");
		}
		
		$dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

		$this->load($params);
		if (!$this->validate()) {
			//return $dataProvider;
			//$dataProvider->query->where('0=1');
			return $dataProvider;
		} 
			
		$query->andFilterWhere(['like', 'KD_RO', $this->KD_RO])
				->andFilterWhere(['like', 'r0001.KD_CORP', $this->getAttribute('corp.CORP_NM')])	
				->andFilterWhere(['like', 'EMP_NM', $this->EMP_NM])
				->andFilterWhere(['like', 'u0002a.DEP_NM', $this->getAttribute('dept.DEP_NM')]);
			  
			
		if($this->CREATED_AT!=''){
            $date_explode = explode(" - ", $this->CREATED_AT);
            $date1 = trim($date_explode[0]);
            $date2= trim($date_explode[1]);
            $query->andFilterWhere(['between','CREATED_AT', $date1,$date2]);
        } 
		
		return $dataProvider;
    }
	
	/*
	 * RO SEARCH TO PO
	 * ACTION APPROVAL
	 * @author ptrnov [piter@lukison]
	 * @since 1.2
	*/
	public function cariHeaderRO_SendPO($params)
    {
        $query = Requestorder::find()->where("r0001.KD_RO LIKE 'RO%' and r0001.status <> 3 and r0001.status =103 ");
        

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
			'pagination' => [
					'pageSize' => 20,
				],
        ]);

         $dataProvider->setSort([
            'attributes' => [
            'KD_RO',        
            ]
        ]);
        
        if (!($this->load($params) && $this->validate())) {
            return $dataProvider;
        }
        
        $query->andFilterWhere(['like', 'KD_RO', $this->KD_RO]);
        return $dataProvider;
    }
	
	
	
	
	
	
	
	public function searchRo($params)
    {
		$profile=Yii::$app->getUserOpt->Profile_user();
      	
		if($profile->emp->JOBGRADE_ID == 'M' OR $profile->emp->JOBGRADE_ID == 'SM' ){
			$query = Requestorder::find()
						->JoinWith('dept',true,'left JOIN')	
						->where("(r0001.PARENT_ROSO=0 and r0001.status <> 3 and r0001.ID_USER = '".$profile->emp->EMP_ID."') OR 
								(r0001.PARENT_ROSO=0 and r0001.status <> 3 and r0001.KD_DEP = '".$profile->emp->DEP_ID."') OR 
								(r0001.PARENT_ROSO=0 and r0001.status <> 3 and r0001.USER_CC='".$profile->emp->EMP_ID."')");
								
						/* ->where("(r0001.PARENT_ROSO=0) AND 
								(r0001.status <> 3 and r0001.KD_CORP = '" .$profile->emp->EMP_CORP_ID ."' and r0001.ID_USER = '".$profile->emp->EMP_ID."') OR 
								(r0001.status <> 3 and r0001.KD_CORP = '" .$profile->emp->EMP_CORP_ID ."' and r0001.KD_DEP = '".$profile->emp->DEP_ID."') OR 
								(r0001.USER_CC='".$profile->emp->EMP_ID."')"); */
        }else{
			$query = Requestorder::find()
					->JoinWith('dept',true,'left JOIN')	
					->where("(r0001.PARENT_ROSO=0) AND r0001.status <> 3 and r0001.KD_CORP = '" .$profile->emp->EMP_CORP_ID ."' and r0001.ID_USER = '".$profile->emp->EMP_ID."' OR (r0001.USER_CC='".$profile->emp->EMP_ID."')");
		}
		$dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

		$this->load($params);
		if (!$this->validate()) {
			//return $dataProvider;
			//$dataProvider->query->where('0=1');
			return $dataProvider;
		} 
			
		$query->andFilterWhere(['like', 'KD_RO', $this->KD_RO])
			  ->andFilterWhere(['like', 'EMP_NM', $this->EMP_NM])
			  ->andFilterWhere(['like', 'u0002a.DEP_NM', $this->getAttribute('dept.DEP_NM')]);
			  
			
		if($this->CREATED_AT!=''){
            $date_explode = explode(" - ", $this->CREATED_AT);
            $date1 = trim($date_explode[0]);
            $date2= trim($date_explode[1]);
            $query->andFilterWhere(['between','CREATED_AT', $date1,$date2]);
        } 
		
		return $dataProvider;
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
		$empId = Yii::$app->user->identity->EMP_ID;
		$dt = Employe::find()->where(['EMP_ID'=>$empId])->all();
		$crp = $dt[0]['EMP_CORP_ID'];
		$depId = $dt[0]['DEP_ID'];
		
		if($dt[0]['GF_ID'] == '3'){
			$query = Requestorder::find()->where("r0001.status <> 3 and r0001.KD_CORP = '$crp' and r0001.KD_DEP = '$depId' ");
		} else {
			$query = Requestorder::find()->where("r0001.status <> 3 and r0001.KD_CORP = '$crp' and r0001.ID_USER = '$empId'  and r0001.KD_DEP = '$depId' ");
		}
		
		$query->joinWith(['employe' => function ($q) {
			$q->where('a0001.EMP_NM LIKE "%' . $this->nmemp . '%"');
		}]);

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

		 $dataProvider->setSort([
			'attributes' => [
			'KD_RO',
			'KD_CORP',
			
			'nmemp' => [
				'asc' => ['a0001.EMP_NM' => SORT_ASC],
				'desc' => ['a0001.EMP_NM' => SORT_DESC],
				'label' => 'Pembuat',
			],			
			]
		]);
		
		if (!($this->load($params) && $this->validate())) {
			return $dataProvider;
		}
		
        $query->andFilterWhere(['like', 'a0001.EMP_NM', $this->EMP_NM])
		->andFilterWhere(['like', 'KD_RO', $this->KD_RO])
		->andFilterWhere(['like', 'KD_CORP', $this->KD_CORP]);
        return $dataProvider;
    }

    public function cari($params)
    {
        $empId = Yii::$app->user->identity->EMP_ID;
        $dt = Employe::find()->where(['EMP_ID'=>$empId])->all();
        $crp = $dt[0]['EMP_CORP_ID'];
        
        if($dt[0]['JAB_ID'] == 'MGR'){
            $query = Requestorder::find()->where("r0001.status <> 3 and r0001.status <> 0 and r0001.KD_CORP = '$crp' ");
        } else {
            $query = Requestorder::find()->where("r0001.status <> 3 and r0001.status <> 0 and r0001.KD_CORP = '$crp' and r0001.ID_USER = '$empId' ");
        }
        
        $query->joinWith(['employe' => function ($q) {
            $q->where('a0001.EMP_NM LIKE "%' . $this->nmemp . '%"');
        }]);

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

         $dataProvider->setSort([
            'attributes' => [
            'KD_RO',
            'KD_CORP',
            
            'nmemp' => [
                'asc' => ['a0001.EMP_NM' => SORT_ASC],
                'desc' => ['a0001.EMP_NM' => SORT_DESC],
                'label' => 'Pembuat',
            ],          
            ]
        ]);
        
        if (!($this->load($params) && $this->validate())) {
            return $dataProvider;
        }
        
        $query->andFilterWhere(['like', 'a0001.EMP_NM', $this->EMP_NM])
        ->andFilterWhere(['like', 'KD_RO', $this->KD_RO])
        ->andFilterWhere(['like', 'KD_CORP', $this->KD_CORP]);
        return $dataProvider;
    }
    
    
    
}
