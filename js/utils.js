'use strict';

(function () {
  window.utils = {};
  window.utils.getRandomArray = function (arrayValues) {
    var sourceValues = arrayValues.slice();
    var randomArrayLength = window.utils.randomInteger(1, sourceValues.length);
    var newArray = [];
    for (var i = 0; i < randomArrayLength; i++) {
      newArray[i] = window.utils.getUniqueValue(sourceValues);
    }
    return newArray;
  };

  window.utils.randomInteger = function (min, max) {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
  };

  window.utils.getRandomValue = function (arrayValues) {
    return arrayValues[Math.floor(Math.random() * arrayValues.length)];
  };

  window.utils.getUniqueValue = function (arrayValues) {
    return arrayValues.splice(window.utils.randomInteger(0, arrayValues.length - 1), 1)[0];
  };
})();
