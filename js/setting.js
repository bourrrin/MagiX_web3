window.addEventListener("load", () => {
    document.querySelector("#control_btn").addEventListener("click", displaySettingControl);
    document.querySelector("#sound_btn").addEventListener("click", displaySettingSound);
    document.querySelector("#animation_btn").addEventListener("click", displaySettingAnimation);
});

function displaySettingControl() {
    setSettingStyle();
    document.querySelector("#control").style.display = "block";
    document.querySelector("#control_btn").classList.add("btn_selected");
}

function displaySettingAnimation() {
    setSettingStyle();
    document.querySelector("#animation").style.display = "flex";
    document.querySelector("#animation_btn").classList.add("btn_selected");
}

function displaySettingSound() {
    setSettingStyle();
    document.querySelector("#sound").style.display = "flex";
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
