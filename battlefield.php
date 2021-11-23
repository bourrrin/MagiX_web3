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
            <div class="p_interface">
                <div id="p_hero"></div>
                <div id="p_hp">...</div>
                <div id="p_power">POWER</div>
                <div id="p_mana"></div>
            </div>
            <div class="p_hp_bar"></div>
            <div class="o_interface">
                <div id="o_hero"></div>
                <div id="o_hp">...</div>
                <!-- <div id="o_power">POWER</div> -->
                <div id="o_mana"></div>
            </div>
            <div class="o_hp_bar"></div>

            <div class="o_board"></div>
            <div class="p_board"></div>
            <div class="p_hand"></div>
            <div class="o_hand"></div>
            <div class="turn"> END TURN</div>
            <div class="timer"> 50s</div>
        </div>
    </div>
    <div class="show_card"></div>

<?php
    require_once("partial/footer.php");
?>