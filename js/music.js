class Music {
    constructor(audioElement, volume, isDisable) {
        this.soundFile = audioElement;
        this.volume = null;
        this.isDisable = null;
        this.setAttribute(volume, isDisable);
        this.soundFile.currentTime = 2244;

        this.soundFile.addEventListener("ended", () => {
            console.log("ended");
            this.changeMusic();
            this.musicHandler();
        });

        this.musicMainControl = setInterval(() => {
            this.musicPlayer();
        }, 1000);
    }

    musicPlayer() {
        console.log(this.soundFile.currentTime);
        if (!this.isDisable) {
            if (this.soundFile.duration > 0 && !this.soundFile.paused) {
            } else {
                this.soundFile.volume = this.volume;
                // this.soundFile.loop = true;

                setTimeout(() => {
                    this.soundFile.play();
                }, 1);
            }
        } else {
            this.soundFile.pause();
        }
    }

    setAttribute(volume, isDisable) {
        this.volume = volume;
        if (isDisable == "true") {
            this.isDisable = true;
        } else {
            this.isDisable = false;
        }

        console.log(this.volume);
        console.log(this.isDisable);
    }

    createMusic() {
        let fileName = 1;
        //Create the audio tag
        let soundFile = document.createElement("audio");
        soundFile.preload = "auto";

        //Load the sound file (using a source element for expandability)
        let src = document.createElement("source");
        src.src = "sound/music/" + fileName + ".mp3";
        soundFile.appendChild(src);

        //Load the audio tag
        //It auto plays as a fallback
        soundFile.load();
        soundFile.volume = 0.0;
        soundFile.play();
    }

    changeMusic() {
        this.soundFile.src = "sound/music/2.mp3";
        this.soundFile.load();
    }

    musicHandler() {
        clearInterval(this.musicMainControl);
        this.musicMainControl = setInterval(() => {
            this.musicPlayer();
        }, 1000);
    }
}
