<?php
    require_once("partial/header.php");

?>
    <link rel="stylesheet" href="css/login.css">
    <script src="js/login.js"></script>

    <div class=background id=background0></div>
    <div class=background id=background1></div>
    <div class="page_title">
        <h1>THE MAGIX</h1>
    </div>
    <div class=login>
        <p id="message_erreur"></p>
        <form method="post">
            <input id="login_name" type="text" name="username" value="Bourrrin" placeholder="Username">
            <input id="login_mdp" type="password" name="mdp" value="1977599" placeholder="Password">
        </form>
        <button id="button" class="btn_no_style" > LOG IN</button>
    </div>
<?php
    require_once("partial/footer.php");
?>