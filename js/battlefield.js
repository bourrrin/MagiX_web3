let mana = 1;
let utils = new Utils();
let yourTurn = null;
let heroPowerAlreadyUsed = false;
let mp = 0;
let attaquant = null;

window.addEventListener("load", () => {

    window.addEventListener("contextmenu", (e) => e.preventDefault());
    document.querySelector(".show_card").addEventListener("click", hide_card);
    document.querySelector("#p_power").addEventListener("click", useHeroPower);
    document.querySelector(".turn").addEventListener("click", turn);
    document.querySelector(".surrender").addEventListener("click", surrender);
    document.querySelector(".o_interface").addEventListener("click", attackHero);

    start_animation_ouverture();
    test();
    CheckGameState();
});

function test() {
    let formData = new FormData();
    formData.append("action", "pratique");

    fetch("lobbyAjax.php", {
        method: "POST",
        credentials: "include",
        body: formData,
    })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
        });
}

//#region ANIMATIONS

function start_animation_ouverture() {
    document.querySelector(".battlefield_background").style.transition = "4.5s top";
    document.querySelector("#battlefield_background_up").style.top = "-20%";
    document.querySelector("#battlefield_background_down").style.top = "35%";
}

function display_UI() {
    document.querySelector(".turn").style.transform = "translateX(0)";
    document.querySelector(".timer").style.transform = "translateX(0)";
    document.querySelector(".surrender").style.transform = "translateX(0)";

    document.querySelector(".ui").style.opacity = "1";

    for (let i = 0; i < 10; i++) {
        document
            .querySelector("#o_mana_bar")
            .appendChild(utils.create_element_class("div", "mana-off"));
        document
            .querySelector("#p_mana_bar")
            .appendChild(utils.create_element_class("div", "mana-off"));
    }
}

function show_card() {
    let div = document.querySelector(".show_card");
    let data = event.currentTarget;

    div.querySelector(".name").innerHTML = data.querySelector(".name").innerHTML;
    div.querySelector(".cost").innerHTML = data.querySelector(".cost").innerHTML;
    div.querySelector(".atk").innerHTML = data.querySelector(".atk").innerHTML;
    div.querySelector(".hp").innerHTML = data.querySelector(".hp").innerHTML;
    div.querySelector(".baseHP").innerHTML = data.querySelector(".baseHP").innerHTML;
    div.querySelector(".mechanics").innerHTML = data.querySelector(".mechanics").innerHTML;
    div.querySelector(".uid").innerHTML = data.querySelector(".uid").innerHTML;
    div.style.backgroundImage = data.style.backgroundImage;

    div.style.left = "calc(98vw - var(--width))";
}

function hide_card() {
    document.querySelector(".show_card").style.left = "100vw";
}

//#endregion

//#region GAME BASE LOGIC

function surrender() {
    APICall("action", "SURRENDER");
}

function turn() {
    if (yourTurn) {
        APICall("action", "END_TURN");
    }
}

function playCard() {
    let cost = event.currentTarget.querySelector(".cost").innerHTML;
    let hand = document.querySelector(".p_board");
    if (hand.childElementCount < 7 || yourTurn || cost < mp) {
        APICall("action", "PLAY", event.currentTarget.querySelector(".uid").innerHTML);
    }
}

function setAttacker() {
    attaquant = event.currentTarget.querySelector(".uid").innerHTML;
}

function setDefender() {
    let defenseur = event.currentTarget.querySelector(".uid").innerHTML;
    event.currentTarget.querySelector(".uid").style.border = "solid red 2px";
    if (attaquant != null) {
        APICall("action", "ATTACK", attaquant, defenseur);
    }
}

function attackHero() {
    event.currentTarget.style.border = "solid red 2px";
    if (attaquant != null) {
        APICall("action", "ATTACK", attaquant, 0);
    }
}

function useHeroPower() {
    if (!heroPowerAlreadyUsed) {
        document.querySelector("#p_power").style.backgroundColor = "rgba(0, 0, 255, 0.3)";
        setTimeout(() => {
            document.querySelector("#p_power").style.backgroundColor = "rgba(151, 151, 151, 0.3)";
        }, 1500);
        APICall("action", "HERO_POWER");
    }
}

