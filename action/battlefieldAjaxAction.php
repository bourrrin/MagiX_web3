<?php
    require_once("action/CommonAction.php");

    class LobbyAjaxAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {
            $result = false;

            return compact("result");
        }
    }