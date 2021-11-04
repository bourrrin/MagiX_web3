<?php
    require_once("partial/header.php");
?>
    <div class=login>
        <p id="message_erreur"></p>
        <form method="post">
            <input id="login_name" type="text" name="username" placeholder="Username">
            <input id="login_mdp" type="password" name="mdp" placeholder="Password">
        </form>
        <button id="button" class="btn_no_style" > LOG IN</button>
    </div>
<?php
    require_once("partial/footer.php");
?>