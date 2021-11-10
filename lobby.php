<?php
    require_once("partial/header.php");
?>
    <link rel="stylesheet" href="css/lobby.css">
    <script src="js/lobby.js"></script>

    <div class="lobby-container">
        <div class=lobby-wrapper>
            <div class="lobby-header">
                <h1>HELLO WORLD</h1>
                <p> loged in the MagiX</p>
            </div>
            <div class="lobby-btn" id="jouer">Jouer</div>
            <div class="lobby-btn" id="pratique">Pratique</div>
            <div id="load_bar"></div>
            <!-- <div class="element" id="quitter">Quitter</div> -->
            <!-- <img src="img/lobby/giphy.gif" alt=""> -->
            <!-- <img id="hologram" src="img/lobby/sphere.gif" alt=""> -->
            <div class="chat">
                <iframe
                src="https://magix.apps-de-cours.com/server/#/chat/<?=  $_SESSION["player_data"]->key?>?v=1" onload="applyStyles(this)" >
                </iframe>
            </div>
        </div>
    </div>

<?php
    require_once("partial/footer.php");
?>