function gameHandler(data) {
    if (yourTurn == null) {
        display_UI();
        // displayHeros(data);
    }

    yourTurn = data["yourTurn"];
    heroPowerAlreadyUsed = data["heroPowerAlreadyUsed"];
    mp = data["mp"];

    document.querySelector("#p_hp").innerHTML = data["hp"];
    document.querySelector("#o_hp").innerHTML = data["opponent"]["hp"];
    displayTimer(data);
    displayEndTurn(data["yourTurn"]);

    displayMana(data["mp"], "p");
    displayMana(data["opponent"]["mp"], "o");
    displayRemainingCardsCount(data["remainingCardsCount"], "p");
    displayRemainingCardsCount(data["opponent"]["remainingCardsCount"], "o");
    updateCardsAttribute(data["board"], "p");
    updateCardsAttribute(data["opponent"]["board"], "o");

    displayPlayerHand(data);
    displayOpponentHand(data);
    displayCardsOnBoard(data["board"], "p");
    displayCardsOnBoard(data["opponent"]["board"], "o");

    displaySelectedCard();
}
//#endregion

//#region DISPLAY FUNCTION

//#region CARD RELATED

function displaySelectedCard() {
    let element = document.querySelector(".p_board");

    element.childNodes.forEach((child) => {
        if (child.querySelector(".uid").innerHTML == attaquant) {
            child.style.border = "solid 2px red";
        } else {
            child.style.border = "none";
        }
    });
}

function updateCardsAttribute(data, target) {
    document.querySelector("." + target + "_board").childNodes.forEach((child) => {
        data.forEach((d) => {
            if (d["uid"] == child.querySelector(".uid").innerHTML) {
                child.querySelector(".hp").innerHTML = d["hp"];
                child.querySelector(".atk").innerHTML = d["atk"];
                child.querySelector(".mechanics").innerHTML = d["mechanics"];
            }
        });
    });
}

function displayCardsOnBoard(board, target) {
    let element = document.querySelector("." + target + "_board");

    // GET CARTES AFFICHER ET CARTES REELEMENT POSSEDER
    let displayedCards = [];
    let possessedCards = [];
    element.childNodes.forEach((e) => {
        displayedCards.push(+e.querySelector(".uid").innerHTML);
    });
    board.forEach((c) => {
        possessedCards.push(c["uid"]);
    });

    //IDENTIFIE CARTES EN TROP OU MANQUANTE
    let deadCards = displayedCards.filter((x) => !possessedCards.includes(x));
    let missingCards = possessedCards.filter((x) => !displayedCards.includes(x));

    //AFFICHE CARTES EN TROP
    deadCards.forEach((deadCard_uid) => {
        element.childNodes.forEach((displayedCard) => {
            if (displayedCard.querySelector(".uid").innerHTML == deadCard_uid) {
                element.removeChild(displayedCard);
            }
        });
    });

    //AFFICHE CARTES MANQUANTE
    missingCards.forEach((missingCard_uid) => {
        board.forEach((possessedCard) => {
            if (possessedCard["uid"] == missingCard_uid) {
                createCardOnBoard(possessedCard, target);
            }
        });
    });
}

function displayPlayerHand(data) {
    let hand = data["hand"];
    let element = document.querySelector(".p_hand");

    // GET CARTES AFFICHER ET CARTES REELEMENT POSSEDER
    let displayedCards = [];
    let possessedCards = [];

    element.childNodes.forEach((e) => {
        displayedCards.push(+e.querySelector(".uid").innerHTML);
    });
    hand.forEach((c) => {
        possessedCards.push(c["uid"]);
    });

    //IDENTIFIE CARTES EN TROP OU MANQUANTE
    let playedCards = displayedCards.filter((x) => !possessedCards.includes(x));
    let missingCards = possessedCards.filter((x) => !displayedCards.includes(x));

    //AFFICHE CARTES EN TROP
    playedCards.forEach((playedCard_uid) => {
        element.childNodes.forEach((displayedCard) => {
            if (displayedCard.querySelector(".uid").innerHTML == playedCard_uid) {
                element.removeChild(displayedCard);
            }
        });
    });

    //AFFICHE CARTES MANQUANTE
    missingCards.forEach((missingCard_uid) => {
        hand.forEach((possessedCard) => {
            if (possessedCard["uid"] == missingCard_uid) {
                createCardsInHand(possessedCard, "p");
            }
        });
    });
}

function displayOpponentHand(data) {
    let hand = data["opponent"]["handSize"];
    let element = document.querySelector(".o_hand");

    if (hand > element.childElementCount) {
        for (let i = element.childElementCount; i < hand; i++) {
            createCardsInHand(data[i], "o");
        }
    } else if (hand < element.childElementCount) {
        console.log("play");
        element.removeChild(element.lastChild);
    }
}

