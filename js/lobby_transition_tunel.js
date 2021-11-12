class Transition_Tunel{
    constructor(container, speed){
        // = document.querySelector(".container_transition_tunel");
        // let color1 = rgb(102, 230, 255);
        // let color0 = rgb(0, 9, 18);
        this.speed = speed;
        this.container = container;
        let min_size = 30;
        this.square_count = parseInt(window.innerWidth/min_size);
        let i = 1;
        let interval = setInterval(() => {
            if(i >= this.square_count){
                clearInterval;
            }
            else{
                let node =  create_element_class("div","square");
                let size =(min_size*(i))
                let p =  pourcentage(i,20);

                node.style.width = size +"px";
                node.style.height = size +"px";
                node.style.borderColor = "rgb("
                +find_color(p,0,0) +" "
                +find_color(p,9,207) +" "
                +find_color(p,18,207) +" "+")";
                node.style.animationDelay=i/10+"s";

                this.container.appendChild(node);
                i++;
            }
        }, this.speed);
    }
}

function find_color(pourcentage, minColor, maxColor){
    let color = maxColor - minColor;
    return find_pourcentage(pourcentage, color);
}

function create_element_class(type, class_name){
	let node = document.createElement(type);
	node.setAttribute("class",class_name);
	return node;
}

function pourcentage(value, max){
    return (value*100)/max;
}

function find_pourcentage(pourcentage, max){
    return (max*pourcentage)/100;
}

end_transition = function(container){
    let childs = container.children;
    let i = 0;
    let interval = setInterval(() => {
        console.log("lol");
        if(i >= this.square_count){
            clearInterval;
        }
        else{
            childs[i].remove();
            i++;
        }
    }, this.speed);
}