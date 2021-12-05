let utils = new Utils();
let music;
let sfx;

window.addEventListener("load", () => {
    music = new Music(document.querySelector("#music"), "login");
    sfx = new Sfx("login");
    sfx.clickSfx(document.querySelectorAll(".sfx_btn"));

    document.querySelector("#button").addEventListener("click", login);
    load_ships();
    setTimeout(fake_ship, 4000);
});

//#region AJAX ACTION

function login() {
    let username = document.querySelector("#login_name").value;
    let mdp = document.querySelector("#login_mdp").value;
    let formData = new FormData();
    formData.append("username", username);
    formData.append("mdp", mdp);

    fetch("loginAjax.php", {
        method: "POST",
        credentials: "include",
        body: formData,
    })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            if (response == true) {
                animation_login();
                setTimeout(() => {
                    window.location.replace("lobby.php");
                }, 2000);
            } else {
                document.querySelector(".login").style.border = "red solid 10px";
                document.querySelector(".login").style.boxShadow = "red 0px 0px 20px";

                setTimeout(() => {
                    document.querySelector(".login").style.border = "white solid 10px";
                    document.querySelector(".login").style.boxShadow =
                        "var(--neon-color) 0px 0px 20px";
                    setTimeout(() => {
                        document.querySelector("#message_erreur").innerHTML =
                            "Username or Password Invalid";
                        document.querySelector("#login_name").value = "";
                        document.querySelector("#login_mdp").value = "";
                    }, 200);
                }, 1000);
            }
        });
}

//#endregion

//#region ANIMATION

function load_ships() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 18; j++) {
            let source = "img/ships/ship" + j + ".png";
            let z = parseInt(Math.random() * (-1 - -3) + -3);
            let width =
                Math.random() * (4.5 - Math.abs(z) - (3.5 - Math.abs(z))) + (3.5 - Math.abs(z));
            let top = Math.random() * (90 - 5) + 5;
            let anim_dur = Math.random() * (50 - 10) + 10;
            let delay = 12 * i;
            let anim_delay = Math.random() * (delay - delay / 1.5) + delay / 1.5;

            var node = document.createElement("img");
            node.classList.add("ship");
            if (Math.floor(Math.random() * 2) == 1) {
                node.className += " move-left";
            } else {
                node.className += " move-right";
            }

            node.src = source;
            node.style.top = top + "%";
            node.style.width = width + "%";
            node.style.zIndex = z;
            node.style.filter =
                "blur(" + 0.2 * Math.abs(z) + "px) brightness(" + (100 - Math.abs(z) * 15) + "%)";
            node.style.animationDelay = anim_delay + "s";
            node.style.animationDuration = anim_dur + "s";

            document.querySelector("body").appendChild(node);
        }
    }
}

function fake_ship() {
    let source = "img/ships/easter_egg.png";
    let z = parseInt(Math.random() * (-1 - -3) + -3);
    let width = Math.random() * (4.5 - Math.abs(z) - (3.5 - Math.abs(z))) + (3.5 - Math.abs(z));
    let top = Math.random() * (90 - 5) + 5;
    let anim_dur = Math.random() * (50 - 10) + 10;

    var node = document.createElement("img");
    node.classList.add("ship");
    if (Math.floor(Math.random() * 2) == 1) {
        node.className += " move-left";
    } else {
        node.className += " move-right";
    }

    node.src = source;
    node.style.top = top + "%";
    node.style.width = width + "%";
    node.style.zIndex = z;
    node.style.filter =
        "blur(" + 0.2 * Math.abs(z) + "px) brightness(" + (100 - Math.abs(z) * 15) + "%)";
    node.style.animationDuration = anim_dur + "s";

    document.querySelector("body").appendChild(node);
}

function flash_animation_login() {
    document.querySelector("body").appendChild(utils.create_element_id("div", "animation_fin"));
}

function animation_login() {
    sfx.playSfx("transitionFlash");
    flash_animation_login();
    setTimeout(flash_animation_login, 200);
}
//#endregion
