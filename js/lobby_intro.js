window.addEventListener("load", ()=> {
	document.querySelector(".start").addEventListener("click",animation_intro_lobby)
})

function create_element_class(type, class_name){
	let node = document.createElement(type);
	node.setAttribute("class",class_name);
	return node;
}

function animation_intro_lobby(){
    let container = document.querySelector(".container");
	let start = document.querySelector(".start");
    start.style.opacity = 0;

    setTimeout(()=>{
        start.remove();
        let node = create_element_class("div","container");
        node.appendChild(create_element_class("div","p1"));
        node.appendChild(create_element_class("div","p2"));
        container.appendChild(node);
    },1000);
    setTimeout(()=>{
        // container.appendChild(create_element_class("div","p3"));
    },2500)
    setTimeout(()=>{
        container.appendChild(create_element_class("div","p4"));
        container.appendChild(create_element_class("div","p5"));
    },3000)
    setTimeout(()=>{
        container.appendChild(create_element_class("div","p4"));
        container.appendChild(create_element_class("div","p7"));
        container.appendChild(create_element_class("div","p23"));
        container.appendChild(create_element_class("div","p32"));
    },3200)
    setTimeout(()=>{
        container.appendChild(create_element_class("div","p33"));
        container.appendChild(create_element_class("div","p34"));
        container.appendChild(create_element_class("div","p35"));
        for(let i = 8; i<=22; i++){
            let classe = "p"+i;
            container.appendChild(create_element_class("div",classe));
        }
    },3700)
    setTimeout(()=>{
        container.appendChild(create_element_class("div","p4"))
        container.appendChild(create_element_class("div","p7"))
        container.appendChild(create_element_class("div","p23"))
        container.appendChild(create_element_class("div","p32"))
    },3200)
    setTimeout(()=>{
        container.setAttribute("class","end")
    },4500)
    setTimeout(()=>{
        document.querySelector(".end").remove();
        document.querySelector(".lobby-container").style.display= "block";
        document.querySelector(".lobby-container").style.opacity= "1";

    },7500)
}
