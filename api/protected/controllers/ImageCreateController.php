<?php

class ImageCreateController extends Controller {

    // const JSON_RESPONSE_ROOT_SINGLE = 'image';
    // const JSON_RESPONSE_ROOT_PLURAL = 'images';

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
        $userid = $request['userid'];
        $imageSrc = $this->getInputData($request['type'], $request['src']);
        $foldername = Yii::app()->params['diskpath'] . '/images/' . $userid . '/';
        if (!file_exists($foldername)) {
            mkdir($foldername, 0777);
        }
        file_put_contents($foldername . $request['imagename'], $imageSrc);
        $ImageUrl = $_SERVER['SERVER_NAME'] . "/images/" . $userid . "/" . $request['imagename'];
        echo $ImageUrl;
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
