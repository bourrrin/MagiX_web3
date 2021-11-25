<?php
    require_once("partial/header.php");
?>
    <!-- <script src="js/battlefield.js"></script> -->
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
                    <div id="o_hp">...</div>
                    <div id="o_deck">50</div>
                    <div id="o_mana"></div>
                </div>

                <!-- <div class="p_interface">
                    <div id="p_hero"></div>
                    <div id="p_hp">...</div>
                    <div id="p_power">POWER</div>
                    <div id="p_deck">50</div>
                    <div id="p_mana"></div>
                </div> -->
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
        </div>
    </div>
    <div class="show_card">
        <div class="name"></div>
        <div class="cost"></div>
        <div class=atk>5</div>
        <div class=hp></div>
        <div class=baseHP></div>
        <div class=mechanics></div>
        <div class=uid></div>
    </div>

<?php
    require_once("partial/footer.php");
?>