'use strict';

// module3-task1
(function () {
  window.map = {};
  var NUMBER_PINS = 8;

  var BOOK_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var BOOK_TYPE = ['flat', 'house', 'bungalo'];
  var BOOK_TYPE_NAME = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };
  var BOOK_FEATURE = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var BOOK_AVATAR = ['01', '02', '03', '04', '05', '06', '07', '08'];
  var BOOK_TIME = ['12:00', '13:00', '14:00'];
  var BOOK_PHOTO = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var PIN_WIDTH = 62;
  var PIN_HEIGHT = 84;

  // задание 2
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');

  // задание 1
  var book = [];
  for (var i = 0; i < NUMBER_PINS; i++) {
    var addrX = window.util.randomInteger(300, 900);
    var addrY = window.util.randomInteger(150, 500);

    book[i] = {
      author: {
        avatar: 'img/avatars/user' + window.util.getUniqueValue(BOOK_AVATAR) + '.png'
      },
      offer: {
        title: window.util.getUniqueValue(BOOK_TITLE),
        address: addrX + ', ' + addrY,
        price: window.util.randomInteger(1000, 1000000),
        type: window.util.getRandomValue(BOOK_TYPE),
        rooms: window.util.randomInteger(1, 5),
        guests: window.util.randomInteger(1, 50),
        checkin: window.util.getRandomValue(BOOK_TIME),
        checkout: window.util.getRandomValue(BOOK_TIME),
        features: window.util.getRandomArray(BOOK_FEATURE),
        description: '',
        photos: window.util.getRandomArray(BOOK_PHOTO)
      },
      location: {
        x: addrX,
        y: addrY
      }
    };
  }

  // задания 3 и 4
  var pinsOnMap = map.querySelector('.map__pins');
  var pinsTemplate = document.querySelector('template').content.querySelector('.map__pin');

  for (i = 0; i < NUMBER_PINS; i++) {
    var template = pinsTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();

    template.setAttribute('style', 'left: ' + (book[i].location.x - PIN_WIDTH / 2) + 'px; top: ' + (book[i].location.y - PIN_HEIGHT) + 'px');
    template.querySelector('img').setAttribute('src', book[i].author.avatar);

    template.dataset.pinId = i;

    fragment.appendChild(template);
    pinsOnMap.appendChild(fragment);
  }

  // задание 5
  var elemBefore = document.querySelector('.map__filters-container');

  var elemParent = document.querySelector('.map');
  var elem = document.createElement('div');
  elem.className = 'new_map__card';
  elemParent.insertBefore(elem, elemBefore);

  var articleTemplatePopup = document.querySelector('template').content.querySelector('article.map__card');


  window.map.renderPopup = function (anyBook) {

    var articlePopup = articleTemplatePopup.cloneNode(true);

    //  заменили название
    articlePopup.querySelector('h3').textContent = anyBook.offer.title;

    // заменили адрес
    articlePopup.querySelector('small').textContent = anyBook.offer.address;

    // заменили цену
    articlePopup.querySelector('.popup__price').textContent = anyBook.offer.price + '₽/ночь';

    // заменили тип жилья
    articlePopup.querySelector('h4').textContent = BOOK_TYPE_NAME[anyBook.offer.type];

    // заменили количества комнат и гостей, nth-child не работает
    articlePopup.querySelector('p:nth-of-type(3)').textContent = anyBook.offer.rooms + ' комнаты для ' + anyBook.offer.guests + ' гостей';

    // заменили время приезда-выезда
    articlePopup.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + anyBook.offer.checkin + ', выезд до ' + anyBook.offer.checkout;

    // заменили удобства
    var articlePopupFeatures = articlePopup.querySelector('.popup__features');

    for (i = 0; i < 6; i++) {
      articlePopupFeatures.removeChild(articlePopup.querySelector('li'));
    }

    for (i = 0; i < anyBook.offer.features.length; i++) {
      var li = document.createElement('li');
      li.className = 'feature feature--' + anyBook.offer.features[i];
      articlePopupFeatures.appendChild(li);
    }
    // заменили описание
    articlePopup.querySelector('p:nth-of-type(5)').textContent = anyBook.offer.description;

    // добавили фотографии
    var popupPhoto = articlePopup.querySelector('.popup__pictures');

    for (i = 0; i < anyBook.offer.photos.length; i++) {
      var popupPhotoCopy = popupPhoto.querySelector('li').cloneNode(true);
      popupPhoto.appendChild(popupPhotoCopy);

      popupPhoto.querySelector('img').setAttribute('src', anyBook.offer.photos[i]);
      popupPhoto.querySelector('img').setAttribute('width', '35px');
      popupPhoto.querySelector('img').setAttribute('heigth', '30px');
    }

    // заменили аватар
    articlePopup.querySelector('img').setAttribute('src', anyBook.author.avatar);

    var fragmentPopup = document.createDocumentFragment();

    if (elem.querySelector('article.map__card')) {
      elem.querySelector('article.map__card').remove();
    }

    fragmentPopup.appendChild(articlePopup);
    elem.appendChild(fragmentPopup);
  };


  // module4-task1
  var mapPin = document.querySelector('.map__pin--main');
  var address = document.getElementById('address');

  var parentPin = document.querySelector('.map__pins');
  parentPin.addEventListener('click', function (evt) {

    var targetPin = evt.target;
    if (targetPin.tagName === 'IMG') {
      targetPin = targetPin.parentElement;
    }

    if (targetPin.dataset.pinId !== void 0) {
      window.map.renderPopup(book[parseInt(targetPin.dataset.pinId, 10)]);
    }

    var articlePopupAll = document.querySelectorAll('article.map__card');
    if (articlePopupAll.length >= 2) {
      articlePopupAll[0].remove();
    }
  });

  // module5-task2
  mapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    map.classList.remove('map--faded');
    document.querySelector('.notice__form').classList.remove('notice__form--disabled');
    document.querySelector('.notice__form').removeAttribute('disabled');
    var newAddressLeft = mapPin.offsetLeft - PIN_WIDTH / 2;
    var newAddressTop = mapPin.offsetTop + PIN_HEIGHT / 2;
    address.setAttribute('value', newAddressLeft + ', ' + newAddressTop);

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if ((mapPin.offsetTop - shift.y) < 150) {
        mapPin.style.top = 150 + 'px';
      } else if ((mapPin.offsetTop - shift.y) > 500) {
        mapPin.style.top = 500 + 'px';
      } else {
        mapPin.style.top = (mapPin.offsetTop - shift.y) + 'px';
      }

      if ((mapPin.offsetLeft - shift.x) > pinsOnMap.offsetWidth) {
        mapPin.style.left = pinsOnMap.offsetWidth + 'px';
      } else if ((mapPin.offsetLeft - shift.x) < 0) {
        mapPin.style.left = '0 px';
      } else {
        mapPin.style.left = (mapPin.offsetLeft - shift.x) + 'px';
      }
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });
})();
