<?php
    require_once("action/CommonAction.php");

    class IndexAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {
            $line =explode(";",file_get_contents("data/username.txt"));
            $user = end($line);
            return compact("user");
        }
    }