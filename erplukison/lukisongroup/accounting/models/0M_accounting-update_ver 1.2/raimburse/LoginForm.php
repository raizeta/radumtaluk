<?php
namespace lukisongroup\accounting\models\raimburse;

use Yii;
use yii\base\Model;
use lukisongroup\hrd\models\Employe;
use lukisongroup\accounting\models\raimburse\Salesorder;

/**
 * @author ptrnov  <piter@lukison.com>
 * @since 1.1
 *
 * SignatureForm | Static Model get form Employe Model
 * Check Oldpassword -> field [Employe->SIGPASSWORD]
 * set Oldpassword -> field [Employe->SIGPASSWORD]
 * Identity -> field [Employe->EMP_ID] | Session Yii::$app->user->identity->EMP_ID
 * depends [lukisongroup\hrd\models\Employe] | setPassword_signature() | validateOldPasswordCheck()
 * depends [lukisongroup\sistem\controllers\UserProfileController] | actionPasswordSignatureForm() | actionPasswordSignatureSaved()
 */
class LoginForm extends Model
{
    public $empNm;
    public $kdsa;
	public $status;	
	public $password;
	
	//public $findPasswords; // @property Digunakan jika Form Attribute di gunakan
	private $_empid = false;
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [						
			[['password'], 'required'],
			['password', 'number','numberPattern' => '/^[0-9]*$/i'],
			['password', 'string', 'min' => 8,  'message'=> 'Please enter 8 digit'],
			['password', 'findPasswords'],	
			['status', 'required'],
			['status', 'integer'],
			[['kdsa'], 'required'],
			[['kdsa','empNm'], 'string']		
        ];
    }
	
	/**
     * Password Find Oldpassword for validation
	 * @author ptrnov  <piter@lukison.com>
	 * @since 1.1	
     */
	public function findPasswords($attribute, $params)
    {        
		/*
		 * @author ptrnov  <piter@lukison.com>
		 * @since 1.1
		*/
		if (!$this->hasErrors()) {
			 $empid = $this->getEmpid();
			if (!$empid || !$empid->validateOldPasswordCheck($this->password)) {
                $this->addError($attribute, 'Incorrect password.');				
            } 
       }
    }
	
	/*
	 * Check validation
	 * @author ptrnov  <piter@lukison.com>
	 * @since 1.1
	*/
	public function loginformsa_saved(){
		if ($this->validate()) {			
			$saHeader = Salesorder::find()->where(['KD_SA' =>$this->kdsa])->one();
				$profile=Yii::$app->getUserOpt->Profile_user();
				$saHeader->STATUS = $this->status;					
				$saHeader->SIG2_SVGBASE64 = $profile->emp->SIGSVGBASE64;
				$saHeader->SIG2_SVGBASE30 = $profile->emp->SIGSVGBASE30;
				$saHeader->SIG2_NM = $profile->emp->EMP_NM . ' ' . $profile->emp->EMP_NM_BLK;
				$saHeader->SIG2_TGL = date('Y-m-d');		
			if ($saHeader->save()) {
                return $saHeader;
            }
			return $saHeader;
		}		
		return null;			
	}
		
	/**
     * Finds record by EMP_ID
     * @return EMP_ID|null
	 * Also can use | $model = Employe::find()->where(['EMP_ID' => Yii::$app->user->identity->EMP_ID])->one();
	 * @author ptrnov  <piter@lukison.com>
	 * @since 1.1
     */
    public function getEmpid()
    {
        if ($this->_empid === false) {
            $this->_empid = Employe::find()->where(['EMP_ID' => Yii::$app->user->identity->EMP_ID])->one();
        }
        return $this->_empid;
    }	
}
