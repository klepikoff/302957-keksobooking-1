'use strict';
(function () {
  var mapFilter = document.querySelector('.map__filters');

  var onLoad = function (book) {
    var bookCopy = book.slice();
    console.log(bookCopy);

    var housingType = document.getElementById('housing-type');
    var housingPrice = document.getElementById('housing-price');
    var housingRoom = document.getElementById('housing-rooms');
    var housingGuest = document.getElementById('housing-guests');
    var housingFeature = document.getElementById('housing-features');

    var housingSelection = function (housingSelect, array) {
      var sel = housingSelect.addEventListener('change', function () {
        var selectedHousingSelect = housingSelect.options[housingSelect.selectedIndex].value;

        var modifiedArray = array.filter(function(elem) {
          if (selectedHousingSelect === elem.offer.type) {
            return true;
          } else if (selectedHousingSelect === 'any') {
            return array;
          } else {
            return false;
          }
        });

        return modifiedArray;
      });
      return sel;
    };

    console.log(housingSelection(housingType, bookCopy));
  };

  window.backend.load(onLoad, onError);
  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };
})();
