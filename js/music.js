class Music {
    constructor(audioElement, type = null) {
        this.soundFile = audioElement;
        this.isDisable = null;
        this.type = type;
        this.src = "lobby";
        this.gameMusic = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.utils = new Utils();

        this.setSource();
        this.setDefaultValueAjax();
        // this.soundFile.currentTime = 2244;

        if (this.type != "login") this.setVolume();

        this.soundFile.addEventListener("ended", () => {
            // console.log("ended");
            this.changeMusic();
            this.musicHandler();
        });

        this.musicMainControl = setInterval(() => {
            this.musicPlayer();
        }, 1000);

        document.querySelectorAll(".set_music").forEach((e) => {
            e.addEventListener("click", this.toggleMusicAjax);
        });
    }

    setSource() {
        if (this.type !== null) {
            this.src = this.utils.shuffle(this.gameMusic)[0];
        }
        this.soundFile.src = "sound/music/" + this.src + ".mp3";
        this.soundFile.load();
    }

    musicPlayer() {
        // console.log(this.soundFile.currentTime);
        // console.log(this.isDisable);
        // console.log(this.soundFile.src);
        if (!this.isDisable) {
            if (this.soundFile.duration > 0 && !this.soundFile.paused) {
            } else {
                setTimeout(() => {
                    this.soundFile.play();
                }, 1);
            }
        } else {
            this.soundFile.pause();
        }
    }

    setAttribute(volume, isDisable) {
        this.soundFile.volume = volume;
        if (isDisable == "true") {
            this.isDisable = true;
        } else {
            this.isDisable = false;
        }
    }

    changeMusic() {
        if (this.type !== null) {
            this.src++;
        } else {
            this.src = 0;
        }
        this.soundFile.src = "sound/music/" + this.src + ".mp3";
        this.soundFile.load();
    }

    musicHandler() {
        clearInterval(this.musicMainControl);
        this.musicMainControl = setInterval(() => {
            this.musicPlayer();
        }, 1000);
    }

    setVolume() {
        let slider = document.querySelector("#music_slider");
        let output = document.querySelector("#music_volume");
        output.innerHTML = slider.value;

        slider.oninput = () => {
            output.innerHTML = slider.value;
            this.setVolumeAjax(slider.value / 100);
        };
    }

    toggleMusicAjax() {
        let value = event.currentTarget.id;
        let parent = event.currentTarget.parentNode;
        let formData = new FormData();
        formData.append("music", value);

        fetch("settingsAjax.php", {
            method: "POST",
            credentials: "include",
            body: formData,
        })
            .then((response) => response.json())
            .then((response) => {
                music.setAttribute(response["volume"], response["isDisable"]);
            });

        parent.childNodes.forEach((e) => {
            if (e instanceof HTMLButtonElement) e.style.color = "white";
        });
        event.currentTarget.style.color = "black";
    }

    setVolumeAjax(value) {
        let formData = new FormData();
        formData.append("volume", value);

        fetch("settingsAjax.php", {
            method: "POST",
            credentials: "include",
            body: formData,
        })
            .then((response) => response.json())
            .then((response) => {
                music.setAttribute(response["volume"], response["isDisable"]);
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
                music.setAttribute(response["volume"], response["isDisable"]);
                if (this.type != "login") {
                    document.querySelector(".slider").value = response["volume"] * 100;
                    document.querySelector("#music_volume").innerHTML = response["volume"] * 100;
                }
            });
    }
}
