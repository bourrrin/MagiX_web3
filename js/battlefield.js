window.addEventListener("load", ()=> {

    for(let i=0; i<10; i++){
        document.querySelector("#o_mana").appendChild(create_element_class("div","mana-off"))
        document.querySelector("#p_mana").appendChild(create_element_class("div","mana-off"))
    }


    document.querySelector(".battlefield_background").style.transition="4s top";
    document.querySelector("#battlefield_background_up").style.top="-5%";
    document.querySelector("#battlefield_background_down").style.top="55%";
    setTimeout(() => {
        start_animation_ouverture();
    }, 4000);


    document.addEventListener('keypress', showCard);

});

function start_animation_ouverture(){
    document.querySelector(".turn").style.transform = "translateX(0)";
    document.querySelector(".timer").style.transform ="translateX(0)";

    document.querySelector(".p_interface").style.opacity = "1";
    document.querySelector(".o_interface").style.opacity ="1";
    document.querySelector(".p_hp_bar").style.opacity ="1";
    document.querySelector(".o_hp_bar").style.opacity ="1";
}

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

    // for(let i=1; i<=7; i++){
    //     // if(Math.floor(Math.random() * 2)==1){

    //         let node = create_element_class("div","card");
    //         node.style.backgroundImage = 'url("img/cards/'+i+'.jpg")';
    //         document.querySelector(".p_board").appendChild(node);

    //         let node1 = create_element_class("div","card");
    //         node1.style.backgroundImage = 'url("img/cards/'+i+'.jpg")';
    //         document.querySelector(".o_board").appendChild(node1);
    //     // }
    // }

    // for(let i=1; i<=10; i++){
    //     let node = create_element_class("div","card_in_hand");
    //     node.style.backgroundImage = 'url("img/cards/'+i+'.jpg")';

    //     document.querySelector(".p_hand").appendChild(node)
    // }

    // for(let i=1; i<=10; i++){
    //     let node = create_element_class("div","o_card_in_hand");
    //     node.style.backgroundImage = 'url("img/cards/back.jpg")';

    //     document.querySelector(".o_hand").appendChild(node)
    // }