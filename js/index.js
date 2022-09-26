var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};


window.onload = function () {

    var loader = document.getElementById("loader");
    loader.classList.remove("display-none");

    var content = document.getElementById("content");


    setTimeout(function () {
        loader.classList.add("display-none");
        content.classList.remove("display-none");
    }, 3200)


    var launchDate = new Date("12/31/2022");
    var launchDateText = document.getElementById("launch-date");

    var daysContainer = document.getElementById("days");
    var hoursContainer = document.getElementById("hours");
    var minutesContainer = document.getElementById("minutes");
    var secondsContainer = document.getElementById("seconds");

    setInterval(function () {
        var today = new Date();

        let diffInMilliSeconds = launchDate - today;

        let seconds = Math.floor(diffInMilliSeconds / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);

        hours = hours - (days * 24);
        minutes = minutes - (days * 24 * 60) - (hours * 60);
        seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);

        daysContainer.innerHTML = days;
        hoursContainer.innerHTML = hours;
        minutesContainer.innerHTML = minutes;
        secondsContainer.innerHTML = seconds;
        
    }, 1000);



    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    // var css = document.createElement("style");
    // css.type = "text/css";
    // css.innerHTML = ".typewrite > .wrap { border-right: 0.1em solid #000}";
    // document.body.appendChild(css);
};

function toggleMode() {
    var imageContainer = document.getElementById("mode");
    imageContainer.src = "images/light-bulb-off.svg";
    document.body.style.transition = 'color 1s, background-color 1s';

    document.getElementById("theme").classList.toggle("light");
    console.log(imageContainer);
}
