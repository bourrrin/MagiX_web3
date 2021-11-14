window.addEventListener("load", ()=> {

    for(let i=0; i<10; i++){
        if(Math.floor(Math.random() * 2)==1){
            document.querySelector("#o_mana").appendChild(create_element_class("div","mana-on"))
        }else{
            document.querySelector("#o_mana").appendChild(create_element_class("div","mana-off"))
        }
    }

    for(let i=0; i<10; i++){
        if(Math.floor(Math.random() * 2)==1){
            document.querySelector("#p_mana").appendChild(create_element_class("div","mana-on"))
        }else{
            document.querySelector("#p_mana").appendChild(create_element_class("div","mana-off"))
        }
    }

    for(let i=1; i<=7; i++){
        // if(Math.floor(Math.random() * 2)==1){

            let node = create_element_class("div","card");
            node.style.backgroundImage = 'url("img/cards/'+i+'.jpg")';
            document.querySelector(".p_board").appendChild(node);

            let node1 = create_element_class("div","card");
            node1.style.backgroundImage = 'url("img/cards/'+i+'.jpg")';
            document.querySelector(".o_board").appendChild(node1);
        // }
    }

    for(let i=1; i<=10; i++){
        let node = create_element_class("div","card_in_hand");
        node.style.backgroundImage = 'url("img/cards/'+i+'.jpg")';

        document.querySelector(".p_hand").appendChild(node)
    }

    for(let i=1; i<=10; i++){
        let node = create_element_class("div","o_card_in_hand");
        node.style.backgroundImage = 'url("img/cards/back.jpg")';

        document.querySelector(".o_hand").appendChild(node)
    }


    document.addEventListener('keypress', showCard);

});

function create_element_class(type, class_name){
	let node = document.createElement(type);
	node.setAttribute("class",class_name);
	return node;
}

function showCard(){
    document.querySelector(".show_card").style.left = "calc(98vw - 20vw)";
    setTimeout(() => {
        document.querySelector(".show_card").style.left = "100vw";

    }, 2000);
}