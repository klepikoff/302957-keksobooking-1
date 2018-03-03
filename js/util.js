'use strict';

(function () {
  window.util = {};
  window.util.getRandomArray = function (arrayValues) {
    var sourceValues = arrayValues.slice();
    var randomArrayLength = window.util.randomInteger(1, sourceValues.length);
    var newArray = [];
    for (var i = 0; i < randomArrayLength; i++) {
      newArray[i] = window.util.getUniqueValue(sourceValues);
    }
    return newArray;
  };

  window.util.randomInteger = function (min, max) {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
  };

  window.util.getRandomValue = function (arrayValues) {
    return arrayValues[Math.floor(Math.random() * arrayValues.length)];
  };

  window.util.getUniqueValue = function (arrayValues) {
    return arrayValues.splice(window.util.randomInteger(0, arrayValues.length - 1), 1)[0];
  };
})();
