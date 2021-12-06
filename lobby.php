<?php
    require_once("action/lobbyAction.php");
    $action = new LobbyAction();
    $data = $action->execute();

    require_once("partial/header.php");
    require_once("partial/lobby_intro.php");
    require_once("partial/lobby_transition_tunel.php");

    if(!isset($_SESSION["anim_timing"])){
        $_SESSION["anim_timing"] = "Normal";
    }

    var_dump( $_SESSION["player_data"]);
?>
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
                    <div class="lobby-btn sfx_btn" id="jouer">Play</div>
                    <div class="lobby-btn sfx_btn" id="pratique">Training</div>
                    <div class="lobby-btn sfx_btn" id="deck">Deck</div>
                    <div class="lobby-btn sfx_btn" id="note">Note</div>
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
                        <div id="scroll_deck"><img id="scroll_deck_click" src="img/arrow-down-sign-to-navigate.png" alt=""></div>
                        <iframe class="deck_iframe"
                            src="https://magix.apps-de-cours.com/server/#/deck/<?=  $_SESSION["player_data"]->key?>">
                        </iframe>
                    </div>
                    <?php require_once("partial/settings.php");  ?>
                    <?php require_once("partial/note.php");  ?>
                </div>
            </div>
            <div class="cool"></div>
            <div class="cool"></div>
            <div class="cool"></div>
            <div class="cool"></div>
            <div class="menu">
                <p class="sfx_btn" id="quitter">Exit</p>
                <p class="sfx_btn" id="settings">Settings</p>
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
