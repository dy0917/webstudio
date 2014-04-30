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

        $models = Blog::model()->findAll();

        $json = $this->arrtoJson(self::JSON_RESPONSE_ROOT_PLURAL, $models);

        $this->sendResponse(200, $json);
    }

    public function actionCreate() {


        $request = $this->getClientPost();
        $post = $request['blog'];
        $model = new Blog;
        $date = new DateTime();
        //    $date->format('Y-m-d H:i:s');
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

        $model = Blog::model()->findByPk($id);
        $json = $this->objtoJson(self::JSON_RESPONSE_ROOT_SINGLE, $model);

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
        $post = Blog::model()->findByPk($id); // assuming there is a post whose ID is 10
        $post->delete();
    }

    public function actionTest() {
        echo "asdfasdfasdf";
    }

}

?>
