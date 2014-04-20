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
        echo '{"' . self::JSON_RESPONSE_ROOT_PLURAL . '":[{"id":1,"blog_title":"kkkk"},{"id":2,"blog_title":"blog_title2"}]}';
    }

    public function actionCreate() {
        
    }

    public function actionRead() {

        
        $model = new Blog;
$model->title = "dafasdfasdf";
$model->body = "asdfasdfasdf";
$model->author = "1";
if ($model->validate()){
    $model->save();
} else {
    print_r($model->errors);
}
        
//        $con = mysqli_connect("23.229.135.6", "dy0917", "Huang003006", "webstudio");
//// Check connection
//        if (mysqli_connect_errno()) {
//            echo "Failed to connect to MySQL: " . mysqli_connect_error();
//        }
//
//        $result = mysqli_query($con, "SELECT * FROM blogs");
//
//        while ($row = mysqli_fetch_array($result)) {
//            echo $row['FirstName'] . " " . $row['LastName'];
//            echo "<br>";
//        }
//
//        mysqli_close($con);
        //     $this->sendResponse(200,  '{"' . self::JSON_RESPONSE_ROOT_SINGLE . ':{"id":1,"blog_title":"asdfasd"}}');
        //echo   '{"' . self::JSON_RESPONSE_ROOT_SINGLE . ':{"id":1,"blog_title":"blog_title"}}';
    }

    public function actionUpdate() {
        
    }

    public function actionDelete() {
        
    }

    public function actionTest() {
        echo "asdfasdfasdf";
    }

}

?>
