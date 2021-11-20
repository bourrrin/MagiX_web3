//#region CHAT STYLE

const applyStyles = iframe => {
	let styles = {
		fontColor : "rgb(0, 255, 0)",
		fontGoogleName : "Gruppo",
        height:"100%",
		fontSize : "20px",
		inputBackgroundColor : "rgb(71, 71, 71)",
	}
	setTimeout(() => {
		iframe.contentWindow.postMessage(JSON.stringify(styles), "*");
	}, 100);
}

//#endregion

let dead_pixel_array = [];
let utils = new Utils();
let h = window.innerHeight;


window.addEventListener("load", ()=> {
	intro = new LoadingScreen(document.querySelector(".container"), document.querySelector(".lobby-container"),);
	set_lobby_elements();
});

function set_lobby_elements(){
	document.querySelector("#quitter").addEventListener("click",quitter);
	document.querySelector("#jouer").addEventListener("click",start_transition_tunel)
	create_dead_pixel_animation();
	create_loadingBar_animation();
}


//#region ANIMATION HANDLERS

function create_loadingBar_animation(){
	setTimeout(() =>{
		for(let i =0; i<135;i++){
			let delay =  Math.random() * (5 - 1) + 1;
			let node = document.createElement("div");
			node.style.animationDelay = delay+"s";
			document.querySelector("#load_bar").appendChild(node);
		}
	}, 1000);
}

function start_transition_tunel(){
	document.querySelector(".lobby-container").style.opacity=0;
	document.querySelector("body").style.background="black";
	setTimeout(()=>{
		container = document.querySelector(".container_transition_tunel")
		transition = new Transition_Tunel(container,30);
		setTimeout(() => {
			transition.end_transition(document.querySelector(".container_transition_tunel"));
			document.querySelector("body").style.background="radial-gradient(#010219,#01134c)";
			setTimeout(() => {
				window.location.replace("battlefield.php");
			}, 3000);
		}, 3000);
	},2000)
}

function create_dead_pixel_animation(){
	for(let i=0; i<(h/5); i++){
		dead_pixel_array.push("dead_pixel"+i)
		node = utils.create_element_id_class("div",dead_pixel_array[dead_pixel_array.length-1],"dead_pixel");
		document.querySelector("#lobby_dead_pixel_effect").appendChild(node);
	}
}

function start_dead_pixel_animation(color){
	let i = 0;
	dead_pixel_array = utils.shuffle(dead_pixel_array);
	document.querySelector("#lobby_dead_pixel_effect").style.display = "block";

	let interval = setInterval(()=>{
		if(i>=(h/5)){
			clearInterval;
		}else{
			document.querySelector("#"+dead_pixel_array[i]).style.background = color ;
			i++;
		}
	},10);
}

//#endregion

//#region AJAX ACTION

function quitter(){
	let formData = new FormData();
    formData.append("action", "quitter");

    fetch("lobbyAjax.php",{
        method : "POST",
        credentials : "include",
        body : formData
    })
    .then(response => response.json())
    .then(response => {
        if(response == true){
			start_dead_pixel_animation("#024577");
			setTimeout(()=>{
				start_dead_pixel_animation("black")
				setTimeout(() => {
					window.location.replace("index.php");
				}, 2000);
			}, 100)
		}
	})
}


//#endregion