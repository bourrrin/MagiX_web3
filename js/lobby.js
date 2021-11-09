const applyStyles = iframe => {
	let styles = {
		fontColor : "rgb(0, 255, 0)",
		fontGoogleName : "Gruppo",
        height:"100%",
		fontSize : "15px",
		inputBackgroundColor : "rgb(71, 71, 71)",
	}

	setTimeout(() => {
		iframe.contentWindow.postMessage(JSON.stringify(styles), "*");
}, 100);
}
