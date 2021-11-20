<?php
    require_once("action/battlefieldAjaxAction.php");

    $action = new LobbyAjaxAction();
    $data = $action->execute();

    echo json_encode($data["result"]);