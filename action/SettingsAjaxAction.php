<?php
    require_once("action/CommonAction.php");

    class SettingsAjaxAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {
            $result = false;
            if(isset($_POST["anim_timing"])){
                $_SESSION["anim_timing"] = $_POST["anim_timing"];
                $result =  $_SESSION["anim_timing"];
            }

            return compact("result");
        }
    }