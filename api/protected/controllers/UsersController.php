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
        $request = $this->getClientPost();
        $user = $request[self::JSON_RESPONSE_ROOT_SINGLE];
        error_log(var_export($user, true));
        $user_model = new User;
        //  $user_model->setAttributes($user);
        $user_model->displayname = $user["displayname"];
        if ($user_model->validate()) {
            $user_model->save();
            $socialmediaModel = new SocialMedia;
            $socialmediaModel->user_id = $user_model->id;
            $socialmediaModel->social_media_id = $user["social_media_id"];
            if ($user_model->validate()) {
                $socialmediaModel->save();
                $this->sendResponse(204);
            } else {
                $this->sendResponse(500);
            }
        } else {
            $this->sendResponse(500);
        }
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

    public function actionChecksocialID() {
        $temp_request = $this->getClientPost();

        $request = CJSON::decode($temp_request, true);

        $reponse = SocialMedia::model()->findByAttributes(
                array("social_media_id" => $request["social_media_id"])
        );


        if (isset($reponse) && $reponse != "") {

            echo $reponse->attributes["user_id"];
           // $this->sendResponse(200, $reponse->attributes["user_id"]);
        } else {
            echo "ID_NOT_FOUND";
           // $this->sendResponse(200, "ID_NOT_FOUND");
        }
    }

    private function createAccoutWithSocialLogin() {
        
    }

}

?>
