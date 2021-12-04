class Sfx {
    constructor() {
        document.querySelectorAll(".set_sfx").forEach((e) => {
            e.addEventListener("click", this.toggleSfxAjax);
        });

        this.container = document.querySelector("#audio_container");
        this.volume;
        this.setDefaultValueAjax();
        this.setVolume();
        this.utils = new Utils();
        this.path = "sound/sfx/";
        this.extension_id = "_sfx_id";
    }

    clickSfx(list_elements) {
        this.createAudioSfx("click", "click");

        list_elements.forEach((element) => {
            element.addEventListener("click", () => {
                let audio = document.querySelector("#click" + this.extension_id);
                console.log(audio);
                if (this.setAttribute(audio)) audio.play();
            });
        });
    }

    //#region CREATE AUDIO

    createAudioSfx(src, name) {
        let node = this.utils.create_element_id("audio", name + this.extension_id);
        node.src = this.path + name + ".mp3";
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
        console.log(volume, isDisable);
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
                sfx.saveAttribute(response["volume_sfx"], response["isDisable_sfx"]);
                document.querySelector("#sfx_slider").value = response["volume_sfx"] * 100;
                document.querySelector("#sfx_volume").innerHTML = response["volume_sfx"] * 100;
            });
    }

    //#endregion
}
