<?php
    require_once("action/IndexAction.php");
    $action = new IndexAction();
    $data = $action->execute();
    require_once("partial/header.php");
?>


    <form class=login action="" method="post">
        <div>
            <p class="message_erreur"> <?= $data["message_erreur"] ?></p>
            <div>
                <input type="text" name="username" placeholder="Username">
                <input type="text" name="mdp" placeholder="Password">
            </div>
            <button class="btn_no_style"> LOG IN</button>
        </div>
    </form>

<?php
    require_once("partial/footer.php");
?>