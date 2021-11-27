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

// window.onload = function () {
//     let frameElement = document.querySelector(".chat_iframe");
//     let doc = frameElement.contentDocument;
//     doc.body.innerHTML = doc.body.innerHTML + "<style>.bar {width:45%;}</style>";
// };

//#endregion

let dead_pixel_array = [];
let utils = new Utils();
let h = window.innerHeight;

window.addEventListener("load", () => {
    animation_reduite(true);
    set_lobby_elements();
});

function set_lobby_elements() {
    document.querySelector("#quitter").addEventListener("click", quitter);
    document.querySelector("#jouer").addEventListener("click", jouer);
    document.querySelector("#pratique").addEventListener("click", pratique);
    document.querySelector("#deck").addEventListener("click", deck);
    document.querySelector("#note").addEventListener("click", note);
    create_dead_pixel_animation();
    create_loadingBar_animation();
}

function animation_reduite(state) {
    if (state) {
        document.querySelector(".lobby-container").style.display = "block";
        document.querySelector("#quitter").style.animationDelay = "0s";
        document.querySelector(".container").style.display = "none";
    } else {
        intro = new LoadingScreen(
            document.querySelector(".container"),
            document.querySelector(".lobby-container")
        );
    }
}

//#region ANIMATION HANDLERS

function deck() {
    let deck = document.querySelector(".deck");
    if (deck.style.display == "none" || deck.style.display == "") {
        document.querySelector(".center").childNodes.forEach((element) => {
            if (element instanceof HTMLDivElement) {
                element.style.display = "none";
            }
        });
        deck.style.display = "flex";
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
        for (let i = 0; i < 135; i++) {
            let delay = Math.random() * (5 - 1) + 1;
            let node = document.createElement("div");
            node.style.animationDelay = delay + "s";
            document.querySelector("#load_bar").appendChild(node);
        }
    }, 1000);
}

function startGame() {
    document.querySelector(".lobby-container").style.opacity = 0;
    document.querySelector("body").style.background = "black";
    setTimeout(() => {
        container = document.querySelector(".container_transition_tunel");
        transition = new Transition_Tunel(container, 30);
        setTimeout(() => {
            transition.end_transition(document.querySelector(".container_transition_tunel"));
            document.querySelector("body").style.background = "radial-gradient(#010219,#01134c)";
            setTimeout(() => {
                window.location.replace("battlefield.php");
            }, 3000);
        }, 3000);
    }, 2000);
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

function successfullSignedOut() {
    start_dead_pixel_animation("#024577");
    setTimeout(() => {
        start_dead_pixel_animation("black");
        setTimeout(() => {
            window.location.replace("index.php");
        }, 2000);
    }, 100);
}

function alertMessage(message) {
    alert(message);
}
