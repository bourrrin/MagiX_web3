
<?php
    if(!isset($_SESSION["volume"])){
        $_SESSION["volume"] = "0.01";
    }

    if(!isset($_SESSION["isDisable"])){
        $_SESSION["isDisable"] = "false";
    }

    if(!isset($_SESSION["isDisable_sfx"])){
        $_SESSION["isDisable_sfx"] = "false";
    }

    if(!isset($_SESSION["volume_sfx"])){
        $_SESSION["volume_sfx"] = "0.20";
    }

?>

    <div id="isDisable_data" style="display:none"><?=$_SESSION["isDisable"] ?></div>
    <div id="volume_data" style="display:none"><?=$_SESSION["volume"] ?></div>
    <div id="audio_container">
        <audio id="music" ></audio>
    </div>
   <script src="js/music.js"></script>
   <script src="js/sfx.js"></script>
