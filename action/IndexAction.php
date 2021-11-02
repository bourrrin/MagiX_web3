<?php
    require_once("action/CommonAction.php");

    class IndexAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {

            $message_erreur="";
            if(isset($_POST["username"]) && isset($_POST["mdp"])){
                $data["username"] = $_POST["username"];
                $data["password"] = $_POST["mdp"];

                $result = parent::callAPI("signin", $data);

                if ($result == "INVALID_USERNAME_PASSWORD") {
                    $message_erreur="invalid Username or Password";
                }
                else {
                    $key = $result->key;
                    $_SESSION["player_data"] = $result;
                    header('Location:lobby.php');
                }
            }

            return compact("message_erreur");
        }
    }