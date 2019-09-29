'use strict'

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
  modals.modalWrap.classList.toggle('modal_show');
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

var rangeCoords = getCoords(range.container);
var rangeWidth = range.container.offsetWidth;
var distance = range.config.max - range.config.min;
var min = parseInt(getComputedStyle(range.selected).left);
var max = rangeWidth - parseInt(getComputedStyle(range.selected).right);

setMinValue(100);
setMaxValue(500);
// console.log(min);

// console.log();
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
      // console.log(1);
      newLeft = rangeWidth;
    }
    if (newLeft < min) {
      // console.log(2);
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
  if (newLeft < 0 ) newLeft = 0;
  if (newLeft > max) newLeft = max;
  range.selected.style.left = newLeft + 'px';
  min = newLeft;
}

function setMaxValue(value) {
  var newLeft = valueToPixels(value);
  if (newLeft < min ) newLeft = min;
  if (newLeft > rangeWidth) newLeft = rangeWidth;
  range.selected.style.right =rangeWidth - newLeft + 'px';
  max = newLeft;
}
// Range <<
