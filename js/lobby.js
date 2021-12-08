//#region IFRAME STYLE

const applyStyles = (iframe) => {
    let styles = {
        fontColor: "rgb(0, 255, 0)",
        fontGoogleName: "Gruppo",
        height: "100%",
        fontSize: "20px",
        inputBackgroundColor: "rgb(177, 177, 177,0.2)",
        memberListBackgroundColor: "rgb(0,0,0, 0.5)",
    };
    setTimeout(() => {
        iframe.contentWindow.postMessage(JSON.stringify(styles), "*");
    }, 100);
};

//#endregion

let utils = new Utils();
let scroll = 0;
let anima_timing;
let music;
let sfx;

window.addEventListener("load", () => {
    tippy("#scroll_deck", {
        content: "use mouse wheel",
    });

    anima_timing = document.querySelector("#anim_timing").innerHTML;
    music = new Music(document.querySelector("#music"));
    sfx = new Sfx();

    initEventListener();
    initDisplay();
});

//#region .INIT

function initEventListener() {
    window.addEventListener("contextmenu", (e) => e.preventDefault());
    sfx.clickSfx(document.querySelectorAll(".sfx_btn"));

    document.querySelector("#scroll_deck").addEventListener("wheel", scrollDeck);
    document.querySelector("#scroll_deck_click").addEventListener("click", () => {
        scrollDeckClick(true);
    });
    document.querySelector("#scroll_deck_click").addEventListener("contextmenu", () => {
        scrollDeckClick(false);
    });
    document.querySelector("#quitter").addEventListener("click", quitter);
    document.querySelector("#settings").addEventListener("click", () => {
        displayMainMenu("settings");
    });
    document.querySelector("#deck").addEventListener("click", () => {
        displayMainMenu("deck");
    });
    document.querySelector("#note").addEventListener("click", () => {
        displayMainMenu("note");
    });

    document.querySelectorAll(".set_animation").forEach((e) => {
        e.addEventListener("click", setAnimationTiming);
    });

    document.querySelector("#play").addEventListener("click", jouer);
    document.querySelector("#pratique").addEventListener("click", pratique);
    document.querySelector("#observe").addEventListener("click", observe);
    document.querySelector("#pratique_coop").addEventListener("click", () => {
        pratique("coop");
    });
    document.querySelector("#play_coop").addEventListener("click", () => {
        jouer("coop");
    });
    document.querySelector("#jouer").addEventListener("click", () => {
        displayJouer(true);
    });
    document.querySelector("#return_game").addEventListener("click", () => {
        displayJouer(false);
    });
}

function initDisplay() {
    create_loadingBar_animation();
    setTimeout(() => {
        displayLoadingScreen();
    }, 100);
}

//#endregion

//#region ANIMATION HANDLERS

function setAnimationTiming() {
    let timing = event.currentTarget.innerHTML;

    let formData = new FormData();
    formData.append("anim_timing", timing);

    fetch("settingsAjax.php", {
        method: "POST",
        credentials: "include",
        body: formData,
    })
        .then((response) => response.json())
        .then((response) => {
            anima_timing = response;
            document.querySelectorAll(".set_animation").forEach((e) => {
                e.style.color = "white";
            });
            document.querySelector("#" + response).style.color = "black";
        });
}

function scrollDeck(event) {
    let el = document.querySelector(".deck_iframe");
    let max = -120;

    event.preventDefault();
    scroll = scroll - event.deltaY * 0.1;
    if (scroll <= max) {
        scroll = max;
    } else if (scroll >= 0) {
        scroll = 0;
    }

    el.style.transform = "translateY(" + scroll + "vh)";
}

function scrollDeckClick(direction) {
    let el = document.querySelector(".deck_iframe");
    let max = -120;
    if (direction) {
        delta = 40;
    } else {
        delta = -40;
    }

    scroll = scroll - delta;
    if (scroll <= max) {
        scroll = max;
    } else if (scroll >= 0) {
        scroll = 0;
    }

    el.style.transform = "translateY(" + scroll + "vh)";
}

function displayLoadingScreen() {
    if (anima_timing == "Disable") {
        document.querySelector(".lobby-container").style.display = "block";
        document.querySelector("#quitter").style.animationDelay = "0s";
        document.querySelector(".container").style.display = "none";
    } else if (anima_timing == "Normal") {
        intro = new LoadingScreen(
            document.querySelector(".container"),
            document.querySelector(".lobby-container"),
            1.2
        );
        sfx.playSfx("loadingLobby");
    } else if (anima_timing == "Faster") {
        intro = new LoadingScreen(
            document.querySelector(".container"),
            document.querySelector(".lobby-container"),
            0.5
        );
        sfx.playSfx("loadingLobby");
    }
}

