<?php
    require_once("action/battlefieldAjaxAction.php");

    $action = new BattlefieldAjaxAction();
    $data = $action->execute();

    echo json_encode($data["result"]);