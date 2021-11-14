<?php
    require_once("action/CommonAction.php");

    class LobbyAjaxAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {
            $result = false;
            if($_POST["action"] == "quitter"){
                // $data = [
                //     "key" => $_SESSION["player_data"]->key
                // ];
                // $result = parent::callAPI("signout",$data)

                // if( $rep == "SIGNED_OUT"){
                    $result=true;
                // }

            }
            return compact("result");
        }
    }