<?php
    require_once("action/CommonAction.php");
    require_once("action/DAO/NotesDAO.php");

    class NotesAjaxAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {
            $result = false;

            if($_POST["DAO"] == "get"){
                $result = NotesDAO::getNotes();
            }else if($_POST["DAO"] == "add"){
                NotesDAO::addNotes($_POST["note"]);
                $result = true;
            }else if($_POST["DAO"] == "delete"){
                NotesDAO::deleteNotes($_POST["id"]);
                $result = true;
            }else if($_POST["DAO"] == "modify"){
                NotesDAO::modifyNotes($_POST["note"],$_POST["id"]);
                $result = true;
            }

            return compact("result");
        }
    }