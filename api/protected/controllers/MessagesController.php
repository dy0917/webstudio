<?php

class MessagesController extends Controller {

    const JSON_RESPONSE_ROOT_SINGLE = 'message';
    const JSON_RESPONSE_ROOT_PLURAL = 'messages';

    public function actionIndex() {

        $temp = explode("?", $_SERVER['REQUEST_URI']);
        $id = $temp[sizeof($temp) - 1];
        $id = explode("=", $id)[1];

        $criteria = new CDbCriteria;
        $criteria->addCondition('t.blog_id=' . $id);
        $arr_model = Message::model()->with('author')->together()->findAll($criteria);

        $json = '{"' . self::JSON_RESPONSE_ROOT_PLURAL . '":[';
        for ($i = 0; $i < sizeof($arr_model); $i++) {

            $arrtemp = $arr_model[$i]->attributes;
            $arrtemp["displayname"] = $arr_model[$i]->author->attributes["displayname"];
            $arrtemp["imageurl"] = $arr_model[$i]->author->attributes["imageurl"];
            $json = $json . json_encode($arrtemp);
            if ($i < sizeof($arr_model) - 1) {
                $json = $json . ",";
            }
        }

        $json = $json . ']}';
        $this->sendResponse(200, $json);
    }

    public function actionCreate() {

        $request = $this->getClientPost();
        $post = $request[self::JSON_RESPONSE_ROOT_SINGLE];
        $model = new Message;
        $date = new DateTime();
        $model->setAttributes($post);
        $model->created = $date->format('Y-m-d H:i:s');
        if ($model->validate()) {
            $model->save();
            $this->sendResponse(204);
        } else {

            $this->sendResponse(500);
        }
    }

    public function actionRead() {
        
    }

    public function actionUpdate() {
        
    }

    public function actionDelete() {
        
    }

}

?>
