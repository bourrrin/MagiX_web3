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

            if($_POST["action"] == "quitter"){
                $result = parent::callAPI("signout",$data);
            }
            else if($_POST["action"] == "jouer"){
                $data["type"] = "PVP";
                $result = parent::callAPI("games/auto-match",$data);
            }
            else if($_POST["action"] == "pratique"){
                $data["type"] = "TRAINING";
                $result = parent::callAPI("games/auto-match",$data);
            }
            return compact("result");
        }
    }