<?php
$params = array_merge(
    require(__DIR__ . '/../../common/config/params.php'),
    require(__DIR__ . '/../../common/config/params-local.php'),
    require(__DIR__ . '/params.php'),
    require(__DIR__ . '/params-local.php')
);
return [
    'id' => 'app-lukisongroup',
    'basePath' => dirname(__DIR__),
    'controllerNamespace' => 'lukisongroup\controllers',
    'bootstrap' => ['log'],
    'modules' => [
		'admin' => [
				'class' => 'mdm\admin\Module',
				'controllerMap' => [
					 'assignment' => [
						'class' => 'mdm\admin\controllers\AssignmentController',
						'userClassName' => 'common\models\User',
						'idField' => 'id', //user_id id field of model User
					]
				],  
				/*'layout'=>'mdm\admin\views\layouts\top-menu',*/
				//'layout'=>'left-menu',
				'menus' =>[
					'assignment'=>[
						'label'=>'Grand Access'
					],
					/*'route'=> null,*/
				],
		],
		'sales' =>[
            'class'=>'lukisongroup\sales\Sales',
        ],
		'sistem' =>[
            'class'=>'lukisongroup\sistem\Modul',
        ], 
		'dashboard' => [
			'class' => 'lukisongroup\dashboard\Modul'
        ],
		'widget' =>[
            'class'=>'lukisongroup\widget\Modul',
        ],
		'programmer' =>[
            'class'=>'lukisongroup\programmer\Modul',
        ],
		'hrd' => [
			'class' => 'lukisongroup\hrd\Modul'
        ],
		'email' => [
			'class' => 'lukisongroup\email\Modul'
        ],
		'front' => [
            'class' => 'lukisongroup\front\Modul'
        ],
		'purchasing' => [
            'class' => 'lukisongroup\purchasing\Purchasing'
        ],
		'esm' => [
			'class' => 'lukisongroup\esm\Modul'
        ],
		'master' => [
			'class' => 'lukisongroup\master\Modul'
        ],
		'back' => [
			'class' => 'lukisongroup\back\Parents'
        ],
		'backs' => [
			'class' => 'lukisongroup\backs\Posting'
        ],
		'child' => [
			'class' => 'lukisongroup\child\Child'
        ],
	],
    'components' => [
        'gv' => [
            'class' =>'common\components\gv'
        ],
        'esmcode' => [
            'class' =>'common\components\esmcode'
        ],
		'mastercode' => [
			'class' =>'common\components\mastercode'
		],		
        'user' => [
            'identityClass' => 'common\models\User',
            'enableAutoLogin' => false,
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'errorHandler' => [
            'errorAction' => 'site/error',
        ],
		'ambilkonci' =>[
            'class'=>'common\components\AmbilkeyComponent',
        ],
        'ambilStatus' =>[
            'class'=>'common\components\Static_sttComponent',
        ],
		'ambilKonvesi' =>[
            'class'=>'common\components\TgljamconvertComponent',
        ],  
		'getUserOpt' =>[
            'class'=>'common\components\Useroption',
        ],
        /* Author -ptr.nov- : Test Project  */
        'db' => [
            'class' => 'yii\db\Connection',
            'dsn' => 'mysql:host=10.10.99.2;dbname=dbm001',
			//'dsn' => 'mysql:host=10.10.99.2;dbname=db_test',
            'username' => 'labtest',
            'password' =>'asd123',
            'charset' => 'utf8',
        ], 		
		/* Author -ptr.nov- : Admin Menu  */
        'db1' => [
            'class' => 'yii\db\Connection',
            'dsn' => 'mysql:host=10.10.99.2;dbname=dbm001',
            'username' => 'labtest',
            'password' =>'asd123',
            'charset' => 'utf8',
        ],
		
		 /* Author -ptr.nov- : HRD | Dashboard I */
        'db2' => [
            'class' => 'yii\db\Connection',
            'dsn' => 'mysql:host=10.10.99.2;dbname=dbm002',
            'username' => 'labtest',
            'password' =>'asd123',
            'charset' => 'utf8',
        ],

		 /* Author -ptr.nov- : ESM DB_project*/ 
		 
        'db3' => [
            'class' => 'yii\db\Connection',
            'dsn' => 'mysql:host=10.10.99.2;dbname=dbc002',
            'username' => 'labtest',
            'password' =>'asd123',
            //'dsn' => 'oci:dbname=//10.10.99.3:1521/gosent',
            //'username' => 'gosent',
            //'password' => 'asd123',
            'charset' => 'utf8',
        ],		
        'db4' => [
                'class' => 'yii\db\Connection',
                'dsn' => 'mysql:host=10.10.99.2;dbname=dbm000',
                'username' => 'labtest',
                'password' =>'asd123',
                'charset' => 'utf8',
        ],

        /* Author -ptr.nov- : IT | Dashboard I */
        'db_widget' => [
            'class' => 'yii\db\Connection',
            'dsn' => 'mysql:host=10.10.99.2;dbname=dbm005',
            'username' => 'labtest',
            'password' =>'asd123',
            'charset' => 'utf8',
        ],
		
		'db_sss' => [
                'class' => 'yii\db\Connection',
                'dsn' => 'mysql:host=10.10.99.2;dbname=dbc001',
                'username' => 'labtest',
                'password' =>'asd123',
                'charset' => 'utf8',
        ],
        'db_esm' => [
                'class' => 'yii\db\Connection',
                'dsn' => 'mysql:host=10.10.99.2;dbname=dbc002',
                'username' => 'labtest',
                'password' =>'asd123',
                'charset' => 'utf8',
        ],
				
		'db_lipat' => [
                'class' => 'yii\db\Connection',
                'dsn' => 'mysql:host=10.10.99.2;dbname=dbc003',
                'username' => 'labtest',
                'password' =>'asd123',
                'charset' => 'utf8',
        ],

		'db_gsn' => [
                'class' => 'yii\db\Connection',
                'dsn' => 'mysql:host=10.10.99.2;dbname=dbc004',
                'username' => 'labtest',
                'password' =>'asd123',
                'charset' => 'utf8',
        ],		
		'db_test' => [
                'class' => 'yii\db\Connection',
                'dsn' => 'mysql:host=10.10.99.2;dbname=db_test',
                'username' => 'labtest',
                'password' =>'asd123',
                'charset' => 'utf8',
        ],
		/*  'assetManager' => [
            'assetMap' => [
                'jquery.js' => '//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js',
            ],
        ],  */
        /*-ptr.nov-: Public Component UrlManager*/
        'urlManager' => [
            'enablePrettyUrl' => true, // Disable r= routes
            'showScriptName' => false, // Disable index.php
            'enableStrictParsing' => false,
            /*
			'rules'=>[
              'conatroller'=>'site/logout',
            ],
            */
        ],
        /*-ptr.nov- : Public AuthManager */
        'authManager'=>[
            'class'=>'yii\rbac\DbManager',
            'defaultRoles' => ['OWNER','KOMISARIS','CEO','GM','MANAGER','SUVERVISOR','DM','STAFF','OPS'],
            //'class'=>'yii\rbac\PhpManager',
            //'defaultRoles' => ['userGroup'],
            //'defaultRoles'=>['generic-user'],
            //'defaultRoles'=>['end-user'],
        ],

        /*-ptr.nov- : Public Permission */
        'as access'=>[
            'class'=>'mdm\admin\components\AccessControl',
            'allowActions'=>[
                '*',
                //'site/login',
                //'site/error',
            ]
        ], 
		'assetManager' => [
        'bundles' => [
				// you can override AssetBundle configs here       
				 /* 'yii\web\JqueryAsset' => [
					'sourcePath' => false,// '@lukisongroup/dashboard/views/esm-sales-mt	',
					'js' => [//'@lukisongroup/purchasing/views/request-order/proses/jquery.js',
							//'@lukisongroup/purchasing/views/request-order/proses/app.min.js','@lukisongroup/assets/49f848a2/app.min.js',
							//'@lukisongroup.com/assets/49f848a2/js/app.min.js','@lukisongroup.com/assets/49f848a2/js/app.min.js',
							//'@lukisongroup.com/assets/49f848a2/js/app.min.js',
							//'@lukisongroup.com/assets/3fa74ea/js/bootstrap.js'
							],
				],  */
				 /* 'assetMap' => [
					'jquery.js' => '//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js',
				], */
				        
			],
		],    		
        'view' => [
            'theme' => [
                'pathMap' => [
                    'lukisongroup/views' => '@vendor/dmstr/yii2-adminlte-asset/example-views/phundament/app'
                ],
            ],
        ],
		'errorHandler' => [
            'maxSourceLines' => 20,
        ],
		/**
		 * Handle Ajax content parsing & _CSRF
		 * @author ptrnov  <piter@lukison.com>
		 * @since 1.1   	
		 */
		'request' => [
            'cookieValidationKey' => 'dWut4SrmYAaXg0NfqpPwnJa23RMIUG7j_it',
            'parsers' => [
                'application/json' => 'yii\web\JsonParser', // required for POST input via `php://input`
            ]
        ],
    ],
    'params' => $params,
];
