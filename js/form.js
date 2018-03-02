'use strict';

(function () {
// module4-task2
  var appartmentPrice = document.getElementById('price');

  var selectType = document.getElementById('type');

  // 2.3 Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»

  selectType.addEventListener('change', function () {
    var selectedType = selectType.options[selectType.selectedIndex].value;

    var appartmentPriceMin = 0;

    if (selectedType === 'flat') {
      appartmentPriceMin = 1000;
    }
    if (selectedType === 'bungalo') {
      appartmentPriceMin = 0;
    }
    if (selectedType === 'house') {
      appartmentPriceMin = 5000;
    }
    if (selectedType === 'palace') {
      appartmentPriceMin = 10000;
    }
    appartmentPrice.setAttribute('min', appartmentPriceMin);
  });

  // Поля «Время заезда» и «Время выезда», при изменении значения одного поля, во втором выделяется соответствующее ему.

  document.getElementById('timein').addEventListener('change', function () {
    var selectTimeIn = document.getElementById('timein');
    var selectedTimeIn = selectTimeIn.options[selectTimeIn.selectedIndex].value;

    var forRemoveOut = document.getElementById('timeout').querySelector('option[selected]');
    forRemoveOut.removeAttribute('selected');

    var addSelectedOut = document.getElementById('timeout').querySelector('option[value="' + selectedTimeIn + '"]');
    addSelectedOut.setAttribute('selected', 'selected');
  });

  document.getElementById('timeout').addEventListener('change', function () {
    var selectTimeOut = document.getElementById('timeout');
    var selectedTimeOut = selectTimeOut.options[selectTimeOut.selectedIndex].value;

    var forRemoveIn = document.getElementById('timein').querySelector('option[selected]');
    forRemoveIn.removeAttribute('selected');

    var addSelectedIn = document.getElementById('timein').querySelector('option[value="' + selectedTimeOut + '"]');
    addSelectedIn.setAttribute('selected', 'selected');
  });

  // 2.6. Поле «Количество комнат» синхронизировано с полем «Количество гостей» таким образом, что при
  // выборе количества комнат вводятся ограничения на допустимые варианты выбора количества гостей:

  var selectRoomNumber = document.getElementById('room_number');
  var accessCapacity = document.getElementById('capacity');

  selectRoomNumber.addEventListener('change', function () {
    var selectedRoomNumber = selectRoomNumber.options[selectRoomNumber.selectedIndex].value;

    var allRooms = accessCapacity.querySelectorAll('option');
    for (var i = 0; i < allRooms.length; i++) {
      allRooms[i].setAttribute('disabled', 'disabled');
      allRooms[i].removeAttribute('selected');
    }

    if (selectedRoomNumber <= 3) {
      for (i = 1; i <= selectedRoomNumber; i++) {
        accessCapacity.querySelector('option[value="' + i + '"]').removeAttribute('disabled');
        accessCapacity.querySelector('option[value="' + i + '"]').setAttribute('selected', 'selected');
      }
    }
    if (selectedRoomNumber >= 4) {
      accessCapacity.querySelector('option[value="4"]').removeAttribute('disabled');
      accessCapacity.querySelector('option[value="4"]').setAttribute('selected', 'selected');
    }
  });
})();
