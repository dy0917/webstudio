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

    /**
     * Displays the contact page
     */
    public function actionContact() {
        $model = new ContactForm;
        if (isset($_POST['ContactForm'])) {
            $model->attributes = $_POST['ContactForm'];
            if ($model->validate()) {
                $name = '=?UTF-8?B?' . base64_encode($model->name) . '?=';
                $subject = '=?UTF-8?B?' . base64_encode($model->subject) . '?=';
                $headers = "From: $name <{$model->email}>\r\n" .
                        "Reply-To: {$model->email}\r\n" .
                        "MIME-Version: 1.0\r\n" .
                        "Content-type: text/plain; charset=UTF-8";

                mail(Yii::app()->params['adminEmail'], $subject, $model->body, $headers);
                Yii::app()->user->setFlash('contact', 'Thank you for contacting us. We will respond to you as soon as possible.');
                $this->refresh();
            }
        }
        $this->render('contact', array('model' => $model));
    }

    /**
     * Displays the login page
     */
    public function actionLogin() {

        $this->clearExpireSession();
//$data = Yii::app()->session->readSession('668no17tdnhd1dedm53l1sdph2');
//Yii::app()->session->add('projectId',"ttttttt");
        //error_log("adsfasdfasdf id: ".Yii::app()->session->getSessionID());
        $temp_request = $this->getClientPost();

        $request = CJSON::decode($temp_request, true);

        $identity = new UserIdentity($request['email'], $request['password']);

        $error_code = $identity->authenticate();

        if ($error_code == UserIdentity::ERROR_USERNAME_INVALID) {
            $this->sendResponse(200, '{"error":"ERROR_USERNAME_INVALID"}');
        } else if ($error_code == UserIdentity::ERROR_PASSWORD_INVALID) {
            $this->sendResponse(200, '{"error":"ERROR_PASSWORD_INVALID"}');
        } else {//create session, correct data
            Yii::app()->session->add('projectId', $identity->getId());
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

}
