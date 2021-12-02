<?php
    require_once("action/SettingsAjaxAction.php");

    $action = new SettingsAjaxAction();
    $data = $action->execute();

    echo json_encode($data["result"]);