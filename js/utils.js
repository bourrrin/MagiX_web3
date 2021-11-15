class Utils{
    constructor(){

    }

    create_element_class(type, class_name){
        let node = document.createElement(type);
        node.setAttribute("class",class_name);
        return node;
    }

    create_element_id(type, id_name){
        let node = document.createElement(type);
        node.setAttribute("id",id_name);
        return node;
    }

    create_element_id_class(type, id_name, class_name){
        let node = document.createElement(type);
        node.setAttribute("id",id_name);
        node.setAttribute("class",class_name);
        return node;
    }



    shuffle(array) {
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
}