function createCardOnBoard(card_data, target) {
    let node = utils.create_element_class("div", "card");
    setCardAttribute(card_data, node);

    node.addEventListener("contextmenu", () => {
        show_card(event.currentTarget.style.backgroundImage);
    });

    if (target == "o") {
        node.addEventListener("click", (event) => {
            setDefender();
        });
    } else {
        node.addEventListener("click", (event) => {
            setAttacker();
        });
    }

    document.querySelector("." + target + "_board").appendChild(node);
}

function createCardsInHand(card_data, target) {
    let node = utils.create_element_class("div", target + "_card_in_hand");
    if (target == "p") {
        setCardAttribute(card_data, node);

        node.addEventListener("click", (event) => {
            playCard();
        });
        node.addEventListener("contextmenu", () => {
            show_card();
        });
    } else {
        node.style.backgroundImage = 'url("img/cards/back.jpg")';
    }
    document.querySelector("." + target + "_hand").appendChild(node);
}

function setCardAttribute(card_data, node) {
    node.appendChild(utils.create_element_class("div", "cost", card_data["cost"]));
    node.appendChild(utils.create_element_class("div", "atk", card_data["atk"]));
    node.appendChild(utils.create_element_class("div", "hp", card_data["hp"]));
    node.appendChild(utils.create_element_class("div", "baseHP", card_data["baseHP"]));
    node.appendChild(utils.create_element_class("div", "mechanics", card_data["mechanics"]));
    node.appendChild(utils.create_element_class("div", "uid", card_data["uid"]));
    node.appendChild(utils.create_element_class("div", "name", "Soul eater"));

    node.style.backgroundImage = "url(img/cards/" + card_data["id"] + ".jpg)";
}

//#endregion

//#region UI
function displayTimer(data) {
    let timer = document.querySelector(".timer");
    if (data["yourTurn"]) {
        timer.innerHTML = data["remainingTurnTime"];
    } else {
        timer.innerHTML = "...";
    }
}

function displayMana(mp, target) {
   document.querySelector("#" + target + "_mana").innerHTML = mp;
    let element = document.querySelector("#" + target + "_mana_bar").children;
    let tableChild = [];
    for (let i = 0; i < element.length; i++) {
        tableChild.push(element[i]);
    }

    tableChild.forEach((child) => {
        if (mp > 0) {
            child.setAttribute("class", "mana-on");
            mp--;
        } else {
            child.setAttribute("class", "mana-off");
        }
    });
}

function displayHeros(data) {
    document.querySelector("#p_hero").style.background =
        "url(img/hero/" + data["heroClass"] + ".jfif)";
    document.querySelector("#o_hero").style.background =
        "url(img/hero/" + data["opponent"]["heroClass"] + ".jfif)";
}

function displayRemainingCardsCount(data, target) {
    document.querySelector("#" + target + "_deck").innerHTML = data;
}

function displayEndTurn(turn) {
    if (turn) {
        document.querySelector("#turn").setAttribute("class", "turn");
    } else {
        document.querySelector("#turn").setAttribute("class", "turn_disable");
    }
}

//#endregion

//#endregion

//#region AJAX ACTION

function CheckGameState() {
    fetch("battlefieldAjax.php", {
        method: "POST",
        credentials: "include",
        body: "",
    })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            setTimeout(() => {
                CheckGameState();
            }, 1000);
            if (typeof response !== "object") {
                if (response == "LAST_GAME_LOST") {
                    document.querySelector("#p_hp").innerHTML = 0;
                    document.querySelector(".battlefield_background_container").style.background =
                        "radial-gradient(red,rgb(107, 11, 78))";
                } else if (response == "TOO_MANY_CALL_BAN" || response == "INVALID_KEY") {
                    console.log(response);
                    window.location.replace("index.php");
                } else if (response == "LAST_GAME_WON") {
                    console.log(response);
                    document.querySelector(".timer").innerHTML = "WIN !!!";
                }
            } else {
                gameHandler(response);
            }
        });
}

function APICall(name, type, uid = null, targetuid = null) {
    let formData = new FormData();
    formData.append(name, type);

    if (uid != null) {
        formData.append("uid", uid);
    }
    if (targetuid != null) {
        formData.append("targetuid", targetuid);
    }

    fetch("battlefieldAjax.php", {
        method: "POST",
        credentials: "include",
        body: formData,
    })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
        });
}

//#endregion
