<?php

//header("Access-Control-Allow-Origin: *");
//header('Content-type: *');
//header('Access-Control-Request-Method: *');
//header('Access-Control-Allow-Methods: PUT, POST, OPTIONS, GET');
//header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

class ImagesController extends Controller {

    const JSON_RESPONSE_ROOT_SINGLE = 'image';
    const JSON_RESPONSE_ROOT_PLURAL = 'images';

    public function actionIndex() {
        
    }

    public function actionCreate() {
        
    }

    public function actionRead() {
        
    }

    public function actionUpdate() {
        
    }

    public function actionDelete() {
        
    }

    public function actionWriteImage() {
        $temp_request = $this->getClientPost();

        $request = CJSON::decode($temp_request, true);

        $imageSrc = $this->getInputData($request['type'], $request['src']);

        file_put_contents('/var/www/images/newImage.jpg', $imageSrc);
    }

    public function getInputData($inputDataType, $inputData) {
        $tempInput = "";
        if ($inputDataType == "image/jpeg") {
            $tempInput = str_replace('data:image/jpeg;base64,', '', $inputData);
        } elseif ($inputDataType == "application/pdf") {
            $tempInput = str_replace('data:application/pdf;base64,', '', $inputData);
        } elseif ($inputDataType == "image/png") {
            $tempInput = str_replace('data:image/png;base64,', '', $inputData);
        } elseif ($inputDataType == "image/gif") {
            $tempInput = str_replace('data:image/gif;base64,', '', $inputData);
        }
        $data = base64_decode($tempInput);
        return $data;
    }

}

?>
