<?php
    require_once("partial/header.php");

 if(!isset($_SESSION["anim_timing"])){
        $_SESSION["anim_timing"] = "Normal";
    }

?>
    <div id="anim_timing" style="display: none;" value="<?=$_SESSION["anim_timing"]?>"><?=$_SESSION["anim_timing"]?></div>

    <script src="js/Carte.js"></script>
    <script src="js/battlefield.js"></script>
    <link rel="stylesheet" href="css/battlefield.css">
    <link rel="stylesheet" href="css/carte.css">

    <div class="battlefield_background_container">
        <div class="battlefield_background" id="battlefield_background_o"></div>
        <div class="battlefield_background" id="battlefield_background_p"></div>
    </div>

    <div class=battlefield_container>
        <div class="battlefield_wrapper">
            <div class=ui>
                <div class="o_interface">
                    <div id="o_sub_menu_btn">►</div>
                    <div class="btn_ui" id="o_hp">hp</div>
                    <div class="btn_ui" id="o_mana">mp</div>
                    <div class="btn_ui" id="o_deck">deck</div>
                    <div id="o_mana_bar"></div>
                </div>

                <div class="p_interface">
                    <div id="p_sub_menu_btn">►</div>
                    <div class="btn_ui" id="p_hp">hp</div>
                    <div class="btn_ui" id="p_mana">mp</div>
                    <div class="btn_ui" id="p_deck">deck</div>
                    <div class="p_power sfx_btn" id="p_power">POWER</div>
                    <div id="p_mana_bar"></div>
                </div>
            </div>

            <div class="o_board"></div>
            <div class="p_board"></div>
            <div class="p_hand"></div>
            <div class="o_hand"></div>
            <div class="menu_btn">
                <div class="timer"> 50s</div>
                <div class="sub_container">
                    <div class="turn sfx_btn" id="turn"> END TURN</div>
                    <div class="surrender sfx_btn"> SURRENDER</div>
                </div>
            </div>
            <div class="turn_indicator">YOUR TURN</div>

            <div class="menu">
                <div class="sfx_btn chat">CHAT</div>
                <div class="sfx_btn settings_btn">SETTINGS</div>
                <div class="sfx_btn note_btn_game">NOTES</div>
            </div>
        </div>
    </div>
    <div class="show_chat">
        <iframe
            src="https://magix.apps-de-cours.com/server/#/chat/<?=  $_SESSION["player_data"]->key?>?v=1" onload="applyStyles(this)" >
        </iframe>
    </div>

    <?php require_once("partial/settings.php");  ?>
    <?php require_once("partial/note.php");  ?>

    <div class="show_card">
        <div class="name"></div>
        <div class="cost"></div>
        <div class=atk></div>
        <div class=hp></div>
        <div class=baseHP></div>
        <div class=mechanics>
        </div>
        <div class=uid></div>
    </div>

    <div class="o_sub_menu">
        <div>
            <div id="o_username"></div>
            <div id="o_welcome_txt"></div>
        </div>
        <div>
            <div id="o_hero_class"></div>
            <div id="o_talent"></div>
        </div>
    </div>

    <div class="p_sub_menu">
        <div>
            <div id="p_username"></div>
            <div id="p_welcome_txt"></div>
        </div>
        <div>
            <div id="p_hero_class"></div>
            <div id="p_talent"></div>
        </div>
    </div>

    <div class="game_over">
        <h1 id="gamwOver_txt"></h1>
    </div>

    <div class="waiting_screen game_over">
        <h1>WAITING ...</h1>
    </div>
    <div class="quitter sfx_btn">QUITTER</div>

<?php
    require_once("partial/footer.php");
?>