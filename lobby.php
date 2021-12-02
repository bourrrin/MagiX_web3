<?php
    require_once("partial/header.php");
    require_once("partial/lobby_intro.php");
    require_once("partial/lobby_transition_tunel.php");

    if(!isset($_SESSION["anim_timing"])){
        $_SESSION["anim_timing"] = "Normal";
    }
?>
    <audio id="music" src="sound/music/1.mp3"></audio>

    <div id="anim_timing" style="display: none;" value="<?=$_SESSION["anim_timing"]?>"><?=$_SESSION["anim_timing"]?></div>

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
            <div class="main_display">
                <div>
                    <div class="lobby-btn" id="jouer">Play</div>
                    <div class="lobby-btn" id="pratique">Training</div>
                    <div class="lobby-btn" id="deck">Deck</div>
                    <div class="lobby-btn" id="note">Note</div>
                </div>
                <div class="center">
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
                    <div class="deck">
                        <div id="scroll_deck"></div>
                        <iframe class="deck_iframe"
                            src="https://magix.apps-de-cours.com/server/#/deck/<?=  $_SESSION["player_data"]->key?>">
                        </iframe>
                    </div>
                    <?php require_once("partial/settings.php");  ?>
                    <div class="note">LOL</div>
                </div>
            </div>
            <div class="cool"></div>
            <div class="cool"></div>
            <div class="cool"></div>
            <div class="cool"></div>
            <div class="menu">
                <p id="quitter">Exit</p>
                <p id="settings">Settings</p>
            </div>
            <div id="load_bar"></div>
            <div class="chat">
                <iframe class="chat_iframe"
                src="https://magix.apps-de-cours.com/server/#/chat/<?=  $_SESSION["player_data"]->key?>?v=1" onload="applyStyles(this)" >
                </iframe>
            </div>

        </div>
    </div>

<?php
    require_once("partial/footer.php");
?>
