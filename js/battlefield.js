let mana = 1;
let utils = new Utils();
let yourTurn = null;

window.addEventListener("load", () => {
    //   window.addEventListener("contextmenu", (e) => e.preventDefault());
    document.querySelector(".show_card").addEventListener("click", hide_card);
    document.querySelector(".turn").addEventListener("click", turn);
    start_animation_ouverture();
    test();
    let gamestat = setInterval(() => {
        CheckGameState();
    }, 1000);
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
    document.querySelector(".battlefield_background").style.transition =
        "4.5s top";
    document.querySelector("#battlefield_background_up").style.top = "-20%";
    document.querySelector("#battlefield_background_down").style.top = "35%";
}

function display_UI() {
    document.querySelector(".turn").style.transform = "translateX(0)";
    document.querySelector(".timer").style.transform = "translateX(0)";

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

function displayTimer(data) {
    let timer = document.querySelector(".timer");
    if (data["yourTurn"]) {
        timer.innerHTML = data["remainingTurnTime"];
    } else {
        timer.innerHTML = "...";
    }
}

function display_mana(mp, e) {
    let target = document.querySelector("#"+e);
    let childrens = target.children;
    let tableChild = [];
    for (let i = 0; i < childrens.length; i++) {
        tableChild.push(childrens[i]);
    }

    tableChild.forEach((element) => {
        if (mp > 0) {
            element.setAttribute("class", "mana-on");
            mp--;
        }
        else {
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

    document.querySelector("#p_hp").innerHTML = data["hp"];
    document.querySelector("#o_hp").innerHTML = data["opponent"]["hp"];
    displayTimer(data);
    display_mana(data["mp"], "p_mana");
    display_mana(data["opponent"]["mp"], "o_mana");
    displayEndTurn(data["yourTurn"]);

    if (data["yourTurn"]) {
        displayBoardPlayer(data);
        displayHandPlayer(data);
    } else {
        displayHandOpponent(data);
        displayBoardOpponent(data);
    }
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
            diplay_played_card(board[i]);
        }
    } else if (board.length < element.childElementCount) {
        console.log("alert - too many card on board");
    }
}

function displayHandPlayer(data) {
    let hand = data["hand"];
    let element = document.querySelector(".p_hand").childElementCount;

    if (hand.length > element) {
        for (let i = element; i < hand.length; i++) {
            add_card_to_hand(true, hand[i]);
        }
    } else if (hand < element) {
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
        console.log("alert - too many card on board");
    }
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

function play_card() {
    if (can_play_card()) {
        console.log(event.currentTarget.innerHTML);
        APICall("action", "PLAY", event.currentTarget.innerHTML);
    } else {
        console.log("not-played");
    }
}

function can_play_card(cost) {
    if (
        document.querySelector(".p_board").childElementCount >= 7 ||
        yourTurn == false
    ) {
        return false;
    }
    return true;
}

function reduit_mana(cost) {
    let div = document.querySelector("#p_mana");
    div.removeChild(div.lastChild);
}

function display_opponent_played_card(card) {
    let node = utils.create_element_class("div", "card");
    node.style.backgroundImage = 'url("img/cards/' + card["id"] + '.jpg")';
    node.addEventListener("contextmenu", () => {
        show_card(event.currentTarget.style.backgroundImage);
    });
    document.querySelector(".o_board").appendChild(node);
}

function diplay_played_card(card) {
    let node = utils.create_element_class("div", "card");
    node.style.backgroundImage = event.currentTarget.style.backgroundImage;
    node.addEventListener("contextmenu", () => {
        show_card(event.currentTarget.style.backgroundImage);
    });
    document.querySelector(".p_board").appendChild(node);
}

function add_card_to_hand(player, card_data) {
    if (player) {
        document
            .querySelector(".p_hand")
            .appendChild(create_player_card(card_data));
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
    node.addEventListener("click", (event) => {
        play_card();
    });
    node.addEventListener("contextmenu", () => {
     });

    node.innerHTML = card_data["uid"];
    return node;
}

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
            if (typeof response !== "object") {
                if (response == "LAST_GAME_LOST") {
                    document.querySelector("#p_hp").innerHTML = 0;
                    document.querySelector(
                        ".battlefield_background_container"
                    ).style.background =
                        "radial-gradient(red,rgb(107, 11, 78))";
                } else if (
                    response == "TOO_MANY_CALL_BAN" ||
                    response == "INVALID_KEY"
                ) {
                    window.location.replace("index.php");
                }
            } else {
                gameHandler(response);
            }
        });
}

function APICall(name, value, param1 = null) {
    let formData = new FormData();
    formData.append(name, value);

    if (param1 != null) {
        formData.append("uid", param1);
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
