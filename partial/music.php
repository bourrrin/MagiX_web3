
<?php
    if(!isset($_SESSION["volume"])){
        $_SESSION["volume"] = "0.5";
    }

    if(!isset($_SESSION["isDisable"])){
        $_SESSION["isDisable"] = "false";
    }

?>

    <div id="isDisable_data" style="display:none"><?=$_SESSION["isDisable"] ?></div>
    <div id="volume_data" style="display:none"><?=$_SESSION["volume"] ?></div>

    <audio id="music" src="sound/music/lobby.mp3"></audio>
   <script src="js/music.js"></script>
   <script src="js/sfx.js"></script>
