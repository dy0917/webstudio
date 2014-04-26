<?php

//header("Access-Control-Allow-Origin: *");
//header('Content-type: *');
//header('Access-Control-Request-Method: *');
//header('Access-Control-Allow-Methods: PUT, POST, OPTIONS, GET');
//header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

class UsersController extends Controller {

    const JSON_RESPONSE_ROOT_SINGLE = 'user';
    const JSON_RESPONSE_ROOT_PLURAL = 'users';

    public function actionIndex() {


    }

    public function actionCreate() {


    }

    public function actionRead() {
        $temp = explode("/", $_SERVER['REQUEST_URI']);
        $id = $temp [sizeof($temp) - 1];

        $model = User::model()->findByPk($id);
        $json = $this->objtoJson(self::JSON_RESPONSE_ROOT_SINGLE, $model);

        $this->sendResponse(200, $json);
    }

    public function actionUpdate() {

    }

    public function actionDelete() {
    }

}

?>
