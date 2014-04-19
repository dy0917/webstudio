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
               echo  '{"' . self::JSON_RESPONSE_ROOT_PLURAL . '":[{"id":1,"blog_title":"kkkk"},{"id":2,"blog_title":"blog_title2"}]}';
    }

    public function actionCreate() {

    }

    public function actionRead() {
        
        //     $this->sendResponse(204, '{"' . self::JSON_RESPONSE_ROOT_SINGLE . '":{"id":1,"blog_title":"blog_title"}}');
     echo   '{"' . self::JSON_RESPONSE_ROOT_SINGLE . ':{"id":1,"blog_title":"blog_title"}}';
       
    }

    public function actionUpdate() {
        
    }

    public function actionDelete() {
        
    }

    public function actionTest() {

    }

}

?>
