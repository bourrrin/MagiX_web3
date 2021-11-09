<?php
    require_once("partial/header.php");
?>
    <link rel="stylesheet" href="css/lobby.css">
    <script src="js/lobby.js"></script>
    <div id="background_lobby"></div>
    <div class="darken-filter"></div>
    <div class=lobby-wrapper>
        <div class="main-menu">
            <img class="element_back" src="img/lobby/main_screen_back.jpg" alt="">
            <div class="btn_menu">
                <div class="element" id="jouer">Jouer</div>
                <div class="element" id="pratique">Pratique</div>
                <div class="element" id="quitter">Quitter</div>
            </div>


        </div>
        <div class="chat">
            <iframe
            src="https://magix.apps-de-cours.com/server/#/chat/<?=  $_SESSION["player_data"]->key?>?v=1" onload="applyStyles(this)" >
            </iframe>
        </div>
    </div>

<?php
    require_once("partial/footer.php");
?>
