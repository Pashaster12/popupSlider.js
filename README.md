# popupSlider.js
Simple RAW JavaScript popup slider. Based on https://codepen.io/gabrieleromanato/pen/pIfoD

Russian documentation is available here - http://cccp-blog.com/koding/js-slajder

Some features are commented in the code:

- load the slider to the container with id `popupSlider`;
- closing the popup clicking outside;
- make the carousel (auto slide changing with interval 5 seconds) - stop when the slide was changed manually.

# Integration to the site
1. Copy the catalog to the site directory.
2. Add the next line to the HTML code of your site before the closed `body` tag:

```html
<script type="text/javascript" src="/path_to_slider_dir/popupSlider.js"></script>
```
3. Add the following code into your existing JavaScript file for calling the slider (it may be the button press, documentReady or other action):

```javascript
var aSlider = new Slider("#slider");
```

If you want to attach the slider to the specified container, you should add the id #popupSlider to it:

```html
<div id="popupSlider"></div>
```

Also you can change the value of the id in the code of the popupSlider.js and you should add this section to the `loadStatic()` method:

```javascript
var target = document.querySelector( "#popupSlider" );
target.innerHTML = sliderHTML;
```

You should add this code instead of the following:

```javascript
var div = document.createElement('div');
div.innerHTML = sliderHTML;
document.body.appendChild(div);
```

# Adding new slides
1. Add your pictures to the slides folder
2. Add new HTML block to the slider wrapper with id `slider-wrapper`:

```html
<div class="slide">
    <img src="slides/new_slide.jpg" alt="" />
    <div class="caption">
        <div class="caption-container">
           Text
        </div>
    </div>
</div>
```

3. Add new item to the block with id `slider-nav`:

```html
<a href="#" data-slide="id"></a>
```
Use the value of the `data-slide` greater then the largest at the current moment.

# Planned in the future
- make the external config file;
- change the makeup for the situations when the slider would be embedded;
- asynchronous slider loading;
- make an npm package;
- responsize makeup;
- swipe for mobile devices.
