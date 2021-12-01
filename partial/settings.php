
<link rel="stylesheet" href="css/settings.css">

 <div class=settings>
    <div id="settings_btn">
        <div id="control_btn" class="btn_selected">CONTROL</div>
        <div id="sound_btn">SOUNDS</div>
        <div id="animation_btn">TRANSITION</div>
    </div>
    <div class="settings_txt">
        <div id="control">
            <p>- Attack opponent : left click on hp indicator or on his card</p>
            <p>- Play Card : left click on card</p>
            <p>- Show Card : right click on card</p>
            <p>- Hide Card : left click on showed card</p>
            <p>- Attack Card : left click on your card then one of the opponent card</p>
            <p>- Use buttons : left click</p>
        </div>
        <div id="sound">
            <p>NOT AVALAIBLE</p>
        </div>
        <div id="animation">

            <button class="set_animation" id="Normal"
                <?php
                if($_SESSION["anim_timing"] == "Normal"){
                    ?>
                    style="color:black";
                    <?php
                }
                ?>>Normal</button>
            <button class="set_animation" id="Faster"<?php
                if($_SESSION["anim_timing"] == "Faster"){
                    ?>
                    style="color:black;"
                    <?php
                }
                ?>>Faster</button>
            <button class="set_animation" id="Disable"<?php
                if($_SESSION["anim_timing"] == "Disable"){
                    ?>
                    style="color:black";
                    <?php
                }
                ?>>Disable</button>
        </div>
    </div>
</div>