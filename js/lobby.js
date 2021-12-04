//#region IFRAME STYLE

const applyStyles = (iframe) => {
    let styles = {
        fontColor: "rgb(0, 255, 0)",
        fontGoogleName: "Gruppo",
        height: "100%",
        fontSize: "20px",
        inputBackgroundColor: "rgb(177, 177, 177,0.2)",
    };
    setTimeout(() => {
        iframe.contentWindow.postMessage(JSON.stringify(styles), "*");
    }, 100);
};

//#endregion

let dead_pixel_array = [];
let utils = new Utils();
let h = window.innerHeight;
let anima_timing = "Normal";
let value = 0;
let isDeckDown = false;
let music;
let sfx;

window.addEventListener("load", () => {
    anima_timing = document.querySelector("#anim_timing").innerHTML;

    music = new Music(document.querySelector("#music"));
    sfx = new Sfx();
    sfx.clickSfx(document.querySelectorAll(".sfx_btn"));

    document.querySelector("#scroll_deck").addEventListener("click", scrollDeck);

    document.querySelector("#quitter").addEventListener("click", quitter);
    document.querySelector("#settings").addEventListener("click", () => {
        displayMainMenu("settings");
    });
    document.querySelector("#jouer").addEventListener("click", jouer);
    document.querySelector("#pratique").addEventListener("click", pratique);
    document.querySelector("#deck").addEventListener("click", () => {
        displayMainMenu("deck");
    });
    document.querySelector("#note").addEventListener("click", () => {
        displayMainMenu("note");
    });

    document.querySelectorAll(".set_animation").forEach((e) => {
        e.addEventListener("click", setAnimationTiming);
    });

    document.querySelector("#control_btn").addEventListener("click", displaySettingControl);
    document.querySelector("#sound_btn").addEventListener("click", displaySettingSound);
    document.querySelector("#animation_btn").addEventListener("click", displaySettingAnimation);

    create_loadingBar_animation();
    animation_reduite();
});

//#region SETTINGS

function displaySettings() {
    clickedBtn(document.querySelector(".settings"));
    let div = document.querySelector(".show_settings");
    if (settingIsDisplayed) {
        div.style.left = "100vw";
        settingIsDisplayed = false;
    } else {
        div.style.left = "calc(98vw - var(--width))";
        settingIsDisplayed = true;
    }
}

function displaySettingControl() {
    setSettingStyle();
    document.querySelector("#control").style.display = "block";
    document.querySelector("#control_btn").classList.add("btn_selected");
}

function displaySettingAnimation() {
    setSettingStyle();
    document.querySelector("#animation").style.display = "flex";
    document.querySelector("#animation_btn").classList.add("btn_selected");
}

function displaySettingSound() {
    setSettingStyle();
    document.querySelector("#sound").style.display = "flex";
    document.querySelector("#sound_btn").classList.add("btn_selected");
}

function setSettingStyle() {
    document.querySelector("#settings_btn").childNodes.forEach((btn) => {
        if (btn instanceof HTMLDivElement) {
            if (btn.classList.contains("btn_selected")) {
                btn.classList.remove("btn_selected");
            }
        }
    });
    document.querySelector(".settings_txt").childNodes.forEach((txt) => {
        if (txt instanceof HTMLDivElement) {
            txt.style.display = "none";
        }
    });
}

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

//#endregion

//#region ANIMATION HANDLERS

function scrollDeck() {
    console.log(value);

    if (isDeckDown) {
        isDeckDown = false;
        document.querySelector(".deck_iframe").style.transform = "translateY(0vh)";
        setTimeout(() => {
            document.querySelector("#scroll_deck").style.transform =
                "translate(var(--deck-tx),var(--deck-ty)) rotate(0deg)";
        }, 1000);
    } else {
        document.querySelector(".deck_iframe").style.transform = "translateY(-65vh)";
        setTimeout(() => {
            document.querySelector("#scroll_deck").style.transform =
                "translate(var(--deck-tx), var(--deck-ty)) rotate(180deg)";
            isDeckDown = true;
        }, 1000);
    }
}

function animation_reduite() {
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
    } else if (anima_timing == "Faster") {
        intro = new LoadingScreen(
            document.querySelector(".container"),
            document.querySelector(".lobby-container"),
            0.5
        );
    }
}

function successfullSignedOut() {
    document.querySelector("body").style.opacity = 0;
    flash_animation_login();
    setTimeout(() => {
        flash_animation_login();
        setTimeout(() => {
            window.location.replace("index.php");
        }, 2000);
    }, 100);
}

function flash_animation_login() {
    document.querySelector("body").appendChild(utils.create_element_id("div", "animation_fin"));
}

function displayMainMenu(target) {
    let div = document.querySelector("." + target);
    console.log(div);
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
    }
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
        setTimeout(() => {
            transition.end_transition(document.querySelector(".container_transition_tunel"));
            document.querySelector("body").style.background = "radial-gradient(#010219,#01134c)";
            setTimeout(() => {
                window.location.replace("battlefield.php");
            }, time * 3000);
        }, time * 3000);
    }, time * 2000);
}

function create_dead_pixel_animation() {
    for (let i = 0; i < h / 5; i++) {
        dead_pixel_array.push("dead_pixel" + i);
        node = utils.create_element_id_class(
            "div",
            dead_pixel_array[dead_pixel_array.length - 1],
            "dead_pixel"
        );
        document.querySelector("#lobby_dead_pixel_effect").appendChild(node);
    }
}

function start_dead_pixel_animation(color) {
    let i = 0;
    dead_pixel_array = utils.shuffle(dead_pixel_array);
    document.querySelector("#lobby_dead_pixel_effect").style.display = "block";

    let interval = setInterval(() => {
        if (i >= h / 5) {
            clearInterval;
        } else {
            document.querySelector("#" + dead_pixel_array[i]).style.background = color;
            i++;
        }
    }, 10);
}

//#endregion

//#region AJAX ACTION

function quitter() {
    APICall("action", "quitter");
}

function jouer() {
    APICall("action", "jouer");
}

function pratique() {
    APICall("action", "pratique");
}

function APICall(name, value) {
    let formData = new FormData();
    formData.append(name, value);

    fetch("lobbyAjax.php", {
        method: "POST",
        credentials: "include",
        body: formData,
    })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            if (response == "SIGNED_OUT" || response == "INVALID_KEY") {
                successfullSignedOut();
            } else if (response == "DECK_INCOMPLETE") {
                alertMessage("DECK_INCOMPLETE");
            } else if (response == "MAX_DEATH_THRESHOLD_REACHED") {
                alertMessage("MAX_DEATH_THRESHOLD_REACHED");
            } else if (
                response == "JOINED_PVP" ||
                response == "CREATED_PVP" ||
                response == "JOINED_TRAINING"
            ) {
                startGame();
            }
        });
}

//#endregion
