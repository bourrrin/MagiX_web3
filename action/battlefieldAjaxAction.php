<?php
    require_once("action/CommonAction.php");

    class BattlefieldAjaxAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {
            $result = false;
            $data = [];
            $data["key"] = $_SESSION["player_data"]->key;

            if(isset($_POST["action"])){
                if($_POST["action"] == "END_TURN"){
                    $data["type"] = "END_TURN";
                    $result = parent::callAPI("games/action",$data);

                }else if($_POST["action"] == "HERO_POWER"){
                    $data["type"] = "HERO_POWER";
                    $result = parent::callAPI("games/action",$data);

                }else if($_POST["action"] == "PLAY"){
                    $data["type"] = "PLAY";
                    $data["uid"] = $_POST["uid"];
                    $result = parent::callAPI("games/action",$data);

                }else if($_POST["action"] == "SURRENDER"){
                    $data["type"] = "SURRENDER";
                    $result = parent::callAPI("games/action",$data);

                }else if($_POST["action"] == "ATTACK"){
                    $data["type"] = "ATTACK";
                    $data["uid"] = $_POST["uid"];
                    $data["targetuid"] = $_POST["targetuid"];
                    $result = parent::callAPI("games/action",$data);
                }
            }else{
                $result = parent::callAPI("games/state",$data);
            }

            return compact("result");
        }
    }