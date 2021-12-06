<?php
    require_once("partial/music.php");
     if(!isset($_SESSION["anim_timing"])){
        $_SESSION["anim_timing"] = "Normal";
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/global.css">
    <link rel="stylesheet" href="css/lucAPI.css">
    <script src="js/utils.js"></script>
    <script src="https://unpkg.com/@popperjs/core@2"></script>
    <script src="https://unpkg.com/tippy.js@6"></script>
    <title>MagiX</title>
    <link rel="icon" type="image/png" href="img/favicon.png"/>
</head>
<body>