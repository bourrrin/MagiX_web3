class LoadingScreen{
    constructor(anim_container, main_container){
        main_container.style.display= "none";
        setTimeout(()=>{
            let start = document.querySelector(".start");
            start.style.opacity = 0;
            setTimeout(()=>{
                let node = create_element_class("div","anim_container_intro");
                node.appendChild(create_element_class("div","p1"));
                node.appendChild(create_element_class("div","p2"));
                anim_container.appendChild(node);
                setTimeout(()=>{
                    anim_container.appendChild(create_element_class("div","p4"));
                    anim_container.appendChild(create_element_class("div","p5"));
                    setTimeout(()=>{
                        anim_container.appendChild(create_element_class("div","p4"));
                        anim_container.appendChild(create_element_class("div","p7"));
                        anim_container.appendChild(create_element_class("div","p23"));
                        anim_container.appendChild(create_element_class("div","p32"));
                        setTimeout(()=>{
                            anim_container.appendChild(create_element_class("div","p33"));
                            anim_container.appendChild(create_element_class("div","p34"));
                            anim_container.appendChild(create_element_class("div","p35"));
                            for(let i = 8; i<=22; i++){
                                let classe = "p"+i;
                                anim_container.appendChild(create_element_class("div",classe));
                            }
                            setTimeout(()=>{
                                anim_container.appendChild(create_element_class("div","p4"))
                                anim_container.appendChild(create_element_class("div","p7"))
                                anim_container.appendChild(create_element_class("div","p23"))
                                anim_container.appendChild(create_element_class("div","p32"))
                                setTimeout(()=>{
                                    anim_container.setAttribute("class","end")
                                    setTimeout(()=>{
                                        document.querySelector(".end").remove();
                                       main_container.style.display= "block";
                                    },2000)
                                },500)
                            },200)
                        },500)
                    },200)
                },800)
            },500);
        },2000)
    }
}


function create_element_class(type, class_name){
	let node = document.createElement(type);
	node.setAttribute("class",class_name);
	return node;
}
