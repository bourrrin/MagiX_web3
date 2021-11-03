 let count=0;
 let display;
 window.addEventListener("load", ()=> {
        load_ships();
        display = setInterval(load_ships,4000);
        document.querySelector("#button").addEventListener("click",login);
    });

function load_ships(){
    if (count == 3) {
        clearInterval(display);
    } else {
        count++;

        for(let i =0; i<18;i++){
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
                    width = Math.random() * (4 - 3) + 3;
                    node.style.filter ="blur(0px) brightness(100%)";
                    break;
                case -2:
                    width = Math.random() * (3 - 1) + 1;
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

function flash(){
    var node = document.createElement("div");
    node.setAttribute("id","animation_fin")
    document.querySelector("body").appendChild(node);
  }

function login(){
    let username = document.querySelector("#login_name").value;
    let mdp = document.querySelector("#login_mdp").value;
    let formData = new FormData();
    formData.append("username", username);
    formData.append("mdp", mdp);

    fetch("ajax.php",{
        method : "POST",
        credentials : "include",
        body : formData
    })
    .then(response => response.json())
    .then(response => {
        if(response == true){
            flash();
            setTimeout(flash,200);
            setTimeout(() => {
                window.location.replace("lobby.php");
            }, 1200);
        }
        else{
            document.querySelector("#message_erreur").innerHTML="Username or Password Invalid";
            document.querySelector("#login_name").value = '';
            document.querySelector("#login_mdp").value = '';

            document.querySelector(".login").style.border = "red solid 10px";
            document.querySelector(".login").style.boxShadow = "red 0px 0px 20px";
            setTimeout(() => {
                document.querySelector(".login").style.border = "white solid 10px";
            document.querySelector(".login").style.boxShadow = "var(--neon-color) 0px 0px 20px";

            }, 1000);
        }
    })
}