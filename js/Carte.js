class Carte {
    constructor() {
        this.nom_cartes = [
            "Olympien",
            "Oiléus",
            "George",
            "Pégase",
            "Inachos",
            "Téthys",
            "Médée",
            "Almo",
            "Alecto",
            "Amazones",
            "Méduse",
            "Aphrodite",
            "Apollon",
            "Arès",
            "Artémis",
            "Asclépios",
            "Athéna",
            "Borée",
            "Charites",
            "Chloris",
            "Cronos",
            "Déméter",
            "Dionysos",
            "Ényo",
            "Éole",
            "Éos",
            "Érinyes",
            "Érèbe",
            "Éris",
            "Éros",
            "Euros",
            "Gaïa",
            "Hadès",
            "Harmonie",
            "Hébé",
            "Hécate",
            "Caucasus",
            "Hélios",
            "Héra",
            "Héraclès",
            "Héphaïstos",
            "Hermès",
            "Hestia",
            "Hygie",
            "Hypnos",
            "Ilithye",
            "Mnémosyne",
            "Moires",
            "Muses",
            "Némésis",
            "Notos",
            "Nyx",
            "Ouranos",
            "Pan",
            "Perséphone",
            "Phobos",
            "Poséidon",
            "Rhéa",
            "Séléné",
            "Thanatos",
            "Thémis",
            "Zéphyr",
            "Zeus",
            "Vénus",
            "Phébus",
            "Mars",
            "Diane",
            "Esculape",
            "Minerve",
            "Aquilon",
            "Grâces",
            "Flore",
            "Saturne",
            "Cérès",
            "Bacchus",
            "Bellone",
            "Aeolus",
            "Aurore",
            "Furies",
            "Erebos",
            "Discorde",
            "Cupidon",
            "Vulturnus",
            "Tellus",
            "Pluton",
            "Juventas",
            "Sol",
            "Junon",
            "Hercule",
            "Vulcain",
            "Mercure",
            "Vesta",
            "Salus",
            "Somnus",
            "Lucine",
            "Moneta",
            "Parques",
            "Camènes",
            "Invidia",
            "Auster",
            "Nox",
            "Uranus",
            "Faunus",
            "Proserpine",
            "Neptune",
        ];
    }

    getNomCarte(id) {
        if (id < this.nom_cartes.length) return this.nom_cartes[id];
        return this.nom_cartes[0];
    }

    createCardsInHand(card_data, target) {
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

    setCardAttribute(card_data, node) {
        node.appendChild(utils.create_element_class("div", "cost", card_data["cost"]));
        node.appendChild(utils.create_element_class("div", "atk", card_data["atk"]));
        node.appendChild(utils.create_element_class("div", "baseATK", card_data["atk"]));
        node.appendChild(utils.create_element_class("div", "hp", card_data["hp"]));
        node.appendChild(utils.create_element_class("div", "baseHP", card_data["baseHP"]));
        node.appendChild(utils.create_element_class("div", "mechanics", card_data["mechanics"]));
        node.appendChild(utils.create_element_class("div", "uid", card_data["uid"]));
        node.appendChild(utils.create_element_class("div", "state", card_data["state"]));

        node.appendChild(
            utils.create_element_class("div", "name", carte.getNomCarte(card_data["id"]))
        );

        node.appendChild(
            setCardMechIcon(card_data["mechanics"], utils.create_element_class("div", "mech_icon"))
        );

        if (card_data["id"] >= 1 && card_data["id"] <= 100) {
            node.style.backgroundImage = "url(img/cards/" + card_data["id"] + ".jpg)";
        } else {
            node.style.backgroundImage = "url(img/cards/0.jpg)";
        }
    }
}
