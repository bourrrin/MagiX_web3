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

let dead_pixel = [];

window.addEventListener("load", ()=> {
	create_dead_pixel_animation();
	intro = new LoadingScreen(document.querySelector(".container"), document.querySelector(".lobby-container"),);
	document.querySelector("#quitter").addEventListener("click",quitter);
	document.querySelector("#jouer").addEventListener("click",start_transition_tunel)
	setTimeout(() =>{
		for(let i =0; i<135;i++){
			var delay =  Math.random() * (5 - 1) + 1;
			var node = document.createElement("div");
			node.style.animationDelay = delay+"s";
			document.querySelector("#load_bar").appendChild(node);
		}
	}, 1000);
});

function start_transition_tunel(){
	document.querySelector(".lobby-container").style.opacity=0;
	document.querySelector("body").style.background="black";
	setTimeout(()=>{
		container =document.querySelector(".container_transition_tunel")
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
	var h = window.innerHeight;

	for(let i=0; i<(h/5); i++){
		var node = document.createElement("div");
		dead_pixel.push("dead_pixel"+i)
		node.setAttribute("id",dead_pixel[dead_pixel.length-1]);
		node.style.background ="transparent";
		node.style.width="100%";
		node.style.height="5px";
		document.querySelector("#lobby_dead_pixel_effect").appendChild(node);
	}

	document.querySelector("#lobby_dead_pixel_effect").style.display = "none";

}


function start_dead_pixel_animation(color){
	var h = window.innerHeight;
	let i = 0;
	let delay;
	dead_pixel = shuffle(dead_pixel);

	document.querySelector("#lobby_dead_pixel_effect").style.display = "block";

	let interval = setInterval(()=>{
		if(i>=(h/5)){
			clearInterval;
		}else{
			document.querySelector("#"+dead_pixel[i]).style.background = color ;
			i++;
		}
	},10);
}

function shuffle(array) {
	// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
	let currentIndex = array.length,  randomIndex;

	// While there remain elements to shuffle...
	while (currentIndex != 0) {

	  // Pick a remaining element...
	  randomIndex = Math.floor(Math.random() * currentIndex);
	  currentIndex--;

	  // And swap it with the current element.
	  [array[currentIndex], array[randomIndex]] = [
		array[randomIndex], array[currentIndex]];
	}

	return array;
}

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
			console.log("lol");
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
