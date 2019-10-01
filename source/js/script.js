'use strict'

// >> Slider

var backgroundToggles = document.querySelectorAll('.background-slider');
var currentSlide = 0;
var waitTimeSlideChange = 5000;
if (backgroundToggles.length) {
  // setInterval(changeSlide(currentSlide + 1), 3000);
  var startChangesSlide = setInterval(function() {
    changeSlide(currentSlide + 1);
    currentSlide += 1;
  }, waitTimeSlideChange);

  for (var i = 0; i < backgroundToggles.length; i++) {
    backgroundToggles[i].addEventListener('change', function() {
      clearInterval(startChangesSlide);
    });
  }
}

function changeSlide(slideNumber) {
  var lastSlideNumber = (backgroundToggles.length + slideNumber - 1) % backgroundToggles.length;
  var nextSlideNumber = (backgroundToggles.length + slideNumber) % backgroundToggles.length;
  backgroundToggles[lastSlideNumber].checked = false;
  backgroundToggles[nextSlideNumber].checked = true;
}

// Slider <<

// >> Modals

var modals = {
  buttonClose: document.querySelectorAll('.popup__button-close'),
  popupFeedback: document.querySelector('.popup-feedback'),
  modalWrap: document.querySelector('.modal')
}

for (var i = 0, length = modals.buttonClose.length; i < length; i++) {
  modals.buttonClose[i].addEventListener('click', feedbackToggleShow);
}

function feedbackToggleShow() {
  modalWrapToggleShow();
  modals.popupFeedback.classList.toggle('modal_show');
}

function modalWrapToggleShow() {
  modals.modalWrap.classList.toggle('modalWrap_show');
}

// Modals <<

// >> Range

var range = {
  config: {
    min: 0,
    max: 800
  },
  container: document.querySelector('.range'),
  selected: document.querySelector('.range__selected'),
  thumb: {
    min: document.querySelector('.range__handle_min'),
    max: document.querySelector('.range__handle_max')
  },
  output: {
    min: document.querySelector('.filters__price_min'),
    max: document.querySelector('.filters__price_max')
  }
}

if (range.container) {
  var rangeCoords = getCoords(range.container);
  var rangeWidth = range.container.offsetWidth;
  var distance = range.config.max - range.config.min;
  var min = parseInt(getComputedStyle(range.selected).left);
  var max = rangeWidth - parseInt(getComputedStyle(range.selected).right);

  setMinValue(100);
  setMaxValue(500);

  range.thumb.min.addEventListener('mousedown', function(e) {
    var shiftX = e.pageX - getCoords(range.selected).left;

    document.onmousemove = function(e) {
      var selectedCoords = getCoords(range.selected);
      var newLeft = e.pageX - rangeCoords.left - shiftX;

      if (newLeft < 0) newLeft = 0;
      if (newLeft > max) newLeft = max;


      range.output.min.innerHTML = pixelsToValue(newLeft);
      min = newLeft;
      range.selected.style.left = newLeft + 'px';
    };

    document.onmouseup = function() {
      document.onmousemove = document.onmouseup = null;
    }
  });

  range.thumb.min.ondragstart = function() {
    return false;
  }


  range.thumb.max.addEventListener('mousedown', function(e) {
    var shiftX = e.pageX - getCoords(range.selected).right;

    document.onmousemove = function(e) {
      var selectedCoords = getCoords(range.selected);
      var newLeft = e.pageX - rangeCoords.left - shiftX;

      if (newLeft > rangeWidth) {
        newLeft = rangeWidth;
      }
      if (newLeft < min) {
        newLeft = min;
      }

      range.output.max.innerHTML = pixelsToValue(newLeft);
      max = newLeft;
      range.selected.style.right = rangeWidth - newLeft + 'px';
    };

    document.onmouseup = function() {
      document.onmousemove = document.onmouseup = null;
    }
  });

  range.thumb.max.ondragstart = function() {
    return false;
  }
}

///

function getCoords(elem) {
  var coords = elem.getBoundingClientRect();
  return {
    left: coords.left,
    right: coords.right
  };
}

function pixelsToValue(pix) {
  var result = pix * distance / rangeWidth;
  return Math.floor(result);
}

function valueToPixels(val) {
  return val * rangeWidth / distance;
}

function setMinValue(value) {
  var newLeft = valueToPixels(value);
  if (newLeft < 0) newLeft = 0;
  if (newLeft > max) newLeft = max;
  range.selected.style.left = newLeft + 'px';
  min = newLeft;
}

function setMaxValue(value) {
  var newLeft = valueToPixels(value);
  if (newLeft < min) newLeft = min;
  if (newLeft > rangeWidth) newLeft = rangeWidth;
  range.selected.style.right = rangeWidth - newLeft + 'px';
  max = newLeft;
}


// Range <<


// >> Google map

// Для варианта с google maps требуется увеличивать квоту на трафик
//В связи с этим было решено использовать яндекс API

// var map;
// function initMap() {
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: 59.938657, lng: 30.322940},
//     zoom: 17
//   });
// }

// Google map <<

// >> Яндекс карты

if (document.getElementById("map")) {
  ymaps.ready(init);
}

function init() {
  var myMap = new ymaps.Map("map", {
    center: [59.939311, 30.329355],
    zoom: 16
  });

  var myPlacemark = new ymaps.Placemark([59.938652, 30.323185], {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/svg/pin.svg',
    iconImageSize: [80, 140],
    iconImageOffset: [-40, -140]
  });

  myMap.geoObjects.add(myPlacemark);
}

// Яндекс карты <<
