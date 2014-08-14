<?php

//header("Access-Control-Allow-Origin: *");
//header('Content-type: *');
//header('Access-Control-Request-Method: *');
//header('Access-Control-Allow-Methods: PUT, POST, OPTIONS, GET');
//header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

class BlogsController extends Controller {

    const JSON_RESPONSE_ROOT_SINGLE = 'blog';
    const JSON_RESPONSE_ROOT_PLURAL = 'blogs';

    public function actionIndex() {

//        $criteria = new CDbCriteria;
//        $criteria->select = 'author.diplayname, author.imageurl'; // select fields which you want in output
//        $criteria->condition = 't.author_id = author.id';
//        $criteria->join = 'INNER JOIN user ON (t.author_id=author.id)';
        // $criteria = new CDbCriteria;
        //  $criteria->join = 'INNER JOIN user ON (t.author_id=user.id)';
        $Criteria = new CDbCriteria();
        $Criteria->condition = "isDelete = 0";
        $models = Blog::model()->with('author')->together()->findAll($Criteria);
        $json = $this->arrtoJson(self::JSON_RESPONSE_ROOT_PLURAL, $models);
        $this->sendResponse(200, $json);
    }

    public function actionCreate() {


        $request = $this->getClientPost();
        $post = $request[self::JSON_RESPONSE_ROOT_SINGLE];
        $model = new Blog;
        $date = new DateTime();
        $model->setAttributes($post);
        $model->last_update = $date->format('Y-m-d H:i:s');
        if ($model->validate()) {
            $model->save();
            $this->sendResponse(204);
        } else {

            $this->sendResponse(500);
        }
    }

    public function actionRead() {
// $request_json = file_get_contents('php://input');
        $temp = explode("/", $_SERVER['REQUEST_URI']);
        $id = $temp [sizeof($temp) - 1];
        $criteria = new CDbCriteria;
        $criteria->addCondition('t.id=' . $id);
        $model = Blog::model()->with('author')->together()->findAll($criteria);
        $arrtemp = $model[0]->attributes;
        $arrtemp["displayname"] = $model[0]->author->attributes["displayname"];
        $arrtemp["imageurl"] = $model[0]->author->attributes["imageurl"];
        $json = '{"' . self::JSON_RESPONSE_ROOT_SINGLE . '":' . json_encode($arrtemp) . '}';
        //   $json = $this->objtoJson(self::JSON_RESPONSE_ROOT_SINGLE, $arrtemp);

        $this->sendResponse(200, $json);
    }

    public function actionUpdate() {
        $request = $this->getClientPost();
        $blog = $request['blog'];
        $temp = explode("/", $_SERVER['REQUEST_URI']);
        $id = $temp [sizeof($temp) - 1];
        $model = Blog::model()->findByPk($id);
        $model->setAttributes($blog);

        if ($model->validate()) {
            $model->save(false);
            $this->sendResponse(204);
        } else {
            $this->sendResponse(500);
        }
    }

    public function actionDelete() {
        $temp = explode("/", $_SERVER['REQUEST_URI']);
        $id = $temp [sizeof($temp) - 1];
        $model = Blog::model()->findByPk($id); // assuming there is a post whose ID is 10
        $model->isDelete = 1;
        if ($model->validate()) {
            $model->save();
            $this->sendResponse(204);
        } else {

            $this->sendResponse(500);
        }
        //   $post->delete();
    }

    public function actionTest() {
        
    }

    public function arrtoJson($modelType, $modelList) {
        $arr = array();
        foreach ($modelList as $model) {

            $arrtemp = $model->attributes;
            $arrtemp["displayname"] = $model->author->attributes["displayname"];
            $arrtemp["imageurl"] = $model->author->attributes["imageurl"];
            array_push($arr, $arrtemp);
        }

        $json = '{"' . $modelType . '":' . json_encode($arr) . '}';

        return $json;
    }

}

?>
