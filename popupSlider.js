function Slider(element) {
    this.loadStatic();
    this.el = document.querySelector(element);
    this.init();
}

Slider.prototype = {
    init: function () {
        this.links = this.el.querySelectorAll("#slider-nav a");
        this.wrapper = this.el.querySelector("#slider-wrapper");
        this.nextBtn = this.el.querySelector("#next");
        this.prevBtn = this.el.querySelector("#prev");
        this.navigate();
    },
    navigate: function () {

        var self = this;

        for (var i = 0; i < this.links.length; ++i) {
            var link = this.links[i];
            link.addEventListener("click", function (e) {
                //Make the carousel (auto slide changing with interval 5 seconds) - stop when the slide was changed manually
                //clearInterval(self.slideCycle);
                self.slide(this);
            });
        }

        self.prevBtn.style.display = 'none';

        self.nextBtn.addEventListener('click', function (e) {
            var currentSlideNumber = document.querySelector('#slider-nav a.current').getAttribute("data-slide");
            var nextSlide = document.querySelector('[data-slide="' + (parseInt(currentSlideNumber, 10) + 1) + '"]');

            //Make the carousel (auto slide changing with interval 5 seconds) - stop when the slide was changed manually
            //clearInterval(self.slideCycle);
            nextSlide.click();
        }, false);

        self.prevBtn.addEventListener('click', function (e) {
            var currentSlideNumber = document.querySelector('#slider-nav a.current').getAttribute("data-slide");
            var prevSlide = document.querySelector('[data-slide="' + (parseInt(currentSlideNumber, 10) - 1) + '"]');

            //Make the carousel (auto slide changing with interval 5 seconds) - stop when the slide was changed manually
            //clearInterval(self.slideCycle);
            prevSlide.click();
        }, false);

        self.close();
        
        //Make the carousel (auto slide changing with interval 5 seconds) - stop when the slide was changed manually
        //self.slideShow(2000);
    },

    slide: function (element) {
        this.setCurrentLink(element);

        var index = parseInt(element.getAttribute("data-slide"), 10) + 1;
        var currentSlide = this.el.querySelector(".slide:nth-child(" + index + ")");

        this.wrapper.style.left = "-" + currentSlide.offsetLeft + "px";

        if (index < this.links.length)
            this.nextBtn.style.display = 'block';
        else if (index == this.links.length)
            this.nextBtn.style.display = 'none';

        if (index > 1)
            this.prevBtn.style.display = 'block';
        else if (index == 1)
            this.prevBtn.style.display = 'none';
    },

    setCurrentLink: function (link) {
        var parent = link.parentNode;
        var a = parent.querySelectorAll("a");

        link.className = "current";

        for (var j = 0; j < a.length; ++j) {
            var cur = a[j];
            if (cur !== link) {
                cur.className = "";
            }
        }
    },

    loadStatic: function () {

        var self = this;

        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'assets/popupSlider.css';
        document.head.appendChild(link);

        var sliderHTML = '';

        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'assets/popupSlider.html', false);
        xhr.send();
        if (xhr.status != 200) {
            alert('Can not load the popupSlider.html. Got the error ' + xhr.status + ': ' + xhr.statusText);
        } else {
            sliderHTML = xhr.responseText;
        }

        //Load the slider to the container with id #popupSlider
        /*var target = document.querySelector( "#popupSlider" );
        target.innerHTML = sliderHTML;*/

        var div = document.createElement('div');
        div.innerHTML = sliderHTML;
        document.body.appendChild(div);
    },

    close: function () {
        document.getElementById('cq-popup-btclose').onclick = function () {
            document.getElementById('cq-popup-bg').remove();
            document.getElementById('cq-popup').remove();
        }

        //Closing the popup clicking outside
        /*document.getElementById('cq-popup-bg').onclick = function () {
         document.getElementById('cq-popup-bg').remove();
         document.getElementById('cq-popup').remove();
         }*/
    },

    //Make the carousel (auto slide changing with interval 5 seconds) - stop when the slide was changed manually
    /*slideShow: function (timeout) {
        var sliderCount = this.links.length;
        var self = this;

        this.slideCycle = setInterval(function () {
            var currentSlideNumber = document.querySelector('#slider-nav a.current').getAttribute("data-slide");
            var slideId = parseInt(currentSlideNumber, 10) + 1;
            self.slide(document.querySelector('[data-slide="' + (sliderCount == slideId ? 0 : slideId) + '"]'));
        }, timeout);
    }*/
};
