'use strict';
(function () {
  var mapFilter = document.querySelector('.map__filters');

  var onLoad = function (bookings) {
    var bookingsCopy = bookings.slice();
    console.log(bookingsCopy);

    var housingType = document.getElementById('housing-type');
    var housingPrice = document.getElementById('housing-price');
    // var housingRoom = document.getElementById('housing-rooms');
    // var housingGuest = document.getElementById('housing-guests');
    // var housingFeature = document.getElementById('housing-features');



    var housingSelectionType = function (housingType, array) {
      housingType.addEventListener('change', function () {
        var selectedHousingType = housingType.options[housingType.selectedIndex].value;
        if (selectedHousingType !== 'any') {
          var bookingsSelected = bookingsCopy.filter(function (array) {
            if (selectedHousingType === array.offer.type) {
              return true
            }
          });
        } else {
          bookingsSelected = bookingsCopy;
        }
        console.log(bookingsSelected);
      });
    };

    housingSelectionType(housingType, bookingsCopy);
    // housingSelection(housingTPrice, bookingsCopy);
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
  }
)();
