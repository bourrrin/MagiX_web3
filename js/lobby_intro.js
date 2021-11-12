window.addEventListener("load", ()=> {
    setTimeout(()=>{
        let container = document.querySelector(".container");
        let start = document.querySelector(".start");
        start.style.opacity = 0;

        setTimeout(()=>{
            start.remove();
            let node = create_element_class("div","container");
            node.appendChild(create_element_class("div","p1"));
            node.appendChild(create_element_class("div","p2"));
            container.appendChild(node);
            setTimeout(()=>{
                container.appendChild(create_element_class("div","p4"));
                container.appendChild(create_element_class("div","p5"));
                setTimeout(()=>{
                    container.appendChild(create_element_class("div","p4"));
                    container.appendChild(create_element_class("div","p7"));
                    container.appendChild(create_element_class("div","p23"));
                    container.appendChild(create_element_class("div","p32"));
                    setTimeout(()=>{
                        container.appendChild(create_element_class("div","p33"));
                        container.appendChild(create_element_class("div","p34"));
                        container.appendChild(create_element_class("div","p35"));
                        for(let i = 8; i<=22; i++){
                            let classe = "p"+i;
                            container.appendChild(create_element_class("div",classe));
                        }
                        setTimeout(()=>{
                            container.appendChild(create_element_class("div","p4"))
                            container.appendChild(create_element_class("div","p7"))
                            container.appendChild(create_element_class("div","p23"))
                            container.appendChild(create_element_class("div","p32"))
                            setTimeout(()=>{
                                container.setAttribute("class","end")
                                setTimeout(()=>{
                                    document.querySelector(".end").remove();
                                    document.querySelector(".lobby-container").style.display= "block";
                                    document.querySelector(".lobby-container").style.opacity= "1";

                                },2500)
                            },1500)
                        },200)
                    },500)
                },200)
            },2000)
        },1000);
    },2000)
})

function create_element_class(type, class_name){
	let node = document.createElement(type);
	node.setAttribute("class",class_name);
	return node;
}
