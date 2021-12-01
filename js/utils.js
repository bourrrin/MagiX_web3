class Utils {
    constructor() {}

    create_element_class(type, class_name = null, innerHTML = null) {
        let node = document.createElement(type);
        if (class_name != null) node.setAttribute("class", class_name);
        if (innerHTML != null) node.innerHTML = innerHTML;
        return node;
    }

    create_element_id(type, id_name = null) {
        let node = document.createElement(type);
        if (id_name != null) node.setAttribute("id", id_name);
        return node;
    }

    create_element_id_class(type, id_name, class_name) {
        let node = document.createElement(type);
        node.setAttribute("id", id_name);
        node.setAttribute("class", class_name);
        return node;
    }

    create_img(src, class_name = null) {
        let node = document.createElement("img");
        node.src = src;
        if (class_name != null) node.setAttribute("class", class_name);

        return node;
    }

    shuffle(array) {
        // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        let currentIndex = array.length,
            randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    isArrayEqual(arr1, arr2) {
        //gomakethings.com/how-to-check-if-two-arrays-are-equal-with-vanilla-js/#:~:text=To%20check%20for%20equality%2C%20we,the%20same%20length%20if%20(arr1.
        if (arr1.length !== arr2.length) {
            return false;
        } else {
            for (var i = 0; i < arr1.length; i++) {
                if (arr1[i] !== arr2[i]) return false;
            }
            return true;
        }
    }

    // addEventListener(target, event, f) {
    //     document.querySelector(target).addEventListener(event, () => {
    //         f;
    //     });
    // }
}
