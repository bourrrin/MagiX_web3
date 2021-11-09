<?php
    require_once("partial/header.php");
?>
    <link rel="stylesheet" href="css/lobby.css">
    <script src="js/lobby.js"></script>

    <div class=lobby-wrapper>
        <div class="element" id="jouer">Jouer</div>
        <div class="element" id="pratique">Pratique</div>
        <div class="element" id="quitter">Quitter</div>
        <!-- <img src="img/lobby/giphy.gif" alt=""> -->
        <!-- <img src="img/lobby/brain.gif" alt=""> -->
        <div class="chat">
            <iframe
            src="https://magix.apps-de-cours.com/server/#/chat/<?=  $_SESSION["player_data"]->key?>?v=1" onload="applyStyles(this)" >
            </iframe>
        </div>
    </div>

<?php
    require_once("partial/footer.php");
?>
