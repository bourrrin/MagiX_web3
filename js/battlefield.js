//#region CHAT STYLE

const applyStyles = (iframe) => {
    let styles = {
        fontColor: "white",
        fontGoogleName: "Gruppo",
        height: "100%",
        fontSize: "20px",
        inputBackgroundColor: "rgb(71, 71, 71,0.7)",
    };
    setTimeout(() => {
        iframe.contentWindow.postMessage(JSON.stringify(styles), "*");
    }, 100);
};

//#endregion
let mana = 1;
let utils = new Utils();
let yourTurn = null;
let heroPowerAlreadyUsed = false;
let mp = 0;
let hp = 30;
let o_hp = 0;
let attaquant = null;
let chatIsDisplayed = false;
let settingIsDisplayed = false;

window.addEventListener("load", () => {
    window.addEventListener("contextmenu", (e) => e.preventDefault());
    document.querySelector(".show_card").addEventListener("click", hide_card);
    document.querySelector(".show_chat").addEventListener("click", hide_card);
    document.querySelector(".show_settings").addEventListener("click", hide_card);
    document.querySelector("#p_power").addEventListener("click", useHeroPower);
    document.querySelector(".turn").addEventListener("click", turn);
    document.querySelector(".surrender").addEventListener("click", surrender);
    document.querySelector(".o_interface").addEventListener("click", attackHero);
    document.querySelector(".chat").addEventListener("click", displayChat);
    document.querySelector(".settings").addEventListener("click", displaySettings);
    document.querySelector("#control_btn").addEventListener("click", displaySettingControl);
    document.querySelector("#sound_btn").addEventListener("click", displaySettingSound);
    document.querySelector("#animation_btn").addEventListener("click", displaySettingAnimation);
    document.querySelector("#p_sub_menu_btn").addEventListener("click", () => {
        showSubMenu("p");
    });
    document.querySelector(".p_sub_menu").addEventListener("click", () => {
        hideSubMenu("p");
    });
    document.querySelector(".o_sub_menu").addEventListener("click", () => {
        hideSubMenu("o");
    });
    document.querySelector("#o_sub_menu_btn").addEventListener("click", () => {
        showSubMenu("o");
    });

    document.querySelector(".quitter").addEventListener("click", () => {
        window.location.replace("lobby.php");
    });

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
    document.querySelector(".menu").style.transform = "translateX(0)";

    document.querySelector(".ui").style.width = "100%";
    document.querySelector(".ui").childNodes.forEach((e) => {
        if (e instanceof HTMLDivElement) e.style.transform = "translateX(1.85vw)";
    });

    displaySubMenu("o");
    displaySubMenu("p");

    for (let i = 0; i < 10; i++) {
        document
            .querySelector("#o_mana_bar")
            .appendChild(utils.create_element_class("div", "mana-off"));
        document
            .querySelector("#p_mana_bar")
            .appendChild(utils.create_element_class("div", "mana-off"));
    }
}

function displaySubMenu(target) {
    document.querySelector("." + target + "_sub_menu").style.opacity = 1;
    document.querySelector("." + target + "_sub_menu").style.left = "17vw";
    setTimeout(() => {
        document.querySelector("." + target + "_sub_menu").style.left = "2vw";
        document.querySelector("." + target + "_sub_menu").style.opacity = 0;
    }, 10000);
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
    document.querySelector(".show_card").style.left = "105vw";
}

function showSubMenu(target) {
    let element = document.querySelector("." + target + "_sub_menu");
    element.style.opacity = 1;
    element.style.left = "17vw";
}

function hideSubMenu(target) {
    let element = document.querySelector("." + target + "_sub_menu");
    element.style.opacity = 0;
    element.style.left = "2vw";
}

//#endregion

//#region GAME BASE LOGIC

function surrender() {
    clickedBtn(document.querySelector(".surrender"));
    APICall("action", "SURRENDER");
}

function turn() {
    if (yourTurn) {
        clickedBtn(document.querySelector(".turn"));
        APICall("action", "END_TURN");
    }
}

function playCard() {
    let card = event.currentTarget;
    let cost = card.querySelector(".cost").innerHTML;
    let board_count = document.querySelector(".p_board").childElementCount;

    if (board_count < 7 && yourTurn && cost <= mp) {
        APICall("action", "PLAY", card.querySelector(".uid").innerHTML);

        card.style.boxShadow =
            "0 0 5px rgb(255, 255, 255),0 0 10px rgb(255, 255, 255), 0 0 20px rgb(255, 255, 255)";
        setTimeout(() => {
            card.style.boxShadow = "0 0 4px rgb(0, 0, 0), 0 0 10px rgb(255, 0, 212)";
        }, 600);
    }
}

function setAttacker() {
    let target = event.currentTarget;
    let uid = target.querySelector(".uid").innerHTML;
    let state = target.querySelector(".state").innerHTML;
    if (yourTurn) {
        if (state != "SLEEP" && attaquant != uid) {
            attaquant = uid;
            target.style.boxShadow =
                "0 0 5px rgb(255, 255, 255),0 0 8px rgb(255, 255, 255), 0 0 12px rgb(255, 255, 255)";
        } else if (attaquant == uid) {
            attaquant = null;
            target.style.boxShadow = "0 0 4px rgb(0, 0, 0), 0 0 10px rgb(255, 0, 212)";
        }
    }
}

function setDefender() {
    let target = event.currentTarget;
    let defenseur = target.querySelector(".uid").innerHTML;
    if (attaquant != null) {
        APICall("action", "ATTACK", attaquant, defenseur);
        target.style.boxShadow =
            "0 0 5px rgb(255, 255, 255),0 0 6px rgb(255, 255, 255), 0 0 8px rgb(255, 255, 255)";
        setTimeout(() => {
            target.style.boxShadow = "0 0 4px rgb(0, 0, 0), 0 0 10px rgb(255, 0, 212)";
        }, 500);
    }
}

function attackHero() {
    if (attaquant != null) {
        APICall("action", "ATTACK", attaquant, 0);
    }
}

function useHeroPower() {
    if (!heroPowerAlreadyUsed && mp >= 2) {
        let element = document.querySelector(".p_power");

        clickedBtn(element);

        APICall("action", "HERO_POWER");
    }
}

function clickedBtn(element) {
    element.classList.add("clicked");
    setTimeout(() => {
        element.classList.remove("clicked");
    }, 1000);
}

//#endregion

//#region DISPLAY FUNCTION

//#region CARD RELATED
function displayTauntMinion() {
    let element = document.querySelector(".o_board");

    element.childNodes.forEach((card) => {
        let mech = card.querySelector(".mechanics").innerHTML;
        if (mech.includes("Taunt")) {
            card.style.filter = "brightness(3)";
            setTimeout(() => {
                card.style.filter = "brightness(1)";
            }, 400);
        }
    });
}

function displayCardThatCanAtk(data, target) {
    let element = document.querySelector("." + target + "_board");
    let board = data;
    element.childNodes.forEach((card) => {
        board.forEach((card_Data) => {
            let state = card_Data["state"];
            let uid = card_Data["uid"];
            let card_uid = card.querySelector(".uid").innerHTML;
            if (state == "IDLE" && uid == card_uid) {
                card.style.filter = "brightness(1)";
            } else if (state == "SLEEP" && uid == card_uid) {
                card.style.filter = "brightness(0.5)";
                card.style.boxShadow = "0 0 4px rgb(0, 0, 0), 0 0 10px rgb(255, 0, 212)";
                if (attaquant == uid) {
                    attaquant = null;
                }
            }
        });
    });
}

function displaySelectedCard() {
    let element = document.querySelector(".p_board");

    element.childNodes.forEach((card) => {
        if (card.querySelector(".uid").innerHTML != attaquant) {
            card.style.boxShadow = "0 0 4px rgb(0, 0, 0), 0 0 10px rgb(255, 0, 212)";
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
                child.querySelector(".state").innerHTML = d["state"];
            }
        });
    });
}

