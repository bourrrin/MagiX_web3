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

window.addEventListener("load", ()=> {

	for(let j =0; j<150;j++){
		var delay =  Math.random() * (5 - 1) + 1;
		var node = document.createElement("div");
		node.style.animationDelay = delay+"s";
		document.querySelector("#load_bar").appendChild(node);
	}
});
