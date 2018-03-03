// Файл similar.js
'use strict';
var mapFilter = document.querySelector('.map__filters');

(function () {
  var coatColor;
  var eyesColor;
  var pins = [];

  var getRank = function (pin) {
    var rank = 0;

    if (pins.colorCoat === coatColor) {
      rank += 2;
    }
    if (pins.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  }

  var updatepins = function () {
    window.render(pins.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = pins.indexOf(left) - pins.indexOf(right);
      }
      return rankDiff;
    }));
  }

  window.wizard.onEyesChange = function (color) {
    eyesColor = color;
    updatepins();
  }

  window.wizard.onCoatChange = function (color) {
    coatColor = color;
    updatepins();
  }

  var successHandler = function (data) {
    pins = data;
    updatepins();
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  var URL = 'https://js.dump.academy/code-and-magick/data';
  window.load(URL, successHandler, errorHandler);
})();
