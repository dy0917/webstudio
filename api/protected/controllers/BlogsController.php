<?php

header("Access-Control-Allow-Origin: *");
header('Content-type: *');

header('Access-Control-Request-Method: *');
header('Access-Control-Allow-Methods: PUT, POST, OPTIONS,GET');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

class BlogsController extends Controller {

    const JSON_RESPONSE_ROOT_SINGLE = 'blog';
    const JSON_RESPONSE_ROOT_PLURAL = 'blogs';

    public function actionIndex() {
        echo '{id:0,"blog_title":"asdfasdfasdf"}';
    }

    public function actionCreate() {

    }

    public function actionRead() {

    }

    public function actionUpdate() {
        
    }

    public function actionDelete() {
        
    }

    public function actionTest() {

    }

}

?>
