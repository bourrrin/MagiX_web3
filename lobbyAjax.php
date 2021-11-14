<?php
    require_once("action/lobbyAjaxAction.php");

    $action = new LobbyAjaxAction();
    $data = $action->execute();

    echo json_encode($data["result"]);