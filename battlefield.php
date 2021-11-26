<?php
    require_once("partial/header.php");
?>
    <script src="js/battlefield.js"></script>
    <link rel="stylesheet" href="css/battlefield.css">

    <div class="battlefield_background_container">
        <div class="battlefield_background" id="battlefield_background_up"></div>
        <div class="battlefield_background" id="battlefield_background_down"></div>
    </div>

    <div class=battlefield_container>
        <div class="battlefield_wrapper">
            <div class=ui>
                <div class="o_interface">
                    <div id="o_hero"></div>
                    <div class="btn_ui" id="o_hp">hp</div>
                    <div class="btn_ui" id="o_mana">mp</div>
                    <div class="btn_ui" id="o_deck">deck</div>
                    <div id="o_mana_bar"></div>
                </div>

                <div class="p_interface">
                    <div id="p_hero"></div>
                    <div class="btn_ui" id="p_hp">hp</div>
                    <div class="btn_ui" id="p_mana">mp</div>
                    <div class="btn_ui" id="p_deck">deck</div>
                    <div class="p_power" id="p_power">POWER</div>
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
                    <div class="turn" id="turn"> END TURN</div>
                    <div class="surrender"> SURRENDER</div>
                </div>
            </div>
            <div class="chat">CHAT</div>
        </div>
    </div>
    <div class="show_chat">
        <iframe
            src="https://magix.apps-de-cours.com/server/#/chat/<?=  $_SESSION["player_data"]->key?>?v=1" onload="applyStyles(this)" >
        </iframe>
    </div>
    <div class="show_card">
        <div class="name"></div>
        <div class="cost"></div>
        <div class=atk></div>
        <div class=hp></div>
        <div class=baseHP></div>
        <div class=mechanics></div>
        <div class=uid></div>
    </div>

    <div class="game_over">
        <h1 id="gamwOver_txt"></h1>
        <div class="quitter">QUITTER</div>
    </div>

<?php
    require_once("partial/footer.php");
?>