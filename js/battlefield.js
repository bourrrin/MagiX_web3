let mana = 5;
let utils = new Utils();

window.addEventListener("load", ()=> {
    window.addEventListener("contextmenu", e => e.preventDefault());
    document.querySelector(".show_card").addEventListener("click",hide_card);

    for(let i=0; i<mana; i++){
        document.querySelector("#o_mana").appendChild(create_element_class("div","mana-on"))
        document.querySelector("#p_mana").appendChild(create_element_class("div","mana-on"))
    }

    start_animation_ouverture();
});

function start_animation_ouverture(){
    document.querySelector(".battlefield_background").style.transition="4s top";
    document.querySelector("#battlefield_background_up").style.top="-20%";
    document.querySelector("#battlefield_background_down").style.top="35%";

    setTimeout(() => {
        document.querySelector(".turn").style.transform = "translateX(0)";
        document.querySelector(".timer").style.transform ="translateX(0)";

        document.querySelector(".p_interface").style.opacity = "1";
        document.querySelector(".o_interface").style.opacity ="1";
        document.querySelector(".p_hp_bar").style.opacity ="1";
        document.querySelector(".o_hp_bar").style.opacity ="1";
        for(let i=3; i<=6; i++){
            fill_card_hand(true,i);
            fill_card_hand(false);
            setTimeout(() => {
                fill_card_hand(true,1);
            }, 1000);
        }
    }, 4000);
}

function show_card(){
    let div = document.querySelector(".show_card").style;
    div.backgroundImage = event.currentTarget.style.backgroundImage;
    div.left = "calc(98vw - 20vw)";
}

function hide_card(){
    document.querySelector(".show_card").style.left = "100vw";
}


function fill_card_hand(player, card_id=null){
    if(player){
        document.querySelector(".p_hand").appendChild(create_player_card(card_id));
    }else{
        let node1 = utils.create_element_class("div","o_card_in_hand");
        node1.style.backgroundImage = 'url("img/cards/back.jpg")';
        document.querySelector(".o_hand").appendChild(node1);
    }
}

function create_player_card(id){
    let node = utils.create_element_class("div","card_in_hand");
    node.style.backgroundImage = 'url("img/cards/'+id+'.jpg")';
    node.addEventListener("click", event=>{play_card()});
    node.addEventListener("contextmenu",()=>{show_card()})
    // node.addEventListener("dblclick",()=>{show_card(id)})

    return node;
}

function play_card(){
    let cost = 1
    if(can_play_card(cost)){
        let node = utils.create_element_class("div","card");
        node.style.backgroundImage = event.currentTarget.style.backgroundImage;
        node.addEventListener("contextmenu",()=>{show_card(event.currentTarget.style.backgroundImage)})
        document.querySelector(".p_board").appendChild(node);
        event.currentTarget.remove();
        reduit_mana(cost);
    }
}

function can_play_card(cost){
    if(document.querySelector(".p_board").childElementCount >= 7 || mana < cost){
        return false;
    }
    return true
}

function reduit_mana(cost){
    mana -= cost;
    let div = document.querySelector("#p_mana")
    div.removeChild(div.lastChild);
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