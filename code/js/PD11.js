"use strict"; // Used to prevent common JS errors
// Note: Array.from converts querySelectorAll from Nodelist to Array
// This is useful when using array methods such as push, pop, slice etc.
// *-------------------------------------- Bootstrap collapse for select ------------------------------------*
// Getting all select elements
const selects = document.querySelectorAll("select");

// Takes select option as parameter and shows or hides associated collapse
const collapse = (option, show) => {
    const bsTarget = option.attributes.getNamedItem('data-bs-target');
    const targetId = bsTarget?.value;
    const collapseItem = targetId ? document.querySelector(targetId) : null;

    if (collapseItem) {
        if (show) {
            collapseItem.classList.add("show");
        } else {
            collapseItem.classList.remove("show");
        }
    }
}

selects.forEach((select) => {
    // Getting options for each select element
    const options = Array.from(select.children);

    // Checking if the select element is a Bootstrap collapse
    let isBsCollapse = false;
    options.forEach((option) => {
        const bsToggle = option.attributes.getNamedItem("data-bs-toggle");
        if (bsToggle && bsToggle.value === "collapse") {
            isBsCollapse = true;
        }
    })

    // If the select element is a Bootstrap collapse
    // add show and hide functionality of collapse
    if (isBsCollapse) {
        select.addEventListener("change", (e) => {
            const { selectedIndex } = select;
            const options = Array.from(e.target.options);
            options.forEach((option, index) => {
                if (index === selectedIndex) {
                    // if selected, show the associated collapse
                    collapse(option, true);
                } else {
                    // hide all other collapses
                    collapse(option, false);
                }
            })
        })
    }
})



// /*---------------------------------- Carousel Binding ------------------------------*/
// Helper function to create an element with a class name(s)<Array | string>, 
// defaults to creating a div if 2nd parameter is not provided
const createElementWithClass = (className, tagName = "div") => {
    const elem = document.createElement(tagName);
    if (Array.isArray(className)){
        className.forEach((classStr) => {
            elem.classList.add(classStr);
        })
    } else {
        elem.className = className;
    }
    return elem;
}

// Creates the binding elements
const createBindingElem = () => {
    // div with class "carousel-binding"
    const bindingElem = createElementWithClass("carousel-binding");
    // div with class "binds"
    const binds = createElementWithClass("binds");
    // Add element with class "bind" to "binds" element twice (2 children inside "binds")
    binds.appendChild(createElementWithClass("bind"));
    binds.appendChild(createElementWithClass("bind"));
    // Add "binds" to "carousel-binding"
    bindingElem.appendChild(binds);
    return bindingElem;
}

// Function that creates all the carousel binding elements
const createCarouselBinds = () => {
    // Get all carousels
    const carousels = Array.from(document.querySelectorAll(".carousel"));
    const bindingSize = window.innerWidth * 0.05; // 5vw
    carousels.forEach((carousel) => {
        const height = carousel.offsetHeight;
        // Calculating the number of binds to create
        const bindsToCreate = Math.floor(height / bindingSize);
        
        // Create parent element for all binds
        const spiralElem = createElementWithClass("carousel-spiral");
        // Add calculated number of binding elements to parent element
        for (let i = 0; i < bindsToCreate; i++){
            spiralElem.appendChild(createBindingElem()); 
        }
        // Add the generated parent element to the carousel
        // Prepend is used here so it is the first child of carousel
        carousel.prepend(spiralElem);
    })
}

// Removes bindings from carousel
const resetCarouselBinds = () => {
    const carousels = Array.from(document.querySelectorAll(".carousel"));
    const spirals = Array.from(document.querySelectorAll(".carousel-spiral"));
    if (spirals.length) {
        carousels.forEach((carousel, index) => {
            carousel.removeChild(spirals[index]);
        })
    }
}

// Resets and creates binding elements
const handleCarouselBinding = () => {
    resetCarouselBinds();
    createCarouselBinds()
}
// Called once when JS is loaded to render initial bindings
handleCarouselBinding();
// Dynamically re-render bindings on window change/resize
window.addEventListener("resize", handleCarouselBinding);
window.addEventListener("orientationchange", handleCarouselBinding);

// *---------------------------------- Flip Card Bindings ------------------------------*/
// Create binding HTML element
const createflipCardBinds = () => {
    const bindingElem = createElementWithClass("flipCard-binding"); // div with class "flipCard-binding"
    const binds = createElementWithClass("flipCard-binds"); // div with class "binds"
    // add element with class "bind" to "binds" element twice (2 children inside "binds")
    binds.appendChild(createElementWithClass("flipCard-bind"));
    binds.appendChild(createElementWithClass("flipCard-bind"));
    bindingElem.appendChild(binds); // add "binds" to "flipCard-binding"
    return bindingElem;
}

// Function that creates all the carousel binding elements
const createflipcardBinds = () => {
    // Get all flipCards
    const flipCards = Array.from(document.querySelectorAll(".flipCard"));
    const bindingSize = window.innerWidth * 0.05; // 5vw
    flipCards.forEach((flipCard) => {
        const width = flipCard.offsetWidth;
        // Calculating the number of binds to create
        const bindsToCreate = Math.floor(width / bindingSize);
        // Create parent element for all binds
        const spiralElem = createElementWithClass("flipCard-spiral");
        // Add calculated number of binding elements to parent element
        for (let i = 0; i < bindsToCreate; i++) {
            spiralElem.appendChild(createflipCardBinds()); 
        }
        // Add the generated parent element to the flipCard
        // prepend is used here so it is the first child of flipCard
        flipCard.prepend(spiralElem);
    })
}

// Removes bindings from flipCard
const resetflipCardBinds = () => {
    const flipCards = Array.from(document.querySelectorAll(".flipCard"));
    const spirals = Array.from(document.querySelectorAll(".flipCard-spiral"));
    if (spirals.length) {
        flipCards.forEach((card, index) => {
            card.removeChild(spirals[index]);
        })
    }
}

const handleflipCardBinding = () => {
    resetflipCardBinds();
    createflipcardBinds();
}
handleflipCardBinding();
// Re-render binds on window change/resize
window.addEventListener("resize", handleflipCardBinding);
window.addEventListener("orientationchange", handleflipCardBinding);