function displayJouer(condition) {
    if (condition) {
        sfx.playSfx("openPlayMenu");
        document.querySelector(".game").style.display = "flex";
        document.querySelector("#game_container").style.opacity = 1;
    } else {
        sfx.playSfx("openPlayMenu");
        document.querySelector("#game_container").style.opacity = 0;
        setTimeout(() => {
            document.querySelector(".game").style.display = "none";
        }, 500);
    }
}

function displayMainMenu(target) {
    let div = document.querySelector("." + target);
    if (div.style.display == "none" || div.style.display == "") {
        document.querySelector(".center").childNodes.forEach((element) => {
            if (element instanceof HTMLDivElement) {
                element.style.display = "none";
            }
        });
        div.style.display = "flex";
    } else {
        document.querySelector(".center").childNodes.forEach((element) => {
            if (element instanceof HTMLDivElement) {
                element.style.display = "none";
            }
        });
        document.querySelector(".scene").style.display = "flex";
        setTimeout(() => {
            sfx.playSfx("mainContainerChange");
        }, 550);
    }
}

function creatFlashElement() {
    document.querySelector("body").appendChild(utils.create_element_id("div", "animation_fin"));
}

function successfullSignedOut() {
    sfx.playSfx("transitionFlash");
    document.querySelector("body").style.opacity = 0;
    creatFlashElement();
    setTimeout(() => {
        creatFlashElement();
        setTimeout(() => {
            window.location.replace("index.php");
        }, 2000);
    }, 100);
}

function create_loadingBar_animation() {
    setTimeout(() => {
        for (let i = 0; i < 200; i++) {
            let delay = Math.random() * (5 - 1) + 1;
            let node = document.createElement("div");
            node.style.animationDelay = delay + "s";
            document.querySelector("#load_bar").appendChild(node);
        }
    }, 1000);
}

function startGame() {
    let time = 1;
    if (anima_timing == "Faster") {
        time = 0.5;
    } else if (anima_timing == "Disable") {
        time = 0;
    }

    document.querySelector(".lobby-container").style.opacity = 0;
    document.querySelector("body").style.background = "black";
    setTimeout(() => {
        container = document.querySelector(".container_transition_tunel");
        transition = new Transition_Tunel(container, time * 30);
        sfx.playSfx("transitionTunnel");
        setTimeout(() => {
            transition.end_transition(document.querySelector(".container_transition_tunel"));
            document.querySelector("body").style.background = "radial-gradient(#010219,#01134c)";
            setTimeout(() => {
                window.location.replace("battlefield.php");
            }, time * 3000);
        }, time * 3000);
    }, time * 2000);
}

//#endregion

//#region AJAX ACTION

function quitter() {
    let formData = new FormData();
    formData.append("action", "quitter");
    APICall(formData);
}

function jouer(mode = "STANDARD") {
    let privateKey = document.querySelector("#game_key").value;
    console.log(privateKey);
    let formData = new FormData();
    formData.append("action", "jouer");
    formData.append("privateKey", privateKey);
    formData.append("mode", mode);

    APICall(formData);
}

function pratique(mode = "STANDARD") {
    let formData = new FormData();
    formData.append("action", "pratique");
    formData.append("mode", mode);

    APICall(formData);
}

function observe() {
    let user = document.querySelector("#player_name").value;
    let formData = new FormData();
    formData.append("action", "observe");
    formData.append("user", user);
    APICall(formData);
}

function APICall(formdata) {
    fetch("lobbyAjax.php", {
        method: "POST",
        credentials: "include",
        body: formdata,
    })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            if (typeof response !== "object") {
                if (response == "SIGNED_OUT" || response == "INVALID_KEY") {
                    successfullSignedOut();
                } else if (response == "DECK_INCOMPLETE") {
                    alert("DECK_INCOMPLETE");
                } else if (response == "MAX_DEATH_THRESHOLD_REACHED") {
                    alert("MAX_DEATH_THRESHOLD_REACHED");
                } else if (response == "NOT_IN_GAME") {
                    alert("NOT_IN_GAME");
                } else if (
                    response == "JOINED_PVP" ||
                    response == "CREATED_PVP" ||
                    response == "JOINED_TRAINING"
                ) {
                    startGame();
                }
            } else {
                startGame();
            }
        });
}

//#endregion
