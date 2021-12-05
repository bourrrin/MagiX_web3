class Transition_Tunel {
    constructor(container, speed) {
        // let color1 = rgb(102, 230, 255);
        // let color0 = rgb(0, 9, 18);

        let sfx = new Sfx("login");
        sfx.playSfx("transitionTunnel");

        this.speed = speed;
        this.container = container;
        let min_size = 30;
        this.square_count = parseInt(window.innerWidth / min_size);
        let i = 1;
        let interval = setInterval(() => {
            if (i >= this.square_count) {
                clearInterval;
            } else {
                let node = this.create_element_class("div", "square");
                let size = min_size * i;
                let p = this.pourcentage(i, 20);

                node.style.width = size + "px";
                node.style.height = size + "px";
                node.style.borderColor =
                    "rgb(" +
                    this.find_color(p, 0, 0) +
                    " " +
                    this.find_color(p, 9, 207) +
                    " " +
                    this.find_color(p, 18, 207) +
                    " " +
                    ")";
                node.style.animationDelay = i / 10 + "s";

                this.container.appendChild(node);
                i++;
            }
        }, this.speed);
    }

    find_color(pourcentage, minColor, maxColor) {
        let color = maxColor - minColor;
        return this.find_pourcentage(pourcentage, color);
    }

    create_element_class(type, class_name) {
        let node = document.createElement(type);
        node.setAttribute("class", class_name);
        return node;
    }

    pourcentage(value, max) {
        return (value * 100) / max;
    }

    find_pourcentage(pourcentage, max) {
        return (max * pourcentage) / 100;
    }

    end_transition(container) {
        container.style.opacity = 0;
    }
}
