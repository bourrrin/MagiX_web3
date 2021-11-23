<?php
    require_once("partial/header.php");
    require_once("partial/lobby_intro.php");
    require_once("partial/lobby_transition_tunel.php");
?>
    <link rel="stylesheet" href="css/lobby.css">
    <script src="js/lobby.js"></script>

    <div class="lobby_back_effect"></div>
    <div id="lobby_dead_pixel_effect"></div>

    <div class="lobby-container">
        <div class=lobby-wrapper>
            <div class="lobby-header">
                <h1>HELLO WORLD</h1>
                <p> logged in <span>the MagiX</span></p>
            </div>
            <div class="lobby-btn" id="jouer">Jouer</div>
            <div class="lobby-btn" id="pratique">Pratique</div>
            <div class="" id="quitter"><p>Quitter</p></div>
            <div id="load_bar"></div>
            <div class="bruh"></div>
            <div class="scene">
                <div class="wrapper">
                    <div class="globe">
                    <span class="ring"></span>
                    <span class="ring"></span>
                    <span class="ring"></span>
                    <span class="ring"></span>
                    <span class="ring"></span>
                    <span class="ring"></span>
                    <span class="ring"></span>
                    <span class="ring"></span>
                    <span class="ring"></span>
                    <span class="ring"></span>
                    <span class="ring"></span>
                    <span class="ring"></span>
                    <span class="ring"></span>
                    </div>
                </div>
            </div>
            <div class="chat">
                <iframe
                src="https://magix.apps-de-cours.com/server/#/chat/<?=  $_SESSION["player_data"]->key?>?v=1" onload="applyStyles(this)" >
                </iframe>
                <!-- <iframe
                src="https://magix.apps-de-cours.com/server/#/deck/<?=  $_SESSION["player_data"]->key?>">
                </iframe> -->
            </div>
        </div>
    </div>

<?php
    require_once("partial/footer.php");
?>
