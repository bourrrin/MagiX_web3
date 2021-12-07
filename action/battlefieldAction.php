<?php
    require_once("action/CommonAction.php");

    class BattlefieldAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {
            $user =$_SESSION["user"];
            $username =$_SESSION["username"];
            return compact("user","username");
        }
    }