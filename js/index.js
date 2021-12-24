function clickSet() {
 circularnav.classList.toggle("clicked");
}

var circularnav = document.getElementsByClassName("ss-icon")[0];
circularnav.addEventListener("click", clickSet, false);

circularnav.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {  
        clickSet();
    }
});