let mana = 1;
let utils = new Utils();
let yourTurn = null;
let heroPowerAlreadyUsed = false;
let mp = 0;
let attaquant = null;

window.addEventListener("load", () => {
    //   window.addEventListener("contextmenu", (e) => e.preventDefault());
    document.querySelector(".show_card").addEventListener("click", hide_card);
    document.querySelector("#p_power").addEventListener("click", use_hero_power);
    document.querySelector(".turn").addEventListener("click", turn);
    document.querySelector(".surrender").addEventListener("click", surrender);

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

    document.querySelector(".p_interface").style.opacity = "1";
    document.querySelector(".o_interface").style.opacity = "1";
    document.querySelector(".p_hp_bar").style.opacity = "1";
    document.querySelector(".o_hp_bar").style.opacity = "1";

    for (let i = 0; i < 10; i++) {
        document
            .querySelector("#p_mana")
            .appendChild(utils.create_element_class("div", "mana-off"));
        document
            .querySelector("#o_mana")
            .appendChild(utils.create_element_class("div", "mana-off"));
    }
}

function show_card() {
    let div = document.querySelector(".show_card").style;
    div.backgroundImage = event.currentTarget.style.backgroundImage;
    div.left = "calc(98vw - 20vw)";
}

function hide_card() {
    document.querySelector(".show_card").style.left = "100vw";
}

//#endregion

//#region GAME LOGIC

function surrender() {
    APICall("action", "SURRENDER");
}

function play_card() {
    let cost = event.currentTarget.querySelector(".cost").innerHTML;
    if (can_play_card(cost)) {
        document.querySelector(".p_hand").removeChild(event.currentTarget);
        APICall("action", "PLAY", event.currentTarget.querySelector(".uid").innerHTML);
    }
}

function can_play_card(cost) {
    if (
        document.querySelector(".p_board").childElementCount >= 7 ||
        yourTurn == false ||
        cost > mp
    ) {
        return false;
    }
    return true;
}

function attack() {}

function declare_attanquant() {
    attaquant = event.currentTarget.querySelector(".uid").innerHTML;
}

function declare_defenseur() {
    let defenseur = event.currentTarget.querySelector(".uid").innerHTML;
    event.currentTarget.querySelector(".uid").style.border = "solid red 2px";
    if (attaquant != null) {
        APICall("action", "ATTACK", attaquant, defenseur);
    }
}

function use_hero_power() {
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
        display_hero(data);

        displayHandOpponent(data);
        data["hand"].forEach((element) => {
            add_card_to_hand(true, element);
        });
    }
    yourTurn = data["yourTurn"];
    heroPowerAlreadyUsed = data["heroPowerAlreadyUsed"];
    mp = data["mp"];

    document.querySelector("#p_hp").innerHTML = data["hp"];
    document.querySelector("#o_hp").innerHTML = data["opponent"]["hp"];
    displaySelectedCard();
    displayTimer(data);
    display_mana(data["mp"], "p_mana");
    display_mana(data["opponent"]["mp"], "o_mana");
    displayEndTurn(data["yourTurn"]);
    displayDeck(data["remainingCardsCount"], "p");
    displayDeck(data["opponent"]["remainingCardsCount"], "o");
    updateCardHp(data["board"], "p");
    updateCardHp(data["opponent"]["board"], "o");

    displayBoardPlayer(data);
    displayHandPlayer(data);
    displayHandOpponent(data);
    displayBoardOpponent(data);
}
//#endregion

//#region DISPLAY FUNCTION

function displaySelectedCard() {
    let element = document.querySelector(".p_board");

    element.childNodes.forEach((e) => {
        if (e.querySelector(".uid").innerHTML == attaquant) {
            e.style.border = "solid 2px red";
        } else {
            e.style.border = "none";
        }
    });
}

function displayEndTurn(turn) {
    if (turn) {
        document.querySelector("#turn").setAttribute("class", "turn");
    } else {
        document.querySelector("#turn").setAttribute("class", "turn_disable");
    }
}

function displayBoardPlayer(data) {
    let board = data["board"];
    let element = document.querySelector(".p_board");

    if (board.length > element.childElementCount) {
        for (let i = element.childElementCount; i < board.length; i++) {
            display_played_card(board[i]);
        }
    } else if (board.length < element.childElementCount) {
        let childsUID = [];
        boardUID = [];
        let childs = document.querySelector(".p_board");
        childs.childNodes.forEach((e) => {
            childsUID.push(e.querySelector(".uid").innerHTML);
        });
        board.forEach((c) => {
            boardUID.push(c["uid"]);
        });

        let deadCards = childsUID.filter((x) => !boardUID.includes(x));

        for (let i = 0; i < childs.childElementCount; i++) {
            if (deadCards.includes(childs.childNodes[i].innerHTML)) {
                childs.removeChild(childs.childNodes[i]);
            }
        }
    }
}

function displayHandPlayer(data) {
    let hand = data["hand"];
    let element = document.querySelector(".p_hand").childElementCount;

    let childsUID = [];
    boardUID = [];
    let childs = document.querySelector(".p_hand");

    childs.childNodes.forEach((e) => {
        childsUID.push(+e.querySelector(".uid").innerHTML);
    });
    hand.forEach((c) => {
        boardUID.push(c["uid"]);
    });

    let newCards = boardUID.filter((x) => !childsUID.includes(x));

    for (let i = 0; i < newCards.length; i++) {
        hand.forEach((e) => {
            if (e["uid"] === newCards[i]) {
                add_card_to_hand(true, e);
            }
        });
    }

    if (hand < element) {
        console.log("alert - too many card in hand");
    }
}

