class LoadingScreen {
    constructor(anim_container, main_container, timing) {
        main_container.style.display = "none";
        setTimeout(() => {
            let start = document.querySelector(".start");
            start.style.opacity = 0;
            setTimeout(() => {
                let node = create_element_class("div", "anim_container_intro");
                node.appendChild(create_element_class("div", "p1"));
                node.appendChild(create_element_class("div", "p2"));
                anim_container.appendChild(node);
                setTimeout(() => {
                    anim_container.appendChild(create_element_class("div", "p3"));
                    anim_container.appendChild(create_element_class("div", "p5"));
                    setTimeout(() => {
                        for (let i = 4; i <= 7; i++) {
                            let classe = "p" + i;
                            anim_container.appendChild(create_element_class("div", classe));
                        }
                        setTimeout(() => {
                            for (let i = 8; i <= 25; i++) {
                                let classe = "p" + i;
                                anim_container.appendChild(create_element_class("div", classe));
                            }
                            setTimeout(() => {
                                for (let i = 4; i <= 7; i++) {
                                    let classe = "p" + i;
                                    anim_container.appendChild(create_element_class("div", classe));
                                }
                                setTimeout(() => {
                                    anim_container.setAttribute("class", "end");
                                    setTimeout(() => {
                                        document.querySelector(".end").remove();
                                        main_container.style.display = "block";
                                    }, 2000);
                                }, 400 * timing);
                            }, 100 * timing);
                        }, 100 * timing);
                    }, 50 * timing);
                }, 100 * timing);
            }, 200 * timing);
        }, 500 * timing);
    }
}

function create_element_class(type, class_name) {
    let node = document.createElement(type);
    node.setAttribute("class", class_name);
    return node;
}
