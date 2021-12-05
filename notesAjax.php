<?php
    require_once("action/notesAjaxAction.php");

    $action = new NotesAjaxAction();
    $data = $action->execute();

    echo json_encode($data["result"]);