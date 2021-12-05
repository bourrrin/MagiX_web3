<?php
    require_once("action/CommonAction.php");

    class AjaxAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {
            $result=true;

            if(isset($_POST["username"]) && isset($_POST["mdp"])){
                $data["username"] = $_POST["username"];
                $data["password"] = $_POST["mdp"];

                $result = parent::callAPI("signin", $data);

                if ($result == "INVALID_USERNAME_PASSWORD") {
                    $result = false;
                }
                else {
                    // $key = $result->key;
                    $_SESSION["player_data"] = $result;
                    file_put_contents("data/username.txt",";".$data["username"],FILE_APPEND);

                    $result = true;
                }
            }

            return compact("result");
        }
    }