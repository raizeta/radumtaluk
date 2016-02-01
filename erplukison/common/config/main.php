<?php
return [
    'vendorPath' => dirname(dirname(__DIR__)) . '/vendor',
    /**
	  * Moduls For All Application
	  * @author ptrnov  <piter@lukison.com>
	  * @since 1.1
	*/
    'modules' => [
		/**
		  * Modul Kartik Extention, widget component 
		  * @author ptrnov  <piter@lukison.com>
		  * @since 1.1
		*/
        'gridview' => [
            'class' => '\kartik\grid\Module',
            // enter optional module parameters below - only if you need to
            // use your own export download action or custom translation
            // message source
            // 'downloadAction' => 'gridview/export/download',
            'i18n' => [
                'class' => 'yii\i18n\PhpMessageSource',
                'basePath' => '@kvgrid/messages',
                'forceTranslation' => true
            ],
        ],
		
		/**
		  * Modul Markdown Kartik Extention
		  * @author ptrnov  <piter@lukison.com>
		  * @since 1.1
		*/
        'markdown' => [
            'class' => 'kartik\markdown\Module',
            'previewAction' => '/markdown/parse/preview',

            // the controller action route used for downloading the markdown exported file
            'downloadAction' => '/markdown/parse/download',

            // the list of custom conversion patterns for post processing
            'customConversion' => [
                '<table>' => '<table class="table table-bordered table-striped">'
            ],

            // whether to use PHP SmartyPantsTypographer to process Markdown output
            'smartyPants' => true,
        ],  
		/**
		  * Modul Date controll Extention, widget component 
		  * @author ptrnov  <piter@lukison.com>
		  * @since 1.1
		*/
	    'datecontrol' =>  [
			'class' => 'kartik\datecontrol\Module',			
		]
    ],

	/**
	  * Components For All Application
	  * @author ptrnov  <piter@lukison.com>
	  * @since 1.1
	*/
    'components' => [
		/**
		  * Email Modul POSTMAN
		  * @author ptrnov  <piter@lukison.com>
		  * @since 1.1
		*/
		'postman' => [
			'class' => 'rmrevin\yii\postman\Component',
				'driver' => 'smtp',
				'default_from' => ['mailer@somehost.com', 'Mailer'],
				'subject_prefix' => 'Sitename / ',
				'subject_suffix' => null,
				'table' => '{{%postman_letter}}',
				'view_path' => '/email',
				'smtp_config' => [
					'host' => 'smtp.domain.cpom',
					'port' => 465,
					'auth' => true,
					'user' => 'email@domain.cpom',
					'password' => 'password',
					'secure' => 'ssl',
					'debug' => false,
				]
		],	
		/**
		  * Error Handle Missing Class
		  * @author ptrnov  <piter@lukison.com>
		  * @since 1.1
		*/
		'errorHandler' => [
            'maxSourceLines' => 20,
        ],
    ],

    /*-ptr.nov- : Public Parm FOND AWSOME*/
    'params' => [ 
	//$params,
        'icon-framework' => 'fa',  // Font Awesome Icon framework
		'HRD_EMP_UploadUrl'=>'/var/www/advanced/lukisongroup/web/upload/hrd/Employee/',
    ],

];