function displayChangedCardAttribute(target) {
    let element = document.querySelector("." + target + "_board");

    element.childNodes.forEach((card) => {
        let hp = card.querySelector(".hp");
        let baseHP = card.querySelector(".baseHP");
        let atk = card.querySelector(".atk");
        let baseATK = card.querySelector(".baseATK");

        if (hp.innerHTML < baseHP.innerHTML) {
            hp.style.color = "red";
        } else if (hp.innerHTML > baseHP.innerHTML) {
            hp.style.color = "green";
        }

        if (atk.innerHTML < baseATK.innerHTML) {
            atk.style.color = "red";
        } else if (atk.innerHTML > baseATK.innerHTML) {
            atk.style.color = "green";
        }
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
                displayedCard.classList.add("death");
                setTimeout(() => {
                    element.removeChild(displayedCard);
                }, 1000);
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
    node.appendChild(utils.create_element_class("div", "baseATK", card_data["atk"]));
    node.appendChild(utils.create_element_class("div", "hp", card_data["hp"]));
    node.appendChild(utils.create_element_class("div", "baseHP", card_data["baseHP"]));
    node.appendChild(utils.create_element_class("div", "mechanics", card_data["mechanics"]));
    node.appendChild(utils.create_element_class("div", "uid", card_data["uid"]));
    node.appendChild(utils.create_element_class("div", "state", card_data["state"]));
    node.appendChild(utils.create_element_class("div", "name", "Soul eater"));

    if (card_data["id"] >= 1 && card_data["id"] <= 100) {
        node.style.backgroundImage = "url(img/cards/" + card_data["id"] + ".jpg)";
    } else {
        node.style.backgroundImage = "url(img/cards/0.jpg)";
    }
}

//#endregion

//#region UI

function displayChat() {
    clickedBtn(document.querySelector(".chat"));
    let div = document.querySelector(".show_chat");
    if (chatIsDisplayed) {
        div.style.left = "100vw";
        chatIsDisplayed = false;
    } else {
        div.style.left = "calc(98vw - var(--width))";
        chatIsDisplayed = true;
    }
}

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
    document.querySelector("#animation").style.display = "block";
    document.querySelector("#animation_btn").classList.add("btn_selected");
}

function displaySettingSound() {
    setSettingStyle();
    document.querySelector("#sound").style.display = "block";
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

function displayTimer(data) {
    let timer = document.querySelector(".timer");
    timer.innerHTML = data["remainingTurnTime"];

    if (data["remainingTurnTime"] <= 15) {
        document.querySelector(".timer").style.color = "red";
        setTimeout(() => {
            document.querySelector(".timer").style.color = "white";
        }, 500);
    } else {
        document.querySelector(".timer").style.color = "white";
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

function displayPlayerInfo(data, target) {
    if (target == "o") {
        document.querySelector("#" + target + "_username").innerHTML = data["username"];
    } else {
        document.querySelector("#" + target + "_username").innerHTML = "";
    }
    document.querySelector("#" + target + "_welcome_txt").innerHTML =
        '"' + data["welcomeText"] + '"';
    document.querySelector("#" + target + "_hero_class").innerHTML = data["heroClass"];
    document.querySelector("#" + target + "_talent").innerHTML = data["talent"];
}

function displayRemainingCardsCount(data, target) {
    document.querySelector("#" + target + "_deck").innerHTML = data;
}

function displayEndTurn() {
    if (yourTurn) {
        document.querySelector("#turn").setAttribute("class", "turn");
    } else {
        document.querySelector("#turn").setAttribute("class", "turn_disable");
    }
}

function displayHeroPower(data) {
    if (!yourTurn || data["heroPowerAlreadyUsed"]) {
        document.querySelector("#p_power").setAttribute("class", "p_power_disable");
    } else {
        document.querySelector("#p_power").setAttribute("class", "p_power");
    }
}

function displayLifeLose(data, target) {
    let x;
    let element = document.querySelector("#" + target + "_hp");
    if (target == "o") {
        x = o_hp;
    } else {
        x = hp;
    }

    if (data["hp"] < x) {
        element.style.color = "red";
        setTimeout(() => {
            element.style.color = "white";
        }, 400);
    }

    if (target == "o") {
        o_hp = data["hp"];
    } else {
        hp = data["hp"];
    }

    if (hp < 10) {
        document.querySelector(":root").style.setProperty("--back-line-color", "red");
    }
}

function displayEndGame(win) {
    let element = document.querySelector("#gamwOver_txt");
    if (win) {
        element.innerHTML = "YOU WIN";
        element.style.color = "#2c74d0";
    } else {
        element.style.color = "red";
        element.innerHTML = "LOSER";
    }
    document.querySelector(".game_over").style.display = "block";
}

function displayTurnIndicator(data) {
    if (data["yourTurn"] != yourTurn && data["yourTurn"]) {
        document.querySelector(".turn_indicator").style.display = "flex";
        setTimeout(() => {
            document.querySelector(".turn_indicator").style.display = "none";
        }, 3000);
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
            if (typeof response !== "object") {
                if (response == "LAST_GAME_LOST") {
                    document.querySelector("#p_hp").innerHTML = 0;
                    document.querySelector(":root").style.setProperty("--back-line-color", "black");
                    displayEndGame(false);
                } else if (response == "TOO_MANY_CALL_BAN" || response == "INVALID_KEY") {
                    window.location.replace("index.php");
                } else if (response == "LAST_GAME_WON") {
                    displayEndGame(true);
                } else {
                    setTimeout(() => {
                        CheckGameState();
                    }, 1000);
                }
            } else {
                gameHandler(response);
                setTimeout(() => {
                    CheckGameState();
                }, 1000);
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
            if (response == "MUST_ATTACK_TAUNT_FIRST") {
                displayTauntMinion();
            }
        });
}

//#endregion

function gameHandler(data) {
    if (yourTurn == null) {
        display_UI();
        displayPlayerInfo(data["opponent"], "o");
        displayPlayerInfo(data, "p");
    } else {
        displayTurnIndicator(data);
    }
    yourTurn = data["yourTurn"];

    heroPowerAlreadyUsed = data["heroPowerAlreadyUsed"];
    mp = data["mp"];
    displayLifeLose(data["opponent"], "o");
    displayLifeLose(data, "p");

    document.querySelector("#p_hp").innerHTML = data["hp"];
    document.querySelector("#o_hp").innerHTML = data["opponent"]["hp"];
    displayTimer(data);
    displayEndTurn();
    displayHeroPower(data);
    displayCardThatCanAtk(data["board"], "p");
    displayCardThatCanAtk(data["opponent"]["board"], "o");
    displayChangedCardAttribute("o");
    displayChangedCardAttribute("p");

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
