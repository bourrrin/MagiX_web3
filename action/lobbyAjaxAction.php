<?php
    require_once("action/CommonAction.php");

    class LobbyAjaxAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {
            $result = false;
            $data = [];
            $data["key"] = $_SESSION["player_data"]->key;
            $_SESSION["user"] = "null";

            if($_POST["action"] == "quitter"){
                $result = parent::callAPI("signout",$data);
            }
            else if($_POST["action"] == "jouer"){
                if($_POST["privateKey"] != ""){
                    $data["privateKey"] = $_POST["privateKey"];
                }
                $data["type"] = "PVP";
                $data["mode"] = $_POST["mode"];
                $result = parent::callAPI("games/auto-match",$data);
            }
            else if($_POST["action"] == "pratique"){
                $data["mode"] = $_POST["mode"];
                $data["type"] = "TRAINING";
                $result = parent::callAPI("games/auto-match",$data);
            }
            else if($_POST["action"] == "observe"){
                $data["username"] = $_POST["user"];
                $result = parent::callAPI("games/observe",$data);
                if (is_object($result)) {
                    $_SESSION["user"] = $_POST["user"];
                }
            }

            if ($result == "SIGNED_OUT" || $result == "INVALID_KEY") {
                session_unset();
                session_destroy();
                session_start();
            }


            return compact("result");
        }
    }