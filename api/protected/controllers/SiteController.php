<?php

class SiteController extends Controller {

    /**
     * Declares class-based actions.
     */
    public function actions() {
        return array(
            // captcha action renders the CAPTCHA image displayed on the contact page
            'captcha' => array(
                'class' => 'CCaptchaAction',
                'backColor' => 0xFFFFFF,
            ),
            // page action renders "static" pages stored under 'protected/views/site/pages'
            // They can be accessed via: index.php?r=site/page&view=FileName
            'page' => array(
                'class' => 'CViewAction',
            ),
        );
    }

    /**
     * This is the default 'index' action that is invoked
     * when an action is not explicitly requested by users.
     */
    public function actionIndex() {
        // renders the view file 'protected/views/site/index.php'
        // using the default layout 'protected/views/layouts/main.php'
        $this->render('index');
    }

    /**
     * This is the action to handle external exceptions.
     */
    public function actionError() {
        if ($error = Yii::app()->errorHandler->error) {
            if (Yii::app()->request->isAjaxRequest)
                echo $error['message'];
            else
                $this->render('error', $error);
        }
    }



    public function actionAutoLogin() {
        //get user input
        $temp_request = $this->getClientPost();
        $request = CJSON::decode($temp_request, true);
        $sessionid = $request['session_id'];
        // get session
        $connection = Yii::app()->db;
        $sql = 'SELECT * FROM studioSession WHERE id = :sessionid';
        $command = $connection->createCommand($sql);
        $command->bindParam(':sessionid', $sessionid, PDO::PARAM_STR);
        $rowCount = $command->execute();
        $dataReader = $command->queryAll();
        if ($rowCount == 1) {
            $session_record = $dataReader[0]["data"];
            error_log($session_record);
        } else {
            echo "SESSION_MISSING";
        }
        //   echo "ok";
    }

    /**
     * Displays the login page
     */
    public function actionLogin() {

        $this->clearExpireSession();

        $temp_request = $this->getClientPost();

        $request = CJSON::decode($temp_request, true);

        $identity = new UserIdentity($request['email'], $request['password']);

        $error_code = $identity->authenticate();

        if ($error_code == UserIdentity::ERROR_USERNAME_INVALID) {
            $this->sendResponse(200, '{"error":"ERROR_USERNAME_INVALID"}');
        } else if ($error_code == UserIdentity::ERROR_PASSWORD_INVALID) {
            $this->sendResponse(200, '{"error":"ERROR_PASSWORD_INVALID"}');
        } else {//create session, correct data
            Yii::app()->session->add('UserId', $identity->getId());
            //     Yii::app()->session->add('aaaaaaaaaaaaaId', "ffffffffffff");
            $model = User::model()->findByPk($identity->getId());
            $arr = $model->attributes;
            unset($arr['password']);
            $arr['session_id'] = Yii::app()->session->getSessionID();
            $this->sendResponse(200, json_encode($arr));
        }
    }

    /**
     * Logs out the current user and redirect to homepage.
     */
    public function actionlogout() {
        $temp_request = $this->getClientPost();
        $request = CJSON::decode($temp_request, true);
        $sessionid = $request['logout'];
        $connection = Yii::app()->db;
        $sql = 'DELETE FROM studioSession WHERE id = :sessionid';
        $command = $connection->createCommand($sql);
        $command->bindParam(":sessionid", $sessionid, PDO::PARAM_STR);
        $command->execute();
        $this->sendResponse(204);
    }

    public function actionRead() {

        // echo "this is for testing";
    }

//
//    public function actionTest() {
//        echo "ok";
//    }
}
