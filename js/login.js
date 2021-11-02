 let count=0;
 let display;
 window.addEventListener("load", ()=> {
        load_ships();
        display = setInterval(load_ships,2000);

    });

function load_ships(){
    if (count == 5) {
        clearInterval(display);
    } else {
        count++;

        for(let i =0; i<9;i++){
            let source = "img/ships/ship"+i+".png";
            let width = 0;
            let top = Math.random() * (85 - 5) + 5;
            let z = parseInt(Math.random() * ((-1) - (-3)) + (-3));
            let anim_dur = Math.random() * (45 - 10) + 10;

            var node = document.createElement("img");
            node.classList.add("ship");
            if(Math.floor(Math.random() * 2)==1){
                node.className += " move-left";
            }else{
                node.className += " move-right";
            }

            switch(z){
                case -1:
                    width = Math.random() * (5 - 3) + 3;
                    node.style.filter ="blur(0px) brightness(100%)";
                    break;
                case -2:
                    width = Math.random() * (4 - 2) + 2;
                    node.style.filter ="blur(0.5px) brightness(75%)";
                    break;
                case -3:
                    width = Math.random() * (2 - 0.5) + 0.5;
                    node.style.filter ="blur(2px) brightness(40%)";
                    break;
            }

            node.src = source;
            node.style.top = top+"%";
            node.style.width =width+"%";
            node.style.zIndex= z;
            node.style.animationDuration = anim_dur+"s";

            document.querySelector("body").appendChild(node);
        }
    }
  }