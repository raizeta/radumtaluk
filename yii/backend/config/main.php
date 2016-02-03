<?php
$params = array_merge(
    require(__DIR__ . '/../../common/config/params.php'),
    require(__DIR__ . '/../../common/config/params-local.php'),
    require(__DIR__ . '/params.php'),
    require(__DIR__ . '/params-local.php')
);

return [
    'id' => 'app-backend',
    'basePath' => dirname(__DIR__),
    'controllerNamespace' => 'backend\controllers',
    'bootstrap' => ['log'],
    'modules' => [],
    'components' => [
        'user' => [
            'identityClass' => 'common\models\User',
            'enableAutoLogin' => true,
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
        
        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'rules' => [
            ],
        ],
        'db_rpt' => 
        [
            'class' => 'yii\db\Connection',
            'dsn' => 'mysql:host=202.53.254.83;dbname=dbc000',
            'username' => 'lgoffice321',
            'password' =>'r4h4514',
            'charset' => 'utf8',
        ],
            
        /* Author -ptr.nov- : Test Project  */
        'db' => 
        [
            'class' => 'yii\db\Connection',
            'dsn' => 'mysql:host=202.53.254.83;dbname=dbm001',
            'username' => 'lgoffice321',
            'password' =>'r4h4514',
            'charset' => 'utf8',
        ],  
        'db_user' => 
        [
            'class' => 'yii\db\Connection',
            'dsn' => 'mysql:host=202.53.254.83;dbname=dbm001',
            'username' => 'lgoffice321',
            'password' =>'r4h4514',
            'charset' => 'utf8',
        ],          
        /* Author -ptr.nov- : Admin Menu  */
        'db1' => 
        [
            'class' => 'yii\db\Connection',
            'dsn' => 'mysql:host=202.53.254.83;dbname=dbm001',
            'username' => 'lgoffice321',
            'password' =>'r4h4514',
            'charset' => 'utf8',
        ],
        
         /* Author -ptr.nov- : HRD | Dashboard I */
        /* Author -ptr.nov- : HRD | Dashboard I */
        'db_hrm' => 
        [
            'class' => 'yii\db\Connection',
            'dsn' => 'mysql:host=202.53.254.83;dbname=dbm002',
            'username' => 'lgoffice321',
            'password' =>'r4h4514',
            'charset' => 'utf8',
        ],

         /* Author -ptr.nov- : ESM DB_project*/ 
         
        'db3' => 
        [
            'class' => 'yii\db\Connection',
            'dsn' => 'mysql:host=10.10.99.2;dbname=dbc002',
            'username' => 'labtest',
            'password' =>'asd123',
            'charset' => 'utf8',
        ],  

        'db4' => 
        [
                'class' => 'yii\db\Connection',
                'dsn' => 'mysql:host=202.53.254.83;dbname=dbm000',
                'username' => 'lgoffice321',
                'password' =>'r4h4514',
                'charset' => 'utf8',
        ],

        /* Author -ptr.nov- : IT | Dashboard I */
        'db_widget' => 
        [
            'class' => 'yii\db\Connection',
            'dsn' => 'mysql:host=202.53.254.83;dbname=dbm005',
            'username' => 'lgoffice321',
            'password' =>'r4h4514',
            'charset' => 'utf8',
        ],
        
        'db_sss' => 
        [
                'class' => 'yii\db\Connection',
                'dsn' => 'mysql:host=202.53.254.83;dbname=dbc001',
                'username' => 'lgoffice321',
                'password' =>'r4h4514',
                'charset' => 'utf8',
        ],

        'db_esm' => 
        [
                'class' => 'yii\db\Connection',
                'dsn' => 'mysql:host=10.10.99.2;dbname=dbc002',
                'username' => 'labtest',
                'password' =>'asd123',
                'charset' => 'utf8',
        ],
                
        'db_lipat' => 
        [
                'class' => 'yii\db\Connection',
                'dsn' => 'mysql:host=202.53.254.83;dbname=dbc003',
                'username' => 'lgoffice321',
                'password' =>'r4h4514',
                'charset' => 'utf8',
        ],

        'db_gsn' => 
        [
                'class' => 'yii\db\Connection',
                'dsn' => 'mysql:host=202.53.254.83;dbname=dbc004',
                'username' => 'lgoffice321',
                'password' =>'r4h4514',
                'charset' => 'utf8',
        ],  

        'db_test' => 
        [
                'class' => 'yii\db\Connection',
                'dsn' => 'mysql:host=202.53.254.83;dbname=db_test',
                'username' => 'lgoffice321',
                'password' =>'r4h4514',
                'charset' => 'utf8',
        ],
        
        'db2' => [
            'class' => 'yii\db\Connection',
            'dsn' => 'mysql:host=10.10.99.2;dbname=dbm002',
            'username' => 'labtest',
            'password' =>'asd123',
            'charset' => 'utf8',
        ],
        
        /*-ptr.nov- : Public Permission */
        'as access'=>
        [
            'class'=>'mdm\admin\components\AccessControl',
            'allowActions'=>
            [
                '*',
                //'site/login',
                //'site/error',
            ]
        ],
        
    ],
    'params' => $params,
];
