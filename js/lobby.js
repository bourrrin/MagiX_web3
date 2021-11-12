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
	lag_machine();
	document.querySelector("#quitter").addEventListener("click",test);
	setTimeout(() =>{
		for(let i =0; i<135;i++){
			var delay =  Math.random() * (5 - 1) + 1;
			var node = document.createElement("div");
			node.style.animationDelay = delay+"s";
			document.querySelector("#load_bar").appendChild(node);
		}
	}, 1000);
});

function lag_machine(){
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

function dead_pixel_effect(color){
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

function test(){
	dead_pixel_effect("#024577");
	setTimeout(()=>{dead_pixel_effect("black")}, 100)
}