function displayBoardOpponent(data) {
    let board = data["opponent"]["board"];
    let element = document.querySelector(".o_board");

    if (board.length > element.childElementCount) {
        for (let i = element.childElementCount; i < board.length; i++) {
            display_opponent_played_card(board[i]);
        }
    } else if (board.length < element.childElementCount) {
        let childsUID = [];
        boardUID = [];
        let childs = document.querySelector(".o_board");
        childs.childNodes.forEach((e) => {
            childsUID.push(e.querySelector(".uid").innerHTML);
        });
        board.forEach((c) => {
            boardUID.push(c["uid"]);
        });

        let deadCards = childsUID.filter((x) => !boardUID.includes(x));

        for (let i = 0; i < childs.childElementCount; i++) {
            if (deadCards.includes(childs.childNodes[i].innerHTML)) {
                childs.removeChild(childs.childNodes[i]);
            }
        }
    }
}

function updateCardHp(data, target) {
    let board = data;
    let element = document.querySelector("." + target + "_board");

    element.childNodes.forEach((e) => {
        let uid = e.querySelector(".uid").innerHTML;
        data.forEach((d) => {
            if (e["uid"] == uid) e.querySelector(".hp").innerHTML = e[hp];
        });
    });
}

function displayHandOpponent(data) {
    let hand = data["opponent"]["handSize"];
    let element = document.querySelector(".o_hand");

    if (hand > element.childElementCount) {
        for (let i = element.childElementCount; i < hand; i++) {
            add_card_to_hand(false);
        }
    } else if (hand < element.childElementCount) {
        console.log("play");
        element.removeChild(element.lastChild);
    }
}

function display_opponent_played_card(card_data) {
    let node = utils.create_element_class("div", "card");
    node.style.backgroundImage = 'url("img/cards/' + card_data["id"] + '.jpg")';

    setCardAttribute(card_data, node);

    node.addEventListener("contextmenu", () => {
        show_card(event.currentTarget.style.backgroundImage);
    });
    node.addEventListener("click", (event) => {
        declare_defenseur();
    });
    document.querySelector(".o_board").appendChild(node);
}

function display_played_card(card_data) {
    let node = utils.create_element_class("div", "card");
    node.style.backgroundImage = 'url("img/cards/' + card_data["id"] + '.jpg")';

    setCardAttribute(card_data, node);

    node.addEventListener("contextmenu", () => {
        show_card(event.currentTarget.style.backgroundImage);
    });
    node.addEventListener("click", (event) => {
        declare_attanquant();
    });
    document.querySelector(".p_board").appendChild(node);
}

function displayTimer(data) {
    let timer = document.querySelector(".timer");
    if (data["yourTurn"]) {
        timer.innerHTML = data["remainingTurnTime"];
    } else {
        timer.innerHTML = "...";
    }
}

function display_mana(mp, e) {
    let target = document.querySelector("#" + e);
    let childrens = target.children;
    let tableChild = [];
    for (let i = 0; i < childrens.length; i++) {
        tableChild.push(childrens[i]);
    }

    tableChild.forEach((element) => {
        if (mp > 0) {
            element.setAttribute("class", "mana-on");
            mp--;
        } else {
            element.setAttribute("class", "mana-off");
        }
    });
}

function display_hero(data) {
    document.querySelector("#p_hero").style.background =
        "url(img/hero/" + data["heroClass"] + ".jfif)";
    document.querySelector("#o_hero").style.background =
        "url(img/hero/" + data["opponent"]["heroClass"] + ".jfif)";
}

function turn() {
    if (yourTurn) {
        APICall("action", "END_TURN");
    }
}

function displayDeck(data, target) {
    document.querySelector("#" + target + "_deck").innerHTML = data;
}
//#endregion

function add_card_to_hand(player, card_data) {
    if (player) {
        document.querySelector(".p_hand").appendChild(create_player_card(card_data));
    } else {
        let node1 = utils.create_element_class("div", "o_card_in_hand");
        node1.style.backgroundImage = 'url("img/cards/back.jpg")';
        document.querySelector(".o_hand").appendChild(node1);
    }
}

function create_player_card(card_data) {
    let node = utils.create_element_class("div", "card_in_hand");
    node.style.backgroundImage = 'url("img/cards/' + card_data["id"] + '.jpg")';
    // node.style.backgroundImage = 'url("img/cards/front.png")';

    setCardAttribute(card_data, node);

    node.addEventListener("click", (event) => {
        play_card();
    });
    node.addEventListener("contextmenu", () => {
        show_card();
    });

    return node;
}

function setCardAttribute(card_data, node) {
    node.appendChild(utils.create_element_class("div", "cost", card_data["cost"]));
    node.appendChild(utils.create_element_class("div", "atk", card_data["atk"]));
    node.appendChild(utils.create_element_class("div", "hp", card_data["hp"]));
    node.appendChild(utils.create_element_class("div", "baseHP", card_data["baseHP"]));
    node.appendChild(utils.create_element_class("div", "mechanics", card_data["mechanics"]));
    node.appendChild(utils.create_element_class("div", "uid", card_data["uid"]));
}

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
