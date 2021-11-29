class Carte {
    constructor() {

    }

    getNomCarte(id) {
        if (id < this.nom_cartes.length) return this.nom_cartes[id];
        return this.nom_cartes[0];
    }
}
