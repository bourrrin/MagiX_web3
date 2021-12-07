class Sfx {
    constructor(type = null) {
        document.querySelectorAll(".set_sfx").forEach((e) => {
            e.addEventListener("click", this.toggleSfxAjax);
        });

        this.container = document.querySelector("#audio_container");
        this.isDisable;
        this.volume = 0.1;
        this.type = type;
        this.setDefaultValueAjax();
        if (this.type != "login") this.setVolume();

        this.utils = new Utils();
        this.path = "sound/sfx/";
        this.audio_extension = ".mp3";
        this.extension_id = "_sfx_id";
        this.createAllSfx();
    }

    createAllSfx() {
        this.createAudioSfx("click");
        this.createAudioSfx("transitionFlash");
        this.createAudioSfx("loadingLobby");
        this.createAudioSfx("mainContainerChange");
        this.createAudioSfx("transitionTunnel");
        this.createAudioSfx("victory");
        this.createAudioSfx("defeat");
        this.createAudioSfx("gameOverMenuOpen");
        this.createAudioSfx("showSlide");
        this.createAudioSfx("yourTurn");
        this.createAudioSfx("heroPowerActivate");
        this.createAudioSfx("lifeUnder10");
        this.createAudioSfx("timerEnd");
        this.createAudioSfx("cardOnBoard");
        this.createAudioSfx("cardDead");
        this.createAudioSfx("cardTakeDamage");
        this.createAudioSfx("cardInHand");
        this.createAudioSfx("mustAttackTaunt");
        this.createAudioSfx("notEnoughEnergy");
        this.createAudioSfx("playerTakeDamage");
        this.createAudioSfx("openPlayMenu");
    }

    clickSfx(list_elements) {
        list_elements.forEach((element) => {
            element.addEventListener("click", () => {
                this.playSfx("click");
            });
        });
    }

    playSfx(elements) {
        let audio = document.querySelector("#" + elements + this.extension_id);
        if (this.setAttribute(audio)) audio.play();
    }

    //#region CREATE AUDIO

    createAudioSfx(name) {
        let node = this.utils.create_element_id("audio", name + this.extension_id);
        node.src = this.path + name + this.audio_extension;
        this.container.appendChild(node);
    }

    setAttribute(audio) {
        if (!this.isDisable) {
            audio.volume = this.volume;
            audio.load();
            return true;
        } else {
            return false;
        }
    }

    saveAttribute(volume, isDisable) {
        this.volume = volume;
        if (isDisable == "true") {
            this.isDisable = true;
        } else {
            this.isDisable = false;
        }
    }

    setVolume() {
        let slider = document.querySelector("#sfx_slider");
        let output = document.querySelector("#sfx_volume");
        output.innerHTML = slider.value;

        slider.oninput = () => {
            output.innerHTML = slider.value;
            this.setVolumeAjax(slider.value / 100);
        };
    }

    //#endregion

    //#region AJAX

    toggleSfxAjax() {
        let value = event.currentTarget.id;
        let parent = event.currentTarget.parentNode;
        let formData = new FormData();
        formData.append("sfx", value);

        fetch("settingsAjax.php", {
            method: "POST",
            credentials: "include",
            body: formData,
        })
            .then((response) => response.json())
            .then((response) => {
                sfx.saveAttribute(response["volume_sfx"], response["isDisable_sfx"]);
            });

        parent.childNodes.forEach((e) => {
            if (e instanceof HTMLButtonElement) e.style.color = "white";
        });
        event.currentTarget.style.color = "black";
    }

    setVolumeAjax(value) {
        let formData = new FormData();
        formData.append("volume_sfx", value);

        fetch("settingsAjax.php", {
            method: "POST",
            credentials: "include",
            body: formData,
        })
            .then((response) => response.json())
            .then((response) => {
                sfx.saveAttribute(response["volume_sfx"], response["isDisable_sfx"]);
            });
    }

    setDefaultValueAjax() {
        fetch("settingsAjax.php", {
            method: "POST",
            credentials: "include",
            body: "",
        })
            .then((response) => response.json())
            .then((response) => {
                // console.log(response);
                sfx.saveAttribute(response["volume_sfx"], response["isDisable_sfx"]);
                if (this.type != "login") {
                    document.querySelector("#sfx_slider").value = response["volume_sfx"] * 100;
                    document.querySelector("#sfx_volume").innerHTML = response["volume_sfx"] * 100;
                }
            });
    }

    //#endregion
}
