
// 드래그할 대상 
const source = document.querySelector("#source");
source.addEventListener("dragstart", (ev) => {
    console.log("dragStart");
    // Change the source element's background color
    // to show that drag has started
    ev.currentTarget.classList.add("dragging");
    // Clear the drag data cache (for all formats/types)
    ev.dataTransfer.clearData();
    // Set the drag's format and data.
    // Use the event target's id for the data
    ev.dataTransfer.setData("text/plain", ev.target.id);
});

source.addEventListener("drag", (e) => { 
    e.preventDefault();
    // console.log("drag");
});


source.addEventListener("dragend", (e) => { 
    e.preventDefault();
    console.log("dragend");
});


source.addEventListener("dragend", (ev) =>
    ev.target.classList.remove("dragging")
);


// 드랍될 대상 
const target = document.querySelector("#target");
target.addEventListener("dragenter", (ev) => {
    console.log("dragEnter");
    ev.preventDefault();
});

target.addEventListener("dragover", (ev) => {
    // console.log("dragOver");
    ev.preventDefault();
});
target.addEventListener("dragleave", (ev) => {
    console.log("dragLeave");
    ev.preventDefault();
});


target.addEventListener("drop", (ev) => {
    // console.log("Drop");
    // ev.preventDefault();
    // // Get the data, which is the id of the source element
    // const data = ev.dataTransfer.getData("text");
    // const source = document.getElementById(data);
    // console.log("source: " + source);
    // ev.target.appendChild(source);
});
