<?php
namespace lukisongroup\purchasing\models\pr;

use Yii;
use yii\base\Model;
use lukisongroup\hrd\models\Employe;
use lukisongroup\purchasing\models\pr\Purchaseorder;

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
class Auth2Model extends Model
{
    public $empNm;
    public $kdpo;
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
			[['kdpo'], 'required'],
			[['kdpo','empNm'], 'string']		
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
	public function auth2_saved(){
		if ($this->validate()) {			
			$roHeader = Purchaseorder::find()->where(['KD_PO' =>$this->kdpo])->one();
			$poSignStt = Statuspo::find()->where(['KD_PO'=>$this->kdpo,'ID_USER'=>$this->getProfile()->EMP_ID])->one();
				$profile=Yii::$app->getUserOpt->Profile_user();
				$roHeader->STATUS = $this->status;	
				$roHeader->SIG2_SVGBASE64 = $profile->emp->SIGSVGBASE64;
				$roHeader->SIG2_SVGBASE30 = $profile->emp->SIGSVGBASE30;
				$roHeader->SIG2_NM = $profile->emp->EMP_NM . ' ' . $profile->emp->EMP_NM_BLK;
				$roHeader->SIG2_TGL = date('Y-m-d');								
			if ($roHeader->save()) {
					if (!$poSignStt){
						$poHeaderStt = new Statuspo;						
						$poHeaderStt->KD_PO = $this->kdpo;
						$poHeaderStt->ID_USER = $this->getProfile()->EMP_ID;
						//$poHeaderStt->TYPE
						$poHeaderStt->STATUS = 102;
						$poHeaderStt->UPDATE_AT = date('Y-m-d H:m:s');
						if ($poHeaderStt->save()) {
							
						}
					}
                return $roHeader;
            }
			return $roHeader;
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
	
	public function getProfile(){
		$profile=Yii::$app->getUserOpt->Profile_user();	
		return $profile->emp;
	}
}
