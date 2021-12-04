<?php
    require_once("action/CommonAction.php");

    class SettingsAjaxAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {
            //sorry pour le beau spaghetti :)

            $result = false;
            if(isset($_POST["anim_timing"])){
                $_SESSION["anim_timing"] = $_POST["anim_timing"];
                $result =  $_SESSION["anim_timing"];
            }
            else if(isset($_POST["music"])){
                $result = [];
                if($_POST["music"] == "disable_music"){
                    $_SESSION["isDisable"] = "true";
                }else{
                    $_SESSION["isDisable"] = "false";
                }

                $result["volume"] = $_SESSION["volume"];
                $result["isDisable"] = $_SESSION["isDisable"];
            }
            else if(isset($_POST["volume"])){
                $result = [];
                $_SESSION["volume"] = $_POST["volume"] ;
                $result["volume"] = $_SESSION["volume"];
                $result["isDisable"] = $_SESSION["isDisable"];
            }
            else if(isset($_POST["sfx"])){
                $result = [];
                if($_POST["sfx"] == "disable_sfx"){
                    $_SESSION["isDisable_sfx"] = "true";
                }else{
                    $_SESSION["isDisable_sfx"] = "false";
                }

                $result["volume_sfx"] = $_SESSION["volume_sfx"];
                $result["isDisable_sfx"] = $_SESSION["isDisable_sfx"];
            }
            else if(isset($_POST["volume_sfx"])){
                $result = [];
                $_SESSION["volume_sfx"] = $_POST["volume_sfx"] ;
                $result["volume_sfx"] = $_SESSION["volume_sfx"];
                $result["isDisable_sfx"] = $_SESSION["isDisable_sfx"];
            }
            else{
                $result = [];
                $result["volume"] = $_SESSION["volume"];
                $result["isDisable"] = $_SESSION["isDisable"];
                $result["volume_sfx"] = $_SESSION["volume_sfx"];
                $result["isDisable_sfx"] = $_SESSION["isDisable_sfx"];
            }

            return compact("result");
        }
    }