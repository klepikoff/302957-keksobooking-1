'use strict';

(function () {
  window.getRandomArray = function (arrayValues) {
    var sourceValues = arrayValues.slice();
    var randomArrayLength = window.randomInteger(1, sourceValues.length);
    var newArray = [];
    for (var i = 0; i < randomArrayLength; i++) {
      newArray[i] = window.getUniqueValue(sourceValues);
    }
    return newArray;
  };

  window.randomInteger = function (min, max) {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
  };

  window.getRandomValue = function (arrayValues) {
    return arrayValues[Math.floor(Math.random() * arrayValues.length)];
  };
  window.getUniqueValue = function (arrayValues) {
    return arrayValues.splice(window.randomInteger(0, arrayValues.length - 1), 1)[0];
  };
})();
